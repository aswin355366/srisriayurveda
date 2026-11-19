import { useState, useRef, type FormEvent } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  Calendar,
  ExternalLink,
  ZoomIn,
  Menu,
  X,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Home,
  Star,
  Pause,
  Play,
} from 'lucide-react';
import {
  CLINIC_INFO,
  PACKAGE_FILTERS,
  WELLNESS_PACKAGES,
  INDIVIDUAL_THERAPIES,
  EDUCATIONAL_POSTERS,
  GOOGLE_REVIEWS,
  type PackageCategory,
} from './data/clinicData';
import { PosterModal } from './components/PosterModal';

interface ActiveModalState {
  title: string;
  subtitle?: string;
  image: string;
  packageIdForBooking?: string;
}

const HERO_SPOTLIGHT_OPTIONS = [
  {
    id: 'one-day-break',
    label: 'One-Day Break',
    title: 'One-Day Wellness Break',
    subtitle: 'Abhyangam, Steam & Mukhalepam · വൺ-ഡേ പാക്കേജ്',
    image:
      '/assets/aistudio/Untitled_-_02_February_2026_at_17.14.13__3___1___1___1___2___1___16__9943f644.png',
  },
  {
    id: 'ayur-glow',
    label: 'Ayur Glow',
    title: 'Ayur Glow Rejuvenation Package',
    subtitle: '10-Step Body Purification & Immunity Care',
    image: '/assets/aistudio/A_new_2fb88559.png',
  },
  {
    id: 'harmony-mind-body',
    label: 'Harmony',
    title: 'Harmony Mind & Body Package',
    subtitle: '11-Step Shirodhara & Special Oil Care',
    image:
      '/assets/aistudio/Untitled_-_08_September_2026_at_13.42.50_302e8469.png',
  },
];

export default function App() {
  const [selectedFilter, setSelectedFilter] = useState<PackageCategory>('all');
  const [reviewsPaused, setReviewsPaused] = useState(false);
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);
  const [secondaryPosterToggle, setSecondaryPosterToggle] = useState<
    Record<string, boolean>
  >({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalPoster, setModalPoster] = useState<ActiveModalState | null>(null);

  // Booking form state
  const bookingSectionRef = useRef<HTMLDivElement>(null);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [selectedService, setSelectedService] = useState(
    'One-Day Wellness Break (വൺ-ഡേ പാക്കേജ്)'
  );
  const [visitType, setVisitType] = useState<'clinic' | 'home'>('clinic');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');
  const [submittedRequest, setSubmittedRequest] = useState<{
    name: string;
    phone: string;
    service: string;
    visitType: 'clinic' | 'home';
    date: string;
    notes: string;
  } | null>(null);

  const filteredPackages =
    selectedFilter === 'all'
      ? WELLNESS_PACKAGES
      : WELLNESS_PACKAGES.filter((pkg) => pkg.category === selectedFilter);

  const handleSelectForBooking = (
    serviceLabel: string,
    mode: 'clinic' | 'home' = 'clinic'
  ) => {
    setSelectedService(serviceLabel);
    setVisitType(mode);
    setSubmittedRequest(null);
    setFormError('');
    bookingSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanedName = patientName.trim();
    const digitsOnly = patientPhone.replace(/\D/g, '');

    if (cleanedName.length < 2) {
      setFormError('Please enter your full name.');
      return;
    }
    if (digitsOnly.length < 10) {
      setFormError('Please enter a valid 10-digit phone number.');
      return;
    }

    setFormError('');
    setSubmittedRequest({
      name: cleanedName,
      phone: digitsOnly,
      service: selectedService,
      visitType,
      date: preferredDate || 'Flexible / Next available',
      notes: notes.trim(),
    });
  };

  const buildWhatsAppHref = (req: NonNullable<typeof submittedRequest>) => {
    const lines = [
      `Namaskaram SriSri Ayurveda Thrissur,`,
      `I would like to book an appointment:`,
      `• Name: ${req.name}`,
      `• Phone: ${req.phone}`,
      `• Package / Therapy: ${req.service}`,
      `• Visit Type: ${req.visitType === 'home' ? 'Home Service' : 'At Clinic (Pullat Ln)'}`,
      `• Preferred Date: ${req.date}`,
    ];
    if (req.notes) {
      lines.push(`• Notes: ${req.notes}`);
    }
    return `${CLINIC_INFO.whatsappBase}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const activeHeroSlide = HERO_SPOTLIGHT_OPTIONS[heroSlideIdx];

  return (
    <div id="top" className="min-h-screen bg-[#FAFAF7] text-[#1A241E]">
      {/* Top Bar Contract: Brand wordmark — 4-5 nav links — 1 primary CTA */}
      <header className="sticky top-0 z-40 border-b border-[#E2E6DF] bg-[#FAFAF7]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
          <a
            href="#top"
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4631]"
          >
            <img
              src={CLINIC_INFO.logoImage}
              alt="SriSri Ayurveda logo"
              referrerPolicy="no-referrer"
              className="h-9 w-9 rounded-md object-contain"
            />
            <span className="font-display text-lg font-semibold tracking-tight text-[#1A241E]">
              {CLINIC_INFO.brandShort}
            </span>
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-[#3F4B43]"
          >
            <a
              href="#packages"
              className="hover:text-[#1E4631] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Packages
            </a>
            <a
              href="#therapies"
              className="hover:text-[#1E4631] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Therapies
            </a>
            <a
              href="#home-care"
              className="hover:text-[#1E4631] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Home Care
            </a>
            <a
              href="#posters"
              className="hover:text-[#1E4631] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Clinic Posters
            </a>
            <a
              href="#location"
              className="hover:text-[#1E4631] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Location
            </a>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#book"
              className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#1E4631] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#163625] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4631]"
            >
              Book Visit
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E6DF] text-[#1A241E] md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-[#E2E6DF] bg-[#FAFAF7] px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-3 text-sm font-medium text-[#1A241E]">
              <a
                href="#packages"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#1E4631]"
              >
                Wellness Packages
              </a>
              <a
                href="#therapies"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#1E4631]"
              >
                Individual Therapies
              </a>
              <a
                href="#home-care"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#1E4631]"
              >
                Home Service & Prasavaraksha
              </a>
              <a
                href="#posters"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#1E4631]"
              >
                Clinic Posters
              </a>
              <a
                href="#location"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#1E4631]"
              >
                Location & Hours
              </a>
              <a
                href="#book"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-1 inline-flex items-center justify-center rounded-lg bg-[#1E4631] px-4 py-2.5 text-sm font-medium text-white"
              >
                Book Visit
              </a>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-4 pt-8 pb-12 sm:px-6 lg:px-8 lg:pt-12 lg:pb-14">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Hero Copy */}
            <div className="flex flex-col justify-center lg:col-span-7">
              <p className="text-sm font-medium text-[#556158]">
                {CLINIC_INFO.brandFull} · {CLINIC_INFO.malayalamBrand} · Thrissur
              </p>

              <h1
                className="mt-3 font-display font-semibold tracking-tight text-[#1A241E] text-balance"
                style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3.25rem)', lineHeight: 1.12 }}
              >
                Friendly, traditional Kerala Ayurveda wellness packages close to home.
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#3F4B43]">
                A small, welcoming neighbourhood Ayurveda clinic near Thiruvambady Temple, Thrissur,
                led by <strong className="font-semibold text-[#1A241E]">{CLINIC_INFO.doctorName}</strong>.
                We focus on practical wellness packages, single-day stress breaks, joint care, and gentle
                home visits—honest care for everyday families without luxury spa markups.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a
                  href="#packages"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#1E4631] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#163625] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4631]"
                >
                  Explore Wellness Packages
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={CLINIC_INFO.telHref}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#D4DAD0] bg-white px-4 py-3 text-sm font-medium text-[#1A241E] transition-colors hover:bg-[#F2F4F0] whitespace-nowrap shrink-0"
                >
                  <Phone className="h-4 w-4 text-[#1E4631]" />
                  Call {CLINIC_INFO.phoneDisplay}
                </a>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-[#556158]">
                <span>Pullat Lane, near Thiruvambady Temple</span>
                <span aria-hidden="true">·</span>
                <span>{CLINIC_INFO.googleRating} Stars on Google Reviews</span>
                <span aria-hidden="true">·</span>
                <span>Clinic & Home Visits</span>
              </div>
            </div>

            {/* Hero Visual Spotlight */}
            <div className="lg:col-span-5">
              <div className="flex h-full flex-col justify-between rounded-xl border border-[#1C402B] bg-[#1C402B] p-4 text-white">
                <div className="flex items-center justify-between gap-2 pb-3">
                  <span className="text-xs font-medium text-white/85 truncate">
                    {activeHeroSlide.title}
                  </span>
                  <div className="flex items-center gap-1 rounded-lg bg-white/10 p-1">
                    {HERO_SPOTLIGHT_OPTIONS.map((opt, idx) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setHeroSlideIdx(idx)}
                        className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                          heroSlideIdx === idx
                            ? 'bg-white text-[#1C402B]'
                            : 'text-white/80 hover:text-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setModalPoster({
                      title: activeHeroSlide.title,
                      subtitle: activeHeroSlide.subtitle,
                      image: activeHeroSlide.image,
                      packageIdForBooking: activeHeroSlide.title,
                    })
                  }
                  className="group relative flex flex-1 items-center justify-center overflow-hidden rounded-lg bg-[#163423] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-label={`View full poster for ${activeHeroSlide.title}`}
                >
                  <img
                    src={activeHeroSlide.image}
                    alt={activeHeroSlide.title}
                    referrerPolicy="no-referrer"
                    className="max-h-[380px] w-full object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                  />
                  <span className="absolute right-2.5 bottom-2.5 inline-flex items-center gap-1.5 rounded-md bg-black/65 px-2.5 py-1 text-xs font-medium text-white">
                    <ZoomIn className="h-3.5 w-3.5" />
                    View Poster
                  </span>
                </button>

                <div className="mt-3 flex items-center justify-between gap-3 pt-1 text-xs text-white/80">
                  <span className="truncate">{activeHeroSlide.subtitle}</span>
                  <button
                    type="button"
                    onClick={() => handleSelectForBooking(activeHeroSlide.title)}
                    className="font-medium text-white underline underline-offset-4 hover:text-white/90 whitespace-nowrap shrink-0"
                  >
                    Book This
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4-Column Quick Overview Strip below Hero Split */}
          <div className="mt-10 grid grid-cols-2 divide-y divide-[#E2E6DF] rounded-xl border border-[#E2E6DF] bg-[#F2F4F0]/70 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            <div className="px-5 py-4">
              <div className="font-display text-xl font-semibold tabular-nums text-[#1A241E]">
                4.9 / 5
              </div>
              <div className="mt-0.5 text-xs text-[#556158]">
                Google Reviews rating
              </div>
            </div>
            <div className="px-5 py-4">
              <div className="font-display text-xl font-semibold tabular-nums text-[#1A241E]">
                {WELLNESS_PACKAGES.length} Packages
              </div>
              <div className="mt-0.5 text-xs text-[#556158]">
                One-day, rejuvenation & care
              </div>
            </div>
            <div className="px-5 py-4">
              <div className="font-display text-xl font-semibold text-[#1A241E]">
                {CLINIC_INFO.doctorName}
              </div>
              <div className="mt-0.5 text-xs text-[#556158]">
                Doctor-guided consultation
              </div>
            </div>
            <div className="px-5 py-4">
              <div className="font-display text-xl font-semibold text-[#1A241E]">
                Clinic & Home
              </div>
              <div className="mt-0.5 text-xs text-[#556158]">
                Pullat Ln, Thiruvambady
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Wellness Packages (Core Focus) */}
        <section
          id="packages"
          className="border-t border-[#E2E6DF] bg-white py-14 sm:py-16"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-wide text-[#B45F27] uppercase">
                  Wellness Packages
                </p>
                <h2 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-[#1A241E] sm:text-3xl text-balance">
                  Doctor-guided wellness & care packages
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#3F4B43] sm:text-base">
                  Whether you have a single afternoon to unwind or need dedicated support for
                  joints, hair, women&apos;s health, or post-delivery recovery, choose a package or
                  ask {CLINIC_INFO.doctorName} to tailor one for you.
                </p>
              </div>

              {/* Interactive Segmented Filter Controls */}
              <div
                role="tablist"
                aria-label="Filter wellness packages"
                className="flex flex-wrap items-center gap-1.5 rounded-lg bg-[#F2F4F0] p-1"
              >
                {PACKAGE_FILTERS.map((filter) => {
                  const isActive = selectedFilter === filter.id;
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-white text-[#1A241E] shadow-xs'
                          : 'text-[#556158] hover:text-[#1A241E]'
                      }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Package Cards Grid */}
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
              {filteredPackages.map((pkg) => {
                const showingSecondary =
                  Boolean(pkg.secondaryPoster) && Boolean(secondaryPosterToggle[pkg.id]);
                const displayedPoster =
                  showingSecondary && pkg.secondaryPoster
                    ? pkg.secondaryPoster
                    : pkg.poster;
                const isHomeCategory = pkg.category === 'home-care';

                return (
                  <article
                    key={pkg.id}
                    className="flex flex-col overflow-hidden rounded-xl border border-[#E2E6DF] bg-[#FAFAF7]"
                  >
                    {/* Poster Visual Frame */}
                    <div className="relative bg-[#F2F4F0] p-4">
                      <button
                        type="button"
                        onClick={() =>
                          setModalPoster({
                            title: pkg.name,
                            subtitle: pkg.malayalamName
                              ? `${pkg.malayalamName} · ${pkg.setting}`
                              : pkg.setting,
                            image: displayedPoster,
                            packageIdForBooking: `${pkg.name}${pkg.malayalamName ? ` (${pkg.malayalamName})` : ''}`,
                          })
                        }
                        className="group relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-[#1C402B]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4631]"
                        aria-label={`Enlarge poster for ${pkg.name}`}
                      >
                        <img
                          src={displayedPoster}
                          alt={`${pkg.name} clinic poster`}
                          referrerPolicy="no-referrer"
                          className="h-72 w-full object-contain transition-transform duration-200 group-hover:scale-[1.02] sm:h-80"
                        />
                        <span className="absolute right-2.5 bottom-2.5 inline-flex items-center gap-1.5 rounded-md bg-black/70 px-2.5 py-1 text-xs font-medium text-white">
                          <ZoomIn className="h-3.5 w-3.5" />
                          View Poster
                        </span>
                      </button>

                      {pkg.secondaryPoster && (
                        <div className="mt-2.5 flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setSecondaryPosterToggle((prev) => ({
                                ...prev,
                                [pkg.id]: false,
                              }))
                            }
                            className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                              !showingSecondary
                                ? 'bg-[#1E4631] text-white'
                                : 'bg-white text-[#556158] hover:text-[#1A241E]'
                            }`}
                          >
                            Poster 1
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setSecondaryPosterToggle((prev) => ({
                                ...prev,
                                [pkg.id]: true,
                              }))
                            }
                            className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                              showingSecondary
                                ? 'bg-[#1E4631] text-white'
                                : 'bg-white text-[#556158] hover:text-[#1A241E]'
                            }`}
                          >
                            Poster 2
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Card Details */}
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#556158]">
                          <span>{pkg.categoryLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span>{pkg.setting}</span>
                        </div>

                        <h3 className="mt-2 font-display text-xl font-semibold text-[#1A241E]">
                          {pkg.name}
                        </h3>
                        {pkg.malayalamName && (
                          <p className="mt-0.5 text-sm font-medium text-[#1E4631]">
                            {pkg.malayalamName}
                          </p>
                        )}

                        <p className="mt-2.5 text-sm leading-relaxed text-[#3F4B43]">
                          {pkg.summary}
                        </p>

                        <ul className="mt-4 space-y-1.5 border-t border-[#E2E6DF] pt-4 text-sm text-[#2A352E]">
                          {pkg.highlights.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span
                                aria-hidden="true"
                                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B45F27]"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#E2E6DF] pt-4">
                        <button
                          type="button"
                          onClick={() =>
                            handleSelectForBooking(
                              `${pkg.name}${pkg.malayalamName ? ` (${pkg.malayalamName})` : ''}`,
                              isHomeCategory ? 'home' : 'clinic'
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-lg bg-[#1E4631] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#163625] whitespace-nowrap shrink-0"
                        >
                          <Calendar className="h-4 w-4" />
                          Book This Package
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setModalPoster({
                              title: pkg.name,
                              subtitle: pkg.malayalamName
                                ? `${pkg.malayalamName} · ${pkg.setting}`
                                : pkg.setting,
                              image: displayedPoster,
                              packageIdForBooking: `${pkg.name}${pkg.malayalamName ? ` (${pkg.malayalamName})` : ''}`,
                            })
                          }
                          className="text-sm font-medium text-[#1E4631] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                        >
                          Read Full Poster
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 3: Individual Therapies ("Take What You Need") */}
        <section id="therapies" className="border-t border-[#E2E6DF] bg-[#FAFAF7] py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
              {/* Left: Numbered Therapy List */}
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold tracking-wide text-[#B45F27] uppercase">
                  Individual Therapies
                </p>
                <h2 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-[#1A241E] sm:text-3xl text-balance">
                  Take what you need — single sessions or custom plans
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#3F4B43] sm:text-base">
                  You don&apos;t have to commit to a multi-day package. Pick a single therapy after
                  a brief consultation with {CLINIC_INFO.doctorName}.
                </p>

                <div className="mt-8 divide-y divide-[#E2E6DF] border-t border-b border-[#E2E6DF]">
                  {INDIVIDUAL_THERAPIES.map((therapy, idx) => (
                    <div
                      key={therapy.id}
                      className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-2.5">
                          <span className="font-mono text-xs tabular-nums text-[#556158]">
                            {String(idx + 1).padStart(2, '0')}.
                          </span>
                          <h3 className="font-display text-base font-semibold text-[#1A241E]">
                            {therapy.name}
                          </h3>
                          <span className="text-xs font-medium text-[#1E4631]">
                            {therapy.malayalamName}
                          </span>
                          <span aria-hidden="true" className="text-xs text-[#8A948D]">
                            ·
                          </span>
                          <span className="text-xs text-[#556158]">{therapy.focus}</span>
                        </div>
                        <p className="mt-1 text-sm text-[#3F4B43]">{therapy.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectForBooking(
                            `${therapy.name} (${therapy.malayalamName}) — Single Therapy`
                          )
                        }
                        className="self-start rounded-lg border border-[#D4DAD0] bg-white px-3 py-1.5 text-xs font-medium text-[#1A241E] transition-colors hover:border-[#1E4631] hover:text-[#1E4631] whitespace-nowrap shrink-0 sm:self-center"
                      >
                        Book Session
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Clinic Poster for Therapy Selection */}
              <div className="space-y-6 lg:col-span-5">
                {EDUCATIONAL_POSTERS.slice(0, 1).map((poster) => (
                  <div
                    key={poster.id}
                    className="overflow-hidden rounded-xl border border-[#E2E6DF] bg-white p-4"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setModalPoster({
                          title: poster.title,
                          subtitle: poster.malayalamTitle,
                          image: poster.image,
                          packageIdForBooking: 'Doctor Consultation / Custom Therapy',
                        })
                      }
                      className="group relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-[#F2F4F0]"
                    >
                      <img
                        src={poster.image}
                        alt={poster.title}
                        referrerPolicy="no-referrer"
                        className="max-h-80 w-full object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                      />
                      <span className="absolute right-2.5 bottom-2.5 inline-flex items-center gap-1.5 rounded-md bg-black/70 px-2.5 py-1 text-xs font-medium text-white">
                        <ZoomIn className="h-3.5 w-3.5" />
                        Enlarge
                      </span>
                    </button>
                    <div className="mt-3">
                      <h3 className="font-display text-base font-semibold text-[#1A241E]">
                        {poster.title}
                      </h3>
                      <p className="mt-0.5 text-xs font-medium text-[#1E4631]">
                        {poster.malayalamTitle}
                      </p>
                      <p className="mt-1.5 text-sm text-[#556158]">{poster.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Home Service & Post-Delivery Care (Prasavaraksha) */}
        <section
          id="home-care"
          className="border-t border-[#E2E6DF] bg-[#F2F4F0]/70 py-14 sm:py-16"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <p className="text-xs font-semibold tracking-wide text-[#B45F27] uppercase">
                  Home Service & Post-Delivery Care
                </p>
                <h2 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-[#1A241E] sm:text-3xl text-balance">
                  Traditional Kerala care at your doorstep
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#3F4B43] sm:text-base">
                  For elderly family members, those recovering from back or disc pain, and new
                  mothers needing traditional <strong className="font-semibold">Prasavaraksha (പ്രസവരക്ഷ)</strong>,
                  travelling to a clinic isn&apos;t always easy. Our trained team brings gentle,
                  doctor-planned sessions to your home.
                </p>

                <ul className="mt-5 space-y-2 border-t border-[#D4DAD0] pt-4 text-sm text-[#2A352E]">
                  <li className="flex items-start gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1E4631]"
                    />
                    <span>
                      <strong className="font-semibold">Amritam Geriatric Rejuvenation:</strong>{' '}
                      Doctor consultation, certified therapist, personalized Ayurveda, therapeutic
                      yoga &amp; pranayama at home
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1E4631]"
                    />
                    <span>Back pain, disc strain, joint care &amp; neuromuscular disorders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1E4631]"
                    />
                    <span>
                      Complete 15-step mother &amp; baby Prasavaraksha (Vethukuli, Udaraveshtanam,
                      Podikkizhi, baby bath, diet &amp; counseling)
                    </span>
                  </li>
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectForBooking(
                        'Amritam Geriatric Rejuvenation Home Service',
                        'home'
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-lg bg-[#1E4631] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#163625] whitespace-nowrap shrink-0"
                  >
                    <Home className="h-4 w-4" />
                    Request Home Service Visit
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-7">
                <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-[#E2E6DF] bg-white p-3">
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        setModalPoster({
                          title: 'Amritam Geriatric Rejuvenation Home Service',
                          subtitle:
                            'പ്രായത്തിന്റെ അവശതകൾക്ക് ആയുർവേദത്തിന്റെ സാന്ത്വനം; സമ്പൂർണ്ണ പരിചരണം ഇനി നിങ്ങളുടെ വീട്ടിൽ',
                          image: '/assets/aistudio/final_-2_c07cdc72.jpg',
                          packageIdForBooking:
                            'Amritam Geriatric Rejuvenation (അമൃതം ജെറിയാട്രിക് റീജുവനേഷൻ ഹോം സർവീസ്)',
                        })
                      }
                      className="group relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-[#F2F4F0]"
                    >
                      <img
                        src="/assets/aistudio/final_-2_c07cdc72.jpg"
                        alt="Amritam Geriatric Rejuvenation Home Service poster"
                        referrerPolicy="no-referrer"
                        className="h-64 w-full object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                      />
                      <span className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white">
                        <ZoomIn className="h-3.5 w-3.5" />
                        View
                      </span>
                    </button>
                    <p className="mt-2.5 text-sm font-semibold text-[#1A241E]">
                      Amritam Geriatric Care
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#556158]">
                      Doctor consultation, certified therapist, personalized Ayurveda, therapeutic yoga &amp; pranayama.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectForBooking(
                        'Amritam Geriatric Rejuvenation (അമൃതം ജെറിയാട്രിക് റീജുവനേഷൻ ഹോം സർവീസ്)',
                        'home'
                      )
                    }
                    className="mt-3 w-full rounded-lg border border-[#D4DAD0] bg-[#FAFAF7] px-3 py-1.5 text-xs font-medium text-[#1E4631] transition-colors hover:border-[#1E4631] hover:bg-white"
                  >
                    Book Amritam Home Care
                  </button>
                </div>

                <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-[#E2E6DF] bg-white p-3">
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        setModalPoster({
                          title: 'Ayurvedic Prasavaraksha (Post-Delivery Care)',
                          subtitle: 'അമ്മയുടെയും കുഞ്ഞിന്റെയും ആരോഗ്യ സംരക്ഷണം ഇനി നിങ്ങളുടെ വീട്ടിൽ',
                          image:
                            '/assets/aistudio/Untitled_-_08_June_2026_at_14.23.46_84304245.png',
                          packageIdForBooking:
                            'Ayurvedic Prasavaraksha (ആയുർവേദ പ്രസവരക്ഷ)',
                        })
                      }
                      className="group relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-[#F2F4F0]"
                    >
                      <img
                        src="/assets/aistudio/Untitled_-_08_June_2026_at_14.23.46_84304245.png"
                        alt="Ayurvedic Prasavaraksha mother and baby home care poster"
                        referrerPolicy="no-referrer"
                        className="h-64 w-full object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                      />
                      <span className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white">
                        <ZoomIn className="h-3.5 w-3.5" />
                        View
                      </span>
                    </button>
                    <p className="mt-2.5 text-sm font-semibold text-[#1A241E]">
                      Ayurveda Prasavaraksha
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#556158]">
                      Mother &amp; newborn postnatal care delivered gently at home.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectForBooking(
                        'Ayurvedic Prasavaraksha (ആയുർവേദ പ്രസവരക്ഷ)',
                        'home'
                      )
                    }
                    className="mt-3 w-full rounded-lg border border-[#D4DAD0] bg-[#FAFAF7] px-3 py-1.5 text-xs font-medium text-[#1E4631] transition-colors hover:border-[#1E4631] hover:bg-white"
                  >
                    Book Prasavaraksha
                  </button>
                </div>

                <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-[#E2E6DF] bg-white p-3">
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        setModalPoster({
                          title: 'SriSri Ayurveda Home Service',
                          subtitle: 'Geriatric, Joint, Back Pain & Post-Delivery Home Visits',
                          image: '/assets/aistudio/home_service_new_9f602148.png',
                          packageIdForBooking: 'SriSri Home Service Care (ശ്രീ ശ്രീ ഹോം സർവീസ്)',
                        })
                      }
                      className="group relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-[#F2F4F0]"
                    >
                      <img
                        src="/assets/aistudio/home_service_new_9f602148.png"
                        alt="SriSri Ayurveda Home Service poster"
                        referrerPolicy="no-referrer"
                        className="h-64 w-full object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                      />
                      <span className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white">
                        <ZoomIn className="h-3.5 w-3.5" />
                        View
                      </span>
                    </button>
                    <p className="mt-2.5 text-sm font-semibold text-[#1A241E]">
                      Home Therapy Visits
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#556158]">
                      Back pain, disc issues, joint care &amp; neuromuscular support at home.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectForBooking(
                        'SriSri Home Service Care (ശ്രീ ശ്രീ ഹോം സർവീസ്)',
                        'home'
                      )
                    }
                    className="mt-3 w-full rounded-lg border border-[#D4DAD0] bg-[#FAFAF7] px-3 py-1.5 text-xs font-medium text-[#1E4631] transition-colors hover:border-[#1E4631] hover:bg-white"
                  >
                    Book Home Visit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Clinic Philosophy & Malayalam Information Posters */}
        <section id="posters" className="border-t border-[#E2E6DF] bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-[#B45F27] uppercase">
                Clinic Guides & Posters
              </p>
              <h2 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-[#1A241E] sm:text-3xl text-balance">
                How our clinic approaches everyday health
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#3F4B43] sm:text-base">
                Tap any clinic poster below to read our Malayalam patient guides in full size.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {EDUCATIONAL_POSTERS.slice(1).map((poster) => (
                <article
                  key={poster.id}
                  className="flex flex-col overflow-hidden rounded-xl border border-[#E2E6DF] bg-[#FAFAF7] p-3"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setModalPoster({
                        title: poster.title,
                        subtitle: poster.malayalamTitle,
                        image: poster.image,
                        packageIdForBooking: 'Doctor Consultation',
                      })
                    }
                    className="group relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-[#1C402B]"
                  >
                    <img
                      src={poster.image}
                      alt={poster.title}
                      referrerPolicy="no-referrer"
                      className="h-60 w-full object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                    />
                    <span className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white">
                      <ZoomIn className="h-3.5 w-3.5" />
                      Read
                    </span>
                  </button>
                  <div className="mt-3">
                    <h3 className="font-display text-base font-semibold text-[#1A241E]">
                      {poster.title}
                    </h3>
                    <p className="mt-0.5 text-xs font-medium text-[#1E4631]">
                      {poster.malayalamTitle}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#556158]">
                      {poster.caption}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Clinic Location, Google Reviews & Appointment Booking */}
        <section
          id="location"
          className="border-t border-[#E2E6DF] bg-[#FAFAF7] py-14 sm:py-16"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
              {/* Left: Location Map, Directions & Google Reviews */}
              <div className="lg:col-span-6">
                <p className="text-xs font-semibold tracking-wide text-[#B45F27] uppercase">
                  Visit Us in Thrissur
                </p>
                <h2 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-[#1A241E] sm:text-3xl text-balance">
                  Easy to reach near Thiruvambady Temple
                </h2>

                <div className="mt-6 space-y-4 rounded-xl border border-[#E2E6DF] bg-white p-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#1E4631]" />
                    <div>
                      <p className="text-sm font-semibold text-[#1A241E]">
                        {CLINIC_INFO.brandFull}
                      </p>
                      {CLINIC_INFO.addressLines.map((line) => (
                        <p key={line} className="text-sm text-[#3F4B43]">
                          {line}
                        </p>
                      ))}
                      <ul className="mt-2 space-y-1 text-xs text-[#556158]">
                        {CLINIC_INFO.landmarks.map((lm) => (
                          <li key={lm}>{lm}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border-t border-[#E2E6DF] pt-4">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#1E4631]" />
                    <div className="text-sm text-[#3F4B43]">
                      {CLINIC_INFO.hours.map((row) => (
                        <p key={row.day}>
                          <span className="font-medium text-[#1A241E]">{row.day}:</span>{' '}
                          {row.time}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 border-t border-[#E2E6DF] pt-4">
                    <Phone className="h-5 w-5 shrink-0 text-[#1E4631]" />
                    <div className="text-sm">
                      <span className="font-medium text-[#1A241E]">Phone & WhatsApp: </span>
                      <a
                        href={CLINIC_INFO.telHref}
                        className="font-semibold text-[#1E4631] hover:underline"
                      >
                        {CLINIC_INFO.phoneDisplay}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Attached Map Screenshot + Google Business Link */}
                <div className="mt-5 overflow-hidden rounded-xl border border-[#E2E6DF] bg-white p-3">
                  <a
                    href={CLINIC_INFO.googleBusinessUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block overflow-hidden rounded-lg"
                  >
                    <img
                      src={CLINIC_INFO.locationMapImage}
                      alt="Directions to SriSri Ayurveda Wellness Centre on Pullat Lane near Thiruvambady Temple, Thrissur"
                      referrerPolicy="no-referrer"
                      className="h-64 w-full object-cover transition-transform duration-200 group-hover:scale-[1.01]"
                    />
                  </a>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-1">
                    <div className="flex items-center gap-3">
                      <img
                        src={CLINIC_INFO.googleBadgeImage}
                        alt="4.9 Google Reviews badge"
                        referrerPolicy="no-referrer"
                        className="h-12 w-12 rounded-md object-cover border border-[#E2E6DF]"
                      />
                      <div>
                        <p className="text-sm font-semibold text-[#1A241E]">
                          {CLINIC_INFO.googleRating} ★ on Google Reviews
                        </p>
                        <p className="text-xs text-[#556158]">
                          Google Business Profile · Thrissur
                        </p>
                      </div>
                    </div>
                    <a
                      href={CLINIC_INFO.googleBusinessUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#D4DAD0] bg-[#FAFAF7] px-3.5 py-2 text-xs font-medium text-[#1A241E] transition-colors hover:border-[#1E4631] hover:text-[#1E4631] whitespace-nowrap shrink-0"
                    >
                      Open in Google Maps
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: Appointment Booking Form */}
              <div
                id="book"
                ref={bookingSectionRef}
                className="scroll-mt-24 rounded-xl border border-[#E2E6DF] bg-white p-6 sm:p-8 lg:col-span-6"
              >
                <p className="text-xs font-semibold tracking-wide text-[#B45F27] uppercase">
                  Appointments
                </p>
                <h2 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-[#1A241E]">
                  Book a consultation or package
                </h2>
                <p className="mt-1.5 text-sm text-[#556158]">
                  Consultation with {CLINIC_INFO.doctorName} ({CLINIC_INFO.doctorMalayalam}).
                  Fill in your details to send your booking directly via WhatsApp or call us.
                </p>

                {submittedRequest ? (
                  <div className="mt-6 rounded-xl border border-[#CFE0D4] bg-[#F2F7F4] p-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E4631]" />
                      <div>
                        <h3 className="font-display text-lg font-semibold text-[#1A241E]">
                          Appointment summary ready
                        </h3>
                        <p className="mt-1 text-sm text-[#3F4B43]">
                          Send this booking note to our clinic desk on WhatsApp or call directly to
                          confirm your time slot.
                        </p>
                      </div>
                    </div>

                    <dl className="mt-4 space-y-1.5 border-t border-[#D6E4DA] pt-4 text-sm">
                      <div className="flex justify-between gap-4">
                        <dt className="text-[#556158]">Name</dt>
                        <dd className="font-medium text-[#1A241E]">{submittedRequest.name}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-[#556158]">Phone</dt>
                        <dd className="font-medium tabular-nums text-[#1A241E]">
                          {submittedRequest.phone}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-[#556158]">Package / Therapy</dt>
                        <dd className="text-right font-medium text-[#1A241E]">
                          {submittedRequest.service}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-[#556158]">Visit Type</dt>
                        <dd className="font-medium text-[#1A241E]">
                          {submittedRequest.visitType === 'home'
                            ? 'Home Service'
                            : 'At Clinic (Pullat Ln)'}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-[#556158]">Preferred Date</dt>
                        <dd className="font-medium text-[#1A241E]">{submittedRequest.date}</dd>
                      </div>
                    </dl>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <a
                        href={buildWhatsAppHref(submittedRequest)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#1E4631] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#163625] whitespace-nowrap shrink-0"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Confirm via WhatsApp
                      </a>
                      <a
                        href={CLINIC_INFO.telHref}
                        className="inline-flex items-center gap-2 rounded-lg border border-[#D4DAD0] bg-white px-4 py-2.5 text-sm font-medium text-[#1A241E] transition-colors hover:bg-[#F2F4F0] whitespace-nowrap shrink-0"
                      >
                        <Phone className="h-4 w-4 text-[#1E4631]" />
                        Call {CLINIC_INFO.phoneDisplay}
                      </a>
                      <button
                        type="button"
                        onClick={() => setSubmittedRequest(null)}
                        className="text-xs font-medium text-[#556158] underline underline-offset-4 hover:text-[#1A241E]"
                      >
                        Edit details
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="mt-6 space-y-4" noValidate>
                    {formError && (
                      <div
                        role="alert"
                        className="rounded-lg border border-[#E6B8AF] bg-[#FDF3F1] px-3.5 py-2.5 text-sm text-[#8F2D1B]"
                      >
                        {formError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="booking-name"
                          className="block text-xs font-medium text-[#3F4B43]"
                        >
                          Full Name *
                        </label>
                        <input
                          id="booking-name"
                          type="text"
                          required
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          placeholder="Your name"
                          className="mt-1.5 w-full rounded-lg border border-[#D4DAD0] bg-[#FAFAF7] px-3.5 py-2.5 text-sm text-[#1A241E] placeholder:text-[#8A948D] focus:border-[#1E4631] focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="booking-phone"
                          className="block text-xs font-medium text-[#3F4B43]"
                        >
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          id="booking-phone"
                          type="tel"
                          required
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          placeholder="e.g. 98470 00000"
                          className="mt-1.5 w-full rounded-lg border border-[#D4DAD0] bg-[#FAFAF7] px-3.5 py-2.5 text-sm tabular-nums text-[#1A241E] placeholder:text-[#8A948D] focus:border-[#1E4631] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="booking-package"
                        className="block text-xs font-medium text-[#3F4B43]"
                      >
                        Package or Therapy
                      </label>
                      <select
                        id="booking-package"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-[#D4DAD0] bg-[#FAFAF7] px-3.5 py-2.5 text-sm text-[#1A241E] focus:border-[#1E4631] focus:bg-white focus:outline-none"
                      >
                        <optgroup label="Wellness Packages">
                          {WELLNESS_PACKAGES.map((pkg) => {
                            const label = `${pkg.name}${pkg.malayalamName ? ` (${pkg.malayalamName})` : ''}`;
                            return (
                              <option key={pkg.id} value={label}>
                                {label}
                              </option>
                            );
                          })}
                        </optgroup>
                        <optgroup label="Consultation & Single Therapies">
                          <option value="Doctor Consultation / Custom Therapy">
                            Doctor Consultation / Custom Therapy
                          </option>
                          {INDIVIDUAL_THERAPIES.map((t) => {
                            const label = `${t.name} (${t.malayalamName}) — Single Therapy`;
                            return (
                              <option key={t.id} value={label}>
                                {label}
                              </option>
                            );
                          })}
                        </optgroup>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <span className="block text-xs font-medium text-[#3F4B43]">
                          Visit Type
                        </span>
                        <div className="mt-1.5 grid grid-cols-2 gap-1.5 rounded-lg bg-[#F2F4F0] p-1">
                          <button
                            type="button"
                            onClick={() => setVisitType('clinic')}
                            className={`rounded-md px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
                              visitType === 'clinic'
                                ? 'bg-white text-[#1A241E] shadow-xs'
                                : 'text-[#556158] hover:text-[#1A241E]'
                            }`}
                          >
                            At Clinic
                          </button>
                          <button
                            type="button"
                            onClick={() => setVisitType('home')}
                            className={`rounded-md px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
                              visitType === 'home'
                                ? 'bg-white text-[#1A241E] shadow-xs'
                                : 'text-[#556158] hover:text-[#1A241E]'
                            }`}
                          >
                            Home Service
                          </button>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="booking-date"
                          className="block text-xs font-medium text-[#3F4B43]"
                        >
                          Preferred Date
                        </label>
                        <input
                          id="booking-date"
                          type="date"
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="mt-1.5 w-full rounded-lg border border-[#D4DAD0] bg-[#FAFAF7] px-3.5 py-2 text-sm text-[#1A241E] focus:border-[#1E4631] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="booking-notes"
                        className="block text-xs font-medium text-[#3F4B43]"
                      >
                        Health Notes or Questions (Optional)
                      </label>
                      <textarea
                        id="booking-notes"
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Share any pain areas, stress concerns, or preferred time of day..."
                        className="mt-1.5 w-full rounded-lg border border-[#D4DAD0] bg-[#FAFAF7] px-3.5 py-2.5 text-sm text-[#1A241E] placeholder:text-[#8A948D] focus:border-[#1E4631] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#1E4631] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#163625] whitespace-nowrap shrink-0"
                      >
                        Request Appointment
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <a
                        href={CLINIC_INFO.telHref}
                        className="text-xs font-medium text-[#556158] hover:text-[#1E4631]"
                      >
                        Or call directly: {CLINIC_INFO.phoneDisplay}
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Automatic Left-to-Right Scrolling Google Reviews */}
        <section
          id="reviews"
          className="border-t border-[#E2E6DF] bg-white py-14 sm:py-16 overflow-hidden"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-wide text-[#B45F27] uppercase">
                  Patient Feedback
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-[#1A241E] sm:text-3xl">
                    Verified Google Reviews
                  </h2>
                  <span className="text-sm font-medium tabular-nums text-[#556158]">
                    4.9 / 5 Stars
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setReviewsPaused((prev) => !prev)}
                  aria-label={reviewsPaused ? 'Resume review scroll' : 'Pause review scroll'}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#D4DAD0] bg-[#FAFAF7] px-3 py-1.5 text-xs font-medium text-[#1A241E] transition-colors hover:border-[#1E4631] hover:text-[#1E4631] whitespace-nowrap shrink-0"
                >
                  {reviewsPaused ? (
                    <>
                      <Play className="h-3.5 w-3.5" />
                      Resume
                    </>
                  ) : (
                    <>
                      <Pause className="h-3.5 w-3.5" />
                      Pause
                    </>
                  )}
                </button>
                <a
                  href={CLINIC_INFO.googleBusinessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1E4631] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                >
                  Read all on Google
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="marquee-wrapper relative mt-8 w-full overflow-hidden">
            {/* Soft horizontal edge fades */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-20"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-20"
            />

            <div
              className={`animate-scroll-ltr gap-5 px-4 ${
                reviewsPaused ? 'animate-scroll-ltr-paused' : ''
              }`}
            >
              {[...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS].map((review, index) => (
                <article
                  key={`${review.id}-${index}`}
                  className="flex w-80 shrink-0 flex-col justify-between rounded-xl border border-[#E2E6DF] bg-[#FAFAF7] p-5 sm:w-96"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div
                        className="flex items-center gap-0.5 text-[#D99B1E]"
                        aria-label={`${review.rating} out of 5 stars`}
                      >
                        {Array.from({ length: 5 }).map((_, starIdx) => (
                          <Star
                            key={starIdx}
                            className={`h-4 w-4 ${
                              starIdx < review.rating
                                ? 'fill-[#EAB308] text-[#EAB308]'
                                : 'fill-transparent text-[#D4DAD0]'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-[#556158]">{review.timeAgo}</span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-[#2A352E]">
                      &ldquo;{review.text}&rdquo;
                    </p>
                  </div>

                  <p className="mt-4 border-t border-[#E2E6DF] pt-3 text-xs font-medium text-[#556158]">
                    {review.authorLabel}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-[#E2E6DF] bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img
              src={CLINIC_INFO.logoImage}
              alt="SriSri Ayurveda logo"
              referrerPolicy="no-referrer"
              className="h-9 w-9 rounded-md object-contain"
            />
            <div>
              <p className="font-display text-sm font-semibold text-[#1A241E]">
                {CLINIC_INFO.brandFull} · {CLINIC_INFO.malayalamBrand}
              </p>
              <p className="text-xs text-[#556158]">
                {CLINIC_INFO.doctorName} · Pullat Ln, Near Thiruvambady Temple, Thrissur ·{' '}
                {CLINIC_INFO.phoneDisplay} · {CLINIC_INFO.websiteDomain}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-[#556158]">
            <a href="#packages" className="hover:text-[#1E4631]">
              Packages
            </a>
            <a href="#therapies" className="hover:text-[#1E4631]">
              Therapies
            </a>
            <a href="#home-care" className="hover:text-[#1E4631]">
              Home Care
            </a>
            <a
              href={CLINIC_INFO.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1E4631]"
            >
              Google Business Profile
            </a>
          </div>
        </div>
      </footer>

      {/* Poster Lightbox Modal */}
      <PosterModal
        isOpen={Boolean(modalPoster)}
        onClose={() => setModalPoster(null)}
        title={modalPoster?.title ?? ''}
        subtitle={modalPoster?.subtitle}
        image={modalPoster?.image ?? ''}
        onBook={
          modalPoster?.packageIdForBooking
            ? () => handleSelectForBooking(modalPoster.packageIdForBooking!)
            : undefined
        }
      />
    </div>
  );
}
