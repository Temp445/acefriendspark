'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface Platform {
  _id: string;
  name: string;
  rating: number;
  reviews: number;
  logo: string;
  link: string;
}

interface PlatformUpdatePageProps {
  params: { id: string } | Promise<{ id: string }>;
}

const PlatformUpdatePage: React.FC<PlatformUpdatePageProps> = ({ params }) => {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null); 
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [reviews, setReviews] = useState('');
  const [link, setLink] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolved = await params;
      setId(resolved.id);
    };
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchPlatform = async () => {
      try {
        const res = await fetch(`/api/platform/${id}`);
        const data = await res.json();
        if (data.success) {
          setPlatform(data.data);
          setName(data.data.name);
          setRating(data.data.rating.toString());
          setReviews(data.data.reviews.toString());
          setLink(data.data.link);
          setPreview(data.data.logo);
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPlatform();
  }, [id]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setLogoFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(platform?.logo || null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('rating', rating);
      formData.append('reviews', reviews);
      formData.append('link', link);
      if (logoFile) formData.append('logo', logoFile);

      const res = await fetch(`/api/platform/${id}`, {
        method: 'PUT',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        alert('Platform updated successfully!');
        router.push('/admin/platform');
      } else {
        alert(data.message || 'Update failed');
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!platform) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-gray-600 text-lg font-semibold">Loading data...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl border-2 border-gray-600 rounded-lg p-8 shadow-md bg-white">
        <h1 className="text-3xl font-bold mb-8 text-center">Update Testimonial Platform</h1>

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
            {loading ? 'Updating...' : 'Update Platform'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlatformUpdatePage;
