'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
}

interface ProductReview {
  productId: number;
  rating: number;
  comment: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [newReview, setNewReview] = useState<{ [key: number]: { rating: number; comment: string } }>({});

  useEffect(() => {
    // Lanza ürünleri örnekleri
    const defaultProducts: Product[] = [
      {
        id: 1,
        name: 'Lanza Healing Moisture Shampoo',
        price: 350,
        imageUrl: '/images/lanza-shampoo.jpg',
        rating: 4.7,
        reviewCount: 18
      },
      {
        id: 2,
        name: 'Lanza Keratin Healing Oil',
        price: 420,
        imageUrl: '/images/lanza-keratin-oil.jpg',
        rating: 4.9,
        reviewCount: 22
      },
      {
        id: 3,
        name: 'Lanza Healing ColorCare Conditioner',
        price: 390,
        imageUrl: '/images/lanza-conditioner.jpg',
        rating: 4.8,
        reviewCount: 15
      },
      {
        id: 4,
        name: 'Lanza Healing Strength Serum',
        price: 480,
        imageUrl: '/images/lanza-serum.jpg',
        rating: 4.6,
        reviewCount: 12
      },
      {
        id: 5,
        name: 'Lanza Healing Volume Final Effects',
        price: 310,
        imageUrl: '/images/lanza-volume.jpg',
        rating: 4.5,
        reviewCount: 10
      }
    ];
    // LocalStorage'dan ürünleri yükle
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(defaultProducts);
      localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
    const savedReviews = localStorage.getItem('productReviews');
    if (savedReviews) setReviews(JSON.parse(savedReviews));
  }, []);

  const handleReviewChange = (productId: number, field: 'rating' | 'comment', value: any) => {
    setNewReview((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  const handleReviewSubmit = (productId: number) => {
    if (!newReview[productId]?.rating || !newReview[productId]?.comment) return;
    const updated = [
      ...reviews,
      { productId, rating: newReview[productId].rating, comment: newReview[productId].comment },
    ];
    setReviews(updated);
    localStorage.setItem('productReviews', JSON.stringify(updated));
    setNewReview((prev) => ({ ...prev, [productId]: { rating: 0, comment: '' } }));
  };

  const renderStars = (rating: number, setRating?: (r: number) => void) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-2xl cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          onClick={setRating ? () => setRating(star) : undefined}
        >
          ★
        </span>
      ))}
    </div>
  );

  return (
    <div className="bg-white pt-16">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-5xl lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-pink-600 mb-8">Ürünlerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Henüz ürün eklenmemiş.</p>
              <p className="text-gray-400 mt-2">Ana sayfadan admin girişi yaparak ürün ekleyebilirsiniz.</p>
            </div>
          ) : (
            products.map((product) => {
              const productReviews = reviews.filter((r) => r.productId === product.id);
              const avgRating = productReviews.length
                ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
                : 0;
              return (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative w-full h-64">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                    <p className="text-xl font-bold text-pink-500 mb-2">{product.price} TL</p>
                    <div className="mb-2 flex items-center gap-2">
                      {renderStars(Math.round(avgRating))}
                      <span className="text-sm text-gray-500">({productReviews.length} oy)</span>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Yorum Ekle</h4>
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(
                          newReview[product.id]?.rating || 0,
                          (r) => handleReviewChange(product.id, 'rating', r)
                        )}
                      </div>
                      <textarea
                        className="w-full border rounded p-2 mb-2"
                        rows={2}
                        placeholder="Yorumunuz..."
                        value={newReview[product.id]?.comment || ''}
                        onChange={(e) => handleReviewChange(product.id, 'comment', e.target.value)}
                      />
                      <button
                        className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
                        onClick={() => handleReviewSubmit(product.id)}
                      >
                        Gönder
                      </button>
                    </div>
                    <div className="mt-6">
                      <h4 className="font-semibold mb-2">Müşteri Yorumları</h4>
                      {productReviews.length === 0 && (
                        <p className="text-gray-400 text-sm">Henüz yorum yok.</p>
                      )}
                      <ul className="space-y-2">
                        {productReviews.map((r, idx) => (
                          <li key={idx} className="border-b pb-2">
                            <div className="flex items-center gap-2 mb-1">
                              {renderStars(r.rating)}
                            </div>
                            <p className="text-gray-700 text-sm">{r.comment}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
} 