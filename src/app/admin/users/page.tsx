'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import { Trash2 } from 'lucide-react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN' | string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/user`);
        if (!res.ok) throw new Error('Failed to fetch users');

        const json = await res.json();
        setUsers(Array.isArray(json) ? json : json?.data || []);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const res = await fetch(`/api/user/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) throw new Error('Role update failed');

      const result = await res.json();
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: result.user.role } : u))
      );
    } catch (err: any) {
      alert(err.message || 'Failed to update role');
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const res = await fetch(`/api/user/${userId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete user');

      setUsers((prev) => prev.filter((u) => u._id !== userId));
      alert('User deleted successfully');
    } catch (err: any) {
      alert(err.message || 'Failed to delete user');
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-black border-t-transparent border-b-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
      <div className="p-6 container mx-auto 2xl:mt-5 pb-20 2xl:px-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Users List</h1>

        <table className="min-w-full border rounded-lg overflow-hidden shadow-md">
          <thead className="bg-black">
            <tr>
              <th className="hidden md:flex px-6 py-3 text-left text-white font-medium uppercase text-sm">Name</th>
              <th className="px-6 py-3 text-left text-white font-medium uppercase text-sm">Email</th>
              <th className="px-6 py-3 text-left text-white font-medium uppercase text-sm">Role</th>
              <th className="px-6 py-3 text-left text-white font-medium uppercase text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) =>
              user && user.role ? (
                <tr
                  key={user._id}
                  className={`border-t ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors`}
                >
                  <td className="hidden md:flex px-6 py-3 text-gray-800">{user.name}</td>
                  <td className="px-6 py-3 text-gray-800">{user.email}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded ${
                        user.role === 'ADMIN' ? 'border text-[#D46A37]' : 'border text-gray-800'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-3 flex items-center gap-2">
                    <select
                      value={user.role}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring focus:border-blue-300"
                      aria-label="Role"
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                      aria-label="Delete User"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
  );
};

export default Users;
