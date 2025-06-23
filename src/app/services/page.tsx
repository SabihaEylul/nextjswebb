'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Service {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

interface ServiceReview {
  serviceId: number;
  rating: number;
  comment: string;
}

export default function ServicesPage() {
  const services: Service[] = [
    {
      id: 1,
      title: 'Kaş Tasarımı',
      description: 'Profesyonel kaş tasarımı ile yüzünüze uygun şekilde kaşlarınızı şekillendiriyoruz.',
      imageUrl: '/images/kas-tasarimi.jpeg',
      price: 200
    },
    {
      id: 2,
      title: 'Kirpik Lifting',
      description: 'Uzun süreli etkili kirpik lifting uygulaması ile gözlerinizi ön plana çıkarıyoruz.',
      imageUrl: '/images/kirpik-lifting.jpeg',
      price: 300
    },
    {
      id: 3,
      title: 'Kaynak Saç',
      description: 'Doğal görünümlü, hacimli ve uzun saçlar için profesyonel kaynak saç uygulamaları sunuyoruz.',
      imageUrl: '/images/kaynak-sac.jpeg',
      price: 1500
    },
    {
      id: 4,
      title: 'Saç Kesimi',
      description: 'Modern ve klasik kesim teknikleriyle size en uygun stili yakalıyoruz.',
      imageUrl: '/images/sac-kesimi.jpeg',
      price: 250
    },
    {
      id: 5,
      title: 'Saç Boyama',
      description: 'Profesyonel saç boyama teknikleriyle hayalinizdeki renge kavuşun.',
      imageUrl: '/images/sac-boyama.jpeg',
      price: 1000
    },
    {
      id: 6,
      title: 'Protez Tırnak',
      description: 'Dayanıklı ve estetik protez tırnak uygulamaları ile elleriniz her zaman bakımlı görünsün.',
      imageUrl: '/images/protez-tirnak.jpeg',
      price: 600
    }
  ];

  const [reviews, setReviews] = useState<ServiceReview[]>([]);
  const [newReview, setNewReview] = useState<{ [key: number]: { rating: number; comment: string } }>({});

  useEffect(() => {
    const saved = localStorage.getItem('serviceReviews');
    if (saved) setReviews(JSON.parse(saved));
  }, []);

  const handleReviewChange = (serviceId: number, field: 'rating' | 'comment', value: any) => {
    setNewReview((prev) => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        [field]: value,
      },
    }));
  };

  const handleReviewSubmit = (serviceId: number) => {
    if (!newReview[serviceId]?.rating || !newReview[serviceId]?.comment) return;
    const updated = [
      ...reviews,
      { serviceId, rating: newReview[serviceId].rating, comment: newReview[serviceId].comment },
    ];
    setReviews(updated);
    localStorage.setItem('serviceReviews', JSON.stringify(updated));
    setNewReview((prev) => ({ ...prev, [serviceId]: { rating: 0, comment: '' } }));
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
        <h2 className="text-3xl font-bold tracking-tight text-pink-600 mb-8">Hizmetlerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => {
            const serviceReviews = reviews.filter((r) => r.serviceId === service.id);
            const avgRating = serviceReviews.length
              ? serviceReviews.reduce((sum, r) => sum + r.rating, 0) / serviceReviews.length
              : 0;
            return (
              <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
                <div className="relative w-full h-64">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-2">{service.description}</p>
                  <p className="text-xl font-bold text-pink-500 mb-2">{service.price} TL</p>
                  <div className="mb-2 flex items-center gap-2">
                    {renderStars(Math.round(avgRating))}
                    <span className="text-sm text-gray-500">({serviceReviews.length} oy)</span>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Yorum Ekle</h4>
                    <div className="flex items-center gap-2 mb-2">
                      {renderStars(
                        newReview[service.id]?.rating || 0,
                        (r) => handleReviewChange(service.id, 'rating', r)
                      )}
                    </div>
                    <textarea
                      className="w-full border rounded p-2 mb-2"
                      rows={2}
                      placeholder="Yorumunuz..."
                      value={newReview[service.id]?.comment || ''}
                      onChange={(e) => handleReviewChange(service.id, 'comment', e.target.value)}
                    />
                    <button
                      className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
                      onClick={() => handleReviewSubmit(service.id)}
                    >
                      Gönder
                    </button>
                  </div>
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Müşteri Yorumları</h4>
                    {serviceReviews.length === 0 && (
                      <p className="text-gray-400 text-sm">Henüz yorum yok.</p>
                    )}
                    <ul className="space-y-2">
                      {serviceReviews.map((r, idx) => (
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
          })}
        </div>
      </div>
    </div>
  );
} 