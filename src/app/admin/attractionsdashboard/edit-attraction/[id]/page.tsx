'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';

const EditAttractionPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [placeName, setPlaceName] = useState('');
  const [distance, setDistance] = useState('');
  const [travelingTime, setTravelingTime] = useState('');
  const [description, setDescription] = useState('');
  const [keyPoints, setKeyPoints] = useState<string[]>(['']);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAttraction = async () => {
      try {
        const res = await fetch(`/api/attractions/${id}`);
        const data = await res.json();

        if (data.success) {
          const a = data.data;
          setPlaceName(a.placeName);
          setDistance(a.distance);
          setTravelingTime(a.travelingTime);
          setDescription(a.description);
          setKeyPoints(a.keyPoints || ['']);
          setPreview(a.image);
        } else {
          alert('Failed to load attraction.');
        }
      } catch {
        alert('Error loading attraction.');
      }
    };

    if (id) fetchAttraction();
  }, [id]);

  const handleKeyPointChange = (index: number, value: string) => {
    const updated = [...keyPoints];
    updated[index] = value;
    setKeyPoints(updated);
  };

  const addKeyPoint = () => setKeyPoints([...keyPoints, '']);
  const removeKeyPoint = (index: number) =>
    setKeyPoints(keyPoints.filter((_, i) => i !== index));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('placeName', placeName);
    formData.append('distance', distance);
    formData.append('travelingTime', travelingTime);
    formData.append('description', description);
    keyPoints.forEach((kp) => formData.append('keyPoints', kp));
    if (image) formData.append('image', image);

    try {
      const res = await fetch(`/api/attractions/${id}`, {
        method: 'PUT',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        alert('Attraction updated successfully!');
        router.push('/admin/attractionsdashboard');
      } else {
        alert(`${data.message || 'Update failed'}`);
      }
    } catch {
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Edit Attraction
          </h1>
        </div>

        <div className="bg-white rounded shadow-xl p-8 border border-gray-600">
          <div className="space-y-6">
            <div className="group">
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Place Name
              </label>
              <input
                type="text"
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-600 rounded outline-none text-gray-900"
                placeholder="Enter attraction name..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Distance
                </label>
                <input
                  type="text"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-600 rounded outline-none text-gray-900"
                  placeholder="e.g., 15 km"
                />
              </div>
              <div className="group">
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Traveling Time
                </label>
                <input
                  type="text"
                  value={travelingTime}
                  onChange={(e) => setTravelingTime(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-600 rounded outline-none text-gray-900"
                  placeholder="e.g., 30 minutes"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-600 rounded transition-all outline-none resize-none text-gray-900"
                rows={4}
                placeholder="Describe what makes this place special..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-3">
                Key Points
              </label>
              <div className="space-y-3">
                {keyPoints.map((kp, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={kp}
                      onChange={(e) => handleKeyPointChange(index, e.target.value)}
                      required
                      className="flex-1 px-4 py-3 border border-gray-600 rounded outline-none text-gray-900"
                      placeholder={`Highlight ${index + 1}`}
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeKeyPoint(index)}
                        className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded transition-colors font-medium"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addKeyPoint}
                  className="w-fit  px-5 py-3 border-2 border-dashed border-gray-300 rounded text-gray-700  font-medium"
                >
                  + Add Another Point
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-3">
                Attraction Image
              </label>
             <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border-2 border-gray-600 rounded-md px-4 py-3 text-black bg-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-600 file:text-white file:font-semibold hover:file:bg-gray-700 file:cursor-pointer cursor-pointer focus:outline-none"
                required
              />
              {preview && (
                <div className="mt-4 w-fit border-2 border-gray-600 rounded-md overflow-hidden">
                  <img src={preview} alt="Preview" className="w-fit h-64" />
                </div>
              )}
            </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 bg-emerald-600 text-white font-semibold rounded shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Updating...
                </span>
              ) : (
                'Update Attraction'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAttractionPage;