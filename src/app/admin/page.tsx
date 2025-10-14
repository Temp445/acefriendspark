"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PencilLine, Trash2} from "lucide-react";

interface Product {
  _id: string;
  productName: string;
  productImage: string[];
}

const Admin = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        if (data.success && Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };


  return (
    <div className="flex min-h-screen">
      <main className="flex-1 bg-gradient-to-br from-slate-50 via-indigo-50 to-orange-100">
        <div className="px-2 lg:px-5 py-16 container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Products
              </h1>
            </div>
            <button
              onClick={() => router.push("/admin/productupload")}
              className="group relative border text-orange-600 px-8 py-2 rounded font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span className="relative flex items-center gap-2">
                Add New Product
              </span>
            </button>
          </div>

          {loading ? (
           <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-orange-600 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-lg font-medium text-gray-600">Loading Products...</p>
        </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="group relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/50 overflow-hidden"
                >
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden">
                    
                    <div className="relative overflow-hidden">
                      {product.productImage && product.productImage.length > 0 ? (
                        <div className="relative">
                          <img
                            src={product.productImage[0]}
                            alt={product.productName}
                            className="w-full h-64 object-contain"
                          />
                          
                        </div>
                      ) : (
                        <div className="w-full h-64 bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center">
                         
                          <p className="text-slate-500 font-medium">No Image Available</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-slate-800 mb-1 line-clamp-2">
                          {product.productName}
                        </h3>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => router.push(`/admin/productupdate/${product._id}`)}
                          className="flex-1 group/btn relative overflow-hidden border text-black py-3 px-4 rounded font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                          <div className="absolute inset-0 bg-white/0 group-hover/btn:bg-white/20 transition-colors duration-300"></div>
                          <div className="relative flex items-center justify-center gap-2">
                            <PencilLine className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                            <span className="text-sm">Edit</span>
                          </div>
                        </button>
                        
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="group/btn relative overflow-hidden bg-gradient-to-r from-rose-500 to-red-500 text-white py-3 px-4 rounded font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                          <div className="absolute inset-0 bg-white/0 group-hover/btn:bg-white/20 transition-colors duration-300"></div>
                          <div className="relative flex items-center justify-center">
                            <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                          </div>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;