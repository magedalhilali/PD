import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { fetchSheetData } from './services/sheetService';
import { DepartmentData, Language, ThemeConfig } from './types';
import DepartmentCard from './components/DepartmentCard';
import NameModal from './components/NameModal';
import ThemeModal from './components/ThemeModal';
import DepartmentModal from './components/DepartmentModal';
import { LayoutDashboard, RefreshCcw, AlertCircle, ArrowUpDown, Globe, Pencil, Palette, Moon, Sun } from 'lucide-react';
import { AUTO_REFRESH_INTERVAL, TRANSLATIONS, THEMES, BANNER_PATTERNS, APP_LOGO } from './constants';

const App: React.FC = () => {
  const [data, setData] = useState<DepartmentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [sortBy, setSortBy] = useState<string>('default');
  
  // Language State - Persisted in LocalStorage
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('deptTrack_language') as Language) || 'en';
  });

  // Default to Light Mode
  const [darkMode, setDarkMode] = useState<boolean>(false);
  
  // User Personalization State
  // Initialize from LocalStorage lazily to enable 'Sequence' animation mode on refresh
  const [userName, setUserName] = useState<string>(() => localStorage.getItem('deptTrack_userName') || '');
  const [isNameModalOpen, setIsNameModalOpen] = useState<boolean>(() => !localStorage.getItem('deptTrack_userName'));
  
  // Animation Mode: 'sequence' (page load), 'update' (name change), or 'none'
  const [animationMode, setAnimationMode] = useState<'sequence' | 'update' | 'none'>(() => 
    localStorage.getItem('deptTrack_userName') ? 'sequence' : 'none'
  );
  
  // Theme State - Default to 'slate' (Midnight) and 'grid' pattern
  const [currentThemeId, setCurrentThemeId] = useState<string>('slate');
  const [currentCardStyle, setCurrentCardStyle] = useState<string>('modern');
  const [currentBannerPattern, setCurrentBannerPattern] = useState<string>('grid');
  const [customThemeImage, setCustomThemeImage] = useState<string | null>(null);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState<boolean>(false);

  // Selected Department for Modal
  const [selectedDept, setSelectedDept] = useState<DepartmentData | null>(null);

  const t = TRANSLATIONS[language];
  const isRTL = language === 'ar';

  // Check LocalStorage on mount (Themes & Config only, Name is handled in state init)
  useEffect(() => {
    const savedTheme = localStorage.getItem('deptTrack_theme');
    const savedCardStyle = localStorage.getItem('deptTrack_cardStyle');
    const savedBannerPattern = localStorage.getItem('deptTrack_bannerPattern');
    const savedCustomImage = localStorage.getItem('deptTrack_customThemeImage');
    const savedDarkMode = localStorage.getItem('deptTrack_darkMode');
    
    if (savedCustomImage) {
      setCustomThemeImage(savedCustomImage);
    }

    if (savedTheme) {
      if (savedTheme === 'custom' && savedCustomImage) {
        setCurrentThemeId('custom');
      } else if (THEMES.some(th => th.id === savedTheme)) {
        setCurrentThemeId(savedTheme);
      }
    }

    if (savedCardStyle) {
      setCurrentCardStyle(savedCardStyle);
    }

    if (savedBannerPattern) {
        setCurrentBannerPattern(savedBannerPattern);
    }

    // Default to light mode (false) if no preference is saved
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === 'true');
    } else {
      setDarkMode(false);
    }
  }, []);

  // Update HTML class for dark mode
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
      localStorage.setItem('deptTrack_darkMode', 'true');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('deptTrack_darkMode', 'false');
    }
  }, [darkMode]);

  const handleSaveName = (name: string) => {
    localStorage.setItem('deptTrack_userName', name);
    setUserName(name);
    setAnimationMode('update'); // Triggers the slow blur reveal for name only
    setIsNameModalOpen(false);
  };

  const handleSaveTheme = (themeId: string) => {
    localStorage.setItem('deptTrack_theme', themeId);
    setCurrentThemeId(themeId);
  };

  const handleSaveCardStyle = (styleId: string) => {
    localStorage.setItem('deptTrack_cardStyle', styleId);
    setCurrentCardStyle(styleId);
  };

  const handleSaveBannerPattern = (patternId: string) => {
    localStorage.setItem('deptTrack_bannerPattern', patternId);
    setCurrentBannerPattern(patternId);
  }

  const handleCustomImageUpload = (imageData: string) => {
    try {
      localStorage.setItem('deptTrack_customThemeImage', imageData);
      localStorage.setItem('deptTrack_theme', 'custom');
      setCustomThemeImage(imageData);
      setCurrentThemeId('custom');
    } catch (e) {
      alert("Image is too large to save. Please try a smaller image.");
      console.error("Storage failed", e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => {
      const newLang = prev === 'en' ? 'ar' : 'en';
      localStorage.setItem('deptTrack_language', newLang);
      return newLang;
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchSheetData();
      setData(result);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Auto-refresh interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchSheetData().then((result) => {
        setData(result);
        setLastUpdated(new Date());
        setError(null);
      }).catch(e => console.error("Auto-refresh failed", e));
    }, AUTO_REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  // Sorting Logic
  const sortedData = useMemo(() => {
    const sorted = [...data];
    switch (sortBy) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'score-desc':
        return sorted.sort((a, b) => b.totalScore - a.totalScore);
      case 'score-asc':
        return sorted.sort((a, b) => a.totalScore - b.totalScore);
      default:
        return sorted;
    }
  }, [data, sortBy]);

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t.goodMorning;
    if (hour < 18) return t.goodAfternoon;
    return t.goodEvening;
  };

  // Theme Logic
  const currentTheme = useMemo(() => {
    if (currentThemeId === 'custom' && customThemeImage) {
      return { 
        id: 'custom', 
        type: 'image', 
        value: customThemeImage, 
        label: t.custom,
        colors: THEMES[0].colors // Fallback to default colors for custom images
      } as ThemeConfig;
    }
    return THEMES.find(t => t.id === currentThemeId) || THEMES[0];
  }, [currentThemeId, customThemeImage, t.custom]);

  // Banner Pattern Logic
  const bannerPattern = useMemo(() => {
    return BANNER_PATTERNS.find(p => p.id === currentBannerPattern) || BANNER_PATTERNS[0];
  }, [currentBannerPattern]);

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'} 
      className={`min-h-screen flex flex-col transition-all duration-300 ${isRTL ? 'font-arabic' : 'font-sans'}`}
    >
      <style>{`
        @keyframes blurReveal {
          0% {
            filter: blur(20px);
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            filter: blur(0);
            opacity: 1;
            transform: scale(1);
          }
        }
        /* Helper classes for the animation sequence */
        .anim-seq-1 { animation: blurReveal 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
        .anim-seq-2 { animation: blurReveal 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.6s forwards; opacity: 0; }
        .anim-seq-3 { animation: blurReveal 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 1.2s forwards; opacity: 0; }
        
        .anim-update-slow { 
          animation: blurReveal 2.5s ease-out forwards; 
          opacity: 0; /* Start invisible to prevent flash before animation kick-in */
        }
      `}</style>

      {/* Modals */}
      <NameModal 
        isOpen={isNameModalOpen} 
        onSave={handleSaveName} 
        currentName={userName}
        t={t}
        onClose={userName ? () => setIsNameModalOpen(false) : undefined}
        onToggleLanguage={toggleLanguage}
        language={language}
        theme={currentTheme}
      />

      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentThemeId={currentThemeId}
        currentCardStyle={currentCardStyle}
        currentBannerPattern={currentBannerPattern}
        onSelectTheme={handleSaveTheme}
        onSelectCardStyle={handleSaveCardStyle}
        onSelectBannerPattern={handleSaveBannerPattern}
        onCustomImageUpload={handleCustomImageUpload}
        customThemeImage={customThemeImage}
        t={t}
      />

      <DepartmentModal 
        isOpen={!!selectedDept}
        onClose={() => setSelectedDept(null)}
        data={selectedDept}
        t={t}
        theme={currentTheme}
      />

      {/* Dashboard Container */}
      <div className="flex flex-col flex-grow">

        {/* Header - Glassmorphism */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60 shadow-sm transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {APP_LOGO ? (
                  <img 
                    src={APP_LOGO} 
                    alt="App Logo" 
                    className="w-10 h-10 object-contain rounded-xl shadow-sm bg-white/50 backdrop-blur-sm hidden sm:block" 
                  />
              ) : (
                  <div className={`p-2 bg-gradient-to-br ${currentTheme.type === 'gradient' ? currentTheme.value : 'from-indigo-600 to-violet-600'} rounded-xl shadow-md hidden sm:block transform hover:rotate-6 transition-transform`}>
                     <LayoutDashboard className="text-white" size={22} />
                  </div>
              )}
              <div>
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">{t.title}</h1>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block tracking-wide">
                  {t.subtitle} 
                  {language === 'en' && (
                    <span className={`ml-1 font-bold ${currentTheme.type === 'image' ? 'text-indigo-600 dark:text-indigo-400' : currentTheme.colors.text}`}>
                      (MG Tools)
                    </span>
                  )}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="flex items-center justify-center p-2 rounded-lg bg-slate-100/50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

               {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100/50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-medium transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                title="Switch Language"
              >
                <Globe size={16} />
                <span className="hidden sm:inline">{language === 'en' ? 'عربي' : 'English'}</span>
              </button>

              {/* Sort Dropdown */}
              <div className="relative group">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`appearance-none bg-slate-100/50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-28 sm:w-48 py-2 ${isRTL ? 'ps-3 pe-8' : 'pl-3 pr-8'} cursor-pointer outline-none transition-all font-medium`}
                >
                  <option value="default">{t.sortDefault}</option>
                  <option value="score-desc">{t.sortScoreDesc}</option>
                  <option value="score-asc">{t.sortScoreAsc}</option>
                  <option value="name-asc">{t.sortNameAsc}</option>
                  <option value="name-desc">{t.sortNameDesc}</option>
                </select>
                <div className={`pointer-events-none absolute inset-y-0 ${isRTL ? 'left-0 pl-2' : 'right-0 pr-2'} flex items-center text-slate-500`}>
                  <ArrowUpDown size={14} />
                </div>
              </div>

              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block mx-1"></div>

              <button 
                onClick={loadData}
                disabled={loading}
                className={`p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                title={t.refresh || "Refresh"}
              >
                <RefreshCcw size={20} className={` ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-grow">
          
          {/* Welcome Banner - Always rendered, visible behind modal */}
          <div 
            className={`relative overflow-hidden rounded-3xl shadow-xl p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group transition-all duration-500 ${
              currentTheme.type === 'gradient' ? `bg-gradient-to-r ${currentTheme.value}` : 'bg-slate-900 dark:bg-slate-950'
            }`}
          >
            {/* Background for Images */}
            {currentTheme.type === 'image' && (
              <>
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] group-hover:scale-110 ease-linear"
                  style={{ backgroundImage: `url(${currentTheme.value})` }}
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
              </>
            )}
            
            {/* Decorative Background Pattern (Only for gradients) */}
            {currentTheme.type === 'gradient' && (
              <>
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  {bannerPattern.render && bannerPattern.svgContent ? (
                      <svg className="h-full w-full" dangerouslySetInnerHTML={{ __html: bannerPattern.svgContent }} />
                  ) : (
                      <svg className="h-full w-full" viewBox={bannerPattern.viewBox} preserveAspectRatio={bannerPattern.preserveAspectRatio}>
                        <path d={bannerPattern.path} fill={bannerPattern.stroke ? 'none' : 'white'} stroke={bannerPattern.stroke ? 'white' : 'none'} strokeWidth={bannerPattern.stroke ? '0.5' : '0'} />
                      </svg>
                  )}
                </div>
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
              </>
            )}
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight text-white flex flex-wrap items-center gap-x-1">
                <span className={animationMode === 'sequence' ? 'anim-seq-1' : ''}>
                  {getGreeting()}
                </span>
                {userName ? (
                  <span 
                    key={userName} 
                    className={`
                      ${animationMode === 'sequence' ? 'anim-seq-2' : ''}
                      ${animationMode === 'update' ? 'anim-update-slow' : ''}
                    `}
                  >
                     {isRTL ? '،' : ','} {userName}!
                  </span>
                ) : (
                  <span className={animationMode === 'sequence' ? 'anim-seq-2' : ''}>!</span>
                )}
              </h2>
              <p className={`text-white/90 text-lg font-light ${animationMode === 'sequence' ? 'anim-seq-3' : ''}`}>
                {t.goodDay}
              </p>
              
              {/* Last Updated Badge - No heavy animation needed, just consistent fade if sequenced */}
              {lastUpdated && (
                <div className={`mt-4 flex items-center gap-2 text-xs font-medium bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 text-white ${animationMode === 'sequence' ? 'anim-seq-3' : ''}`}>
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                   {t.updated}: {lastUpdated.toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US')}
                </div>
              )}
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setIsNameModalOpen(true)}
                className={`flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all px-5 py-2.5 rounded-xl text-sm font-semibold backdrop-blur-md border border-white/10 shadow-lg text-white ${animationMode === 'sequence' ? 'anim-seq-3' : ''}`}
              >
                <Pencil size={16} />
                {t.changeName}
              </button>
              
              <button 
                onClick={() => setIsThemeModalOpen(true)}
                className={`flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all px-5 py-2.5 rounded-xl text-sm font-semibold backdrop-blur-md border border-white/10 shadow-lg text-white ${animationMode === 'sequence' ? 'anim-seq-3' : ''}`}
              >
                <Palette size={16} />
                {t.selectTheme}
              </button>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl p-6 flex items-center gap-4 text-red-700 dark:text-red-400 shadow-sm">
              <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-full text-red-600 dark:text-red-400">
                 <AlertCircle size={24} />
              </div>
              <div>
                <h3 className="font-bold">Unable to load data</h3>
                <p className="text-sm opacity-90">{t.error || error}</p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && data.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
               <div className="relative">
                  <div className={`w-16 h-16 border-4 dark:border-slate-800 border-t-current dark:border-t-current rounded-full animate-spin ${currentTheme.colors.text.replace('text', 'border').replace('600', '100')}`}></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                     <LayoutDashboard size={20} className={`${currentTheme.colors.text} opacity-50`} />
                  </div>
               </div>
               <p className="mt-4 font-medium text-slate-500 dark:text-slate-400 animate-pulse">{t.loading}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && data.length === 0 && (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                 <LayoutDashboard size={32} />
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-lg font-semibold">{t.noData}</p>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">{t.checkConfig}</p>
            </div>
          )}

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {sortedData.map((dept) => (
              <DepartmentCard 
                key={dept.id} 
                data={dept} 
                t={t} 
                cardStyle={currentCardStyle} 
                theme={currentTheme} 
                onClick={(dept) => setSelectedDept(dept)}
              />
            ))}
          </div>

        </main>

        {/* Footer */}
        <footer className="w-full py-6 mt-auto text-center border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 text-sm text-slate-500 dark:text-slate-400 flex flex-col items-center justify-center gap-1">
            <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1">
               <span className="font-semibold">{t.title}</span>
               <span className="hidden sm:inline text-slate-300 dark:text-slate-600">•</span>
               <span>{t.subtitle} {language === 'en' ? 'MG Tools' : ''} © {new Date().getFullYear()}</span>
               <span className="hidden sm:inline text-slate-300 dark:text-slate-600">•</span>
               <span className="flex items-center gap-1">
                  {t.developedBy} <a href="https://magedalhilali.github.io/Portfolio/" target="_blank" rel="noopener noreferrer" className={`font-medium hover:underline transition-colors ${currentTheme.colors.text}`}>{t.developerName}</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
