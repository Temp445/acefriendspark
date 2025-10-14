'use client';

import React, { useState, FormEvent } from 'react';

const GalleryUploadPage: React.FC = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
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
    if (!name || !category || !image) {
      alert('All fields are required');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('image', image);

    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert('Gallery uploaded successfully!');
        window.location.href = '/admin/gallerydashboard';
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
            Upload Gallery Item
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-black font-semibold mb-2 text-sm uppercase tracking-wide">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-2 border-gray-600 rounded-md px-4 py-3 text-black bg-white focus:outline-none focus:border-gray-800 transition-colors"
                placeholder="Enter gallery name"
                required
              />
            </div>

            <div>
              <label className="block text-black font-semibold mb-2 text-sm uppercase tracking-wide">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border-2 border-gray-600 rounded-md px-4 py-3 text-black bg-white focus:outline-none focus:border-gray-800 transition-colors"
                required
              >
                <option value="">Select a category</option>
                <option value="hotel">Hotel</option>
                <option value="hall">PartyHall</option>
                <option value="rooms">Rooms</option>
                <option value="games">Games</option>
              </select>
            </div>

            <div>
              <label className="block text-black font-semibold mb-2 text-sm uppercase tracking-wide">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border-2 border-gray-600 rounded-md px-4 py-3 text-black bg-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-600 file:text-white file:font-semibold hover:file:bg-gray-700 file:cursor-pointer cursor-pointer focus:outline-none"
                required
              />
              {preview && (
                <div className="mt-4 w-fit border-2 border-gray-600 rounded-md overflow-hidden">
                  <img src={preview} alt="Preview" className="w-fit h-64 object-cover" />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-800 text-white font-semibold px-6 py-4 rounded-md hover:bg-black transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed uppercase tracking-wide text-sm"
            >
              {loading ? 'Uploading...' : 'Upload Gallery'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GalleryUploadPage;