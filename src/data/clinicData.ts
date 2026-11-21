export type PackageCategory =
  | 'all'
  | 'rejuvenation'
  | 'one-day'
  | 'specialty'
  | 'home-care';

export interface WellnessPackage {
  id: string;
  name: string;
  malayalamName?: string;
  category: Exclude<PackageCategory, 'all'>;
  categoryLabel: string;
  setting: string;
  summary: string;
  fullDescription: string;
  malayalamNote?: string;
  highlights: string[];
  includedSteps: string[];
  idealFor: string;
  poster: string;
  secondaryPoster?: string;
  featured?: boolean;
}

export interface TherapyItem {
  id: string;
  name: string;
  malayalamName: string;
  focus: string;
  description: string;
}

export interface ClinicPosterItem {
  id: string;
  title: string;
  malayalamTitle: string;
  caption: string;
  image: string;
  options?: string[];
}

export const CLINIC_INFO = {
  brandShort: 'SriSri Ayurveda',
  brandFull: 'SriSri Ayurveda Wellness Centre',
  malayalamBrand: 'ശ്രീ ശ്രീ ആയുർവേദ',
  city: 'Thrissur',
  doctorName: 'Dr. Anagha Aswin',
  doctorMalayalam: 'ഡോ. അനഘ അശ്വിൻ',
  phoneDisplay: '94009 67551',
  phoneRaw: '9400967551',
  telHref: 'tel:+919400967551',
  whatsappBase: 'https://wa.me/919400967551',
  websiteDomain: 'www.srisriayu.com',
  websiteUrl: 'https://www.srisriayu.com',
  googleBusinessUrl: 'https://share.google/lerZByQwKda1jb3hD',
  instagramUrl: 'https://www.instagram.com/srisri_ayurveda_/',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61552685338486',
  googleRating: '4.9',
  logoImage: '/assets/aistudio/Logo_3da16dce.png',
  locationMapImage: '/assets/aistudio/Location_6fcacb65.png',
  googleBadgeImage: '/assets/aistudio/Google-Reviews_43b672bf.webp',
  addressLines: [
    'Pullat Lane, Near Thiruvambady SreeKrishna Temple',
    'Poonkunnam, Thrissur, Kerala',
  ],
  landmarks: [
    '2 mins (600 m) from Thiruvambadi Temple Pond',
    'Accessible via Shoranur Rd & W Palace Rd',
    'Close to Thrissur Punkunnam Railway Station',
  ],
  hours: [
    { day: 'Monday – Saturday', time: '9:00 AM – 6:30 PM' },
    { day: 'Sunday', time: 'By Prior Appointment' },
  ],
};

export const PACKAGE_FILTERS: { id: PackageCategory; label: string }[] = [
  { id: 'all', label: 'All Packages' },
  { id: 'one-day', label: 'One-Day Break' },
  { id: 'rejuvenation', label: 'Rejuvenation' },
  { id: 'specialty', label: 'Joint, Hair & Women' },
  { id: 'home-care', label: 'Home Service' },
];

export const WELLNESS_PACKAGES: WellnessPackage[] = [
  {
    id: 'punarjani',
    name: 'Punarjani Rejuvenation',
    malayalamName: 'പുനർജനി പാക്കേജ്',
    category: 'rejuvenation',
    categoryLabel: 'Essential Rejuvenation',
    setting: 'At Clinic · 6-Step Care',
    summary:
      'A straightforward, approachable rejuvenation package covering essential head-to-foot oil therapies and steam under doctor guidance.',
    fullDescription:
      'Punarjani Rejuvenation (പുനർജനി പാക്കേജ്) is our foundational body purification and immunity-supporting Kerala Ayurveda package. Designed to be simple, comfortable, and affordable, it begins with a one-on-one consultation with Dr. Anagha Aswin followed by classic head-to-foot warm herbal oil massages and a medicated steam bath to clear sluggishness and restore everyday freshness.',
    malayalamNote: 'ശരീര ശുദ്ധീകരണത്തിനും പ്രതിരോധശേഷിക്കും',
    highlights: [
      'Doctor Consultation',
      'Full Body Massage',
      'Head, Face & Foot Massage',
      'Medicated Steam Bath',
    ],
    includedSteps: [
      '1. Doctor Consultation (ഡോക്ടർ കൺസൾട്ടേഷൻ)',
      '2. Full Body Massage (ഫുൾ ബോഡി മസാജ്)',
      '3. Head Massage (ഹെഡ് മസാജ്)',
      '4. Face Massage (ഫെയ്‌സ് മസാജ്)',
      '5. Foot Massage (ഫുട്ട് മസാജ്)',
      '6. Medicated Steam Bath (സ്റ്റീം ബാത്ത്)',
    ],
    idealFor: 'Body purification, immunity support, general tiredness, and first-time Ayurveda visitors.',
    poster: '/assets/aistudio/P_New_2ba61d54.png',
    featured: true,
  },
  {
    id: 'ayur-glow',
    name: 'Ayur Glow Rejuvenation',
    malayalamName: 'ആയുർ ഗ്ലോ റീജുവനേഷൻ',
    category: 'rejuvenation',
    categoryLabel: 'Complete Rejuvenation',
    setting: 'At Clinic · 10-Step Care',
    summary:
      'A comprehensive body purification and immunity-building package combining doctor consultation, yoga guidance, and head-to-toe therapies.',
    fullDescription:
      'Ayur Glow Rejuvenation (ആയുർ ഗ്ലോ റീജുവനേഷൻ) expands on traditional oil therapies with Yogasanas, Pranayama breathing guidance, Dhumapanam, and soothing Nethradhara eye care. It supports deep body detoxification, brighter skin vitality, calm nerves, and stronger natural immunity under doctor supervision.',
    malayalamNote: 'ശരീര ശുദ്ധീകരണത്തിനും പ്രതിരോധശേഷിക്കും',
    highlights: [
      'Doctor Consultation, Yogasanas & Pranayama',
      'Full Body, Head, Face & Foot Massage',
      'Dhumapanam & Nethradhara (Eye nourishment)',
      'Medicated Steam Bath',
    ],
    includedSteps: [
      '1. Doctor Consultation (ഡോക്ടർ കൺസൾട്ടേഷൻ)',
      '2. Yogasanas (യോഗാസനങ്ങൾ)',
      '3. Pranayama (പ്രാണായാമം)',
      '4. Full Body Massage (ഫുൾ ബോഡി മസാജ്)',
      '5. Head Massage (ഹെഡ് മസാജ്)',
      '6. Face Massage (ഫെയ്‌സ് മസാജ്)',
      '7. Foot Massage (ഫുട്ട് മസാജ്)',
      '8. Dhumapanam (ധൂമപാനം)',
      '9. Nethradhara (നേത്രധാര — eye nourishment)',
      '10. Medicated Steam Bath (മെഡിക്കേറ്റഡ് സ്റ്റീം ബാത്ത്)',
    ],
    idealFor: 'Full-body detox, immunity, screen-tired eyes, and natural skin & energy renewal.',
    poster: '/assets/aistudio/A_new_2fb88559.png',
    featured: true,
  },
  {
    id: 'one-day-break',
    name: 'One-Day Wellness Break',
    malayalamName: 'വൺ-ഡേ പാക്കേജ്',
    category: 'one-day',
    categoryLabel: 'One-Day Reset',
    setting: 'At Clinic · Stress Relief & Daily Detox',
    summary:
      'Designed for busy working individuals and families who want a calm single-day pause to restore energy and relieve body stiffness.',
    fullDescription:
      'Our One-Day Wellness Break (വൺ-ഡേ പാക്കേജ്) fits easily into a single day off or weekend. Combining traditional warm-oil Abhyangam massage, detoxifying medicated steam, and a soothing herbal Mukhalepam facial, it melts away muscle stiffness, refreshes tired skin, and leaves your mind light and energized.',
    malayalamNote: 'ശരീരത്തിനും മനസ്സിനും പൂർണ്ണ ഉന്മേഷം',
    highlights: [
      'Abhyangam (Traditional Ayurvedic oil massage)',
      'Medicated Steam Bath for detox & relaxation',
      'Mukhalepam (Natural Ayurvedic herbal facial)',
      'Supports stress relief, freshness & vitality',
    ],
    includedSteps: [
      '1. Abhyangam — Traditional full-body warm herbal oil massage for relaxation and circulation',
      '2. Medicated Steam Bath — Herbal steam therapy to open pores, ease stiffness, and detoxify',
      '3. Mukhalepam — Natural Ayurvedic herbal face pack for cooling skin glow and freshness',
      '4. Benefits — Stress relief, natural detox, glowing skin, and renewed physical vitality',
    ],
    idealFor: 'Working professionals, homemakers, and travellers looking for a complete 1-day reset.',
    poster: '/assets/aistudio/Untitled_-_02_February_2026_at_17.14.13__3___1___1___1___2___1___16__9943f644.png',
    secondaryPoster: '/assets/aistudio/Untitled_-_July_24__2026_at_10.32.22__3__74ec13b7.png',
    featured: true,
  },
  {
    id: 'harmony-mind-body',
    name: 'Harmony Mind & Body',
    malayalamName: 'ഹാർമണി മൈൻഡ് & ബോഡി',
    category: 'rejuvenation',
    categoryLabel: 'Deep Calm & Shirodhara',
    setting: 'At Clinic · 11-Step Care',
    summary:
      'Tailored for deep mental calm, better sleep, and relief from everyday exhaustion using special medicated oils and Shirodhara.',
    fullDescription:
      'Harmony Mind & Body (ഹാർമണി മൈൻഡ് & ബോഡി) is an 11-step calming ritual centered around Shirodhara (Kashaya Dhara) and Thalam alongside special medicated-oil head, face, foot, and full-body massages. It helps quiet racing thoughts, supports deeper sleep, and eases head-neck tension.',
    highlights: [
      'Doctor Consultation & Herbal Tea',
      'Full Body, Head, Face & Foot Massage (Special Oil)',
      'Shirodhara (Kashaya Dhara) & Thalam',
      'Nethradhara, Dhumapanam & Steam Bath',
    ],
    includedSteps: [
      '1. Doctor Consultation',
      '2. Herbal Tea',
      '3. Full Body Massage (with Special Medicated Oil)',
      '4. Head Massage',
      '5. Face Massage',
      '6. Foot Massage',
      '7. Shirodhara (Kashaya Dhara)',
      '8. Thalam (Soothing herbal paste on crown)',
      '9. Nethradhara (Herbal eye wash)',
      '10. Dhumapanam',
      '11. Medicated Steam Bath',
    ],
    idealFor: 'Mental stress, disturbed sleep, migraines/head heaviness, and work burnout.',
    poster: '/assets/aistudio/Untitled_-_08_September_2026_at_13.42.50_302e8469.png',
    featured: true,
  },
  {
    id: 'ojasvi-renewal',
    name: 'Ojasvi Renewal Ritual',
    malayalamName: 'ഓജസ്വി റിന്യൂവൽ',
    category: 'rejuvenation',
    categoryLabel: 'Muscle & Vitality',
    setting: 'At Clinic · 11-Step Care',
    summary:
      'Focused on physical recovery, fatigue relief, and muscle relaxation with traditional Kizhi (herbal bolus) therapy and special oils.',
    fullDescription:
      'Ojasvi Renewal Ritual (ഓജസ്വി റിന്യൂവൽ) pairs special medicated-oil massages with warm Kizhi (herbal poultice fomentation) and Thalam to release deep muscular knots, improve joint flexibility, and rebuild physical stamina.',
    highlights: [
      'Doctor Consultation & Herbal Tea',
      'Full Body, Head, Face & Foot Massage (Special Oil)',
      'Kizhi (Herbal poultice fomentation) & Thalam',
      'Nethradhara, Dhumapanam & Steam Bath',
    ],
    includedSteps: [
      '1. Doctor Consultation',
      '2. Herbal Tea',
      '3. Full Body Massage (with Special Medicated Oil)',
      '4. Head Massage',
      '5. Face Massage',
      '6. Foot Massage',
      '7. Kizhi (Warm herbal bolus massage)',
      '8. Thalam',
      '9. Nethradhara',
      '10. Dhumapanam',
      '11. Medicated Steam Bath',
    ],
    idealFor: 'Body ache, muscle tightness, physical fatigue, and strength recovery.',
    poster: '/assets/aistudio/Untitled_-_August_30__2026_at_09.55.08_f2b03e4e.png',
  },
  {
    id: 'kesh-kanti',
    name: 'Kesh & Kanti Ritual',
    malayalamName: 'കേശ് & കാന്തി പാക്കേജ്',
    category: 'specialty',
    categoryLabel: 'Hair & Skin Care',
    setting: 'At Clinic · 8-Step Care',
    summary:
      'Herbal nourishment for scalp strength, hair health, and natural skin glow without harsh chemicals.',
    fullDescription:
      'Kesh & Kanti Ritual (കേശ് & കാന്തി പാക്കേജ്) combines traditional Ayurvedic face and hair packs with calming head, face, full-body, and special-oil foot massages plus steam. Every herb is chosen after consultation to nourish hair roots, cool the scalp, and refresh dull skin naturally.',
    highlights: [
      'Doctor Consultation',
      'Ayurvedic Face Pack & Ayurvedic Hair Pack',
      'Full Body, Head & Face Massage',
      'Foot Massage (Special Oil) & Medicated Steam Bath',
    ],
    includedSteps: [
      '1. Doctor Consultation (ഡോക്ടർ കൺസൾട്ടേഷൻ)',
      '2. Ayurvedic Face Pack (ആയുർവേദ ഫേസ് പാക്ക്)',
      '3. Ayurvedic Hair Pack (ആയുർവേദ ഹെയർ പാക്ക്)',
      '4. Full Body Massage (ഫുൾബോഡി മസാജ്)',
      '5. Head Massage (ഹെഡ് മസാജ്)',
      '6. Face Massage (ഫെയ്‌സ് മസാജ്)',
      '7. Foot Massage with Special Oil (ഫുട്ട് മസാജ് - പ്രത്യേക എണ്ണ)',
      '8. Medicated Steam Bath (മെഡിക്കേറ്റഡ് സ്റ്റീംബാത്ത്)',
    ],
    idealFor: 'Hair fall, dry scalp, dull or tanned skin, and chemical-free beauty care.',
    poster: '/assets/aistudio/final_3_8f955b98.jpg',
  },
  {
    id: 'sthree-swasthya',
    name: 'Sthree Swasthya Raksha',
    malayalamName: 'സ്ത്രീ സ്വാസ്ഥ്യ രക്ഷ',
    category: 'specialty',
    categoryLabel: "Women's Wellness",
    setting: 'At Clinic · 9-Step Care',
    summary:
      'A gentle, restorative wellness package crafted specifically for women to ease fatigue, nourish skin & eyes, and restore daily balance.',
    fullDescription:
      'Sthree Swasthya Raksha (സ്ത്രീ സ്വാസ്ഥ്യ രക്ഷ) is thoughtfully curated for women balancing busy household and work schedules. Combining doctor consultation, herbal tea, full-body/head/face/foot oil therapies, an Ayurvedic face pack, cooling Nethradhara eye care, and steam bath, it supports hormonal balance, relaxation, and everyday vitality.',
    highlights: [
      'Doctor Consultation & Herbal Tea',
      'Full Body, Head, Face & Foot Massage',
      'Ayurvedic Face Pack & Nethradhara',
      'Medicated Steam Bath',
    ],
    includedSteps: [
      '1. Doctor Consultation',
      '2. Herbal Tea',
      '3. Full Body Massage',
      '4. Head Massage',
      '5. Face Massage',
      '6. Foot Massage',
      '7. Ayurvedic Face Pack',
      '8. Nethradhara (Eye nourishment)',
      '9. Medicated Steam Bath',
    ],
    idealFor: "Women's everyday tiredness, stress relief, skin glow, and restorative self-care.",
    poster: '/assets/aistudio/Untitled_-_01_October_2026_at_11.33.32_56e880a3.png',
  },
  {
    id: 'tejas-skin-renewal',
    name: 'Tejas Skin Renewal',
    malayalamName: 'തേജസ് സ്കിൻ റിന്യൂവൽ',
    category: 'specialty',
    categoryLabel: 'Skin & Glow Care',
    setting: 'At Clinic · 10-Step Care',
    summary:
      'Herbal face and body pack rejuvenation paired with full-body oil therapies, eye care, and medicated steam.',
    fullDescription:
      'Tejas Skin Renewal (തേജസ് സ്കിൻ റിന്യൂവൽ) is a complete 10-step Ayurvedic skin and radiance package. Beginning with a doctor consultation, it combines soothing head, face, foot, and full-body massages with nourishing herbal face and body packs, medicated steam bath, Nethradhara eye nourishment, and Dhumapanam to gently exfoliate, brighten, and refresh your skin naturally.',
    highlights: [
      'Doctor Consultation & Full Body, Head, Face & Foot Massage',
      'Ayurvedic Face Pack & Herbal Body Pack (Lepa)',
      'Medicated Steam Bath, Nethradhara & Dhumapanam',
    ],
    includedSteps: [
      '1. Doctor Consultation (ഡോക്ടർ കൺസൾട്ടേഷൻ)',
      '2. Head Massage (ഹെഡ് മസ്സാജ്)',
      '3. Face Massage (ഫെയ്സ് മസ്സാജ്)',
      '4. Foot Massage (ഫുട്ട് മസ്സാജ്)',
      '5. Full Body Massage (ഫുൾ ബോഡി മസ്സാജ്)',
      '6. Face Pack (ഫേസ് പാക്ക്)',
      '7. Body Pack (ബോഡി പാക്ക്)',
      '8. Steam Bath (സ്റ്റീംബാത്ത്)',
      '9. Nethradhara (നേത്രധാര)',
      '10. Dhumapanam (ധൂമപാനം)',
    ],
    idealFor: 'Dull skin, tan removal, dry skin nourishment, and natural herbal glow.',
    poster: '/assets/aistudio/final_2286fb42.jpg',
  },
  {
    id: 'sandhi-sanjeevani',
    name: 'Sandhi Sanjeevani',
    malayalamName: 'സന്ധി സഞ്ജീവനി',
    category: 'specialty',
    categoryLabel: 'Joint Care',
    setting: 'At Clinic · Mobility & Pain Relief',
    summary:
      'Structured Ayurvedic joint care combining traditional oil therapies, internal medicines, gentle exercise, and infrared support.',
    fullDescription:
      'Sandhi Sanjeevani (സന്ധി സഞ്ജീവനി) is our dedicated joint-care program for knee pain, shoulder stiffness, cervical/lumbar spondylosis, and arthritis support. Under Dr. Anagha Aswin’s supervision, classical external treatments (Uzhichil, Vasthi, Kizhi, Lepanam) are paired with internal medicines, diet regulation, guided exercises, yoga, and Infrared (IR) therapy.',
    malayalamNote: 'സന്ധികൾക്ക് കരുത്തേകാം, ആത്മവിശ്വാസത്തോടെ മുന്നോട്ട് നടക്കാം',
    highlights: [
      'Doctor Consultation, Medicines & Diet Regulation',
      'Uzhichil, Vasthi, Kizhi & Lepanam',
      'Guided Exercise, Yoga & Pranayama',
      'Infrared (IR) Therapy support',
    ],
    includedSteps: [
      '1. Doctor Consultation (ഡോക്ടർ കൺസൾട്ടേഷൻ)',
      '2. Internal Medicines & Diet Regulation (മരുന്നുകൾ & ആഹാരക്രമീകരണം)',
      '3. Uzhichil (ഉഴിച്ചിൽ — therapeutic oil massage)',
      '4. Vasthi (വസ്തി — localized oil retention like Kadi/Janu Vasthi)',
      '5. Kizhi (കിഴി — warm herbal poultice fomentation)',
      '6. Lepanam (ലേപനം — herbal anti-inflammatory paste)',
      '7. Guided Exercise, Yoga & Pranayama (വ്യായാമം, യോഗ & പ്രാണായാമം)',
      '8. Infrared (IR) Therapy (ഇൻഫ്രാറെഡ് തെറാപ്പി)',
    ],
    idealFor: 'Knee pain, back pain, frozen shoulder, arthritis, and joint stiffness.',
    poster: '/assets/aistudio/Untitled_-_September_19__2026_at_09.34.11__1__b9fb9f48.jpeg',
  },
  {
    id: 'prasavaraksha',
    name: 'Ayurvedic Prasavaraksha',
    malayalamName: 'ആയുർവേദ പ്രസവരക്ഷ',
    category: 'home-care',
    categoryLabel: 'Post-Delivery Care',
    setting: 'Home Service · Mother & Baby Care',
    summary:
      'Traditional Kerala postnatal care delivered gently in the comfort of your home for both mother recovery and newborn care.',
    fullDescription:
      'Ayurvedic Prasavaraksha (ആയുർവേദ പ്രസവരക്ഷ) brings authentic Kerala postnatal care directly to your home for both mother and newborn. Every step—from soothing warm-oil body, head, and face massages, herbal face/body packs, Vethukuli medicated water bath, and traditional Udaraveshtanam binding to baby massage, baby bath, postnatal diet, online yoga, and counseling—is guided with warmth and care.',
    malayalamNote: 'അമ്മയുടെയും കുഞ്ഞിന്റെയും ആരോഗ്യ സംരക്ഷണം ഇനി നിങ്ങളുടെ വീട്ടിൽ',
    highlights: [
      'Full Body, Head, Face Massage, Face & Body Pack',
      'Vethukuli (Medicated Water Bath) & Udaraveshtanam (Abdominal Binding)',
      'Podikkizhi, Anjanam, Keshadhupanam / Yonidhupanam',
      'Baby Massage & Baby Bath, Systematic Diet, Online Yoga & Counseling',
    ],
    includedSteps: [
      '1. Full Body Massage for Mother (ഫുൾ ബോഡി മസാജ്)',
      '2. Head Massage & Face Massage (ഹെഡ് മസാജ് & ഫെയ്‌സ് മസാജ്)',
      '3. Face Pack & Body Pack (ഫെയ്‌സ് പാക്ക് & ബോഡി പാക്ക്)',
      '4. Vethukuli — Traditional medicated herbal water bath (വെതുകുളി)',
      '5. Udaraveshtanam — Traditional abdominal binding (ഉദരവേഷ്ടനം)',
      '6. Podikkizhi (പൊടിക്കിഴി)',
      '7. Anjanam, Keshadhupanam & Yonidhupanam',
      '8. Baby Massage & Baby Bath (ബേബി മസാജ് & ബേബി ബാത്ത്)',
      '9. Systematic Postnatal Diet Guidance (കൃത്യമായ ആഹാരക്രമം)',
      '10. Online Yoga & Counseling Support (ഓൺലൈൻ യോഗ & കൗൺസിലിംഗ്)',
    ],
    idealFor: 'New mothers and newborn babies needing authentic Kerala postnatal recovery at home.',
    poster: '/assets/aistudio/Untitled_-_08_June_2026_at_14.23.46_84304245.png',
  },
  {
    id: 'home-service',
    name: 'SriSri Home Service Care',
    malayalamName: 'ശ്രീ ശ്രീ ഹോം സർവീസ്',
    category: 'home-care',
    categoryLabel: 'Doorstep Therapy',
    setting: 'Home Visit · Thrissur & Nearby',
    summary:
      'Authentic Kerala Ayurveda therapies brought directly to your home for seniors, recovering patients, and families.',
    fullDescription:
      'For patients who prefer treatment in the comfort and privacy of home—especially seniors, post-surgery/recovering patients, and those with severe back or joint pain—our trained therapists visit your home across Thrissur under Dr. Anagha Aswin’s care plan.',
    highlights: [
      'Home Wellness Packages & Geriatric Wellness',
      'Back Pain & Disc Issue Care',
      'Joint Care & Neuro-Muscular Disorders',
      'Post-Delivery Care (Prasavaraksha)',
    ],
    includedSteps: [
      '1. Home Wellness Packages customized after doctor assessment',
      '2. Geriatric Wellness & Mobility Support for elderly family members',
      '3. Back Pain & Disc Issue Care at home',
      '4. Joint Care & Neuro-Muscular Disorder therapies',
      '5. Post-Delivery Care (Prasavaraksha) for mother & baby',
    ],
    idealFor: 'Seniors, bed-rest/recovering patients, and families wanting therapies at home.',
    poster: '/assets/aistudio/Untitled_-_13_July_2026_at_14.39.38_965bb50e.png',
    secondaryPoster: '/assets/aistudio/home_service_new_9f602148.png',
  },
  {
    id: 'amritam-geriatric',
    name: 'Amritam Geriatric Rejuvenation',
    malayalamName: 'അമൃതം ജെറിയാട്രിക് റീജുവനേഷൻ ഹോം സർവീസ്',
    category: 'home-care',
    categoryLabel: 'Geriatric Home Care',
    setting: 'Home Service · Senior Care',
    summary:
      'Gentle Ayurvedic rejuvenation and daily mobility support brought right to your home for elderly parents and seniors.',
    fullDescription:
      'Amritam Geriatric Rejuvenation Home Service brings gentle, compassionate Ayurvedic care to elderly parents without the strain of clinic travel. Combining a doctor consultation, certified therapist home visits, personalized Ayurveda therapies, therapeutic yoga, and pranayama, it helps seniors maintain comfort, mobility, and peaceful rest.',
    malayalamNote: 'പ്രായത്തിന്റെ അവശതകൾക്ക് ആയുർവേദത്തിന്റെ സാന്ത്വനം; സമ്പൂർണ്ണ പരിചരണം ഇനി നിങ്ങളുടെ വീട്ടിൽ',
    highlights: [
      'Doctor Consultation & Personalized Ayurveda',
      'Certified Therapist visits at home',
      'Therapeutic Yoga guidance',
      'Pranayama & gentle breathing care',
    ],
    includedSteps: [
      '1. Doctor Consultation — Detailed assessment of senior health & mobility needs',
      '2. Certified Therapist — Gentle, experienced Ayurvedic therapist visiting your home',
      '3. Personalized Ayurveda — Tailored warm-oil therapies and supportive remedies',
      '4. Therapeutic Yoga — Safe, age-appropriate mobility movements',
      '5. Pranayama — Calm breathing routines for stamina and restful sleep',
    ],
    idealFor: 'Elderly parents and senior citizens seeking safe, comfortable care at home.',
    poster: '/assets/aistudio/final_-2_c07cdc72.jpg',
  },
];

export const INDIVIDUAL_THERAPIES: TherapyItem[] = [
  {
    id: 'abhyangam',
    name: 'Abhyangam',
    malayalamName: 'അഭ്യംഗം',
    focus: 'Circulation & Relaxation',
    description: 'Warm medicated herbal oil massage over the full body to ease tension and nourish tissues.',
  },
  {
    id: 'shirodhara',
    name: 'Shirodhara',
    malayalamName: 'ശിരോധാര',
    focus: 'Sleep & Mental Calm',
    description: 'Continuous gentle stream of warm oil or kashayam poured on the forehead to calm the nervous system.',
  },
  {
    id: 'elakizhi',
    name: 'Elakizhi',
    malayalamName: 'ഇലക്കിഴി',
    focus: 'Muscle & Joint Stiffness',
    description: 'Warm herbal leaf poultice massage ideal for stiffness, sports strain, and joint discomfort.',
  },
  {
    id: 'njavarakizhi',
    name: 'Njavarakizhi',
    malayalamName: 'ഞവരക്കിഴി',
    focus: 'Strength & Rejuvenation',
    description: 'Nourishing massage with warm herbal rice boluses cooked in milk and decoctions.',
  },
  {
    id: 'pizhichil',
    name: 'Pizhichil',
    malayalamName: 'പിഴിച്ചിൽ',
    focus: 'Deep Tissue & Nerve Care',
    description: 'Rhythmic warm medicated oil bath combined with gentle therapeutic strokes.',
  },
  {
    id: 'udwarthanam',
    name: 'Udwarthanam',
    malayalamName: 'ഉത്വർത്തനം',
    focus: 'Metabolism & Toning',
    description: 'Invigorating dry herbal powder massage to stimulate circulation and reduce sluggishness.',
  },
  {
    id: 'nasyam',
    name: 'Nasyam',
    malayalamName: 'നസ്യം',
    focus: 'Sinus, Head & Neck',
    description: 'Medicated nasal drops therapy supporting clarity, sinus relief, and upper respiratory comfort.',
  },
  {
    id: 'kadi-vasthi',
    name: 'Kadi Vasthi',
    malayalamName: 'കടി ബസ്തി',
    focus: 'Lower Back Support',
    description: 'Warm medicated oil retained gently over the lower back to soothe lumbar pain and disc strain.',
  },
  {
    id: 'thalapothichil',
    name: 'Thalapothichil',
    malayalamName: 'തലപൊതിച്ചിൽ',
    focus: 'Cooling & Hair Care',
    description: 'Soothing herbal paste wrap applied to the scalp to cool stress and nourish hair roots.',
  },
  {
    id: 'agnikarma',
    name: 'Agnikarma',
    malayalamName: 'അഗ്നികർമ്മ',
    focus: 'Targeted Pain Relief',
    description: 'Doctor-performed gentle thermal point therapy for stubborn heel pain, tennis elbow, and localized joint aches.',
  },
  {
    id: 'njavaratheppu',
    name: 'Njavaratheppu',
    malayalamName: 'ഞവരത്തേപ്പ്',
    focus: 'Muscle & Nerve Nourishment',
    description: 'Warm medicated Njavara rice paste applied over the body to strengthen weak tissues, calm nerves, and soften skin.',
  },
  {
    id: 'podikizhi',
    name: 'Podikizhi',
    malayalamName: 'പൊടിക്കിഴി',
    focus: 'Swelling & Stiffness Relief',
    description: 'Warm herbal powder poultice massage ideal for reducing joint swelling, body heaviness, and muscular stiffness.',
  },
  {
    id: 'narangakizhi',
    name: 'Narangakizhi',
    malayalamName: 'നാരങ്ങാക്കിഴി',
    focus: 'Frozen Shoulder & Sciatica',
    description: 'Heated herbal bundles prepared with lemon and medicinal oils to ease frozen shoulder, sciatica, and joint pain.',
  },
  {
    id: 'greeva-vasti',
    name: 'Greeva Vasti',
    malayalamName: 'ഗ്രീവ വസ്തി',
    focus: 'Neck & Cervical Care',
    description: 'Warm medicated oil retained gently over the neck to relieve cervical spondylosis, stiffness, and upper-back strain.',
  },
  {
    id: 'januvasti',
    name: 'Januvasti',
    malayalamName: 'ജാനു വസ്തി',
    focus: 'Knee Joint Support',
    description: 'Warm herbal oil pooled comfortably over the knee joint to ease osteoarthritis pain, dryness, and walking discomfort.',
  },
  {
    id: 'lepanam',
    name: 'Lepanam',
    malayalamName: 'ലേപനം',
    focus: 'Inflammation & Swelling',
    description: 'Freshly prepared medicated herbal paste applied locally to reduce joint swelling, heat, and sprain discomfort.',
  },
  {
    id: 'upanaham',
    name: 'Upanaham',
    malayalamName: 'ഉപനാഹം',
    focus: 'Warm Poultice Wrap',
    description: 'Soothing warm herbal poultice bandaged gently over painful joints to relieve stiffness and improve mobility.',
  },
  {
    id: 'ir-light',
    name: 'IR Light Therapy',
    malayalamName: 'ഐ.ആർ ലൈറ്റ് തെറാപ്പി',
    focus: 'Deep Warmth & Recovery',
    description: 'Targeted Infrared (IR) light warmth paired with Ayurvedic care to relax tight muscles and ease chronic joint aches.',
  },
  {
    id: 'panchakarma',
    name: 'Panchakarma',
    malayalamName: 'പഞ്ചകർമ്മ',
    focus: 'Guided Detoxification',
    description: 'Doctor-supervised classical purification therapies customized to your health needs.',
  },
];

export const EYE_TREATMENT_HEAD: TherapyItem = {
  id: 'eye-treatments',
  name: 'Eye Treatments',
  malayalamName: 'നേത്ര ചികിത്സ',
  focus: 'Ayurvedic Eye Care',
  description:
    'Classical Ayurvedic Netra Chikitsa therapies to soothe digital eye strain, dryness, redness, and support clear vision.',
};

export const EYE_TREATMENTS: TherapyItem[] = [
  {
    id: 'tarpanam',
    name: 'Tarpanam',
    malayalamName: 'തർപ്പണം',
    focus: 'Deep Eye Nourishment',
    description:
      'Warm medicated ghee is gently retained around the eyes inside a soft herbal dough ring to lubricate dry eyes, ease strain, and strengthen optic tissues.',
  },
  {
    id: 'sekham',
    name: 'Sekham',
    malayalamName: 'സേകം',
    focus: 'Cooling & Soothing Stream',
    description:
      'Continuous gentle pouring of lukewarm herbal decoction or medicated milk over closed eyelids to calm burning, redness, and eye fatigue.',
  },
  {
    id: 'pindi',
    name: 'Pindi',
    malayalamName: 'പിണ്ഡി',
    focus: 'Swelling & Lid Comfort',
    description:
      'Soft medicated herbal paste poultice wrapped in clean cotton and placed gently over the eyelids to relieve puffiness, itching, and heaviness.',
  },
  {
    id: 'nethra-dhara',
    name: 'Nethra Dhara',
    malayalamName: 'നേത്രധാര',
    focus: 'Herbal Eye Wash',
    description:
      'Gentle cleansing wash of the eyes using cool, filtered herbal decoctions to clear irritation, relieve computer-screen fatigue, and refresh tired eyes.',
  },
];

export const HAIR_TREATMENT_HEAD: TherapyItem = {
  id: 'hair-treatments',
  name: 'Hair Treatments',
  malayalamName: 'കേശ ചികിത്സ',
  focus: 'Scalp & Hair Care',
  description:
    'Herbal, chemical-free Ayurvedic hair and scalp therapies to control dandruff, reduce hair fall, nourish roots, and restore natural shine.',
};

export const HAIR_TREATMENTS: TherapyItem[] = [
  {
    id: 'dandruff-high-frequency',
    name: 'Dandruff Treatment with High Frequency',
    malayalamName: 'താരൻ ചികിത്സ (ഹൈ-ഫ്രീക്വൻസി)',
    focus: 'Scalp Cleansing & Flake Control',
    description:
      'Targeted Ayurvedic scalp cleansing paired with gentle high-frequency stimulation to clear stubborn dandruff, calm itching, and balance scalp oil.',
  },
  {
    id: 'alopecia',
    name: 'Alopecia',
    malayalamName: 'അലോപ്പീസിയ ചികിത്സ',
    focus: 'Hair Regrowth & Root Care',
    description:
      'Doctor-guided Ayurvedic scalp nourishment and follicle-activating therapies designed to address patchy hair loss and strengthen weak hair roots.',
  },
  {
    id: 'hot-oil-treatment',
    name: 'Hot Oil Treatment',
    malayalamName: 'ഹോട്ട് ഓയിൽ ട്രീറ്റ്മെന്റ്',
    focus: 'Deep Root Conditioning',
    description:
      'Warm medicated herbal oils massaged gently into the scalp and hair to improve blood circulation, relieve dryness, and prevent breakage.',
  },
  {
    id: 'henna-treatment',
    name: 'Henna Treatment',
    malayalamName: 'ഹെന്ന ട്രീറ്റ്മെന്റ്',
    focus: 'Cooling & Conditioning',
    description:
      'Freshly prepared Ayurvedic herbal henna pack applied to cool the scalp, add natural body and volume, and leave hair soft and healthy.',
  },
  {
    id: 'natural-hair-dyeing',
    name: 'Natural Hair Dyeing',
    malayalamName: 'നാച്ചുറൽ ഹെയർ ഡൈയിംഗ്',
    focus: 'Chemical-Free Colour',
    description:
      '100% botanical hair colouring using henna, indigo, and traditional herbs for gentle, lasting grey coverage without ammonia or harsh dyes.',
  },
  {
    id: 'protein-treatment',
    name: 'Protein Treatment',
    malayalamName: 'പ്രോട്ടീൻ ട്രീറ്റ്മെന്റ്',
    focus: 'Strength & Repair',
    description:
      'Nourishing herbal protein mask formulated to repair dry, brittle, or thinning hair strands and restore natural elasticity and strength.',
  },
  {
    id: 'herbal-hair-spa',
    name: 'Herbal Hair Spa',
    malayalamName: 'ഹെർബൽ ഹെയർ സ്പാ',
    focus: 'Scalp Relaxation & Shine',
    description:
      'Soothing herbal oil head massage, gentle steam infusion, and revitalizing botanical hair pack to relax the mind and refresh dull hair.',
  },
];

export const SKIN_TREATMENT_HEAD: TherapyItem = {
  id: 'skin-treatments',
  name: 'Skin Treatments',
  malayalamName: 'ത്വക് ചികിത്സ',
  focus: 'Ayurvedic Skin & Blood Purification',
  description:
    'Doctor-guided Ayurvedic herbal packs, targeted skin procedures, and classical blood-purifying therapies for clear, healthy skin.',
};

export const SKIN_TREATMENTS: TherapyItem[] = [
  {
    id: 'pimple-treatment',
    name: 'Pimple Treatment',
    malayalamName: 'മുഖക്കുരു ചികിത്സ',
    focus: 'Acne & Oil Balance',
    description:
      'Soothing herbal face packs, medicated cleansing, and internal dosha-balancing care to calm active pimples and reduce acne marks.',
  },
  {
    id: 'melasma-treatment',
    name: 'Melasma Treatment',
    malayalamName: 'കരിമംഗല്യ ചികിത്സ',
    focus: 'Pigment & Tone Care',
    description:
      'Targeted Ayurvedic herbal lepas and skin-nourishing therapies to gently fade facial melasma patches and restore even skin tone.',
  },
  {
    id: 'hyper-pigmentation',
    name: 'Hyper Pigmentation',
    malayalamName: 'ഹൈപ്പർ പിഗ്മെന്റേഷൻ ചികിത്സ',
    focus: 'Dark Spot Reduction',
    description:
      'Natural brightening herbal pastes and gentle skin renewal care designed to lighten dark patches, sun tan, and uneven pigmentation.',
  },
  {
    id: 'high-frequency-skin',
    name: 'High Frequency Treatments',
    malayalamName: 'ഹൈ-ഫ്രീക്വൻസി സ്കിൻ തെറാപ്പി',
    focus: 'Blemish & Pore Care',
    description:
      'Gentle high-frequency facial therapy paired with Ayurvedic care to cleanse pores, calm acne-prone skin, and improve circulation.',
  },
  {
    id: 'cauterization-mole-warts',
    name: 'Cauterization - Mole, Warts Removal',
    malayalamName: 'മറുക് / അരിമ്പാറ നീക്കം ചെയ്യൽ',
    focus: 'Targeted Spot Removal',
    description:
      'Doctor-performed gentle cauterization procedure for safe, precise removal of unwanted skin tags, moles, and warts.',
  },
  {
    id: 'multiple-cautery',
    name: 'Multiple No.s Cautery',
    malayalamName: 'മൾട്ടിപ്പിൾ കോട്ടറി',
    focus: 'Multiple Skin Tag / Wart Care',
    description:
      'Structured single-session cautery treatment for patients needing safe removal of multiple warts, skin tags, or spots together.',
  },
  {
    id: 'jaloukavacharanam-first',
    name: 'Jaloukavacharanam First Sitting',
    malayalamName: 'ജലൗകാവചരണം — ഒന്നാം സിറ്റിംഗ്',
    focus: 'Classical Raktamokshana',
    description:
      'Initial doctor-supervised Ayurvedic leech therapy session to purify localized impure blood in stubborn acne, eczema, or pigmentation.',
  },
  {
    id: 'jaloukavacharanam-second',
    name: 'Jaloukavacharanam Second Sitting',
    malayalamName: 'ജലൗകാവചരണം — രണ്ടാം സിറ്റിംഗ്',
    focus: 'Follow-Up Raktamokshana',
    description:
      'Follow-up Jaloukavacharanam sitting scheduled after doctor review to sustain blood purification, reduce inflammation, and support healing.',
  },
  {
    id: 'herbal-facial',
    name: 'Herbal Facial',
    malayalamName: 'ഹെർബൽ ഫേഷ്യൽ',
    focus: 'Natural Cleansing & Glow',
    description:
      'Gentle Ayurvedic facial using fresh herbal cleansers, soothing face massage, mild steam, and botanical packs for chemical-free radiance.',
  },
  {
    id: 'njavara-facial',
    name: 'Njavara Facial',
    malayalamName: 'ഞവര ഫേഷ്യൽ',
    focus: 'Deep Skin Nourishment',
    description:
      'Nourishing facial using medicated Njavara rice cooked in herbal milk decoction to soften dry skin, brighten tone, and support elasticity.',
  },
  {
    id: 'veg-peel',
    name: 'Veg Peel',
    malayalamName: 'വെജ് പീൽ',
    focus: 'Gentle Botanical Exfoliation',
    description:
      'Mild, chemical-free plant-based peel to gently lift dead skin cells, smooth uneven texture, and revive dull or tanned skin.',
  },
  {
    id: 'navara-body-pack',
    name: 'Navara Body Pack',
    malayalamName: 'ഞവര ബോഡി പാക്ക്',
    focus: 'Full-Body Nourishment',
    description:
      'Warm medicated Navara rice herbal paste gently applied across the body to deeply nourish dry skin, soften texture, and restore radiance.',
  },
  {
    id: 'sandal-body-pack',
    name: 'Sandal Body Pack',
    malayalamName: 'ചന്ദന ബോഡി പാക്ക്',
    focus: 'Cooling & Skin Radiance',
    description:
      'Traditional sandalwood and Ayurvedic herbal body pack to cool excess heat, soothe sun tan or irritation, and brighten skin naturally.',
  },
];

export const FOOT_TREATMENT_HEAD: TherapyItem = {
  id: 'foot-treatments',
  name: 'Foot',
  malayalamName: 'പാദ ചികിത്സ',
  focus: 'Foot, Hand & Nail Care',
  description:
    'Therapeutic Ayurvedic foot, nail, and hand care treatments along with gentle wart removal and localized blood purification.',
};

export const FOOT_TREATMENTS: TherapyItem[] = [
  {
    id: 'foot-pedicure',
    name: 'Pedicure',
    malayalamName: 'പെഡിക്യൂർ',
    focus: 'Foot & Heel Care',
    description:
      'Gentle herbal foot soak, heel exfoliation, nail shaping, and soothing Ayurvedic oil foot massage to refresh tired feet.',
  },
  {
    id: 'foot-manicure',
    name: 'Manicure',
    malayalamName: 'മാനിക്യൂർ',
    focus: 'Hand & Nail Care',
    description:
      'Warm herbal hand soak, cuticle care, gentle exfoliation, and nourishing oil massage for soft hands and healthy nails.',
  },
  {
    id: 'foot-high-frequency',
    name: 'High Frequency Treatments',
    malayalamName: 'ഹൈ-ഫ്രീക്വൻസി തെറാപ്പി',
    focus: 'Targeted Foot & Skin Care',
    description:
      'Gentle high-frequency stimulation paired with Ayurvedic herbal care to improve local circulation, cleanse skin, and support healing.',
  },
  {
    id: 'foot-cauterization',
    name: 'Cauterization - Mole, Warts Removal',
    malayalamName: 'മറുക് / അരിമ്പാറ നീക്കം ചെയ്യൽ',
    focus: 'Wart & Corn Removal',
    description:
      'Doctor-performed gentle cauterization procedure for safe, precise removal of warts, corns, and moles on the feet or hands.',
  },
  {
    id: 'foot-multiple-cautery',
    name: 'Multiple No.s Cautery',
    malayalamName: 'മൾട്ടിപ്പിൾ കോട്ടറി',
    focus: 'Multiple Warts / Corns Care',
    description:
      'Structured single-session cautery treatment for safe removal of multiple warts, corns, or skin tags together.',
  },
  {
    id: 'foot-jaloukavacharanam-first',
    name: 'Jaloukavacharanam First Sitting',
    malayalamName: 'ജലൗകാവചരണം — ഒന്നാം സിറ്റിംഗ്',
    focus: 'Classical Raktamokshana',
    description:
      'Initial doctor-supervised Ayurvedic leech therapy session to relieve localized swelling, venous congestion, or stubborn foot skin issues.',
  },
  {
    id: 'foot-jaloukavacharanam-second',
    name: 'Jaloukavacharanam Second Sitting',
    malayalamName: 'ജലൗകാവചരണം — രണ്ടാം സിറ്റിംഗ്',
    focus: 'Follow-Up Raktamokshana',
    description:
      'Follow-up Jaloukavacharanam sitting scheduled after doctor review to sustain healthy blood flow, reduce inflammation, and support healing.',
  },
];

export const DIET_CONSULTATION_HEAD: TherapyItem = {
  id: 'diet-consultation',
  name: 'Diet Consultation',
  malayalamName: 'ആഹാരക്രമ കൺസൾട്ടേഷൻ',
  focus: '1-Month Diet Chart · Start your journey with Dr. Anagha',
  description:
    'Personalized 1-month Ayurvedic diet chart with complete body assessment, weekly menu rotation, condition-based food modifications, and daily follow-up.',
};

export const DIET_CONSULTATION_FEATURES: string[] = [
  'Complete Body Assessment',
  'Weekly Menu Rotation',
  'Diet Modifications Based on Health Conditions',
  'Food List',
  'Portion Size Guidance',
  'Daily Follow-up',
  'Lifestyle Modification Guidelines',
  'Detox Support',
];

export interface DietMealSlot {
  id: 'breakfast' | 'mid-morning' | 'lunch' | 'evening' | 'dinner';
  label: string;
}

export const DIET_MEAL_SCHEDULE: DietMealSlot[] = [
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'mid-morning', label: 'Mid-Morning Snack' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'evening', label: 'Evening Snack' },
  { id: 'dinner', label: 'Dinner' },
];

export const EDUCATIONAL_POSTERS: ClinicPosterItem[] = [
  {
    id: 'take-what-you-need',
    title: 'Pick Individual Therapies',
    malayalamTitle: 'നിങ്ങൾക്ക് ആവശ്യമുള്ളത് തിരഞ്ഞെടുക്കാം',
    caption: 'Doctor consultation, head, face, foot or full body massage, Shirodhara, steam bath, Nethradhara & Dhumapanam.',
    image: '/assets/aistudio/Untitled_-_21_September_2026_at_14.30.51_06eb11bd.png',
    options: [
      'Doctor Consultation (ഡോക്ടർ കൺസൾട്ടേഷൻ)',
      'Head Massage (ഹെഡ് മസാജ്)',
      'Face Massage (ഫെയ്‌സ് മസാജ്)',
      'Foot Massage (ഫുട്ട് മസാജ്)',
      'Full Body Massage (ഫുൾ ബോഡി മസാജ്)',
      'Shirodhara (ശിരോധാര)',
      'Medicated Steam Bath (സ്റ്റീം ബാത്ത്)',
      'Nethradhara (നേത്രധാര)',
      'Dhumapanam (ധൂമപാനം)',
    ],
  },
  {
    id: 'ayurveda-healing',
    title: 'Healing & Rejuvenation',
    malayalamTitle: 'ആയുർവേദവും സമ്പൂർണ്ണ ആരോഗ്യവും',
    caption: 'Why classical Ayurveda remains one of the most gentle and thorough ways to restore everyday health.',
    image: '/assets/aistudio/Untitled_-_11_August_2026_at_13.02.39-1_6e515b79.png',
  },
  {
    id: 'our-promise',
    title: 'Why SriSri Ayurveda',
    malayalamTitle: 'നിങ്ങളിലേക്കുള്ള ഒരു പുനർബന്ധം',
    caption: 'Qualified doctors, authentic Kerala Ayurveda, personalized treatment plans, and tradition paired with clean clinic facilities.',
    image: '/assets/aistudio/Untitled_-_11_August_2026_at_13.02.39-4_b9659ccb.png',
  },
  {
    id: 'holistic-balance',
    title: 'Whole-Body Balance',
    malayalamTitle: 'സമ്പൂർണ്ണ ശാരീരിക സന്തുലിതാവസ്ഥ',
    caption: 'Supporting nervous, digestive, musculoskeletal, circulatory, respiratory, immune, endocrine, lymphatic, reproductive & skin health.',
    image: '/assets/aistudio/Untitled_-_11_August_2026_at_13.02.39-2_c080249f.png',
  },
  {
    id: 'rhythmic-massage',
    title: 'Path of Rhythmic Massage',
    malayalamTitle: 'താളാത്മകമായ മസാജിന്റെ വഴി',
    caption: 'From daily stress and tension to slowing down, soothing touch, deep rest, calm breathing, and mindful self-care.',
    image: '/assets/aistudio/Untitled_-_11_August_2026_at_13.02.39-3_4fe08956.png',
  },
];

export interface ClinicGalleryItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  objectPositionClass: string;
}

export const CLINIC_GALLERY_IMAGES: ClinicGalleryItem[] = [
  {
    id: 'clinic-exterior',
    title: 'Clinic Exterior',
    caption: 'Pullat Lane, near Thiruvambady Temple, Thrissur',
    image: '/assets/aistudio/unnamed_ebe50dc5.webp',
    objectPositionClass: 'object-center',
  },
  {
    id: 'clinic-reception',
    title: 'Reception & Pharmacy',
    caption: 'Welcoming waiting area & SriSri Ayurveda formulations',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_8.40.06_PM__1__684347c5.jpeg',
    objectPositionClass: 'object-center',
  },
  {
    id: 'panchakarma-room',
    title: 'Therapy Room & Droni',
    caption: 'Traditional wooden Droni table & brass Shirodhara setup',
    image: '/assets/aistudio/unnamed__1__09b47520.webp',
    objectPositionClass: 'object-[center_55%]',
  },
  {
    id: 'steam-chamber',
    title: 'Herbal Steam Chamber',
    caption: 'Clean, private Swedana steam room for post-therapy care',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_8.40.09_PM_585bc89e.jpeg',
    objectPositionClass: 'object-[center_35%]',
  },
];

export interface DoctorAchievementItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  imageClass: string;
}

export const DOCTOR_ACHIEVEMENTS: DoctorAchievementItem[] = [
  {
    id: 'mahila-ratna-memento',
    title: 'Mahila Ratna Award',
    caption: 'Dr. Anagha Aswin (BAMS, PGDACT, PGDAN) — Chief Consultant, SriSri Ayurveda Thrissur',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_10.57.39_AM_0174a65e.jpeg',
    imageClass: 'object-contain bg-[#F2F4F0]',
  },
  {
    id: 'mahila-ratna-presentation',
    title: 'Mahila Ratna Recognition',
    caption: 'Award presentation ceremony honouring clinical dedication in Ayurveda',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_10.57.11_AM_c1e24958.jpeg',
    imageClass: 'object-cover object-[center_20%]',
  },
  {
    id: 'pgdan-diploma',
    title: 'PG Diploma in Ayurveda Nutrition',
    caption: 'Graduating with Post Graduate Diploma in Ayurveda Nutrition (PGDAN)',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_10.57.13_AM__1__b1f96101.jpeg',
    imageClass: 'object-cover object-[center_18%]',
  },
  {
    id: 'convocation-medal',
    title: 'Convocation Medal & Honours',
    caption: 'Receiving convocation medal and academic certification on stage',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_10.57.13_AM_7535edc0.jpeg',
    imageClass: 'object-cover object-[center_20%]',
  },
  {
    id: 'thalikulam-felicitation',
    title: 'Thalikulam Grama Panchayat Honour',
    caption: 'Civic felicitation recognizing excellence in BAMS & community care',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_10.57.11_AM__2__bba47d09.jpeg',
    imageClass: 'object-cover object-[center_20%]',
  },
  {
    id: 'thalikulam-memento',
    title: 'Snehadaram Civic Memento',
    caption: 'Bachelor of Ayurvedic Medicine & Surgery academic excellence honour',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_10.57.36_AM_f737fac0.jpeg',
    imageClass: 'object-contain bg-[#F2F4F0]',
  },
  {
    id: 'bls-engandiyur-2022',
    title: 'BLS Engandiyur Honour (2022)',
    caption: 'Public recognition for community health outreach in Engandiyur',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_10.57.12_AM__1__65c0bc16.jpeg',
    imageClass: 'object-cover object-[center_20%]',
  },
  {
    id: 'bls-ponnada-felicitation',
    title: 'Traditional Ponnada Felicitation',
    caption: 'Honoured at the BLS Engandiyur 10th anniversary celebration',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_10.57.12_AM_2ecf164c.jpeg',
    imageClass: 'object-cover object-[center_20%]',
  },
  {
    id: 'community-award-2023',
    title: 'Community Service Award (2023)',
    caption: 'Felicitation with traditional shawl and merit memento',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_10.57.12_AM__2__be19e8ec.jpeg',
    imageClass: 'object-cover object-[center_20%]',
  },
  {
    id: 'free-ayurveda-camp',
    title: 'Free Ayurveda Medical Camp',
    caption: 'Medical consultation & free medicine distribution camp in Anthikkad',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_10.57.11_AM__1__1a1a6ce0.jpeg',
    imageClass: 'object-contain bg-[#F2F4F0]',
  },
];

export interface GoogleReviewItem {
  id: string;
  rating: number;
  timeAgo: string;
  authorLabel: string;
  text: string;
}

export const GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: 'review-12',
    rating: 5,
    timeAgo: '18 hours ago',
    authorLabel: 'Google Review · Abhyanga Therapy',
    text: 'Had a very relaxing experience with Abhyanga. Thanks to Dr Anagha and therapist Devika.',
  },
  {
    id: 'review-1',
    rating: 5,
    timeAgo: '3 days ago',
    authorLabel: 'Google Review · Shoulder Pain Care',
    text: 'I had a very positive experience at Sri Sri Ayurveda and Wellness Centre. I visited the centre for treatment of shoulder pain, and Dr. Anagha Ashwin took the time to understand my problems and recommend an appropriate five-day treatment plan. After completing the treatment, I experienced a considerable reduction in stiffness and a noticeable improvement in my ability to move my arms and shoulders.',
  },
  {
    id: 'review-2',
    rating: 5,
    timeAgo: '26 weeks ago',
    authorLabel: 'Google Review · Full Body Massage',
    text: 'Even though it was a holiday, Dr. Anagha Aswin came specially for us, which truly showed her dedication and kindness. The massage was done by Suma Chechi, and she took excellent care of every part of the body. I have experienced many expensive resort-based massages before, but compared to those, this session was much more affordable and equally relaxing, if not better.',
  },
  {
    id: 'review-3',
    rating: 5,
    timeAgo: '20 weeks ago',
    authorLabel: 'Google Review · Home Service',
    text: 'Empathetic and effective. My mom was well looked after by the Sri Sri Ayurveda team who were mindful of her advanced age and reluctance to visit the center for her sessions. By their willingness to help and adapt, mom managed to have the sessions at home with excellent response. Grateful to Dr Anagha, Suma the therapist and other team members.',
  },
  {
    id: 'review-4',
    rating: 5,
    timeAgo: '6 weeks ago',
    authorLabel: 'Google Review · Wellness Massage',
    text: 'I had a wonderful experience with Dr. Anagha and her Ayurvedic treatment. The wellness body massage was truly relaxing and rejuvenating. It helped me feel refreshed, relaxed, and energetic, while also giving my mind a sense of calm. Dr. Anagha is very caring, professional, and attentive throughout the treatment.',
  },
  {
    id: 'review-5',
    rating: 5,
    timeAgo: '27 weeks ago',
    authorLabel: 'Google Review · Weight Management',
    text: 'I consulted Sri Sri Ayurveda wellness center for weight loss and with the help of Dr. Anagha, I was able to do it. She gave her continuous support, guidance and her follow-ups helped me so much. With the diet chart, exercise and yoga, one can easily reduce 5 to 7 kg weight in a healthy way in a month! Highly recommended!',
  },
  {
    id: 'review-6',
    rating: 4,
    timeAgo: '3 weeks ago',
    authorLabel: 'Google Review · Outpatient Therapy',
    text: 'Great experience with SriSri Ayurveda Clinic. Dr Anagha is very professional, listening to all the health problems with patience, prescribing the right therapy, and educating with the instructions to be followed. Therapist rendered her duty sincerely. Warm pleasing welcome in the reception is commendable. Very good place for daycare outpatient therapy.',
  },
  {
    id: 'review-7',
    rating: 5,
    timeAgo: '14 weeks ago',
    authorLabel: 'Google Review · Patient Care',
    text: 'Exceptional care from start to finish! Dr. Anagha Aswin is simply wonderful—knowledgeable, compassionate, and attentive. The staff is equally superb, kind, and professional. Truly top-notch care!',
  },
  {
    id: 'review-8',
    rating: 5,
    timeAgo: '7 weeks ago',
    authorLabel: 'Valson · Google Review',
    text: 'Namaste Madam, I would like to express my happiness with your treatment. There is considerable improvement on the skin issues on the little finger on my left foot within 4 days of treatment. Earlier I used to experience severe pain. Now the pain has reduced considerably and my foot has become more flexible than before. Om Shanti, Valson.',
  },
  {
    id: 'review-9',
    rating: 5,
    timeAgo: '7 weeks ago',
    authorLabel: 'Google Review · Rejuvenation',
    text: 'Had a really good experience with the rejuvenation treatment at Sri Sri Ayurveda Wellness Centre. The treatment was relaxing and I genuinely enjoyed the experience. Dr. Anagha was very friendly and also explained a few other health concerns and gave helpful suggestions. Overall, a great experience!',
  },
  {
    id: 'review-10',
    rating: 5,
    timeAgo: '2 weeks ago',
    authorLabel: 'Google Review · Clinic Visit',
    text: 'Good experience... relation good.',
  },
  {
    id: 'review-11',
    rating: 5,
    timeAgo: '4 days ago',
    authorLabel: 'Google Review · Clinic Visit',
    text: 'Nice experience.',
  },
];
