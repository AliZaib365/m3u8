'use client';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import Hls from 'hls.js';
import 'swiper/css';
import 'swiper/css/navigation';

// 👇 Refreshing image when in view
function LazyRefreshImage({ src, alt, className }) {
  const imgRef = useRef(null);
  const [uniqueSrc, setUniqueSrc] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setUniqueSrc(`${src}?t=${Date.now()}`);
        }
      },
      { threshold: 0.5 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={uniqueSrc}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
}

const wallpapers = [ {
  id: 1,
  url: 'https://wpqualityapi.appsqueeze.com/assets/m3u8/liveWallpaper1735213894/master.m3u8',
},
{
  id: 2,
  url: 'https://wpqualityapi.appsqueeze.com/assets/m3u8/liveWallpaper1735214300/master.m3u8',
},
{
  id: 3,
  url: 'https://wpqualityapi.appsqueeze.com/assets/m3u8/liveWallpaper1735214433/master.m3u8',
},
{
  id: 4,
  url: 'https://wpqualityapi.appsqueeze.com/assets/m3u8/liveWallpaper1735214523/master.m3u8',
},
{
  id: 5,
  url: 'https://wpqualityapi.appsqueeze.com/assets/m3u8/liveWallpaper1735214576/master.m3u8',
},
{
  id: 6,
  url: 'https://wpqualityapi.appsqueeze.com/assets/m3u8/liveWallpaper1735215200/master.m3u8',
},
{
  id: 7,
  url: 'https://wpqualityapi.appsqueeze.com/assets/m3u8/liveWallpaper1735215665/master.m3u8',
},
{
  id: 8,
  url: 'https://wpqualityapi.appsqueeze.com/assets/m3u8/liveWallpaper1735218758/master.m3u8',
},
{
  id: 9,
  url: 'https://wpqualityapi.appsqueeze.com/assets/m3u8/liveWallpaper1735218786/master.m3u8',
},
{
  id: 10,
  url: 'https://wpqualityapi.appsqueeze.com/assets/m3u8/liveWallpaper1735218811/master.m3u8',
},
{
  id: 11,
  url: 'https://wpqualityapi.appsqueeze.com/assets/m3u8/liveWallpaper1735218839/master.m3u8',
},
{
  id: 12,
  url: 'https://wpqualityapi.appsqueeze.com/assets/m3u8/liveWallpaper1735218862/master.m3u8',
},
{
  id: 13,
  url: 'https://wpqualityapi.appsqueeze.com/assets/m3u8/liveWallpaper1735218878/master.m3u8',
},
{
  id: 14,
  url: 'https://wpqualityapi.appsqueeze.com/assets/m3u8/liveWallpaper1735218971/master.m3u8',
},
{
  id: 15,
  url: 'https://wpqualityapi.appsqueeze.com/assets/m3u8/liveWallpaper1735218995/master.m3u8',
},
{
  id: 16,
  url: 'https://wpqualityapi.appsqueeze.com/assets/m3u8/liveWallpaper1735219049/master.m3u8',
},];

export default function WallpaperSlider() {
  return (
    <div className="w-full max-w-8xl px-4 py-16 bg-gradient-to-b from-gray-900 to-black mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-5xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Premium Visuals
        </h2>
        <p className="text-gray-300 text-xl">Immerse yourself in stunning 4K content</p>
      </div>
      <Swiper
        modules={[Autoplay, Navigation]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        spaceBetween={0}
        slidesPerView={1}
        className="relative group"
      >
        {wallpapers.map((item) => {
          const isVideo = item.url.endsWith('.mp4') || item.url.endsWith('.m3u8');
          const isHls = item.url.endsWith('.m3u8');
          return (
            <SwiperSlide key={item.id}>
              <div className="mx-auto w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
                <div className="rounded-2xl overflow-hidden shadow-2xl h-[70vh] bg-black transition-all duration-500 hover:shadow-purple-500/30">
                  {isVideo ? (
                    <VideoPlayer src={item.url} poster={item.poster} isHls={isHls} />
                  ) : (
                    <div className="relative w-full h-full">
                      <LazyRefreshImage
                        src={item.url}
                        alt={`Wallpaper ${item.id}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <span className="text-white font-medium text-sm bg-black/70 px-3 py-2 rounded-lg backdrop-blur-sm">
                          🖼️ 8K Image
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        <div className="swiper-button-prev ..."> {/* unchanged */} </div>
        <div className="swiper-button-next ..."> {/* unchanged */} </div>
      </Swiper>
      <div className="mt-12 text-center">
        <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-500 transform hover:-translate-y-1 text-lg">
          Explore Full Collection
        </button>
      </div>
    </div>
  );
}

function VideoPlayer({ src, poster, isHls }) {
  const videoRef = useRef(null);
  useEffect(() => {
    if (isHls && videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
        return () => {
          hls.destroy();
        };
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = src;
      }
    }
  }, [src, isHls]);
  return (
    <div className="relative w-full h-full overflow-hidden">
      <video
        ref={videoRef}
        src={!isHls ? src : undefined}
        poster={poster}
        className="w-full h-full object-contain"
        muted
        autoPlay
        loop
        playsInline
        controls={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
        <span className="text-white font-medium text-sm bg-black/70 px-3 py-2 rounded-lg backdrop-blur-sm">
          ▶️ {isHls ? 'm3u8 Video Wallpaper' : 'mp4 Video Wallpaper'}
        </span>
      </div>
    </div>
  );
}
