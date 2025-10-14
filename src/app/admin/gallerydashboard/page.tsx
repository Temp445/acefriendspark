'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Edit2, Trash2, Plus, Loader2 } from 'lucide-react';

interface Gallery {
  _id: string;
  name: string;
  category: string;
  image: string;
}

const GalleryDashboard = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [filteredGalleries, setFilteredGalleries] = useState<Gallery[]>([]);
  const [categories, setCategories] = useState<string[]>(['all']);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const router = useRouter();

  const fetchGalleries = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();

      if (data.success) {
        const galleriesData: Gallery[] = data.data; 
        setGalleries(galleriesData);
        setFilteredGalleries(galleriesData);

        const uniqueCategories = Array.from(
          new Set(galleriesData.map((item) => item.category))
        );
        setCategories(['all', ...uniqueCategories]);
      } else {
        alert('Failed to load gallery items');
      }
    } catch (error) {
      console.error(error);
      alert('Error fetching gallery items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredGalleries(galleries);
    } else {
      setFilteredGalleries(
        galleries.filter((item) => item.category === selectedCategory)
      );
    }
  }, [selectedCategory, galleries]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;

    setDeleteLoading(id);
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        setGalleries((prev) => prev.filter((item) => item._id !== id));
        alert('Gallery item deleted successfully');
      } else {
        alert('Delete failed');
      }
    } catch {
      alert('Something went wrong while deleting');
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-black mx-auto mb-4" />
          <p className="text-gray-900 text-lg font-medium">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pt-5">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl lg:text-4xl text-gray-900">Gallery Dashboard</h1>
          <button
            onClick={() => router.push('/admin/gallerydashboard/upload')}
            className="bg-[#D46A37] text-white px-6 py-3 rounded hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Add New Image
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full border ${
                selectedCategory === cat
                  ? 'bg-[#D46A37] text-white border-[#D46A37]'
                  : 'bg-white text-gray-700 border-gray-300'
              } transition-all duration-200 hover:bg-[#D46A37] hover:text-white`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {filteredGalleries.length === 0 ? (
          <div className="bg-gray-50 rounded-2xl shadow-xl p-12 text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No gallery items found
            </h3>
            <p className="text-gray-500 mb-6">
              Start by adding new gallery items to showcase amazing images!
            </p>
            <button
              onClick={() => router.push('/admin/gallerydashboard/upload')}
              className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Item
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredGalleries.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-1 mb-4">{item.category}</p>

                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        router.push(`/admin/gallerydashboard/update/${item._id}`)
                      }
                      className="flex-1 bg-gray-100 text-blue-500 px-4 py-2.5 rounded hover:text-blue-800 transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={deleteLoading === item._id}
                      className="flex-1 bg-red-500 text-white px-4 py-2.5 rounded hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deleteLoading === item._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryDashboard;
