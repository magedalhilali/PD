import React, { useState, useEffect } from 'react';
import { Translation, Language, ThemeConfig } from '../types';
import { User, Sparkles } from 'lucide-react';
import { APP_LOGO } from '../constants';

interface Props {
  isOpen: boolean;
  onSave: (name: string) => void;
  currentName: string;
  t: Translation;
  onClose?: () => void;
  onToggleLanguage: () => void;
  language: Language;
  theme: ThemeConfig;
}

const NameModal: React.FC<Props> = ({ 
  isOpen, 
  onSave, 
  currentName, 
  t, 
  onClose,
  onToggleLanguage,
  language,
  theme
}) => {
  const [inputName, setInputName] = useState(currentName);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setInputName(currentName);
    if (isOpen) {
      setIsClosing(false);
    }
  }, [currentName, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      // Trigger exit animation
      setIsClosing(true);
      
      // Wait for animation to finish before saving
      setTimeout(() => {
        onSave(inputName.trim());
      }, 600); 
    }
  };

  const handleClose = () => {
    if (onClose) {
      setIsClosing(true);
      setTimeout(() => {
        onClose();
      }, 500);
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-gray-900 to-black transition-all duration-700 ease-in-out ${
        isClosing 
          ? 'opacity-0 backdrop-blur-none pointer-events-none' 
          : 'opacity-100 backdrop-blur-sm'
      }`}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className={`relative z-10 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] border border-slate-100 dark:border-slate-700 ${
        isClosing 
          ? 'opacity-0 scale-110 translate-y-4' // Dissolve upwards
          : 'opacity-100 scale-100 translate-y-0 animate-in fade-in zoom-in-95 duration-500'
      }`}>
        
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 p-8 pb-0 text-center relative">
          
          {/* Language Switcher */}
          <div className="absolute top-4 right-4 z-20">
             <button
               type="button"
               onClick={onToggleLanguage}
               className="text-[10px] sm:text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all cursor-pointer shadow-sm"
             >
               {language === 'en' ? 'اضغط هنا للغة العربية' : 'Click for English'}
             </button>
          </div>

          {APP_LOGO ? (
             <img src={APP_LOGO} alt="Logo" className="mx-auto w-20 h-20 object-contain mb-6 drop-shadow-md" />
          ) : (
            <div className={`mx-auto w-16 h-16 ${theme.colors.lightBg} dark:${theme.colors.main.replace('bg', 'bg').replace('600', '900')}/30 ${theme.colors.text} dark:${theme.colors.text.replace('600', '400')} rounded-2xl flex items-center justify-center mb-6 shadow-sm rotate-3`}>
              <Sparkles size={32} />
            </div>
          )}
          
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {currentName ? t.welcomeBack : t.setupProfile}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {t.enterName}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="mb-6">
            <label htmlFor="userName" className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              {t.yourName}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User size={18} />
              </div>
              <input
                type="text"
                id="userName"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-4 ${theme.colors.ring.replace('500', '100')} dark:${theme.colors.ring.replace('500', '900')} focus:${theme.colors.border.replace('border', 'border').replace('200', '500')} outline-none transition-all bg-slate-50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600`}
                placeholder="John Doe"
                autoFocus
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            {onClose && currentName && (
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2.5 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors font-semibold text-sm"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={!inputName.trim()}
              className={`w-full sm:w-auto px-6 py-2.5 ${theme.colors.main} ${theme.colors.hover} active:scale-95 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg ${theme.colors.text.replace('text', 'shadow').replace('600', '200')} dark:shadow-none text-sm`}
            >
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NameModal;