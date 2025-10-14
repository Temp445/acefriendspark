'use client';

import React, { useEffect, useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';

const TestimonialUpdatePage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();

  const [platform, setPlatform] = useState('');
  const [username, setUsername] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const res = await fetch(`/api/testimonial/${id}`);
        const data = await res.json();
        if (data.success) {
          const t = data.data;
          setPlatform(t.platform || '');
          setUsername(t.username || '');
          setReview(t.review || '');
          setRating(t.rating?.toString() || '');
          setDate(t.date || '');
          setPreview(t.image || null);
        } else {
          alert('Failed to load testimonial');
        }
      } catch (err: any) {
        alert(err.message || 'Error fetching testimonial');
      }
    };
    fetchTestimonial();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!platform || !username || !review || !rating || !date) {
      alert('All fields are required');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('platform', platform);
    formData.append('username', username);
    formData.append('review', review);
    formData.append('rating', rating);
    formData.append('date', date);
    if (image) formData.append('image', image);

    try {
      const res = await fetch(`/api/testimonial/${id}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        alert('Testimonial updated successfully!');
        router.push('/admin/testimonialdashboard');
      } else {
        alert(data.message || 'Update failed');
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
            Update Testimonial
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-black font-semibold mb-2 text-sm uppercase tracking-wide">
                Platform
              </label>
              <input
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full border-2 border-gray-600 rounded-md px-4 py-3 text-black bg-white focus:outline-none focus:border-gray-800 transition-colors"
                required
              >
              </input>
            </div>

            <div>
              <label className="block text-black font-semibold mb-2 text-sm uppercase tracking-wide">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border-2 border-gray-600 rounded-md px-4 py-3 text-black bg-white focus:outline-none focus:border-gray-800 transition-colors"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-black font-semibold mb-2 text-sm uppercase tracking-wide">
                Review
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full border-2 border-gray-600 rounded-md px-4 py-3 text-black bg-white focus:outline-none focus:border-gray-800 transition-colors resize-none"
                rows={4}
                placeholder="Write the review"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-black font-semibold mb-2 text-sm uppercase tracking-wide">
                Rating (0-5)
              </label>
              <input
                type="number"
                min="0"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full border-2 border-gray-600 rounded-md px-4 py-3 text-black bg-white focus:outline-none focus:border-gray-800 transition-colors"
                placeholder="Enter rating"
                required
              />
            </div>

            <div>
              <label className="block text-black font-semibold mb-2 text-sm uppercase tracking-wide">
                Date
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border-2 border-gray-600 rounded-md px-4 py-3 text-black bg-white focus:outline-none focus:border-gray-800 transition-colors"
                required
              />
            </div>

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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-800 text-white font-semibold px-6 py-4 rounded-md hover:bg-black transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed uppercase tracking-wide text-sm"
            >
              {loading ? 'Updating...' : 'Update Testimonial'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestimonialUpdatePage;
