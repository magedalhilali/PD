import React from 'react';
import { DepartmentData, Translation, ThemeConfig } from '../types';
import ProgressBar from './ProgressBar';
import { 
  Building2, Users, Monitor, Banknote, TrendingUp, Megaphone, 
  Scale, Truck, Wrench, Briefcase, Headphones, 
  FlaskConical, ShieldCheck, Factory, Shield, Award, 
  ClipboardList, ShoppingCart, GraduationCap,
  FileSignature, Tractor,
  Activity
} from 'lucide-react';

interface Props {
  data: DepartmentData;
  t: Translation;
  cardStyle?: string;
  theme: ThemeConfig;
  onClick?: (data: DepartmentData) => void;
}

export const getDepartmentIcon = (name: string) => {
  const n = name.toLowerCase();
  
  // --- High Priority Specific Checks ---
  
  // Procurement -> ShoppingCart (Must be before 'pr' check which is used for Marketing)
  if (n.includes('procur') || n.includes('purchas') || n.includes('buy') || n.includes('مشتريات')) return ShoppingCart;
  
  // Production -> Factory (Must be before 'pr' check)
  if (n.includes('product') || n.includes('manufactur') || n.includes('إنتاج')) return Factory;
  
  // Projects -> ClipboardList (Must be before 'pr' and 'manage')
  if (n.includes('project') || n.includes('pm') || n.includes('مشاريع')) return ClipboardList;

  // --- Functional Departments ---

  if (n.includes('human') || n.includes('hr') || n.includes('people') || n.includes('talent')) return Users;
  if (n.includes('it') || n.includes('tech') || n.includes('software') || n.includes('digital') || n.includes('information')) return Monitor;
  if (n.includes('financ') || n.includes('account') || n.includes('audit')) return Banknote;
  if (n.includes('sale') || n.includes('revenue') || n.includes('commercial')) return TrendingUp;
  
  // Marketing/PR
  // Note: 'pr' matches 'procurement', 'production', 'project', etc. so those must be checked above.
  if (n.includes('market') || n.includes('brand') || n.includes('pr') || n.includes('advertis')) return Megaphone;
  
  // Operations -> Tractor (Represents excavator/heavy machinery)
  if (n.includes('operation') || n.includes('ops')) return Tractor;
  
  if (n.includes('legal') || n.includes('law') || n.includes('compliance')) return Scale;
  if (n.includes('supply') || n.includes('logistics') || n.includes('warehouse') || n.includes('inventory')) return Truck;
  if (n.includes('engineer') || n.includes('maintenance') || n.includes('technical')) return Wrench;
  if (n.includes('admin') || n.includes('office')) return Briefcase;
  if (n.includes('customer') || n.includes('support') || n.includes('service') || n.includes('client')) return Headphones;
  if (n.includes('research') || n.includes('r&d') || n.includes('lab') || n.includes('scien')) return FlaskConical;
  if (n.includes('quality') || n.includes('qa') || n.includes('qc')) return ShieldCheck;
  if (n.includes('security') || n.includes('safety') || n.includes('hse')) return Shield;
  
  // Executive/Management
  // Checked late to allow specific 'management' types (like Project Management) to be caught by their domain first.
  if (n.includes('exec') || n.includes('manage') || n.includes('ceo') || n.includes('board')) return Award;
  
  if (n.includes('train') || n.includes('learn') || n.includes('education')) return GraduationCap;
  
  // Tendering -> Contract Paper (FileSignature)
  if (n.includes('contract') || n.includes('tender')) return FileSignature;

  return Building2;
};

const DepartmentCard: React.FC<Props> = ({ data, t, cardStyle = 'modern', theme, onClick }) => {
  // Use translated name if available, otherwise fallback to original name
  const displayName = t.departments?.[data.name] || 
                      t.departments?.[data.name.toLowerCase()] || 
                      data.name;

  const Icon = getDepartmentIcon(data.name);

  // --- Style Configurations ---

  // Base wrappers for different styles
  const getWrapperClass = () => {
    switch (cardStyle) {
      case 'glass':
        return "bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-lg hover:shadow-2xl hover:bg-white/80 dark:hover:bg-slate-800/60 rounded-2xl";
      case 'minimal':
        return "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-slate-400 dark:hover:border-slate-500";
      case 'brutalist':
        return "bg-white dark:bg-slate-800 border-2 border-slate-900 dark:border-slate-950 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] dark:hover:shadow-[2px_2px_0px_0px_#000] rounded-sm";
      case 'neumorphic':
        return "bg-[#f1f5f9] dark:bg-slate-800 rounded-[2rem] shadow-[inset_-5px_-5px_10px_#ffffff,inset_5px_5px_10px_#cbd5e1] dark:shadow-[inset_-5px_-5px_10px_rgba(255,255,255,0.05),inset_5px_5px_10px_rgba(0,0,0,0.5)] hover:shadow-[8px_8px_16px_#cbd5e1,-8px_-8px_16px_#ffffff] dark:hover:shadow-[8px_8px_16px_rgba(0,0,0,0.5),-8px_-8px_16px_rgba(255,255,255,0.05)] border border-white/50 dark:border-slate-700/50";
      case 'tech':
        return "bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/50 shadow-[0_0_15px_rgba(99,102,241,0.1)] hover:shadow-[0_0_25px_rgba(99,102,241,0.2)] relative overflow-hidden rounded-xl";
      case 'modern':
      default:
        return "bg-white dark:bg-slate-800 rounded-2xl shadow-[0_2px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgb(0,0,0,0.08)] border border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600";
    }
  };

  const getIconWrapperClass = () => {
    switch (cardStyle) {
      case 'glass': return "bg-white/50 dark:bg-slate-700/50 text-indigo-600 dark:text-indigo-400";
      case 'minimal': return "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300";
      case 'brutalist': return "bg-indigo-600 text-white border border-slate-900 dark:border-black shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] dark:shadow-[2px_2px_0px_0px_#000]";
      case 'neumorphic': return "shadow-[3px_3px_6px_#cbd5e1,-3px_-3px_6px_#ffffff] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.4),-3px_-3px_6px_rgba(255,255,255,0.05)] text-indigo-500 dark:text-indigo-400 bg-[#f1f5f9] dark:bg-slate-800";
      case 'tech': return "bg-indigo-50/50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800";
      default: return "bg-slate-50 dark:bg-slate-700/50 text-slate-400 dark:text-slate-500 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 group-hover:text-indigo-600 dark:group-hover:text-indigo-400";
    }
  };

  const wrapperClass = getWrapperClass();
  const iconWrapperClass = getIconWrapperClass();

  // Calculate the class for category progress bars
  const getCategoryProgressClass = () => {
    // If it's a gradient theme, use the gradient value for the bar
    if (theme.type === 'gradient') {
      return `bg-gradient-to-r ${theme.value} opacity-30 group-hover:opacity-100 transition-opacity duration-300`;
    }
    
    // Fallback/Overrides for specific card styles if no gradient theme active
    if (cardStyle === 'brutalist') return 'bg-black dark:bg-white';
    
    if (cardStyle === 'minimal') {
       return 'bg-slate-400 dark:bg-slate-500 opacity-30 group-hover:opacity-100 transition-opacity duration-300';
    }
    
    if (cardStyle === 'tech') {
       return 'bg-indigo-400 opacity-30 group-hover:opacity-100 transition-opacity duration-300';
    }
    
    // Default fallback
    return 'bg-slate-300 dark:bg-slate-600 group-hover:bg-indigo-400/80 transition-colors duration-300';
  };

  const categoryProgressClass = getCategoryProgressClass();

  return (
    <div 
      onClick={() => onClick && onClick(data)}
      className={`group relative transition-all duration-300 flex flex-col h-full overflow-hidden cursor-pointer ${wrapperClass}`}
    >
      
      {/* --- Decorative Elements based on Style --- */}
      
      {/* Modern: Top Gradient Line */}
      {cardStyle === 'modern' && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      
      {/* Tech: Corner Markers & Grid */}
      {cardStyle === 'tech' && (
        <>
           <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <Activity size={80} strokeWidth={1} className="text-indigo-900/50 dark:text-indigo-400/20" />
           </div>
           <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-indigo-400 rounded-tl-lg" />
           <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-indigo-400 rounded-br-lg" />
        </>
      )}

      {/* Brutalist: Badge */}
      {cardStyle === 'brutalist' && (
         <div className="absolute -right-6 top-4 bg-yellow-400 text-black text-[10px] font-bold py-1 px-8 rotate-45 border border-black shadow-sm">
            TRACK
         </div>
      )}

      <div className={`flex flex-col gap-6 h-full ${cardStyle === 'neumorphic' ? 'p-8' : 'p-6'}`}>
        {/* Header */}
        <div className="flex justify-between items-center gap-4 relative z-10">
          <div className="flex-1 min-w-0">
             <h3 className={`font-bold text-lg leading-tight truncate ${cardStyle === 'brutalist' ? 'uppercase font-black text-xl tracking-tighter text-black dark:text-white' : 'text-slate-800 dark:text-slate-100'}`} title={displayName}>
                {displayName}
             </h3>
          </div>
          <div className={`shrink-0 p-3 rounded-xl transition-colors duration-300 ${iconWrapperClass}`}>
             <Icon size={cardStyle === 'brutalist' ? 20 : 24} strokeWidth={cardStyle === 'brutalist' ? 2.5 : 1.5} />
          </div>
        </div>

        {/* Main Score */}
        <div className="py-1 relative z-10">
           <div className="flex items-baseline justify-between mb-3">
              <span className={`text-xs font-bold uppercase tracking-wider ${cardStyle === 'brutalist' ? 'text-black dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>{t.overallProgress}</span>
              <span className={`text-3xl font-bold tracking-tight ${cardStyle === 'tech' ? 'text-indigo-600 dark:text-indigo-400 font-mono' : 'text-slate-900 dark:text-slate-100'}`}>
                {Math.round(data.totalScore * 100)}%
              </span>
           </div>
           
           {/* Custom Progress Bar Styling Wrapper */}
           <div className={cardStyle === 'brutalist' ? 'border border-black dark:border-white p-0.5 rounded-full' : ''}>
              <ProgressBar 
                progress={data.totalScore} 
                height={cardStyle === 'modern' ? 'h-3' : cardStyle === 'brutalist' ? 'h-4' : 'h-3'} 
                className={cardStyle === 'brutalist' ? 'bg-black dark:bg-white rounded-full' : cardStyle === 'tech' ? 'bg-indigo-500' : undefined}
              />
           </div>
        </div>

        {/* Separator */}
        <div className={`h-px w-full ${cardStyle === 'neumorphic' ? 'bg-slate-200 dark:bg-slate-700' : cardStyle === 'brutalist' ? 'bg-black dark:bg-white' : 'bg-slate-100 dark:bg-slate-700'}`} />

        {/* Grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-5 relative z-10">
           {data.categories.map((cat, idx) => (
             <div key={idx} className="flex flex-col gap-1.5">
               <div className="flex justify-between items-center text-xs">
                 <span className={`font-medium truncate pr-2 ${cardStyle === 'brutalist' ? 'text-black dark:text-white font-bold' : 'text-slate-600 dark:text-slate-400'}`} title={t.categories[cat.label]}>
                   {t.categories[cat.label] || cat.label}
                 </span>
                 <span className={`font-mono ${cardStyle === 'tech' ? 'text-indigo-500 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`}>{cat.raw}</span>
               </div>
               <ProgressBar 
                 progress={cat.value} 
                 height="h-1.5" 
                 className={categoryProgressClass} 
               />
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;