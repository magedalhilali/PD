

// --------------------------------------------------------------------------
// CONFIGURATION
// --------------------------------------------------------------------------

// Put your logo URL here (e.g., 'https://company.com/logo.png' or './assets/logo.png')
// If left empty (''), the default icon will be used.
export const APP_LOGO = 'https://static.wixstatic.com/media/756a6a_da52fb55ba344f6382055c1308c97eba~mv2.png'; 

// The URL provided by the user
export const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1anb5IfUzDATmHoRstvmQBa_Dn1lMISyFajD2ObJdo-o/edit?usp=sharing';

export const ERP_SYSTEM_URL = 'https://magedalhilali.github.io/ERP2/';

// The base path for your documents. 
// If hosting on GitHub Pages with a folder named 'documents' in the root:
export const DOCUMENTS_BASE_URL = './documents'; 

export const CATEGORY_CONFIG = [
  { index: 2, label: 'JDs', weight: 0.20 },
  { index: 3, label: 'Org Chart', weight: 0.05 },
  { index: 4, label: 'Evaluation', weight: 0.20 },
  { index: 5, label: 'Cross Function', weight: 0.20 },
  { index: 6, label: 'Policies', weight: 0.15 },
  { index: 7, label: 'ERP', weight: 0.20 },
];

export const AUTO_REFRESH_INTERVAL = 30000; // 30 seconds

export const THEMES = [
  // Gradients
  { 
    id: 'default', 
    type: 'gradient', 
    value: 'from-indigo-600 via-violet-600 to-indigo-700', 
    label: 'Royal Purple',
    colors: {
      main: 'bg-indigo-600',
      hover: 'hover:bg-indigo-700',
      text: 'text-indigo-600',
      lightBg: 'bg-indigo-50',
      border: 'border-indigo-200',
      ring: 'focus:ring-indigo-500'
    }
  },
  { 
    id: 'ocean', 
    type: 'gradient', 
    value: 'from-cyan-600 via-blue-600 to-indigo-600', 
    label: 'Ocean Blue',
    colors: {
      main: 'bg-blue-600',
      hover: 'hover:bg-blue-700',
      text: 'text-blue-600',
      lightBg: 'bg-blue-50',
      border: 'border-blue-200',
      ring: 'focus:ring-blue-500'
    }
  },
  { 
    id: 'emerald', 
    type: 'gradient', 
    value: 'from-emerald-500 via-teal-600 to-cyan-700', 
    label: 'Forest Green',
    colors: {
      main: 'bg-emerald-600',
      hover: 'hover:bg-emerald-700',
      text: 'text-emerald-600',
      lightBg: 'bg-emerald-50',
      border: 'border-emerald-200',
      ring: 'focus:ring-emerald-500'
    }
  },
  { 
    id: 'sunset', 
    type: 'gradient', 
    value: 'from-orange-500 via-rose-500 to-pink-600', 
    label: 'Sunset',
    colors: {
      main: 'bg-rose-600',
      hover: 'hover:bg-rose-700',
      text: 'text-rose-600',
      lightBg: 'bg-rose-50',
      border: 'border-rose-200',
      ring: 'focus:ring-rose-500'
    }
  },
  { 
    id: 'slate', 
    type: 'gradient', 
    value: 'from-slate-700 via-slate-800 to-slate-900', 
    label: 'Midnight',
    colors: {
      main: 'bg-slate-700',
      hover: 'hover:bg-slate-800',
      text: 'text-slate-700',
      lightBg: 'bg-slate-100',
      border: 'border-slate-300',
      ring: 'focus:ring-slate-500'
    }
  },
  { 
    id: 'gold', 
    type: 'gradient', 
    value: 'from-amber-400 via-orange-400 to-yellow-500', 
    label: 'Gold Rush',
    colors: {
      main: 'bg-amber-500',
      hover: 'hover:bg-amber-600',
      text: 'text-amber-600',
      lightBg: 'bg-amber-50',
      border: 'border-amber-200',
      ring: 'focus:ring-amber-500'
    }
  },
  
  // Images - Mapping them to a complimentary color palette
  { 
    id: 'construction', 
    type: 'image', 
    value: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop', 
    label: 'Construction Site',
    colors: {
      main: 'bg-orange-600',
      hover: 'hover:bg-orange-700',
      text: 'text-orange-600',
      lightBg: 'bg-orange-50',
      border: 'border-orange-200',
      ring: 'focus:ring-orange-500'
    }
  },
  { 
    id: 'highrise', 
    type: 'image', 
    value: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop', 
    label: 'Highrise Glass',
    colors: {
      main: 'bg-sky-600',
      hover: 'hover:bg-sky-700',
      text: 'text-sky-600',
      lightBg: 'bg-sky-50',
      border: 'border-sky-200',
      ring: 'focus:ring-sky-500'
    }
  },
  { 
    id: 'blueprint', 
    type: 'image', 
    value: 'https://static.wixstatic.com/media/756a6a_37a88de09b654635bb15ca039bf10272~mv2.jpg', 
    label: 'Mosque',
    colors: {
      main: 'bg-blue-700',
      hover: 'hover:bg-blue-800',
      text: 'text-blue-700',
      lightBg: 'bg-blue-50',
      border: 'border-blue-200',
      ring: 'focus:ring-blue-500'
    }
  },
  { 
    id: 'office', 
    type: 'image', 
    value: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', 
    label: 'Modern Office',
    colors: {
      main: 'bg-slate-600',
      hover: 'hover:bg-slate-700',
      text: 'text-slate-600',
      lightBg: 'bg-slate-100',
      border: 'border-slate-200',
      ring: 'focus:ring-slate-500'
    }
  },
  { 
    id: 'uae', 
    type: 'image', 
    value: 'https://static.wixstatic.com/media/756a6a_e758420d536e4ba2aac536174d67f8b4~mv2.jpg', 
    label: 'UAE Spirit',
    colors: {
      main: 'bg-red-700',
      hover: 'hover:bg-red-800',
      text: 'text-red-700',
      lightBg: 'bg-red-50',
      border: 'border-red-200',
      ring: 'focus:ring-red-500'
    }
  },
] as const;

export const CARD_STYLES = [
  { id: 'modern', label: 'Modern' },
  { id: 'glass', label: 'Glass' },
  { id: 'neumorphic', label: 'Soft' },
] as const;

export const BANNER_PATTERNS = [
  { 
    id: 'wave', 
    label: 'Organic Wave', 
    path: 'M0 100 C 20 0 50 0 100 100 Z', 
    viewBox: '0 0 100 100',
    preserveAspectRatio: 'none',
    render: false,
    svgContent: undefined,
    stroke: false
  },
  { 
    id: 'geometric', 
    label: 'Polygons', 
    path: 'M0,100 L0,0 L100,0 L50,50 L100,100 Z', 
    viewBox: '0 0 100 100',
    preserveAspectRatio: 'none',
    render: false,
    svgContent: undefined,
    stroke: false
  },
  { 
    id: 'grid', 
    label: 'Grid', 
    render: true,
    // Using unique ID to avoid conflicts
    svgContent: '<defs><pattern id="p_grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="1.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#p_grid)" />',
    path: undefined,
    viewBox: undefined,
    preserveAspectRatio: undefined,
    stroke: false
  },
  {
    id: 'blueprint',
    label: 'Modern Blueprint',
    render: true,
    // Isometric dot grid effect - removed opacity to make it visible
    svgContent: '<defs><pattern id="p_dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="2.5" fill="white"/><circle cx="17" cy="17" r="2.5" fill="white"/></pattern></defs><rect width="100%" height="100%" fill="url(#p_dots)" />',
    path: undefined,
    viewBox: undefined,
    preserveAspectRatio: undefined,
    stroke: false
  },
  {
    id: 'aurora',
    label: 'Aurora Mesh',
    render: true,
    // Increased opacity significantly so it shows up under the parent opacity layer
    svgContent: '<defs><filter id="f_blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur in="SourceGraphic" stdDeviation="30" /></filter></defs><g filter="url(#f_blur)" opacity="0.8"><circle cx="20%" cy="30%" r="30%" fill="white" /><circle cx="80%" cy="70%" r="30%" fill="white" /><circle cx="50%" cy="50%" r="20%" fill="white" /></g>',
    path: undefined,
    viewBox: undefined,
    preserveAspectRatio: undefined,
    stroke: false
  },
  {
    id: 'topography',
    label: 'Topography',
    render: true,
    // Thicker lines, no opacity
    svgContent: '<path d="M-10 30 Q 30 10 70 30 T 150 30 M-10 45 Q 30 25 70 45 T 150 45 M-10 60 Q 30 40 70 60 T 150 60 M-10 75 Q 30 55 70 75 T 150 75" fill="none" stroke="white" stroke-width="2" />',
    path: undefined,
    viewBox: '0 0 100 100',
    preserveAspectRatio: 'none',
    stroke: true
  },
  {
    id: 'network',
    label: 'Data Network',
    render: true,
    // Thicker lines and nodes, no opacity
    svgContent: '<g stroke="white" stroke-width="1.5" fill="white"><circle cx="15%" cy="25%" r="3" /><circle cx="35%" cy="55%" r="3" /><circle cx="75%" cy="35%" r="3" /><circle cx="85%" cy="65%" r="3" /><circle cx="55%" cy="85%" r="3" /><line x1="15%" y1="25%" x2="35%" y2="55%" /><line x1="35%" y1="55%" x2="75%" y2="35%" /><line x1="75%" y1="35%" x2="85%" y2="65%" /><line x1="35%" y1="55%" x2="55%" y2="85%" /><line x1="85%" y1="65%" x2="55%" y2="85%" /></g>',
    path: undefined,
    viewBox: undefined,
    preserveAspectRatio: undefined,
    stroke: false
  }
] as const;

export const TRANSLATIONS = {
  en: {
    title: "Performance Dashboard",
    subtitle: "Part of",
    updated: "Updated",
    refresh: "Refresh",
    sortDefault: "Default Order",
    sortScoreDesc: "Progress (High → Low)",
    sortScoreAsc: "Progress (Low → High)",
    sortNameAsc: "Name (A → Z)",
    sortNameDesc: "Name (Z → A)",
    loading: "Loading performance data...",
    noData: "No department data found.",
    checkConfig: "Check the Google Sheet configuration.",
    overallProgress: "Overall Progress",
    error: "Failed to load data from Google Sheets. Please ensure the sheet is published to the web.",
    
    // Modal & Files
    view: "View",
    download: "Download",
    openErp: "Open ERP System",
    files: "Department Documents",
    close: "Close",
    
    // Welcome Section
    welcomeBack: "Welcome back",
    setupProfile: "Let's set up your profile",
    enterName: "Please enter your name to personalize your dashboard.",
    yourName: "Your Name",
    save: "Save",
    changeName: "Change Name",
    changeTheme: "Change Theme",
    selectTheme: "Customize Dashboard",
    themeBackground: "Background",
    themeCardStyle: "Card Style",
    themeBanner: "Banner Shapes",
    gradients: "Gradients",
    images: "Images",
    uploadCustom: "Upload Custom Image",
    custom: "Custom",
    goodDay: "Here is an overview of current performance indicators.", 
    goodMorning: "Good Morning",
    goodAfternoon: "Good Afternoon",
    goodEvening: "Good Evening",
    developedBy: "Developed by",
    developerName: "Maged Al Hilali",
    categories: {
      'JDs': 'JDs',
      'Org Chart': 'Org Chart',
      'Evaluation': 'Evaluation',
      'Cross Function': 'Cross Function',
      'Policies': 'Policies',
      'ERP': 'ERP'
    } as Record<string, string>,
    departments: {} as Record<string, string>
  },
  ar: {
    title: "لوحة المعلومات",
    subtitle: "لوحة مؤشرات أداء الأقسام",
    updated: "آخر تحديث",
    refresh: "تحديث",
    sortDefault: "الترتيب الافتراضي",
    sortScoreDesc: "التقدم (الأعلى → الأدنى)",
    sortScoreAsc: "التقدم (الأدنى → الأعلى)",
    sortNameAsc: "الاسم (أ → ي)",
    sortNameDesc: "الاسم (ي → أ)",
    loading: "جارٍ تحميل البيانات...",
    noData: "لا توجد بيانات للأقسام.",
    checkConfig: "يرجى التحقق من إعدادات ورقة البيانات.",
    overallProgress: "التقدم العام",
    error: "فشل تحميل البيانات. يرجى التأكد من نشر الورقة على الويب.",
    
    // Modal & Files
    view: "عرض",
    download: "تحميل",
    openErp: "فتح نظام ERP",
    files: "وثائق القسم",
    close: "إغلاق",

    // Welcome Section
    welcomeBack: "مرحباً بعودتك",
    setupProfile: "إعداد الملف الشخصي",
    enterName: "الرجاء إدخال اسمك لتخصيص لوحة المعلومات.",
    yourName: "اسمك",
    save: "حفظ",
    changeName: "تغيير الاسم",
    changeTheme: "تغيير المظهر",
    selectTheme: "تجميل لوحة المعلومات",
    themeBackground: "خلفية الشاشة",
    themeCardStyle: "تصميم البطاقات",
    themeBanner: "أشكال البانر",
    gradients: "تدرجات لونية",
    images: "صور وخلفيات",
    uploadCustom: "رفع صورة خاصة",
    custom: "مخصص",
    goodDay: "إليك نظرة عامة وشاملة على مؤشرات الأداء الحالية",
    goodMorning: "صباح الخير",
    goodAfternoon: "مساك الله بالخير",
    goodEvening: "مساء الخير",
    developedBy: "برمجة",
    developerName: "ماجد الهلالي",
    categories: {
      'JDs': 'الأوصاف الوظيفية',
      'Org Chart': 'الهيكل التنظيمي',
      'Evaluation': 'التقييم',
      'Cross Function': 'المهام المشتركة',
      'Policies': 'السياسات',
      'ERP': 'ERP'
    } as Record<string, string>,
    departments: {
      'Human Resources': 'قسم الموارد البشرية',
      'HR': 'قسم الموارد البشرية',
      'Information Technology': 'قسم تكنولوجيا المعلومات',
      'IT': 'قسم تقنية المعلومات',
      'Finance': 'قسم الإدارة المالية',
      'Accounting': 'قسم المحاسبة',
      'Sales': 'قسم المبيعات',
      'Marketing': 'قسم التسويق',
      'Operations': 'قسم العمليات',
      'Operation': 'قسم العمليات',
      'operation': 'قسم العمليات',
      'Legal': 'قسم الشؤون القانونية',
      'Supply Chain': 'قسم سلسلة الإمداد',
      'Logistics': 'قسم اللوجستية',
      'logistics': 'قسم اللوجستية',
      'Engineering': 'قسم الهندسة',
      'Administration': 'قسم الشؤون الإدارية',
      'Admin': 'قسم الإدارة',
      'Customer Service': 'قسم خدمة العملاء',
      'Support': 'قسم الدعم الفني',
      'Research & Development': 'قسم البحث والتطوير',
      'R&D': 'قسم البحث والتطوير',
      'Procurement': 'قسم المشتريات',
      'Purchasing': 'قسم المشتريات',
      'Quality Assurance': 'قسم ضمان الجودة',
      'QA': 'قسم الجودة',
      'Production': 'قسم الإنتاج',
      'Maintenance': 'قسم الصيانة',
      'Security': 'قسم الأمن والسلامة',
      'Health & Safety': 'قسم الصحة والسلامة',
      'HSE': 'قسم الصحة والسلامة والبيئة',
      'Executive': 'الإدارة التنفيذية',
      'Management': 'الإدارة',
      'Top Management': 'الإدارة العليا',
      'top management': 'الإدارة العليا',
      'Projects': 'قسم المشاريع',
      'Project Management': 'قسم إدارة المشاريع',
      'Warehouse': 'قسم المستودعات',
      'Training': 'قسم التدريب',
      'Business Development': 'قسم تطوير الأعمال',
      'business development': 'قسم تطوير الأعمال',
      'Tendering & Contract': 'قسم المناقصة والعقود',
      'tendering & contract': 'قسم المناقصة والعقود',
      'Tendering & Contracts': 'قسم المناقصة والعقود'
    } as Record<string, string>
  }
};