'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
}

interface Service {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState<string | null>(null);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);

  useEffect(() => {
    // Hizmetleri API'den çek
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        if (!res.ok) throw new Error('Hizmetler yüklenemedi');
        const data = await res.json();
        setServices(data);
      } catch (err) {
        if (err instanceof Error) {
          setServicesError(err.message);
        } else {
          setServicesError('Bilinmeyen bir hata oluştu');
        }
      } finally {
        setServicesLoading(false);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Ürünler yüklenemedi');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        if (err instanceof Error) {
          setProductsError(err.message);
        } else {
          setProductsError('Bilinmeyen bir hata oluştu');
        }
      } finally {
        setProductsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <div className="relative w-full h-[70vh] flex items-center justify-center pb-0 bg-pink-700">
        <Image
          src="/images/hero-kuafor.jpg"
          alt="Ata Kuaför Güzellik Salonu"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg text-[#FFF7ED] font-serif italic">Ata Kuaför Güzellik Salonu</h1>
          <p className="text-lg md:text-2xl mb-6 drop-shadow">Güzelliğinize değer katıyoruz</p>
        </div>
      </div>

      {/* Services Section */}
      <div id="hizmetler" className="py-16 bg-gray-50 mt-32 pt-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Hizmetlerimiz</h2>
          {/* Statik Kartlar: Saç, Makyaj, Bakım */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 pb-16">
            {/* Saç */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <Image src="/images/sac-kesimi.jpeg" alt="Saç" width={150} height={150} className="rounded-xl object-cover mb-4" />
              <h3 className="text-xl font-semibold mb-2">Saç</h3>
              <p className="text-gray-600 mb-4 text-center">Modern saç kesimi, renklendirme ve profesyonel bakım hizmetleri.</p>
              <Link href="#hizmetler" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-semibold transition">Detaylar</Link>
            </div>
            {/* Makyaj */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <Image src="/images/kas-tasarimi.jpeg" alt="Makyaj" width={150} height={150} className="rounded-xl object-cover mb-4" />
              <h3 className="text-xl font-semibold mb-2">Makyaj</h3>
              <p className="text-gray-600 mb-4 text-center">Profesyonel makyaj uygulamaları ve özel günler için güzellik.</p>
              <Link href="#hizmetler" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-semibold transition">Detaylar</Link>
            </div>
            {/* Bakım */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <Image src="/images/protez-tirnak.jpeg" alt="Bakım" width={150} height={150} className="rounded-xl object-cover mb-4" />
              <h3 className="text-xl font-semibold mb-2">Bakım</h3>
              <p className="text-gray-600 mb-4 text-center">El, ayak ve cilt bakımı ile güzelliğinizi tamamlayın.</p>
              <Link href="#hizmetler" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-semibold transition">Detaylar</Link>
            </div>
          </div>
          {servicesLoading ? (
            <div className="text-center text-lg py-12">Hizmetler yükleniyor...</div>
          ) : servicesError ? (
            <div className="text-center text-red-500 py-12">{servicesError}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 flex flex-col h-full">
                  <div className="flex justify-center mt-6">
                    {service.imageUrl && (
                      <Image
                        src={service.imageUrl}
                        alt={service.name}
                        width={150}
                        height={150}
                        className="rounded-xl object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold mb-2 text-center">{service.name}</h3>
                    {service.description && <p className="text-gray-600 text-sm mb-2 text-center">{service.description}</p>}
                    <p className="text-pink-500 font-bold mb-4 text-center">{service.price} TL</p>
                    <div className="mt-auto">
                      <Link href="#hizmetler" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-semibold transition block text-center">Detaylar</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Products Section */}
      <div id="urunler" className="py-16 bg-white relative">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10" style={{ backgroundImage: "url('/images/background.jpg')" }}></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Ürünlerimiz</h2>
          {productsLoading ? (
            <div className="text-center text-lg py-12">Ürünler yükleniyor...</div>
          ) : productsError ? (
            <div className="text-center text-red-500 py-12">{productsError}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 flex flex-col h-full">
                  <div className="flex justify-center mt-6">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={150}
                      height={150}
                      className="rounded-xl object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold mb-2 text-center">{product.name}</h3>
                    <p className="text-pink-500 font-bold mb-4 text-center">{product.price} TL</p>
                    <div className="mt-auto">
                      <Link href="#urun-detay" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-semibold transition block text-center">Detaylar</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">İletişim</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-pink-500 text-xl">📍</span>
                <p>Adres: Atakum Mahallesi, Rıhtım Caddesi No:123, Atakum/Samsun</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-pink-500 text-xl">📞</span>
                <p>Telefon: 0362 123 45 67</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-pink-500 text-xl">🕒</span>
                <p>Çalışma Saatleri: Pazartesi - Cumartesi, 09:00 - 20:00</p>
              </div>
            </div>
            <div className="h-96 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11957.130168480591!2d36.28166671282957!3d41.32060979461615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40887e6c41d4c691%3A0x2d24ea6e47f8e9d!2sAtakum%2C%20Samsun!5e0!3m2!1str!2str!4v1689000000000!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
