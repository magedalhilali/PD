import React, { useRef, useState } from 'react';
import { Translation, ThemeConfig } from '../types';
import { THEMES, CARD_STYLES, BANNER_PATTERNS } from '../constants';
import { Palette, Check, X, Upload, Image as ImageIcon, Loader2, Layout, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentThemeId: string;
  currentCardStyle: string;
  currentBannerPattern: string;
  onSelectTheme: (themeId: string) => void;
  onSelectCardStyle: (styleId: string) => void;
  onSelectBannerPattern: (patternId: string) => void;
  onCustomImageUpload: (imageData: string) => void;
  t: Translation;
  customThemeImage?: string | null;
}

// Extracted Components to resolve type errors with 'key' prop and avoid re-renders

interface ThemeOptionProps {
  theme: ThemeConfig;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const ThemeOption: React.FC<ThemeOptionProps> = ({ theme, isSelected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(theme.id)}
      className={`relative group rounded-xl overflow-hidden aspect-video transition-all duration-200 ${isSelected ? 'ring-4 ring-indigo-500 ring-offset-2' : 'hover:scale-105 hover:shadow-lg'}`}
    >
      {theme.type === 'gradient' ? (
        <div className={`w-full h-full bg-gradient-to-br ${theme.value}`} />
      ) : (
        <>
          <img src={theme.value} alt={theme.label} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
        </>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-white text-xs font-medium text-left">
        {theme.label}
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2 bg-white text-indigo-600 rounded-full p-1 shadow-md">
          <Check size={12} strokeWidth={3} />
        </div>
      )}
    </button>
  );
};

interface CardStyleOptionProps {
  styleId: string;
  label: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const CardStyleOption: React.FC<CardStyleOptionProps> = ({ styleId, label, isSelected, onSelect }) => {
  // Mini preview representation
  const renderPreview = () => {
    switch (styleId) {
      case 'glass': return "bg-slate-200/50 dark:bg-slate-700/50 backdrop-blur border border-white/50";
      case 'minimal': return "bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded";
      case 'brutalist': return "bg-white dark:bg-slate-800 border-2 border-slate-900 dark:border-slate-500 shadow-[2px_2px_0px_0px_#0f172a] dark:shadow-[2px_2px_0px_0px_#fff] rounded-sm";
      case 'neumorphic': return "bg-[#f1f5f9] dark:bg-slate-700 shadow-[inset_-2px_-2px_5px_#fff,inset_2px_2px_5px_#cbd5e1] dark:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.05),inset_2px_2px_5px_rgba(0,0,0,0.5)] rounded-lg";
      case 'tech': return "bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 relative overflow-hidden";
      case 'modern': default: return "bg-white dark:bg-slate-800 shadow-md border border-slate-100 dark:border-slate-700 rounded-lg";
    }
  };

  return (
    <button
      onClick={() => onSelect(styleId)}
      className={`group relative flex flex-col items-center gap-3 p-4 rounded-xl transition-all ${isSelected ? 'bg-indigo-50 dark:bg-indigo-900/30 border-2 border-indigo-500' : 'bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-500 hover:bg-white dark:hover:bg-slate-700'}`}
    >
      <div className={`w-full aspect-[4/3] ${renderPreview()} flex flex-col p-2 gap-2`}>
         <div className="w-1/2 h-2 bg-slate-200 dark:bg-slate-600 rounded-full opacity-50"></div>
         <div className="w-full h-2 bg-indigo-200 dark:bg-indigo-700 rounded-full mt-auto"></div>
      </div>
      
      <span className={`text-sm font-medium ${isSelected ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-400'}`}>{label}</span>
      
      {isSelected && (
        <div className="absolute top-2 right-2 bg-indigo-600 text-white rounded-full p-0.5 shadow-sm">
          <Check size={10} strokeWidth={3} />
        </div>
      )}
    </button>
  );
};

interface BannerPatternOptionProps {
  pattern: typeof BANNER_PATTERNS[number];
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const BannerPatternOption: React.FC<BannerPatternOptionProps> = ({ pattern, isSelected, onSelect }) => {
  return (
    <button
       onClick={() => onSelect(pattern.id)}
       className={`relative group rounded-xl overflow-hidden aspect-[2/1] transition-all bg-indigo-600 flex items-center justify-center ${isSelected ? 'ring-4 ring-indigo-500 ring-offset-2' : 'hover:opacity-90'}`}
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none p-2">
          {pattern.render && pattern.svgContent ? (
              <svg className="w-full h-full" dangerouslySetInnerHTML={{ __html: pattern.svgContent }} />
          ) : (
              <svg className="w-full h-full" viewBox={pattern.viewBox} preserveAspectRatio={pattern.preserveAspectRatio}>
                 <path d={pattern.path} fill={pattern.stroke ? 'none' : 'white'} stroke={pattern.stroke ? 'white' : 'none'} strokeWidth={pattern.stroke ? '2' : '0'} />
              </svg>
          )}
      </div>
      <span className="relative z-10 text-white font-medium text-sm drop-shadow-md">{pattern.label}</span>
      {isSelected && (
        <div className="absolute top-2 right-2 bg-white text-indigo-600 rounded-full p-1 shadow-md">
          <Check size={12} strokeWidth={3} />
        </div>
      )}
    </button>
  );
}

const ThemeModal: React.FC<Props> = ({ 
  isOpen, 
  onClose, 
  currentThemeId, 
  currentCardStyle,
  currentBannerPattern,
  onSelectTheme, 
  onSelectCardStyle,
  onSelectBannerPattern,
  onCustomImageUpload,
  t,
  customThemeImage
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'background' | 'cardStyle' | 'banner'>('background');

  if (!isOpen) return null;

  const gradients = THEMES.filter(theme => theme.type === 'gradient');
  const images = THEMES.filter(theme => theme.type === 'image');

  const processImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_DIM = 1280;
          if (width > height) {
            if (width > MAX_DIM) {
              height *= MAX_DIM / width;
              width = MAX_DIM;
            }
          } else {
            if (height > MAX_DIM) {
              width *= MAX_DIM / height;
              height = MAX_DIM;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.7)); 
          } else {
            reject(new Error("Canvas context failed"));
          }
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const resizedImage = await processImage(file);
      onCustomImageUpload(resizedImage);
    } catch (error) {
      alert("Failed to process image. Please try another.");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-white dark:bg-slate-800 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
              <Palette size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{t.selectTheme}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 dark:border-slate-700 px-6 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('background')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'background' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            <ImageIcon size={16} />
            {t.themeBackground}
          </button>
          <button 
             onClick={() => setActiveTab('banner')}
             className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'banner' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            <Sparkles size={16} />
            {t.themeBanner}
          </button>
          <button 
             onClick={() => setActiveTab('cardStyle')}
             className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'cardStyle' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            <Layout size={16} />
            {t.themeCardStyle}
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          
          {activeTab === 'background' && (
            <>
              {/* Gradients Section */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  {t.gradients}
                  <div className="h-px bg-slate-100 dark:bg-slate-700 flex-1" />
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {gradients.map(theme => (
                    <ThemeOption 
                      key={theme.id} 
                      theme={theme} 
                      isSelected={currentThemeId === theme.id}
                      onSelect={onSelectTheme}
                    />
                  ))}
                </div>
              </div>

              {/* Images Section */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  {t.images}
                  <div className="h-px bg-slate-100 dark:bg-slate-700 flex-1" />
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {/* Custom Upload */}
                  <div 
                    className={`relative rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-indigo-400 dark:hover:border-indigo-500 group cursor-pointer transition-all flex flex-col items-center justify-center gap-2 aspect-video bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 ${currentThemeId === 'custom' ? 'ring-4 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-800 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : ''}`}
                    onClick={() => currentThemeId === 'custom' && customThemeImage ? null : fileInputRef.current?.click()}
                  >
                    {customThemeImage ? (
                      <>
                        <img src={customThemeImage} className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-80" alt="Custom" />
                        {currentThemeId === 'custom' && (
                            <div className="absolute top-2 right-2 bg-white text-indigo-600 rounded-full p-1 shadow-md z-10">
                              <Check size={12} strokeWidth={3} />
                            </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-0">
                            <button 
                              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                              className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-white/30"
                            >
                              {t.uploadCustom}
                            </button>
                        </div>
                        {currentThemeId !== 'custom' && (
                          <button 
                            onClick={() => onSelectTheme('custom')}
                            className="absolute inset-0 w-full h-full z-10"
                          />
                        )}
                      </>
                    ) : (
                      <>
                        <div className="p-3 bg-white dark:bg-slate-700 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                          {isProcessing ? <Loader2 size={24} className="text-indigo-500 animate-spin" /> : <Upload size={24} className="text-indigo-500 dark:text-indigo-400" />}
                        </div>
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                          {isProcessing ? 'Processing...' : t.uploadCustom}
                        </span>
                      </>
                    )}
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                  </div>

                  {images.map(theme => (
                    <ThemeOption 
                      key={theme.id} 
                      theme={theme} 
                      isSelected={currentThemeId === theme.id}
                      onSelect={onSelectTheme}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'banner' && (
             <div className="grid grid-cols-2 gap-4">
                {BANNER_PATTERNS.map(pattern => (
                    <BannerPatternOption 
                      key={pattern.id} 
                      pattern={pattern} 
                      isSelected={currentBannerPattern === pattern.id}
                      onSelect={onSelectBannerPattern}
                    />
                ))}
             </div>
          )}

          {activeTab === 'cardStyle' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {CARD_STYLES.map(style => (
                 <CardStyleOption 
                   key={style.id} 
                   styleId={style.id} 
                   label={style.label} 
                   isSelected={currentCardStyle === style.id}
                   onSelect={onSelectCardStyle}
                 />
              ))}
            </div>
          )}

        </div>
        
        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-100 dark:border-slate-700 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all"
          >
            {t.save}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ThemeModal;