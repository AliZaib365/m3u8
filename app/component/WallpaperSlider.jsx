'use client';

import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import Hls from 'hls.js';
import 'swiper/css';
import 'swiper/css/navigation';

export default function WallpaperSlider() {
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWallpapers = async () => {
      try {
        const response = await fetch('https://wpqualityapi.appsqueeze.com/api/m3u8');
        if (!response.ok) {
          throw new Error('Failed to fetch wallpapers');
        }
        const data = await response.json();
        
        if (data.success && data.playlists) {
          setWallpapers(data.playlists.map((item, index) => ({
            id: index + 1,
            wallpaper: item.wallpaper,
            url: item.path,
          })));
        } else {
          throw new Error('Invalid API response format');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWallpapers();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-8xl px-4 py-16 bg-gradient-to-b from-gray-900 to-black mx-auto text-center">
        <div className="animate-pulse text-2xl text-purple-400">Loading premium wallpapers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-8xl px-4 py-16 bg-gradient-to-b from-gray-900 to-black mx-auto text-center">
        <div className="text-2xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-8xl px-4 py-16 bg-gradient-to-b from-gray-900 to-black mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-5xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Premium Visuals
        </h2>
        <p className="text-gray-300 text-xl">Immerse yourself in stunning 4K content</p>
      </div>
      
      {wallpapers.length > 0 ? (
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
            const isHls = item.url?.endsWith('.m3u8');

            return (
              <SwiperSlide key={item.id}>
                <div className="mx-auto w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
                  <div className="rounded-2xl overflow-hidden shadow-2xl h-[70vh] bg-black transition-all duration-500 hover:shadow-purple-500/30">
                    <VideoPlayer 
                      src={item.url} 
                      poster={item.poster} 
                      isHls={isHls} 
                      wallpaperName={item.wallpaper}
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
          
          <div className="swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-black/70 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-purple-600 hover:scale-110 backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div className="swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-black/70 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-purple-600 hover:scale-110 backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Swiper>
      ) : (
        <div className="text-center text-gray-400 py-12">
          No wallpapers available at the moment.
        </div>
      )}
      
      <div className="mt-12 text-center">
        <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-500 transform hover:-translate-y-1 text-lg">
          Explore Full Collection
        </button>
      </div>
    </div>
  );
}

function VideoPlayer({ src, poster, isHls, wallpaperName }) {
  const videoRef = useRef(null);
  const [hlsInstance, setHlsInstance] = useState(null);
  const [qualities, setQualities] = useState([]);
  const [currentQuality, setCurrentQuality] = useState('auto');
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    videoRef.current.addEventListener('play', handlePlay);
    videoRef.current.addEventListener('pause', handlePause);

    if (isHls) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        setHlsInstance(hls);

        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
        
        hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
          const levels = data.levels.map((level, index) => ({
            id: index,
            height: level.height,
            width: level.width,
            bitrate: level.bitrate,
            name: `${level.height}p`
          }));
          
          setQualities([
            { id: 'auto', name: 'Auto' },
            ...levels
          ]);
          
          videoRef.current.play().catch(e => console.log('Autoplay prevented:', e));
        });

        return () => {
          hls.destroy();
          videoRef.current?.removeEventListener('play', handlePlay);
          videoRef.current?.removeEventListener('pause', handlePause);
        };
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (Safari)
        videoRef.current.src = src;
        videoRef.current.addEventListener('loadedmetadata', () => {
          videoRef.current.play().catch(e => console.log('Autoplay prevented:', e));
        });
        return () => {
          videoRef.current?.removeEventListener('play', handlePlay);
          videoRef.current?.removeEventListener('pause', handlePause);
        };
      }
    } else {
      videoRef.current.src = src;
      videoRef.current.addEventListener('loadedmetadata', () => {
        videoRef.current.play().catch(e => console.log('Autoplay prevented:', e));
      });
      return () => {
        videoRef.current?.removeEventListener('play', handlePlay);
        videoRef.current?.removeEventListener('pause', handlePause);
      };
    }
  }, [src, isHls]);

  const changeQuality = (levelId) => {
    if (hlsInstance) {
      if (levelId === 'auto') {
        hlsInstance.currentLevel = -1;
      } else {
        hlsInstance.currentLevel = parseInt(levelId);
      }
      setCurrentQuality(levelId);
      setShowQualityMenu(false);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(e => console.log('Play failed:', e));
      }
    }
  };

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
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end justify-between p-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={togglePlayPause}
            className="text-white bg-black/70 p-2 rounded-full backdrop-blur-sm hover:bg-purple-600 transition-colors"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <span className="text-white font-medium text-sm bg-black/70 px-3 py-2 rounded-lg backdrop-blur-sm">
            {wallpaperName || 'Video Wallpaper'}
          </span>
        </div>
        
        {isHls && Hls.isSupported() && qualities.length > 0 && (
          <div className="relative">
            <button 
              onClick={() => setShowQualityMenu(!showQualityMenu)}
              className="text-white font-medium text-sm bg-black/70 px-3 py-2 rounded-lg backdrop-blur-sm hover:bg-black/90 transition-colors flex items-center gap-1"
            >
              <span>Quality: {currentQuality === 'auto' ? 'Auto' : qualities.find(q => q.id === currentQuality)?.name || 'Auto'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showQualityMenu && (
              <div className="absolute bottom-full right-0 mb-2 bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg z-20 min-w-[120px]">
                {qualities.map((quality) => (
                  <button
                    key={quality.id}
                    onClick={() => changeQuality(quality.id)}
                    className={`block w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-600/80 transition-colors ${
                      currentQuality === quality.id ? 'bg-purple-600/80' : ''
                    }`}
                  >
                    {quality.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}