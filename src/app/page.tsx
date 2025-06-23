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
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    imageUrl: ''
  });

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

  useEffect(() => {
    // LocalStorage'dan ürünleri yükle
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const addProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.imageUrl) {
      const product: Product = {
        id: Date.now(),
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        imageUrl: newProduct.imageUrl,
        rating: 0,
        reviewCount: 0
      };

      const updatedProducts = [...products, product];
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      
      setNewProduct({ name: '', price: '', imageUrl: '' });
    } else {
      alert('Lütfen tüm alanları doldurun');
    }
  };

  const rateProduct = (productId: number, rating: number) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        const newRating = ((product.rating * product.reviewCount) + rating) / (product.reviewCount + 1);
        return {
          ...product,
          rating: newRating,
          reviewCount: product.reviewCount + 1
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-2xl cursor-pointer ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        onClick={() => rateProduct(products.find(p => p.id === products[i]?.id)?.id || 0, i + 1)}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="relative h-screen bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1500&q=80"
          alt="Ata Kuaför Dükkanı"
          fill
          className="object-cover object-center opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
          <div>
            <h1 className="text-6xl font-bold mb-6">Ata Kuaför</h1>
            <p className="text-xl mb-8">Profesyonel hizmet, kaliteli ürünler</p>
            <div className="space-x-4">
              <Link href="#hizmetler" className="bg-pink-500 hover:bg-pink-600 px-8 py-3 rounded-full text-white font-semibold transition duration-300">
                Hizmetlerimiz
              </Link>
              <Link href="#urunler" className="bg-transparent border-2 border-white hover:bg-white hover:text-pink-500 px-8 py-3 rounded-full text-white font-semibold transition duration-300">
                Ürünlerimiz
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Profesyonel Ekip</h3>
              <p className="text-gray-600">Deneyimli ve uzman kadromuzla en iyi hizmeti sunuyoruz</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Modern Teknikler</h3>
              <p className="text-gray-600">En son trendleri ve teknikleri takip ediyoruz</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Kaliteli Ürünler</h3>
              <p className="text-gray-600">Sadece en kaliteli markaların ürünlerini kullanıyoruz</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧼</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hijyen ve Güvenlik</h3>
              <p className="text-gray-600">Salonumuzda hijyen ve müşteri güvenliği en ön plandadır</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="hizmetler" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Hizmetlerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                <div className="relative h-40">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div id="urunler" className="py-16 bg-white relative">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10" style={{ backgroundImage: "url('/images/background.jpg')" }}></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Ürünlerimiz</h2>
          
          {/* Admin Panel */}
          {isAdmin && (
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-4">Yeni Ürün Ekle</h3>
              <input
                type="text"
                placeholder="Ürün Adı"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded mb-3"
              />
              <input
                type="number"
                placeholder="Fiyat"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded mb-3"
              />
              <input
                type="text"
                placeholder="Resim URL"
                value={newProduct.imageUrl}
                onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded mb-3"
              />
              <button
                onClick={addProduct}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded transition duration-300"
              >
                Ekle
              </button>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                <div className="relative h-40">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                </div>
              </div>
            ))}
          </div>
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
