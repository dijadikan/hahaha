"use client" // Wajib ada untuk file yang pakai useState!

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminPanel() {
  const [formData, setFormData] = useState({ title: '', desc: '', cat: 'cleo', link: '' });
  const [status, setStatus] = useState('');

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Mengunggah...');
    
    const { error } = await supabase.from('mods').insert([
      { 
        title: formData.title, 
        description: formData.desc, 
        category: formData.cat, 
        download_url: formData.link 
      }
    ]);

    if (error) {
      setStatus('Gagal upload: Pastikan tabel Supabase sudah dibuat.');
    } else {
      setStatus('Mod berhasil dipublikasikan!');
      setFormData({ title: '', desc: '', cat: 'cleo', link: '' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 flex items-center justify-center">
      <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-green-500/30 w-full max-w-xl">
        <h2 className="text-3xl font-black mb-6 text-green-500">EXRY ADMIN</h2>
        
        <form onSubmit={handleUpload} className="space-y-4">
          <input required type="text" placeholder="Nama Mod" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 bg-black/50 border border-gray-800 rounded-lg text-white" />
          
          <select value={formData.cat} onChange={e => setFormData({...formData, cat: e.target.value})} className="w-full p-3 bg-black/50 border border-gray-800 rounded-lg text-white">
            <option value="cleo">Cleo Script</option>
            <option value="monetloader">Monetloader</option>
            <option value="modpack">Modpack</option>
          </select>

          <input required type="url" placeholder="Link Download (Mediafire/Drive/Folder)" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full p-3 bg-black/50 border border-gray-800 rounded-lg text-white" />
          
          <textarea required rows={4} placeholder="Deskripsi Mod" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full p-3 bg-black/50 border border-gray-800 rounded-lg text-white" />
          
          <button type="submit" className="w-full py-3 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400">
            PUBLISH MOD
          </button>
        </form>
        {status && <p className="text-center mt-4 text-green-400">{status}</p>}
      </div>
    </div>
  );
}
