"use client"
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
      setStatus('Gagal upload: ' + error.message);
    } else {
      setStatus('Mod berhasil dipublikasikan!');
      setFormData({ title: '', desc: '', cat: 'cleo', link: '' }); // Reset form
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 flex items-center justify-center">
      <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-green-500/30 shadow-[0_0_40px_rgba(34,197,94,0.1)] w-full max-w-xl backdrop-blur-xl">
        <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
          EXRY COMMAND CENTER
        </h2>
        <p className="text-gray-500 mb-8 text-sm">Upload rilis skrip terbaru ke database.</p>
        
        <form onSubmit={handleUpload} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Nama Mod/Skrip</label>
            <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 bg-black/50 border border-gray-800 rounded-lg focus:outline-none focus:border-green-500 transition-colors" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Kategori</label>
            <select value={formData.cat} onChange={e => setFormData({...formData, cat: e.target.value})} className="w-full p-3 bg-black/50 border border-gray-800 rounded-lg focus:outline-none focus:border-green-500 text-white">
              <option value="cleo">Cleo Script</option>
              <option value="monetloader">Monetloader</option>
              <option value="modpack">Modpack</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Link Download / Folder (Mediafire/Drive/Github)</label>
            <input required type="url" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full p-3 bg-black/50 border border-gray-800 rounded-lg focus:outline-none focus:border-green-500" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Deskripsi & Instruksi</label>
            <textarea required rows={4} value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full p-3 bg-black/50 border border-gray-800 rounded-lg focus:outline-none focus:border-green-500" />
          </div>
          
          <button type="submit" className="w-full py-4 bg-green-500 hover:bg-green-400 text-black font-black rounded-lg mt-4 transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]">
            PUBLISH SEKARANG
          </button>

          {status && <p className="text-center text-sm font-bold text-green-400 mt-4">{status}</p>}
        </form>
      </div>
    </div>
  );
}
