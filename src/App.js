import React, { useState, useRef, useEffect, useMemo } from 'react';
import './App.css';
import shreya2 from './assets/shreya2.jpg';
import shreya8 from './assets/shreya8.jpg';
import shreya9 from './assets/shreya9.jpg';
import shreya14 from './assets/shreya14.jpg';
import shreya15 from './assets/shreya15.jpg';

// Import audio files
import song4 from './music/dil_hi_toh_hai.mp3';
import song5 from './music/are_are_are.mp3';
import song6 from './music/Sapphire.mp3';
import aurMohabbat from './music/aur_mohabbat.mp3';
import oMeriLaila from './music/O_Meri_Laila.mp3';

const songs = [
  {
    title: 'O Meri Laila',
    artist: 'Falling for you more every day.🌹💑',
    image: shreya2,
    audio: oMeriLaila,
  },
  {
    title: 'Mohabbat',
    artist: 'In your arms, I found my home.🏡❤️',
    image: shreya8,
    audio: aurMohabbat,
  },
  {
    title: 'Sapphire',
    artist: 'Just us Always. 🌙',
    image: shreya9,
    audio: song6,
  },
  {
    title: 'Dil',
    artist: 'You\'re the calm in my chaos.🌊🕊️',
    image: shreya14,
    audio: song4,
  },
  {
    title: 'World',
    artist: 'I looked at you and saw the rest of my life.💍💌',
    image: shreya15,
    audio: song5,
  },
];

function mod(n, m) {
  return ((n % m) + m) % m;
}

function App() {
  const [current, setCurrent] = useState(2);
  const [playing, setPlaying] = useState(null);
  const [progress, setProgress] = useState(Array(songs.length).fill(0));
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const [currentTime, setCurrentTime] = useState(Array(songs.length).fill(0));
  const [duration, setDuration] = useState(Array(songs.length).fill(0));
  const intervalRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const [dragging, setDragging] = useState(false);
  const mouseDownX = useRef(null);
  const mouseCurrentX = useRef(null);
  const audioRefs = useRef(Array(songs.length).fill(null).map(() => React.createRef()));
  const progressBarRefs = useRef(Array(songs.length).fill(null).map(() => React.createRef()));

  // Memoize hearts so they don't re-randomize on every render
  const hearts = useMemo(() =>
    [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 10}s`,
      fontSize: `${16 + Math.random() * 24}px`
    })), []
  );

  useEffect(() => {
    if (playing !== null && !isDraggingProgress) {
      const audio = audioRefs.current[playing]?.current;
      if (audio) {
        audio.play();
        intervalRef.current = setInterval(() => {
          if (audio.ended) {
            setPlaying(null);
            setProgress((prev) => {
              const next = [...prev];
              next[playing] = 0;
              return next;
            });
            setCurrentTime((prev) => {
              const next = [...prev];
              next[playing] = 0;
              return next;
            });
          } else {
            setProgress((prev) => {
              const next = [...prev];
              next[playing] = (audio.currentTime / audio.duration) * 100;
              return next;
            });
            setCurrentTime((prev) => {
              const next = [...prev];
              next[playing] = audio.currentTime;
              return next;
            });
          }
        }, 100);
      }
    } else {
      // Stop all audio when not playing
      audioRefs.current.forEach((audioRef) => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      });
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [playing, isDraggingProgress]);

  const handlePlayPause = (idx) => {
    if (playing === idx) {
      setPlaying(null);
    } else {
      // Stop any currently playing audio
      if (playing !== null) {
        const currentAudio = audioRefs.current[playing]?.current;
        if (currentAudio) {
          currentAudio.pause();
        }
      }
      setPlaying(idx);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (idx, e) => {
    const progressBar = progressBarRefs.current[idx]?.current;
    if (!progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = (clickX / width) * 100;
    const audio = audioRefs.current[idx]?.current;
    
    if (audio && audio.duration) {
      const newTime = (percentage / 100) * audio.duration;
      audio.currentTime = newTime;
      setProgress((prev) => {
        const next = [...prev];
        next[idx] = percentage;
        return next;
      });
      setCurrentTime((prev) => {
        const next = [...prev];
        next[idx] = newTime;
        return next;
      });
    }
  };

  const handleProgressDragStart = (idx) => {
    setIsDraggingProgress(true);
  };

  const handleProgressDrag = (idx, e) => {
    if (!isDraggingProgress) return;
    
    const progressBar = progressBarRefs.current[idx]?.current;
    if (!progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (clickX / rect.width) * 100;
    const audio = audioRefs.current[idx]?.current;
    
    if (audio && audio.duration) {
      const newTime = (percentage / 100) * audio.duration;
      audio.currentTime = newTime;
      setProgress((prev) => {
        const next = [...prev];
        next[idx] = percentage;
        return next;
      });
      setCurrentTime((prev) => {
        const next = [...prev];
        next[idx] = newTime;
        return next;
      });
    }
  };

  const handleProgressDragEnd = () => {
    setIsDraggingProgress(false);
  };

  // Infinite loop carousel
  const handlePrev = () => setCurrent((c) => mod(c - 1, songs.length));
  const handleNext = () => setCurrent((c) => mod(c + 1, songs.length));

  // Touch swipe handlers
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const dx = touchEndX.current - touchStartX.current;
      if (Math.abs(dx) > 50) {
        if (dx < 0) handleNext();
        else handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Mouse drag swipe handlers
  const onMouseDown = (e) => {
    mouseDownX.current = e.clientX;
    mouseCurrentX.current = e.clientX;
    setDragging(true);
  };
  const onMouseMove = (e) => {
    if (!dragging) return;
    mouseCurrentX.current = e.clientX;
  };
  const onMouseUp = (e) => {
    if (!dragging) return;
    const dx = mouseCurrentX.current - mouseDownX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) handleNext();
      else handlePrev();
    }
    setDragging(false);
    mouseDownX.current = null;
    mouseCurrentX.current = null;
  };
  const onMouseLeave = () => {
    setDragging(false);
    mouseDownX.current = null;
    mouseCurrentX.current = null;
  };

  return (
    <>
      <div className="romantic-bg"></div>
      <div className="falling-hearts">
        {hearts.map((style, i) => (
          <span key={i} className="heart" style={style}>💖</span>
        ))}
      </div>
      <div className="animated-bg" />
      <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-softwhite font-romantic">
        {/* Animated dreamy blobs and sparkles */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          {/* Blobs */}
          <div className="absolute w-[32rem] h-[32rem] bg-blush opacity-60 rounded-full mix-blend-multiply blur-3xl animate-blob left-[-10%] top-[-10%] animation-delay-0 animate-float" />
          <div className="absolute w-[28rem] h-[28rem] bg-lavender opacity-60 rounded-full mix-blend-multiply blur-2xl animate-blob left-[60%] top-[10%] animation-delay-2000 animate-float" />
          <div className="absolute w-[24rem] h-[24rem] bg-plum opacity-40 rounded-full mix-blend-multiply blur-2xl animate-blob left-[30%] top-[60%] animation-delay-4000 animate-float" />
          {/* Extra blobs for more depth */}
          <div className="absolute w-[18rem] h-[18rem] bg-blush opacity-30 rounded-full mix-blend-multiply blur-2xl animate-blob left-[80%] top-[70%] animation-delay-1000 animate-float" />
          <div className="absolute w-[20rem] h-[20rem] bg-lavender opacity-30 rounded-full mix-blend-multiply blur-2xl animate-blob left-[-8%] top-[70%] animation-delay-3000 animate-float" />
          <div className="absolute w-[14rem] h-[14rem] bg-plum opacity-20 rounded-full mix-blend-multiply blur-2xl animate-blob left-[50%] top-[-8%] animation-delay-1500 animate-float" />
          {/* Shimmer overlay */}
          <div className="absolute inset-0 pointer-events-none animate-shimmer z-10" style={{opacity:0.12}} />
          {/* Sparkles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute sparkle`}
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                zIndex: 20,
              }}
            />
          ))}
        </div>
        {/* Floating hearts and sparkles */}
        {[
          { left: '10%', delay: '0s', type: 'heart' },
          { left: '30%', delay: '2s', type: 'sparkle' },
          { left: '50%', delay: '4s', type: 'heart' },
          { left: '70%', delay: '1s', type: 'sparkle' },
          { left: '85%', delay: '3s', type: 'heart' },
        ].map((item, i) => (
          <span
            key={i}
            className={item.type === 'heart' ? 'floating-heart' : 'floating-sparkle'}
            style={{ left: item.left, animationDelay: item.delay }}
          >
            {item.type === 'heart' ? '❤' : '✦'}
          </span>
        ))}
        {/* Carousel */}
        <div className="relative flex flex-col items-center w-full max-w-2xl px-1 sm:px-4">
          <div
            className="relative w-full max-w-[520px] aspect-[3/4] flex items-center justify-center select-none"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            style={{ cursor: dragging ? 'grabbing' : 'grab' }}
          >
            {songs.map((song, idx) => {
              // Infinite loop offset
              let offset = idx - current;
              if (offset < -2) offset += songs.length;
              if (offset > 2) offset -= songs.length;
              const isActive = idx === current;
              const isPlaying = playing === idx;
              return (
                <div
                  key={song.title}
                  className={`absolute transition-all duration-500 ease-in-out cursor-pointer select-none cursor-pulse ${
                    isActive
                      ? 'z-20 scale-100 translate-x-0 shadow-glow'
                      : offset === -1
                      ? 'z-10 scale-90 -translate-x-32 sm:-translate-x-56 opacity-80'
                      : offset === 1
                      ? 'z-10 scale-90 translate-x-32 sm:translate-x-56 opacity-80'
                      : 'z-0 scale-75 opacity-0 pointer-events-none'
                  } ${isPlaying ? 'ring-4 ring-blush animate-pulseGlow' : ''}`}
                  style={{
                    top: 0,
                    left: 0,
                    right: 0,
                    margin: 'auto',
                  }}
                  onClick={() => setCurrent(idx)}
                >
                  <div className={`bg-white/80 flex flex-col items-center backdrop-blur-sm w-[98vw] max-w-[520px] min-w-[220px] aspect-[3/4] overflow-hidden justify-between p-0 transition-all duration-500 ${isPlaying ? 'scale-105 ring-4 ring-blush/30 rounded-[2.5rem]' : ''}`}>
                    <div className="flex-1 w-full h-0 flex items-center justify-center pt-4 pb-2 px-4">
                      <div className={`w-full h-full aspect-[4/3] sm:aspect-[4/3] overflow-hidden transition-all duration-700 ${isPlaying ? 'scale-105 rounded-t-2xl' : 'scale-100'}`}
                        style={{ borderRadius: isPlaying ? '1.25rem 1.25rem 1rem 1rem' : '0' }}>
                        <img
                          src={song.image}
                          alt={song.title}
                          className={`w-full h-full object-cover object-center transition-all duration-500 ${isPlaying ? 'scale-110' : 'scale-100'}`}
                          style={{ aspectRatio: '4/3', display: 'block', borderRadius: isPlaying ? '1.25rem 1.25rem 1rem 1rem' : '0' }}
                        />
                      </div>
                    </div>
                    <div className={`w-full flex flex-col items-center justify-end px-4 sm:px-8 pb-6 pt-2 bg-white/80 transition-all duration-500 ${isPlaying ? 'rounded-b-[2.5rem]' : ''}`} style={{ minHeight: '18%' }}>
                      <div className={`text-2xl sm:text-4xl font-romantic text-plum mb-1 text-center break-words transition-all duration-300 ${isPlaying ? 'text-blush scale-105' : ''}`}>{song.title}</div>
                      <div className="text-base sm:text-2xl font-romantic text-blush mb-2 text-center break-words">{song.artist}</div>
                      <button
                        className={`w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center rounded-full border-2 border-blush bg-white/70 shadow transition-all duration-300 hover:scale-110 focus:outline-none cursor-pulse relative ${isPlaying ? 'ring-4 ring-blush scale-110 bg-blush/10 animate-pulseGlow' : 'hover:bg-blush/10'}`}
                        onClick={(e) => { e.stopPropagation(); handlePlayPause(idx); }}
                      >
                        {isPlaying ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-10 sm:w-10 text-blush" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="6" y="5" width="4" height="14" rx="2"/><rect x="14" y="5" width="4" height="14" rx="2"/></svg>
                            {/* Floating music notes */}
                            <div className="absolute -top-2 -right-2 text-blush text-xs music-note" style={{animationDelay: '0s'}}>♪</div>
                            <div className="absolute -top-4 -left-1 text-blush text-xs music-note" style={{animationDelay: '0.5s'}}>♫</div>
                            <div className="absolute -bottom-2 -right-4 text-blush text-xs music-note" style={{animationDelay: '1s'}}>♪</div>
                          </>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-10 sm:w-10 text-blush" fill="none" viewBox="0 0 24 24" stroke="currentColor"><polygon points="6,4 20,12 6,20" /></svg>
                        )}
                      </button>
                      
                      {/* Time Display */}
                      <div className="w-full flex justify-between items-center mt-2 text-xs sm:text-sm text-plum/70 font-medium">
                        <span>{formatTime(currentTime[idx])}</span>
                        <span>{formatTime(duration[idx])}</span>
                      </div>
                      
                      {/* Interactive Progress Bar */}
                      <div className="w-full mt-2 sm:mt-3 relative">
                        {/* Sound wave animation above progress bar when playing */}
                        {isPlaying && (
                          <div className="soundwave-bars flex items-end justify-center absolute left-0 right-0 -top-8 h-6 w-full z-10 pointer-events-none">
                            {[...Array(12)].map((_, bidx) => (
                              <div
                                key={bidx}
                                className={`soundwave-bar bg-blush/70`}
                                style={{
                                  animationDelay: `${bidx * 0.12}s`,
                                }}
                              />
                            ))}
                          </div>
                        )}
                        <div 
                          ref={progressBarRefs.current[idx]}
                          className="h-2 sm:h-3 rounded-full bg-lavender/40 overflow-hidden cursor-pointer relative group"
                          onClick={(e) => handleProgressClick(idx, e)}
                          onMouseDown={(e) => handleProgressDragStart(idx)}
                          onMouseMove={(e) => handleProgressDrag(idx, e)}
                          onMouseUp={handleProgressDragEnd}
                          onMouseLeave={handleProgressDragEnd}
                        >
                          <div
                            className={`h-2 sm:h-3 rounded-full bg-gradient-to-r from-blush to-plum transition-all duration-100 relative ${isPlaying ? 'animate-pulse' : ''}`}
                            style={{ width: `${progress[idx]}%` }}
                          >
                            {/* Progress Handle */}
                            <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full shadow-lg border-2 border-blush opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isPlaying ? 'opacity-100' : ''}`} />
                          </div>
                          {/* Hover effect */}
                          <div className="absolute inset-0 bg-blush/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Audio elements */}
        {songs.map((song, idx) => (
          <audio
            key={`audio-${idx}`}
            ref={audioRefs.current[idx]}
            src={song.audio}
            preload="metadata"
            onLoadedMetadata={() => {
              const audio = audioRefs.current[idx]?.current;
              if (audio) {
                setDuration((prev) => {
                  const next = [...prev];
                  next[idx] = audio.duration;
                  return next;
                });
              }
            }}
            onEnded={() => {
              if (playing === idx) {
                setPlaying(null);
                setProgress((prev) => {
                  const next = [...prev];
                  next[idx] = 0;
                  return next;
                });
                setCurrentTime((prev) => {
                  const next = [...prev];
                  next[idx] = 0;
                  return next;
                });
              }
            }}
          />
        ))}
        
        {/* Custom cursor will be injected here */}
        <div id="custom-cursor-root"></div>
      </div>
    </>
  );
}

export default App;
