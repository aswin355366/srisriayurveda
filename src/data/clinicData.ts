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
  malayalamNote?: string;
  highlights: string[];
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
  googleBusinessUrl: 'https://share.google/lerZByQwKda1jb3hD',
  googleRating: '4.9',
  logoImage: '/assets/aistudio/Logo_3da16dce.png',
  locationMapImage: '/assets/aistudio/Location_6fcacb65.png',
  googleBadgeImage: '/assets/aistudio/6b2c67fd-3b29-45ba-b593-f65245c12614_c0214ad0.jpg',
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
    id: 'one-day-break',
    name: 'One-Day Wellness Break',
    malayalamName: 'വൺ-ഡേ പാക്കേജ്',
    category: 'one-day',
    categoryLabel: 'One-Day Reset',
    setting: 'At Clinic · Stress Relief & Daily Detox',
    summary:
      'Designed for busy working individuals and families who want a calm single-day pause to restore energy and relieve body stiffness.',
    malayalamNote: 'ശരീരത്തിനും മനസ്സിനും പൂർണ്ണ ഉന്മേഷം',
    highlights: [
      'Abhyangam (Traditional Ayurvedic oil massage)',
      'Medicated Steam Bath for detox & relaxation',
      'Mukhalepam (Natural Ayurvedic herbal facial)',
      'Supports stress relief, freshness & vitality',
    ],
    poster: '/assets/aistudio/Untitled_-_02_February_2026_at_17.14.13__3___1___1___1___2___1___16__9943f644.png',
    secondaryPoster: '/assets/aistudio/Untitled_-_July_24__2026_at_10.32.22__3__74ec13b7.png',
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
    malayalamNote: 'ശരീര ശുദ്ധീകരണത്തിനും പ്രതിരോധശേഷിക്കും',
    highlights: [
      'Doctor Consultation, Yogasanas & Pranayama',
      'Full Body, Head, Face & Foot Massage',
      'Dhumapanam & Nethradhara (Eye nourishment)',
      'Medicated Steam Bath',
    ],
    poster: '/assets/aistudio/A_new_2fb88559.png',
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
    highlights: [
      'Doctor Consultation & Herbal Tea',
      'Full Body, Head, Face & Foot Massage (Special Oil)',
      'Shirodhara (Kashaya Dhara) & Thalam',
      'Nethradhara, Dhumapanam & Steam Bath',
    ],
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
    highlights: [
      'Doctor Consultation & Herbal Tea',
      'Full Body, Head, Face & Foot Massage (Special Oil)',
      'Kizhi (Herbal poultice fomentation) & Thalam',
      'Nethradhara, Dhumapanam & Steam Bath',
    ],
    poster: '/assets/aistudio/Untitled_-_August_30__2026_at_09.55.08_f2b03e4e.png',
  },
  {
    id: 'punarjani',
    name: 'Punarjani Rejuvenation',
    malayalamName: 'പുനർജനി പാക്കേജ്',
    category: 'rejuvenation',
    categoryLabel: 'Essential Rejuvenation',
    setting: 'At Clinic · 6-Step Care',
    summary:
      'A straightforward, approachable rejuvenation package covering essential head-to-foot oil therapies and steam under doctor guidance.',
    malayalamNote: 'ശരീര ശുദ്ധീകരണത്തിനും പ്രതിരോധശേഷിക്കും',
    highlights: [
      'Doctor Consultation',
      'Full Body Massage',
      'Head, Face & Foot Massage',
      'Medicated Steam Bath',
    ],
    poster: '/assets/aistudio/P_New_2ba61d54.png',
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
    highlights: [
      'Doctor Consultation',
      'Ayurvedic Face Pack & Ayurvedic Hair Pack',
      'Full Body, Head & Face Massage',
      'Foot Massage (Special Oil) & Medicated Steam Bath',
    ],
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
    highlights: [
      'Doctor Consultation & Herbal Tea',
      'Full Body, Head, Face & Foot Massage',
      'Ayurvedic Face Pack & Nethradhara',
      'Medicated Steam Bath',
    ],
    poster: '/assets/aistudio/Untitled_-_01_October_2026_at_11.33.32_56e880a3.png',
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
    malayalamNote: 'സന്ധികൾക്ക് കരുത്തേകാം, ആത്മവിശ്വാസത്തോടെ മുന്നോട്ട് നടക്കാം',
    highlights: [
      'Doctor Consultation, Medicines & Diet Regulation',
      'Uzhichil, Vasthi, Kizhi & Lepanam',
      'Guided Exercise, Yoga & Pranayama',
      'Infrared (IR) Therapy support',
    ],
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
    malayalamNote: 'അമ്മയുടെയും കുഞ്ഞിന്റെയും ആരോഗ്യ സംരക്ഷണം ഇനി നിങ്ങളുടെ വീട്ടിൽ',
    highlights: [
      'Full Body, Head, Face Massage, Face & Body Pack',
      'Vethukuli (Medicated Water Bath) & Udaraveshtanam (Abdominal Binding)',
      'Podikkizhi, Anjanam, Keshadhupanam / Yonidhupanam',
      'Baby Massage & Baby Bath, Systematic Diet, Online Yoga & Counseling',
    ],
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
    highlights: [
      'Home Wellness Packages & Geriatric Wellness',
      'Back Pain & Disc Issue Care',
      'Joint Care & Neuro-Muscular Disorders',
      'Post-Delivery Care (Prasavaraksha)',
    ],
    poster: '/assets/aistudio/Untitled_-_13_July_2026_at_14.39.38_965bb50e.png',
    secondaryPoster: '/assets/aistudio/home_service_new_9f602148.png',
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
    id: 'panchakarma',
    name: 'Panchakarma',
    malayalamName: 'പഞ്ചകർമ്മ',
    focus: 'Guided Detoxification',
    description: 'Doctor-supervised classical purification therapies customized to your health needs.',
  },
];

export const EDUCATIONAL_POSTERS: ClinicPosterItem[] = [
  {
    id: 'take-what-you-need',
    title: 'Pick Individual Therapies',
    malayalamTitle: 'നിങ്ങൾക്ക് ആവശ്യമുള്ളത് തിരഞ്ഞെടുക്കാം',
    caption: 'Doctor consultation, head, face, foot or full body massage, Shirodhara, steam bath, Nethradhara & Dhumapanam.',
    image: '/assets/aistudio/Untitled_-_21_September_2026_at_14.30.51_06eb11bd.png',
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
  {
    id: 'ayurveda-healing',
    title: 'Healing & Rejuvenation',
    malayalamTitle: 'ആയുർവേദവും സമ്പൂർണ്ണ ആരോഗ്യവും',
    caption: 'Why classical Ayurveda remains one of the most gentle and thorough ways to restore everyday health.',
    image: '/assets/aistudio/Untitled_-_11_August_2026_at_13.02.39-1_6e515b79.png',
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
