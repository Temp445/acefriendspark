'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Edit2, Trash2, Plus, Loader2 } from 'lucide-react';

interface Attraction {
  _id: string;
  image: string;
  placeName: string;
  description: string;
}

const AttractionsDashboard = () => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const router = useRouter();

  const fetchAttractions = async () => {
    try {
      const res = await fetch('/api/attractions');
      const data = await res.json();
      if (data.success) {
        setAttractions(data.data);
      } else {
        window.alert('Failed to load attractions');
      }
    } catch {
      window.alert('Error fetching attractions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttractions();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this attraction?')) return;

    setDeleteLoading(id);
    try {
      const res = await fetch(`/api/attractions/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        setAttractions((prev) => prev.filter((item) => item._id !== id));
        window.alert('Attraction deleted successfully');
      } else {
        window.alert('Delete failed');
      }
    } catch {
      window.alert('Something went wrong while deleting');
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-black mx-auto mb-4" />
          <p className="text-gray-900 text-lg font-medium">Loading attractions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pt-5 pb-10">
        <div className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl md:text-4xl text-gray-900 mb-2">Attractions Dashboard</h1>
          <button
            onClick={() => router.push('/admin/attractionsdashboard/add-attraction')}
            className="bg-[#D46A37] text-white px-6 py-3 rounded hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Add New Attraction
          </button>
        </div>

        {attractions.length === 0 ? (
          <div className="bg-gray-50 rounded-2xl shadow-xl p-12 text-center">
            <div className="max-w-md mx-auto">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No attractions yet</h3>
              <p className="text-gray-500 mb-6">
                Start by adding your first attraction to showcase amazing destinations!
              </p>
              <button
                onClick={() => router.push('/admin/attractionsdashboard/add-attraction')}
                className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Your First Attraction
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {attractions.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.placeName}
                    className="w-full h-full object-center transition-transform duration-500"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{item.placeName}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4 min-h-[40px]">{item.description}</p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => router.push(`/admin/attractionsdashboard/edit-attraction/${item._id}`)}
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
                      {deleteLoading === item._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
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

export default AttractionsDashboard;
