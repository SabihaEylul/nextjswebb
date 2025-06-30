"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export default function MessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/contact');
        const data = await res.json();
        setMessages(data);
      } catch {
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-100">
      <div className="flex items-center mb-8">
        <button
          onClick={() => router.push('/admin/dashboard')}
          className="rounded bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300 mr-4"
        >
          ← Geri Dön
        </button>
        <h1 className="text-3xl font-bold text-pink-700">Gelen Mesajlar</h1>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">İsim</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">E-posta</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mesaj</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tarih</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={4} className="text-center py-8 text-gray-400">Yükleniyor...</td></tr>
            ) : messages.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-400">Hiç mesaj yok.</td>
              </tr>
            ) : (
              messages.map((msg) => (
                <tr key={msg.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold">{msg.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{msg.email}</td>
                  <td className="px-6 py-4 whitespace-pre-line max-w-xs break-words">{msg.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(msg.createdAt).toLocaleString('tr-TR')}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 