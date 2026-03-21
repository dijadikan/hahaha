import { supabase } from '@/lib/supabase';
import Link from 'next/link';

// Paksa render dinamis agar data selalu baru
export const revalidate = 0;

export default async function Home() {
  // Ambil data dengan aman (jika gagal, kembalikan array kosong)
  const { data: mods, error } = await supabase
    .from('mods')
    .select('*')
    .order('created_at', { ascending: false });

  const safeMods = mods || [];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 border-b border-green-900/50 bg-black/40 backdrop-blur-md">
        <div className="font-bold text-2xl tracking-widest flex items-center gap-2">
          EXRY <span className="text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">HUB</span>
        </div>
        <Link href="/api/auth/signin" className="px-5 py-2 rounded-lg bg-[#111] border border-green-500/30 hover:border-green-500 transition-all text-sm font-semibold">
          Login
        </Link>
      </nav>

      {/* Hero */}
      <header className="py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-4">
          GUDANG <span className="text-green-500">MODIFIKASI</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto mb-8">
          Koleksi eksklusif skrip Lua, Monetloader, dan utilitas komunitas.
        </p>
      </header>

      {/* Grid Katalog */}
      <main className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {safeMods.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">Belum ada mod yang diupload.</p>
        ) : (
          safeMods.map((mod) => (
            <div key={mod.id} className="bg-[#0a0a0a] border border-gray-800 rounded-xl overflow-hidden hover:border-green-500/50 transition-all duration-300">
              <div className="h-32 bg-gray-900 p-4 border-b border-gray-800 flex items-start">
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20 uppercase">
                  {mod.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">{mod.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{mod.description}</p>
                <a href={mod.download_url} target="_blank" rel="noreferrer" className="block w-full text-center py-2.5 rounded-lg bg-green-500 text-black font-bold text-sm hover:bg-green-400">
                  DOWNLOAD
                </a>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
