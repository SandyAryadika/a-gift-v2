import { useState, useRef, useEffect } from 'react';
import InfiniteMenu from './components/bits/InfiniteMenu';
import TextPressure from './components/bits/TextPressure'; 
import bgm from './assets/song/reallove.mp3'; 

// --- DATA FOTO ---
const items = [
  {
    image: '/photo/1.jpg',
    // link: 'https://spotify.com',
    title: <>Ntah siapa<br />yang ngefoto</>,
    description: 'Inget gak waktu bersih-bersih buat basecamp KKN?'
  },
  {
    image: '/photo/2.jpg',
    // link: 'https://spotify.com',
    title: <>Hydrangea<br />Daisy</>,
    description: 'Bunga pertama yang aku kasih, hehe. Bagus kan.'
  },
  {
    image: '/photo/3.jpg',
    // link: 'https://spotify.com',
    title: 'Lily',
    description: 'Meskipun cuma 1 tapi bikin sendiri.'
  },
  {
    image: '/photo/4.jpg',
    // link: 'https://spotify.com',
    title: 'Spider Lily',
    description: 'Ini bunga susah buatnya miring semua, tapi i try my best.'
  },
  {
    image: '/photo/5.jpg',
    // link: 'https://spotify.com',
    title: <>The Uncertain <br />Bloom</>,
    description: 'Gatau ini kenapa tiba-tiba pengen buat bunga se-gede ini.'
  },
  {
    image: '/photo/6.jpg',
    // link: 'https://spotify.com',
    title: 'Neduh',
    description: 'Lagi mau pulang, eh hujan neduh di Kebun Binatang Surabaya.'
  },
  {
    image: '/photo/7.jpg',
    // link: 'https://spotify.com',
    title: <>White Heath <br />Aster</>,
    description: 'Tiba-tiba ditawarin bunga sama pembeli, yauda coba beli bunga yang hidup.'
  },
  {
    image: '/photo/8.jpg',
    // link: 'https://spotify.com',
    title: <>Journey : <br />Malang Vol.1</>,
    description: '1 minggu sebelum berangkat udah war tiket duluan hahaha.'
  },
  {
    image: '/photo/9.jpg',
    // link: 'https://spotify.com',
    title: <>Museum <br />10 November</>,
    description: 'Karena ada show keren disini, makanya kita samperin.'
  },
  {
    image: '/photo/10.jpg',
    // link: 'https://spotify.com',
    title: <>Museum <br />10 November</>,
    description: 'Inilah shownya, maksudnya yang depan kita ye.'
  },
  {
    image: '/photo/11.jpg',
    // link: 'https://spotify.com',
    title: 'Gacoan',
    description: 'Bingung mau kemana, kita ke gacoan akhirnya.'
  },
  {
    image: '/photo/12.jpg',
    // link: 'https://spotify.com',
    title: <>Mamam<br />Penyetan</>,
    description: 'Harga gajelas boncos 2 kali mamm penyetan.'
  },
  {
    image: '/photo/13.jpg',
    // link: 'https://spotify.com',
    title: <>Jalan-jalan<br />di Alun-alun</>,
    description: 'Mulai dari lihat konser, beli jajan, sampe lihat kembang api.'
  },
  {
    image: '/photo/14.jpg',
    // link: 'https://spotify.com',
    title: 'Sarangan',
    description: 'Kesiangan bangunnya, jadinya cuma sebentar gabisa spend time.'
  },
  {
    image: '/photo/15.jpg',
    // link: 'https://spotify.com',
    title: 'Kembali Djaya',
    description: 'Nyoba karena penasaran dari tiktok bilangnya enak, akhirnya kita samperin dan beneran enak. Ada momen yang tak terduga si haha.'
  },
  {
    image: '/photo/16.jpg',
    // link: 'https://spotify.com',
    title: 'Nailist',
    description: 'Kapan lagi di kutekin sama nailist baru dengan warna merah menyala, kalo kena cahaya si.'
  },
  {
    image: '/photo/17.jpg',
    // link: 'https://spotify.com',
    title: <>Mamam<br />Asinan Cumi</>,
    description: 'Yang satu habis lauk, yang satu habis nasi, haha.'
  },
  {
    image: '/photo/18.jpg',
    // link: 'https://spotify.com',
    title: <>Khodam<br />Surabaya</>,
    description: 'Es teler + sosis keju tapi kejunya ga lumer + coin isi coklat tapi coklatnya ga lumer.'
  },
  {
    image: '/photo/19.jpg',
    // link: 'https://spotify.com',
    title: <>Nonton<br />500 Days<br />of Summer</>,
    description: 'Sedih campur bingung sama alurnya maju mundur .'
  },
  {
    image: '/photo/20.jpg',
    // link: 'https://spotify.com',
    title: <>Ngopi Aja</>,
    description: 'Kapan lagi kopi kenangan kolab sama tahu go, hahaha .'
  },
];

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isReady, setIsReady] = useState(false); // STATE BARU: Untuk Safety Delay
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // --- 1. SAFETY DELAY (JEDA PENGAMAN) ---
  // Mencegah intro ter-skip otomatis saat refresh. 
  // Tombol baru bisa ditekan setelah 2 detik.
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  // --- 2. LOGIKA START ---
  useEffect(() => {
    // Jika belum ready (masih loading/animasi awal), abaikan input
    if (!isReady) return;

    const handleStart = () => {
      if (!hasStarted) {
        setHasStarted(true);
        // Opsional: playMusic(); jika ingin auto-play (tergantung browser)
      }
    };

    window.addEventListener('keydown', handleStart);
    window.addEventListener('click', handleStart);
    window.addEventListener('touchstart', handleStart);

    return () => {
      window.removeEventListener('keydown', handleStart);
      window.removeEventListener('click', handleStart);
      window.removeEventListener('touchstart', handleStart);
    };
  }, [hasStarted, isReady]);

  // --- LOGIKA MUSIK ---
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.5;
  }, []);

  return (
    <div className="w-full h-screen bg-black text-white relative overflow-hidden font-sans">
      
      {/* CSS untuk Animasi Musik Realistis */}
      <style>{`
        @keyframes music-wave {
          0%, 100% { height: 10%; }
          50% { height: 80%; }
        }
        .music-bar {
          animation: music-wave 1s ease-in-out infinite;
        }
      `}</style>

      <audio ref={audioRef} src={bgm} loop />

      {/* LOGIKA TAMPILAN: INTRO vs UTAMA */}
      {!hasStarted ? (
        // --- HALAMAN INTRO (TEXT PRESSURE) ---
        // FIX: Tambahkan padding (p-4) agar teks aman di layar kecil
        <div className={`absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center cursor-pointer p-4 md:p-10 transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
           
           {/* FIX: Hapus div height tetap, biarkan TextPressure mengisi natural */}
           <TextPressure
              text="ALOOOOOO."
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#ffffff"
              strokeColor="#ff0000"
              minFontSize={24} // Ukuran font minimal agar aman di HP
            />

           {/* Instruksi - Muncul hanya jika sudah Ready */}
           <p className={`mt-8 text-white/50 text-sm md:text-base tracking-[0.2em] md:tracking-[0.5em] animate-pulse lowercase font-light text-center transition-opacity duration-500 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
             [ dearest, click anywhere to start ]
           </p>

        </div>
      ) : (
        // --- HALAMAN UTAMA (INFINITE MENU) ---
        <div className="absolute inset-0 z-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          
          <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
            <InfiniteMenu items={items} scale={1} />
          </div>

          {/* Judul Kiri Atas */}
          <div className="absolute top-8 left-8 pointer-events-none z-50 mix-blend-difference">
            <h1 className="text-2xl font-bold tracking-wider lowercase">
              memories? yes.
            </h1>
          </div>

          {/* Tombol Musik Kanan Atas */}
          <div 
            onClick={toggleMusic}
            // Hapus z-50 dari wrapper agar mix-blend-difference teks bekerja
            className="absolute top-8 right-8 cursor-pointer flex items-center gap-3 group"
          >
            <span className="z-50 text-sm font-bold lowercase tracking-widest text-white mix-blend-difference hidden md:block">
              {isPlaying ? 'playing now' : 'play music'}
            </span>

            <button className="z-50 relative flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/50 shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:bg-black/60 hover:scale-105 transition-all duration-300">
                {isPlaying ? (
                  /* Visualizer Animasi */
                  <div className="flex gap-[3px] items-center h-5">
                    <span className="music-bar w-[2px] bg-white rounded-full" style={{ animationDuration: '0.8s' }} />
                    <span className="music-bar w-[2px] bg-white rounded-full" style={{ animationDuration: '0.4s' }} />
                    <span className="music-bar w-[2px] bg-white rounded-full" style={{ animationDuration: '1.1s' }} />
                    <span className="music-bar w-[2px] bg-white rounded-full" style={{ animationDuration: '0.6s' }} />
                  </div>
                ) : (
                  /* Icon Play */
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5 text-white">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  </svg>
                )}
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

export default App;