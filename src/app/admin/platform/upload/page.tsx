'use client';

import React, { useState, FormEvent } from 'react';

const UploadTestimonialPlatform: React.FC = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [reviews, setReviews] = useState('');
  const [link, setLink] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setLogo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !rating || !reviews || !link || !logo) {
      alert('All fields are required');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('rating', rating);
    formData.append('reviews', reviews);
    formData.append('link', link);
    formData.append('logo', logo);

    try {
      const res = await fetch('/api/platform', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert('Platform uploaded successfully!');
        window.location.href = '/admin/platform';
      } else {
        alert(data.message || 'Upload failed');
      }
    } catch (err: any) {
      alert(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white border-2 border-gray-600 rounded-lg p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-black mb-8 text-center">
            Upload Testimonial Platform
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-black font-semibold mb-2 text-sm uppercase tracking-wide">
                Platform Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-2 border-gray-600 rounded-md px-4 py-3 text-black bg-white focus:outline-none focus:border-gray-800 transition-colors"
                placeholder="eg: Google | goibibo"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-black font-semibold mb-2 text-sm uppercase tracking-wide">
                  Rating
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full border-2 border-gray-600 rounded-md px-4 py-3 text-black bg-white focus:outline-none focus:border-gray-800 transition-colors"
                  placeholder="4.5"
                  required
                />
              </div>

              <div>
                <label className="block text-black font-semibold mb-2 text-sm uppercase tracking-wide">
                  Number of Reviews
                </label>
                <input
                  type="number"
                  min="0"
                  value={reviews}
                  onChange={(e) => setReviews(e.target.value)}
                  className="w-full border-2 border-gray-600 rounded-md px-4 py-3 text-black bg-white focus:outline-none focus:border-gray-800 transition-colors"
                  placeholder="150"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-black font-semibold mb-2 text-sm uppercase tracking-wide">
                Review Link
              </label>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full border-2 border-gray-600 rounded-md px-4 py-3 text-black bg-white focus:outline-none focus:border-gray-800 transition-colors"
                placeholder="https://..."
                required
              />
            </div>

            <div>
              <label className="block text-black font-semibold mb-2 text-sm uppercase tracking-wide">
                Platform Logo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="w-full border-2 border-gray-600 rounded-md px-4 py-3 text-black bg-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-600 file:text-white file:font-semibold hover:file:bg-gray-700 file:cursor-pointer cursor-pointer focus:outline-none"
                required
              />
              {preview && (
                <div className="mt-4 w-fit border-2 border-gray-600 rounded-md overflow-hidden p-4 bg-gray-50">
                  <img src={preview} alt="Logo Preview" className="h-24 w-auto object-contain" />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-800 text-white font-semibold px-6 py-4 rounded-md hover:bg-black transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed uppercase tracking-wide text-sm"
            >
              {loading ? 'Uploading...' : 'Upload Platform'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadTestimonialPlatform;
