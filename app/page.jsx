import Navbar from './component/Navbar';
import Footer from './component/Footer';
import WallpaperSlider from './component/WallpaperSlider';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050505]">
      <Navbar />
      <main className="flex-1 py-16 px-4 sm:px-8">
        <div className="max-w-8xl mx-auto">
          <div className="mb-20 text-center">
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-[#aaa] mb-6">
              WALLPAPER STUDIO
            </h1>
            <p className="text-xl text-[#999] max-w-3xl mx-auto font-light">
              Curated collection of premium 4K+ visuals
            </p>
          </div>
          <WallpaperSlider />
        </div>
      </main>
      <Footer />
    </div>
  );
}