import React, { useState } from 'react';
import { DepartmentData, Translation, ThemeConfig } from '../types';
import { getDepartmentIcon } from './DepartmentCard';
import { X, Eye, Download, ExternalLink, FileText, ChevronRight } from 'lucide-react';
import { ERP_SYSTEM_URL, DOCUMENTS_BASE_URL } from '../constants';
import ProgressBar from './ProgressBar';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: DepartmentData | null;
  t: Translation;
  theme: ThemeConfig;
}

const DepartmentModal: React.FC<Props> = ({ isOpen, onClose, data, t, theme }) => {
  // State to track if a PDF viewer is open and which file URL it is showing
  const [viewPdfUrl, setViewPdfUrl] = useState<string | null>(null);

  if (!isOpen || !data) return null;

  const Icon = getDepartmentIcon(data.name);
  const displayName = t.departments?.[data.name] || t.departments?.[data.name.toLowerCase()] || data.name;

  // Function to clean strings for filenames (e.g. "Human Resources" -> "Human_Resources")
  const sanitize = (str: string) => {
    return str.trim().replace(/[^a-zA-Z0-9]+/g, '_');
  };

  // Dynamically generate the URL for the PDF
  const getFileUrl = (category: string) => {
    const safeDept = sanitize(data.name);
    const safeCat = sanitize(category);
    // e.g. ./documents/Human_Resources_JDs.pdf
    return `${DOCUMENTS_BASE_URL}/${safeDept}_${safeCat}.pdf`;
  };

  const handleOpenErp = () => {
    window.open(ERP_SYSTEM_URL, '_blank');
  };

  const handleViewPdf = (category: string) => {
    setViewPdfUrl(getFileUrl(category));
  };

  const handleDownloadPdf = (category: string) => {
    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = getFileUrl(category);
    link.target = "_blank"; // Good practice for external files
    link.download = `${displayName} - ${category}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // If viewing a PDF, show the PDF overlay
  if (viewPdfUrl) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
        <div className="bg-white dark:bg-slate-900 w-full max-w-5xl h-[90vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl relative">
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
             <h3 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
               <FileText size={20} className={`${theme.colors.text}`} />
               Document Viewer
             </h3>
             <button 
               onClick={() => setViewPdfUrl(null)}
               className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-500 transition-colors"
             >
               <X size={24} />
             </button>
          </div>
          <div className="flex-1 bg-slate-100 dark:bg-slate-950 p-1 relative">
             {/* Using an iframe to display the PDF. */}
             <iframe 
               src={viewPdfUrl} 
               className="w-full h-full rounded-lg border-none"
               title="PDF Viewer"
               onError={() => alert("Could not load PDF. Please ensure the file exists in the documents folder.")}
             />
             <div className="absolute inset-0 -z-10 flex items-center justify-center text-slate-400 gap-2">
                <span className="animate-pulse">Loading Document...</span>
             </div>
          </div>
        </div>
      </div>
    );
  }

  // Determine header background
  const headerBg = theme.type === 'gradient' 
    ? `bg-gradient-to-r ${theme.value}` 
    : theme.colors.main;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-200 dark:border-slate-700">
        
        {/* Header */}
        <div className={`relative ${headerBg} p-6 sm:p-8 text-white transition-all duration-300`}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white/80 hover:text-white transition-colors backdrop-blur-md"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-5">
            <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-inner border border-white/10">
              <Icon size={40} className="text-white" />
            </div>
            <div>
              <div className="text-white/80 text-sm font-medium mb-1 uppercase tracking-wide opacity-80">{t.files}</div>
              <h2 className="text-2xl sm:text-3xl font-bold leading-tight">{displayName}</h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-0">
          <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {data.categories.map((cat, idx) => {
              const isErp = cat.label === 'ERP';
              
              return (
                <div key={idx} className="p-5 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${isErp ? theme.colors.main : 'bg-slate-300 dark:bg-slate-500'}`}></div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-lg">
                        {t.categories[cat.label] || cat.label}
                      </h4>
                    </div>
                    
                    <div className="flex items-center gap-2">
                       {/* Actions */}
                       {isErp ? (
                         <button
                           onClick={handleOpenErp}
                           className={`flex items-center gap-2 px-4 py-2 ${theme.colors.main} ${theme.colors.hover} text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95`}
                         >
                           <ExternalLink size={16} />
                           {t.openErp}
                         </button>
                       ) : (
                         <>
                           <button
                             onClick={() => handleViewPdf(cat.label)}
                             className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-lg transition-colors border border-slate-200 dark:border-slate-600"
                           >
                             <Eye size={16} />
                             <span className="hidden sm:inline">{t.view}</span>
                           </button>
                           <button
                             onClick={() => handleDownloadPdf(cat.label)}
                             className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-lg transition-colors border border-slate-200 dark:border-slate-600"
                           >
                             <Download size={16} />
                             <span className="hidden sm:inline">{t.download}</span>
                           </button>
                         </>
                       )}
                    </div>
                  </div>

                  {/* Contextual Score Display */}
                  <div className="pl-5">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                       <span>Progress</span>
                       <span className="font-mono font-medium">{cat.raw}</span>
                    </div>
                    <ProgressBar progress={cat.value} height="h-2" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 text-center">
           <button 
             onClick={onClose}
             className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
           >
             {t.close}
           </button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentModal;