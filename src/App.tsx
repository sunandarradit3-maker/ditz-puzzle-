import { motion } from 'motion/react';
import PuzzleGrid from './components/PuzzleGrid';
import { Gamepad2, ShoppingBag, Github, Twitter } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen glow-bg selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-slate-900/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Gamepad2 className="text-white" size={24} />
            </div>
            <span className="text-xl font-black italic tracking-tighter uppercase">
              DiTz<span className="text-blue-500">Store</span>
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Beranda</a>
            <a href="#" className="hover:text-white transition-colors">Games</a>
            <a href="#" className="hover:text-white transition-colors">Produk</a>
            <a href="#" className="hover:text-white transition-colors">Tentang</a>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-white text-slate-950 px-5 py-2 rounded-full text-sm font-bold shadow-xl shadow-white/5"
          >
            <ShoppingBag size={16} />
            <span>Belanja</span>
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-none">
              PUZZLE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">CHALLENGE</span>
            </h1>
            <p className="max-w-2xl text-slate-400 text-lg md:text-xl font-light">
              Tantang dirimu dengan puzzle eksklusif dari DiTz Store. 
              Selesaikan secepat mungkin dan buktikan kehebatanmu!
            </p>
          </motion.div>
        </div>

        {/* Game Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <PuzzleGrid />
        </motion.div>

        {/* Features / Branding */}
        <div className="grid md:grid-cols-3 gap-8 mt-32">
          {[
            { title: "Koleksi Terbatas", desc: "Dapatkan akses ke puzzle dengan gambar produk terbaru dari kami.", icon: Gamepad2 },
            { title: "Global Ranking", desc: "Bandingkan skor lkamu dengan pelanggan setia DiTz Store lainnya.", icon: Github },
            { title: "Hadiah Menarik", desc: "Selesaikan puzzle harian untuk kupon diskon belanja di toko kami.", icon: Github },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-blue-500/20 transition-colors group"
            >
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                <item.icon className="text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
             <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Gamepad2 className="text-white" size={18} />
              </div>
              <span className="text-lg font-black italic tracking-tighter uppercase">
                DiTz<span className="text-blue-500">Store</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm">© 2026 DiTz Store. Seluruh hak cipta dilindungi.</p>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github size={20} /></a>
          </div>

          <div className="flex gap-8 text-sm text-slate-400 font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

