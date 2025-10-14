'use client';

import React, { useState, useEffect, FormEvent } from 'react';

interface GalleryUpdateProps {
  params: { id: string } | Promise<{ id: string }>;
}

const GalleryUpdatePage: React.FC<GalleryUpdateProps> = ({ params }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolved = await params;
      setId(resolved.id);
    };
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;
    fetchGalleryData(id);
  }, [id]);

  const fetchGalleryData = async (id: string) => {
    setFetchLoading(true);
    try {
      const res = await fetch(`/api/gallery/${id}`);
      const data = await res.json();
      
      if (data.success && data.data) {
        setName(data.data.name || '');
        setCategory(data.data.category || '');
        setPreview(data.data.image || null);
      } else {
        alert(data.message || 'Failed to fetch gallery data');
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      alert(err.message || 'Failed to fetch gallery data');
    } finally {
      setFetchLoading(false);
    }
  };

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
    if (!name || !category) {
      alert('Name and category are required');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    if (image) {
      formData.append('image', image);
    }

    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert('Gallery updated successfully!');
        window.location.href = '/admin/gallerydashboard';
      } else {
        alert(data.message || 'Update failed');
      }
    } catch (err: any) {
      console.error('Update error:', err);
      alert(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-black text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white border-2 border-gray-600 rounded-lg p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-black mb-8 text-center">
            Update Gallery Item
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


            {/* Image */}
            <div>
              <label className="block text-black font-semibold mb-2 text-sm uppercase tracking-wide">
                Image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border-2 border-gray-600 rounded-md px-4 py-3 text-black bg-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-600 file:text-white file:font-semibold hover:file:bg-gray-700 file:cursor-pointer cursor-pointer focus:outline-none"
              />
              {preview && (
                <div className="mt-4 w-fit border-2 border-gray-600 rounded-md overflow-hidden">
                  <img src={preview} alt="Preview" className="w-fit h-64 object-cover" />
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => window.location.href = '/admin/gallerydashboard'}
                className="flex-1 bg-gray-400 text-white font-semibold px-6 py-4 rounded-md hover:bg-gray-500 transition-colors uppercase tracking-wide text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gray-800 text-white font-semibold px-6 py-4 rounded-md hover:bg-black transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed uppercase tracking-wide text-sm"
              >
                {loading ? 'Updating...' : 'Update Gallery'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GalleryUpdatePage;