'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Service {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

export default function ServiceClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  const deleteService = async (id: number) => {
    if (confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) {
      setLoading(true);
      try {
        // Statik veriler olduğu için sadece uyarı veriyoruz
        alert('Hizmetler statik verilerdir ve silinemez. Düzenleme için kod değişikliği gerekir.');
      } catch (error) {
        console.error(error);
        alert('Bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => router.push('/admin/dashboard')}
          className="rounded bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300 mr-4"
        >
          ← Geri Dön
        </button>
        <h1 className="text-2xl font-bold flex-1">
          Hizmetler ({services.length})
        </h1>
        <button
          onClick={() => router.push(`/admin/services/new`)}
          className="rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700 ml-4"
        >
          Yeni Ekle
        </button>
      </div>
      <hr className="my-4" />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">Görsel</th>
              <th scope="col" className="px-6 py-3">Hizmet Adı</th>
              <th scope="col" className="px-6 py-3">Açıklama</th>
              <th scope="col" className="px-6 py-3">Fiyat</th>
              <th scope="col" className="px-6 py-3"><span className="sr-only">İşlemler</span></th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-b bg-white hover:bg-gray-50">
                <td className="px-6 py-4">
                  {service.imageUrl && (
                    <img src={service.imageUrl} alt={service.title} className="h-16 w-16 object-contain rounded shadow border" />
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{service.title}</td>
                <td className="px-6 py-4">{service.description}</td>
                <td className="px-6 py-4">{service.price} TL</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => router.push(`/admin/services/${service.id}`)}
                    className="mr-2 font-medium text-blue-600 hover:underline"
                    disabled={loading}
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => deleteService(service.id)}
                    className="font-medium text-red-600 hover:underline"
                    disabled={loading}
                  >
                    {loading ? 'Siliniyor...' : 'Sil'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
} 