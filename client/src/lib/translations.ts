export const translations = {
  en: {
    // App title
    digitalTasbih: 'Digital Tasbih',
    
    // Navigation
    tasbih: 'Tasbih',
    adkar: 'Adkar',
    qiblah: 'Qiblah',
    
    // Tasbih Counter
    todaysTotal: "Today's Total",
    allDhikrCombined: "All Dhikr Combined",
    dayStreak: "Day Streak",
    thisWeek: "This Week",
    allTime: "All Time",
    reset: "Reset",
    nextSet: "Next Set",
    resetConfirm: "Reset counter to 0?",
    tap: "TAP",
    complete: "complete",
    of: "of",
    
    // Adkar
    adkarTitle: "Adkar & Supplications",
    adkarSubtitle: "Collection of authentic supplications (duas) for various situations",
    travel: "Travel",
    hardshipRelief: "Hardship & Relief",
    beforeSleep: "Before Sleep",
    morningDhikr: "Morning Dhikr",
    transliteration: "Transliteration",
    translation: "Translation",
    
    // Qiblah
    qiblahDirection: "Qiblah Direction",
    qiblahSubtitle: "Find the direction towards the Holy Kaaba in Mecca",
    getMyLocation: "Get My Location",
    gettingLocation: "Getting Location...",
    locationDetails: "Location Details",
    latitude: "Latitude",
    longitude: "Longitude",
    accuracy: "Accuracy",
    qiblahDirectionLabel: "Qiblah Direction",
    instructions: "Instructions",
    instructionsList: [
      'Tap "Get My Location" to find your position',
      'Hold your device flat and rotate yourself',
      'The green arrow points towards Qiblah',
      'Ensure location and compass permissions are enabled'
    ],
    accuracyWarning: "Location accuracy is {accuracy}m. For better results, go outdoors or near a window.",
    
    // Settings
    settings: "Settings",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    language: "Language",
    english: "English",
    arabic: "العربية",
    appInfo: "Digital Tasbih",
    appDescription: "Islamic Counter & Supplications App",
    
    // Errors
    geolocationNotSupported: "Geolocation is not supported by this browser",
    locationError: "Location error",
    deviceOrientationDenied: "Device orientation permission denied",
    deviceOrientationError: "Error requesting device orientation permission",
    
    // Dhikr meanings
    dhikrMeanings: {
      subhanallah: "Glory be to Allah",
      alhamdulillah: "All praise is due to Allah", 
      allahuakbar: "Allah is the Greatest",
      lailla: "There is no god but Allah"
    }
  },
  ar: {
    // App title
    digitalTasbih: 'التسبيح الرقمي',
    
    // Navigation
    tasbih: 'تسبيح',
    adkar: 'أذكار',
    qiblah: 'قبلة',
    
    // Tasbih Counter
    todaysTotal: "إجمالي اليوم",
    allDhikrCombined: "جميع الأذكار مجتمعة",
    dayStreak: "أيام متتالية",
    thisWeek: "هذا الأسبوع",
    allTime: "كل الأوقات",
    reset: "إعادة تعيين",
    nextSet: "المجموعة التالية",
    resetConfirm: "إعادة تعيين العداد إلى 0؟",
    tap: "اضغط",
    complete: "مكتمل",
    of: "من",
    
    // Adkar
    adkarTitle: "الأذكار والأدعية",
    adkarSubtitle: "مجموعة من الأدعية الصحيحة للمواقف المختلفة",
    travel: "السفر",
    hardshipRelief: "الضيق والفرج",
    beforeSleep: "قبل النوم",
    morningDhikr: "أذكار الصباح",
    transliteration: "النطق",
    translation: "الترجمة",
    
    // Qiblah
    qiblahDirection: "اتجاه القبلة",
    qiblahSubtitle: "اعثر على الاتجاه نحو الكعبة المشرفة في مكة",
    getMyLocation: "احصل على موقعي",
    gettingLocation: "جاري الحصول على الموقع...",
    locationDetails: "تفاصيل الموقع",
    latitude: "خط العرض",
    longitude: "خط الطول",
    accuracy: "الدقة",
    qiblahDirectionLabel: "اتجاه القبلة",
    instructions: "التعليمات",
    instructionsList: [
      'اضغط على "احصل على موقعي" للعثور على موقعك',
      'أمسك جهازك مسطحاً ولف نفسك',
      'السهم الأخضر يشير نحو القبلة',
      'تأكد من تفعيل صلاحيات الموقع والبوصلة'
    ],
    accuracyWarning: "دقة الموقع {accuracy} متر. للحصول على نتائج أفضل، اخرج في الهواء الطلق أو بالقرب من النافذة.",
    
    // Settings
    settings: "الإعدادات",
    theme: "المظهر",
    light: "فاتح",
    dark: "داكن",
    language: "اللغة",
    english: "English",
    arabic: "العربية",
    appInfo: "التسبيح الرقمي",
    appDescription: "تطبيق العداد الإسلامي والأدعية",
    
    // Errors
    geolocationNotSupported: "هذا المتصفح لا يدعم تحديد الموقع",
    locationError: "خطأ في الموقع",
    deviceOrientationDenied: "تم رفض إذن اتجاه الجهاز",
    deviceOrientationError: "خطأ في طلب إذن اتجاه الجهاز",
    
    // Dhikr meanings
    dhikrMeanings: {
      subhanallah: "سبحان الله",
      alhamdulillah: "الحمد لله",
      allahuakbar: "الله أكبر",
      lailla: "لا إله إلا الله"
    }
  }
};

export type TranslationKey = keyof typeof translations.en;
export type Language = keyof typeof translations;