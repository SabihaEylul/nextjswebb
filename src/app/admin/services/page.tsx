"use client";
import { useRouter } from 'next/navigation';
import ServiceClient from '@/components/admin/ServiceClient';

export default function AdminServicesPage() {
  const router = useRouter();
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <button
        onClick={() => router.push('/admin/dashboard')}
        className="mb-4 rounded bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300"
      >
        ← Geri Dön
      </button>
      <ServiceClient />
    </div>
  );
} 