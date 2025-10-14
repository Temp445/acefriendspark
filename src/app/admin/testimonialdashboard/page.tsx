'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Edit2, Trash2, Plus, Loader2, Star } from 'lucide-react';

interface Testimonial {
  _id: string;
  username: string;
  platform: string;
  rating: number;
  review: string;
  link: string;
  image: string;
}

const TestimonialDashboard = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const router = useRouter();

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonial');
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.data);
      } else {
        alert('Failed to load testimonials');
      }
    } catch {
      alert('Error fetching testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    setDeleteLoading(id);
    try {
      const res = await fetch(`/api/testimonial/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        setTestimonials((prev) => prev.filter((item) => item._id !== id));
        alert('Testimonial deleted successfully');
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
          <p className="text-gray-900 text-lg font-medium">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900">Testimonials Dashboard</h1>
          <button
            onClick={() => router.push('/admin/testimonialdashboard/upload')}
            className="bg-[#D46A37] text-white px-6 py-3 rounded hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Add New Testimonial
          </button>
        </div>

        {testimonials.length === 0 ? (
          <div className="bg-gray-50 rounded-2xl shadow-xl p-12 text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No testimonials yet</h3>
            <p className="text-gray-500 mb-6">
              Start by adding your first testimonial to build trust with your users!
            </p>
            <button
              onClick={() => router.push('/admin/testimonialdashboard/upload')}
              className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Your First Testimonial
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {testimonials.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200"
              >
                <div className="relative h-40 flex items-center justify-center bg-gray-50 border-b">
                  <img
                    src={item.image || "/images/placeholder.png"}
                    alt={item.platform || "logo"}
                    className="h-20 object-contain"
                  />

                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-orange-400 mb-2 line-clamp-1">{item.platform}</h3>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{item.username}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.review}</p>


                  <div className="flex gap-3">
                    <button
                      onClick={() => router.push(`/admin/testimonialdashboard/update/${item._id}`)}
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

export default TestimonialDashboard;
