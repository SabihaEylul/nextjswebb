'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

const staticServices = [
    { id: 1, title: 'Kaş Tasarımı', description: 'Profesyonel kaş tasarımı ile yüzünüze uygun şekilde kaşlarınızı şekillendiriyoruz.', imageUrl: '/images/kas-tasarimi.jpeg', price: 200 },
    { id: 2, title: 'Kirpik Lifting', description: 'Uzun süreli etkili kirpik lifting uygulaması ile gözlerinizi ön plana çıkarıyoruz.', imageUrl: '/images/kirpik-lifting.jpeg', price: 300 },
    { id: 3, title: 'Kaynak Saç', description: 'Doğal görünümlü, hacimli ve uzun saçlar için profesyonel kaynak saç uygulamaları sunuyoruz.', imageUrl: '/images/kaynak-sac.jpeg', price: 1500 },
    { id: 4, title: 'Saç Kesimi', description: 'Modern ve klasik kesim teknikleriyle size en uygun stili yakalıyoruz.', imageUrl: '/images/sac-kesimi.jpeg', price: 250 },
    { id: 5, title: 'Saç Boyama', description: 'Profesyonel saç boyama teknikleriyle hayalinizdeki renge kavuşun.', imageUrl: '/images/sac-boyama.jpeg', price: 1000 },
    { id: 6, title: 'Protez Tırnak', description: 'Dayanıklı ve estetik protez tırnak uygulamaları ile elleriniz her zaman bakımlı görünsün.', imageUrl: '/images/protez-tirnak.jpeg', price: 600 }
];

export default function ServiceForm() {
  const router = useRouter();
  const params = useParams();
  const serviceId = params.serviceId as string;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (serviceId && serviceId !== 'new') {
      setIsNew(false);
      const service = staticServices.find(s => s.id === parseInt(serviceId));
      if (service) {
        setTitle(service.title);
        setDescription(service.description);
        setImageUrl(service.imageUrl);
        setPreview(service.imageUrl);
      }
    }
  }, [serviceId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert('Hizmetler statik olarak tanımlanmıştır. Kod içerisinden güncellenmesi gerekmektedir.');
    router.push('/admin/services');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const pageTitle = isNew ? 'Yeni Hizmet Oluştur' : 'Hizmeti Düzenle';

  return (
    <div className="mx-auto max-w-2xl p-4">
      <button
        onClick={() => router.push('/admin/services')}
        className="mb-4 rounded bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300"
      >
        ← Geri Dön
      </button>
      <h1 className="mb-6 text-2xl font-bold">{pageTitle}</h1>
      <form onSubmit={handleSubmit} className="space-y-6 rounded-lg bg-white p-6 shadow-md">
        <div className="rounded-md bg-yellow-50 p-4">
          <p className="text-sm text-yellow-800">
            <strong>Not:</strong> Hizmetler şu anda statik olarak kod içerisinden yönetilmektedir. Burada yapacağınız değişiklikler kaydedilmeyecektir. Kalıcı değişiklikler için geliştirici ile iletişime geçin.
          </p>
        </div>
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-900">
            Hizmet Başlığı
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500"
            required
            disabled={loading || !isNew}
          />
        </div>
        <div>
          <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-900">
            Açıklama
          </label>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500"
            required
            disabled={loading || !isNew}
          />
        </div>
        <div>
          <label htmlFor="price" className="mb-2 block text-sm font-medium text-gray-900">
            Fiyat
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500"
            required
            disabled={loading || !isNew}
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="mb-2 block text-sm font-medium text-gray-900">
            Resim URL veya Dosya
          </label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => { setImageUrl(e.target.value); setPreview(e.target.value); }}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500 mb-2"
            required
            disabled={loading || !isNew}
          />
          <div className="flex items-center gap-3 mb-2">
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              onChange={handleFileChange}
              className="hidden"
              disabled={loading || !isNew}
            />
            <label htmlFor="fileInput">
              <span className="inline-block rounded-lg bg-pink-500 px-4 py-2 text-sm font-medium text-white cursor-pointer hover:bg-pink-600 transition duration-200">
                Fotoğraf Seç
              </span>
            </label>
            {preview && imageUrl && imageUrl.startsWith('data:') && (
              <span className="text-gray-700 text-xs">{imageUrl.length > 30 ? 'Dosya seçildi' : imageUrl}</span>
            )}
          </div>
          {preview && (
            <img src={preview} alt="Önizleme" className="h-32 rounded shadow border object-contain" />
          )}
        </div>
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-pink-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-300 disabled:opacity-50"
          >
            Değişiklikleri Kaydet
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/services')}
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-pink-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  );
} 