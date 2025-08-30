import { z } from "zod";

export const dhikrSchema = z.object({
  id: z.string(),
  name: z.string(),
  arabic: z.string(),
  translation: z.string(),
  meaning: z.string(),
  count: z.number().min(0).default(0),
  targetCount: z.number().min(1).default(33),
});

export const settingsSchema = z.object({
  language: z.enum(['en', 'ar']).default('en'),
  theme: z.enum(['light', 'dark']).default('light'),
});

export const counterDataSchema = z.object({
  counters: z.record(dhikrSchema),
  currentDhikr: z.string(),
  todayTotal: z.number().min(0).default(0),
  streakDays: z.number().min(0).default(0),
  weekTotal: z.number().min(0).default(0),
  allTimeTotal: z.number().min(0).default(0),
  lastUsedDate: z.string().optional(),
  settings: settingsSchema.default({ language: 'en', theme: 'light' }),
});

export const duaSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  arabic: z.string(),
  transliteration: z.string(),
  translation: z.string(),
  reference: z.string().optional(),
});

export type Dhikr = z.infer<typeof dhikrSchema>;
export type CounterData = z.infer<typeof counterDataSchema>;
export type Dua = z.infer<typeof duaSchema>;
export type Settings = z.infer<typeof settingsSchema>;

export const defaultDhikrs: Record<string, Dhikr> = {
  subhanallah: {
    id: 'subhanallah',
    name: 'Subhan Allah',
    arabic: 'سُبْحَانَ اللهِ',
    translation: 'Subhan Allah',
    meaning: 'Glory be to Allah',
    count: 0,
    targetCount: 33,
  },
  alhamdulillah: {
    id: 'alhamdulillah',
    name: 'Alhamdulillah',
    arabic: 'الْحَمْدُ لِلَّهِ',
    translation: 'Alhamdulillah',
    meaning: 'All praise is due to Allah',
    count: 0,
    targetCount: 33,
  },
  allahuakbar: {
    id: 'allahuakbar',
    name: 'Allahu Akbar',
    arabic: 'اللهُ أَكْبَر',
    translation: 'Allahu Akbar',
    meaning: 'Allah is the Greatest',
    count: 0,
    targetCount: 34,
  },
  lailla: {
    id: 'lailla',
    name: 'La illa illa Allah',
    arabic: 'لَا إِلٰهَ إِلَّا الله',
    translation: 'La illa illa Allah',
    meaning: 'There is no god but Allah',
    count: 0,
    targetCount: 100,
  },
};

export const defaultDuas: Record<string, Dua[]> = {
  travel: [
    {
      id: 'travel_1',
      title: 'Dua for Beginning a Journey',
      category: 'travel',
      arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ',
      transliteration: 'Subhana\'l-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin wa inna ila rabbina la-munqalibun',
      translation: 'Glory be to Him who has made this vehicle subservient to us, though we were not capable of it, and we will surely return to our Lord.',
      reference: 'Quran 43:13-14'
    },
    {
      id: 'travel_2', 
      title: 'Dua for Safe Travel',
      category: 'travel',
      arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ خَيْرِ هَذِهِ السَّفَرِ وَخَيْرِ مَا فِيهَا وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا فِيهَا',
      transliteration: 'Allahumma inni as\'aluka min khayri hadhihi\'s-safar wa khayri ma fiha wa a\'udhu bika min sharriha wa sharri ma fiha',
      translation: 'O Allah, I ask You for the good of this journey and the good that is in it, and I seek refuge in You from its evil and the evil that is in it.',
      reference: 'Abu Dawud'
    }
  ],
  hardship: [
    {
      id: 'hardship_1',
      title: 'Dua for Relief from Distress',
      category: 'hardship',
      arabic: 'لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ',
      transliteration: 'La ilaha illa\'llahu\'l-\'Azim al-Halim, la ilaha illa\'llahu Rabbu\'l-\'Arshi\'l-\'Azim, la ilaha illa\'llahu Rabbu\'s-samawati wa Rabbu\'l-ardi wa Rabbu\'l-\'Arshi\'l-Karim',
      translation: 'There is no god but Allah, the Mighty, the Forbearing. There is no god but Allah, Lord of the Mighty Throne. There is no god but Allah, Lord of the heavens and earth and Lord of the Noble Throne.',
      reference: 'Bukhari and Muslim'
    },
    {
      id: 'hardship_2',
      title: 'Dua for Anxiety and Worry',
      category: 'hardship',
      arabic: 'اللَّهُمَّ إِنِّي عَبْدُكَ وَابْنُ عَبْدِكَ وَابْنُ أَمَتِكَ نَاصِيَتِي بِيَدِكَ مَاضٍ فِيَّ حُكْمُكَ عَدْلٌ فِيَّ قَضَاؤُكَ أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ سَمَّيْتَ بِهِ نَفْسَكَ أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ أَوْ عَلَّمْتَهُ أَحَدًا مِنْ خَلْقِكَ أَوْ اسْتَأْثَرْتَ بِهِ فِي عِلْمِ الْغَيْبِ عِنْدَكَ أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي وَنُورَ صَدْرِي وَجَلَاءَ حُزْنِي وَذَهَابَ هَمِّي',
      transliteration: 'Allahumma inni \'abduka wa ibn \'abdika wa ibn amatika, nasiyati bi yadika, madin fiyya hukmuka, \'adlun fiyya qada\'uka. As\'aluka bi kulli ismin huwa laka sammayta bihi nafsaka aw anzaltahu fi kitabika aw \'allamtahu ahadan min khalqika aw ista\'tharta bihi fi \'ilmi\'l-ghaybi \'indaka an taj\'ala\'l-Qur\'ana rabi\'a qalbi wa nura sadri wa jala\'a huzni wa dhahaba hammi',
      translation: 'O Allah, I am Your servant, son of Your servant, son of Your maidservant. My forelock is in Your hand, Your command over me is forever executed and Your decree over me is just. I ask You by every name belonging to You which You have named Yourself with, or revealed in Your Book, or taught to any of Your creation, or have kept in the knowledge of the Unseen with You, that You make the Quran the life of my heart and the light of my breast, and a departure for my sorrow and a release for my anxiety.',
      reference: 'Ahmad'
    }
  ],
  sleep: [
    {
      id: 'sleep_1',
      title: 'Dua Before Sleep',
      category: 'sleep',
      arabic: 'اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا',
      transliteration: 'Allahumma bismika amutu wa ahya',
      translation: 'O Allah, in Your name I die and I live.',
      reference: 'Bukhari'
    },
    {
      id: 'sleep_2',
      title: 'Ayat al-Kursi',
      category: 'sleep',
      arabic: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ',
      transliteration: 'Allahu la ilaha illa huwa\'l-Hayyu\'l-Qayyum, la ta\'khudhhu sinatun wa la nawm, lahu ma fi\'s-samawati wa ma fi\'l-ard, man dha\'lladhi yashfa\'u \'indahu illa bi\'idhnih, ya\'lamu ma bayna aydihim wa ma khalfahum wa la yuhituna bi shay\'in min \'ilmihi illa bima sha\'a, wasi\'a kursiyyuhu\'s-samawati wa\'l-arda wa la ya\'uduhu hifzuhuma wa huwa\'l-\'Aliyu\'l-\'Azim',
      translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.',
      reference: 'Quran 2:255'
    }
  ],
  morning: [
    {
      id: 'morning_1',
      title: 'Morning Dhikr - Protection',
      category: 'morning',
      arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
      transliteration: 'A\'udhu bi kalimatil-lahit-tammati min sharri ma khalaq',
      translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
      reference: 'Muslim'
    },
    {
      id: 'morning_2',
      title: 'Morning Gratitude',
      category: 'morning',
      arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذَا الْيَوْمِ فَتْحَهُ وَنَصْرَهُ وَنُورَهُ وَبَرَكَتَهُ وَهُدَاهُ وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِيهِ وَشَرِّ مَا بَعْدَهُ',
      transliteration: 'Asbahna wa asbaha\'l-mulku lillahi rabbil-\'alamin. Allahumma inni as\'aluka khayra hadha\'l-yawmi, fathahu wa nasrahu wa nurahu wa barakatahu wa hudahu, wa a\'udhu bika min sharri ma fihi wa sharri ma ba\'dah',
      translation: 'We have reached the morning and at this very time all sovereignty belongs to Allah, Lord of the worlds. O Allah, I ask You for the good of this day, its triumph, its victory, its light, its blessing and its guidance, and I take refuge in You from the evil of what is in it and the evil of what follows it.',
      reference: 'Abu Dawud'
    }
  ]
};
