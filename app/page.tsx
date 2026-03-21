import { supabase } from '@/lib/supabase';
import Link from 'next/link';

// Fungsi untuk mengambil data mod dari database
async function getMods() {
  const { data: mods } = await supabase.from('mods').select('*').order('created_at', { ascending: false });
  return mods || [];
}

export default async function Home() {
  const mods = await getMods();

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-green-500 selection:text-black">
      {/* Header Nav */}
      <nav className="flex items-center justify-between p-6 border-b border-green-900/50 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="font-bold text-2xl tracking-widest flex items-center gap-2">
          EXRY <span className="text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">HUB</span>
        </div>
        <div className="flex gap-4">
          <Link href="/api/auth/signin" className="px-5 py-2 rounded-lg bg-[#111] border border-green-500/30 hover:border-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all text-sm font-semibold">
            Login Member
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-20 px-4 text-center bg-[url('/grid-pattern.svg')]">
        <h1 className="text-4xl md:text-6xl font-black mb-4">
          GUDANG <span className="text-green-500">MODIFIKASI</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto mb-8">
          Koleksi eksklusif skrip Lua, Monetloader, dan utilitas untuk Tatang Community.
        </p>
      </header>

      {/* Grid Katalog */}
      <main className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mods.map((mod) => (
          <div key={mod.id} className="group bg-[#0a0a0a] border border-gray-800 rounded-xl overflow-hidden hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] transition-all duration-300">
            {/* Thumbnail Area */}
            <div className="h-48 bg-gradient-to-br from-gray-900 to-black relative p-4 flex flex-col justify-between border-b border-gray-800">
              <span className="self-start text-[10px] font-bold px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20 uppercase tracking-wider">
                {mod.category}
              </span>
            </div>
            {/* Info Area */}
            <div className="p-5">
              <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">{mod.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-2 mb-4">{mod.description}</p>
              <a href={mod.download_url} target="_blank" rel="noreferrer" className="block w-full text-center py-2.5 rounded-lg bg-green-500 text-black font-bold text-sm hover:bg-green-400 transition-colors">
                DOWNLOAD
              </a>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
