'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ProductReview {
  productId: number;
  rating: number;
  comment: string;
}

interface ServiceReview {
  serviceId: string;
  rating: number;
  comment: string;
}

interface Product {
  id: number;
  name: string;
}

interface Service {
  id: string;
  name: string;
}

export default function AdminReviewsPage() {
  const router = useRouter();
  const [productReviews, setProductReviews] = useState<ProductReview[]>([]);
  const [serviceReviews, setServiceReviews] = useState<ServiceReview[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load reviews from localStorage
    const savedProductReviews = localStorage.getItem('productReviews');
    const savedServiceReviews = localStorage.getItem('serviceReviews');
    const savedProducts = localStorage.getItem('products');

    if (savedProductReviews) {
      setProductReviews(JSON.parse(savedProductReviews));
    }
    if (savedServiceReviews) {
      setServiceReviews(JSON.parse(savedServiceReviews));
    }
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }

    // Load services from API
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        if (res.ok) {
          const data = await res.json();
          setServices(data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleDeleteProductReview = (reviewIndex: number) => {
    if (confirm('Bu yorumu silmek istediğinizden emin misiniz?')) {
      const updated = productReviews.filter((_, index) => index !== reviewIndex);
      setProductReviews(updated);
      localStorage.setItem('productReviews', JSON.stringify(updated));
    }
  };

  const handleDeleteServiceReview = (reviewIndex: number) => {
    if (confirm('Bu yorumu silmek istediğinizden emin misiniz?')) {
      const updated = serviceReviews.filter((_, index) => index !== reviewIndex);
      setServiceReviews(updated);
      localStorage.setItem('serviceReviews', JSON.stringify(updated));
    }
  };

  const getProductName = (productId: number) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : `Ürün ID: ${productId}`;
  };

  const getServiceName = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    return service ? service.name : `Hizmet ID: ${serviceId}`;
  };

  const renderStars = (rating: number) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          ★
        </span>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Yorumlar yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="rounded bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300"
          >
            ← Geri Dön
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Yorum Yönetimi</h1>
        </div>

        {/* Product Reviews */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Ürün Yorumları ({productReviews.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ürün</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yorum</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {productReviews.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">Henüz ürün yorumu yok.</td>
                  </tr>
                ) : (
                  productReviews.map((review, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {getProductName(review.productId)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderStars(review.rating)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                        {review.comment}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDeleteProductReview(index)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Service Reviews */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Hizmet Yorumları ({serviceReviews.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hizmet</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yorum</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {serviceReviews.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">Henüz hizmet yorumu yok.</td>
                  </tr>
                ) : (
                  serviceReviews.map((review, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {getServiceName(review.serviceId)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderStars(review.rating)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                        {review.comment}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDeleteServiceReview(index)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 