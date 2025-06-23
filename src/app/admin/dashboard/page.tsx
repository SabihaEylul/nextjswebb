'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in
    const adminData = localStorage.getItem('admin');
    if (!adminData) {
      router.push('/admin/login');
      return;
    }

    try {
      const adminInfo = JSON.parse(adminData);
      setAdmin(adminInfo);
    } catch (error) {
      console.error('Error parsing admin data:', error);
      router.push('/admin/login');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin');
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Yükleniyor...</div>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with logout */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Admin Paneli
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Hoş geldiniz, {admin.username}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Card for managing products */}
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-5">
                  <h3 className="text-lg font-medium text-gray-900">
                    Ürünleri Yönet
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Sitenizde görüntülenen ürünleri ekleyin, düzenleyin veya silin.
                  </p>
                </div>
                <div className="bg-gray-50 p-5">
                  <Link
                    href="/admin/products"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Ürünlere Git &rarr;
                  </Link>
                </div>
              </div>

              {/* Card for managing services */}
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-5">
                  <h3 className="text-lg font-medium text-gray-900">
                    Hizmetleri Yönet
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Sunulan hizmetleri ekleyin, düzenleyin veya silin.
                  </p>
                </div>
                <div className="bg-gray-50 p-5">
                  <Link
                    href="/admin/services"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Hizmetlere Git &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 