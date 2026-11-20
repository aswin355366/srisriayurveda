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
  FileText,
  ChevronDown,
} from 'lucide-react';
import {
  CLINIC_INFO,
  PACKAGE_FILTERS,
  WELLNESS_PACKAGES,
  INDIVIDUAL_THERAPIES,
  EYE_TREATMENT_HEAD,
  EYE_TREATMENTS,
  HAIR_TREATMENT_HEAD,
  HAIR_TREATMENTS,
  SKIN_TREATMENT_HEAD,
  SKIN_TREATMENTS,
  FOOT_TREATMENT_HEAD,
  FOOT_TREATMENTS,
  EDUCATIONAL_POSTERS,
  GOOGLE_REVIEWS,
  type PackageCategory,
} from './data/clinicData';
import { PosterModal } from './components/PosterModal';
import { ConsultationFormModal } from './components/ConsultationFormModal';

interface ActiveModalState {
  title: string;
  subtitle?: string;
  image: string;
  secondaryImage?: string;
  description?: string;
  malayalamNote?: string;
  includedItems?: string[];
  defaultSelectAll?: boolean;
  idealFor?: string;
  packageIdForBooking?: string;
  bookingVisitType?: 'clinic' | 'home';
}

function InstagramIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function App() {
  const [selectedFilter, setSelectedFilter] = useState<PackageCategory>('all');
  const [reviewsPaused, setReviewsPaused] = useState(false);
  const [heroReviewsPaused, setHeroReviewsPaused] = useState(false);
  const [secondaryPosterToggle, setSecondaryPosterToggle] = useState<
    Record<string, boolean>
  >({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalPoster, setModalPoster] = useState<ActiveModalState | null>(null);
  const [onlineConsultOpen, setOnlineConsultOpen] = useState(false);
  const [panchakarmaOpen, setPanchakarmaOpen] = useState(false);
  const [eyeTreatmentsOpen, setEyeTreatmentsOpen] = useState(false);
  const [hairTreatmentsOpen, setHairTreatmentsOpen] = useState(false);
  const [skinTreatmentsOpen, setSkinTreatmentsOpen] = useState(false);
  const [footTreatmentsOpen, setFootTreatmentsOpen] = useState(false);

  // Booking form state
  const bookingSectionRef = useRef<HTMLDivElement>(null);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [selectedService, setSelectedService] = useState(
    'One-Day Wellness Break (വൺ-ഡേ പാക്കേജ്)'
  );
  const [visitType, setVisitType] = useState<'clinic' | 'home'>('clinic');
  const [preferredDate, setPreferredDate] = useState('');
  const [selectedPackageItems, setSelectedPackageItems] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');
  const [submittedRequest, setSubmittedRequest] = useState<{
    name: string;
    phone: string;
    service: string;
    selectedItems: string[];
    visitType: 'clinic' | 'home';
    date: string;
    notes: string;
  } | null>(null);

  const filteredPackages =
    selectedFilter === 'all'
      ? WELLNESS_PACKAGES
      : WELLNESS_PACKAGES.filter((pkg) => pkg.category === selectedFilter);

  const panchakarmaTherapy = INDIVIDUAL_THERAPIES.find((t) => t.id === 'panchakarma');
  const panchakarmaSubTherapies = INDIVIDUAL_THERAPIES.filter((t) => t.id !== 'panchakarma');

  const handleSelectForBooking = (
    serviceLabel: string,
    mode: 'clinic' | 'home' = 'clinic',
    selectedItems: string[] = []
  ) => {
    setSelectedService(serviceLabel);
    setVisitType(mode);
    setSelectedPackageItems(selectedItems);
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
      selectedItems: selectedPackageItems,
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
    if (req.selectedItems.length > 0) {
      lines.push(`• Selected Items Needed:`);
      req.selectedItems.forEach((item) => lines.push(`   - ${item}`));
    }
    if (req.notes) {
      lines.push(`• Notes: ${req.notes}`);
    }
    return `${CLINIC_INFO.whatsappBase}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const openPackageById = (pkgId: string, overrideImage?: string) => {
    const pkg = WELLNESS_PACKAGES.find((item) => item.id === pkgId);
    if (!pkg) return;
    setModalPoster({
      title: pkg.name,
      subtitle: pkg.malayalamName
        ? `${pkg.malayalamName} · ${pkg.setting}`
        : pkg.setting,
      image: overrideImage ?? pkg.poster,
      secondaryImage: pkg.secondaryPoster,
      description: pkg.fullDescription,
      malayalamNote: pkg.malayalamNote,
      includedItems: pkg.includedSteps,
      defaultSelectAll: true,
      idealFor: pkg.idealFor,
      packageIdForBooking: `${pkg.name}${pkg.malayalamName ? ` (${pkg.malayalamName})` : ''}`,
      bookingVisitType: pkg.category === 'home-care' ? 'home' : 'clinic',
    });
  };

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
            <button
              type="button"
              onClick={() => setOnlineConsultOpen(true)}
              className="hover:text-[#1E4631] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Online Consultation
            </button>
            <a
              href="#location"
              className="hover:text-[#1E4631] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Location
            </a>
          </nav>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={CLINIC_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="SriSri Ayurveda on Instagram"
              title="Instagram"
              className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E6DF] bg-white text-[#3F4B43] transition-colors hover:border-[#1E4631] hover:text-[#1E4631] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4631]"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={CLINIC_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="SriSri Ayurveda on Facebook"
              title="Facebook"
              className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E6DF] bg-white text-[#3F4B43] transition-colors hover:border-[#1E4631] hover:text-[#1E4631] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4631]"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
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
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setOnlineConsultOpen(true);
                }}
                className="py-1.5 text-left hover:text-[#1E4631]"
              >
                Online Consultation
              </button>
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
              <div className="flex items-center gap-3 pt-1">
                <a
                  href={CLINIC_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#D4DAD0] bg-white px-3 py-2 text-xs font-medium text-[#1A241E] hover:border-[#1E4631] hover:text-[#1E4631]"
                >
                  <InstagramIcon className="h-4 w-4" />
                  Instagram
                </a>
                <a
                  href={CLINIC_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#D4DAD0] bg-white px-3 py-2 text-xs font-medium text-[#1A241E] hover:border-[#1E4631] hover:text-[#1E4631]"
                >
                  <FacebookIcon className="h-4 w-4" />
                  Facebook
                </a>
              </div>
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
        <section className="relative overflow-hidden bg-[#FAFAF7]">
          {/* Subtle clinic exterior background */}
          <img
            src="/assets/aistudio/unnamed_ebe50dc5.webp"
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="pointer-events-none absolute -top-20 left-0 h-[calc(100%+5rem)] w-full object-cover object-[center_65%] opacity-60 select-none"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FAFAF7]/68 via-[#FAFAF7]/40 to-[#FAFAF7]/20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#FAFAF7]/25 via-transparent to-[#FAFAF7]"
          />

          <div className="relative z-10 mx-auto max-w-6xl px-4 pt-8 pb-12 sm:px-6 lg:px-8 lg:pt-12 lg:pb-14">
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

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href="#packages"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#1E4631] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#163625] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4631]"
                  >
                    Explore Wellness Packages
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setOnlineConsultOpen(true)}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#1E4631] bg-white px-4 py-3 text-sm font-medium text-[#1E4631] transition-colors hover:bg-[#F2F7F4] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4631]"
                  >
                    <FileText className="h-4 w-4" />
                    Online Consultation
                  </button>
                  <a
                    href={CLINIC_INFO.telHref}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#D4DAD0] bg-white px-4 py-3 text-sm font-medium text-[#1A241E] transition-colors hover:bg-[#F2F4F0] whitespace-nowrap shrink-0"
                  >
                    <Phone className="h-4 w-4 text-[#1E4631]" />
                    Call {CLINIC_INFO.phoneDisplay}
                  </a>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-[#4A564D]">
                  <span>Pullat Lane, near Thiruvambady Temple</span>
                  <span aria-hidden="true">·</span>
                  <span>{CLINIC_INFO.googleRating} Stars on Google Reviews</span>
                  <span aria-hidden="true">·</span>
                  <span>Clinic & Home Visits</span>
                </div>
              </div>

              {/* Hero Trust Card: Auto-Scrolling Google Reviews */}
              <div className="lg:col-span-5">
                <div className="flex h-full flex-col justify-between rounded-xl border border-[#1C402B] bg-[#1C402B] p-5 text-white">
                  {/* Top Header: Google Reviews Logo + 4.9 Rating + Pause/Play */}
                  <div className="flex items-center justify-between gap-3 border-b border-white/15 pb-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={CLINIC_INFO.googleBadgeImage}
                        alt="Google Reviews"
                        referrerPolicy="no-referrer"
                        className="h-11 w-16 shrink-0 rounded-lg border border-white/20 bg-white px-1.5 py-0.5 object-contain"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-display text-lg font-semibold tabular-nums text-white">
                            {CLINIC_INFO.googleRating}
                          </span>
                          <div
                            className="flex items-center gap-0.5"
                            aria-label={`${CLINIC_INFO.googleRating} out of 5 stars on Google`}
                          >
                            {Array.from({ length: 5 }).map((_, starIdx) => (
                              <Star
                                key={starIdx}
                                className="h-3.5 w-3.5 fill-[#FACC15] text-[#FACC15]"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-white/80 truncate">
                          Verified Google Reviews · Thrissur
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setHeroReviewsPaused((prev) => !prev)}
                      aria-label={heroReviewsPaused ? 'Resume reviews scroll' : 'Pause reviews scroll'}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20 shrink-0"
                    >
                      {heroReviewsPaused ? (
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
                  </div>

                  {/* Automatically Upward-Scrolling Reviews Window */}
                  <div className="marquee-vertical-wrapper relative my-3 h-[320px] overflow-hidden">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 z-10 h-7 bg-gradient-to-b from-[#1C402B] to-transparent"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-9 bg-gradient-to-t from-[#1C402B] to-transparent"
                    />

                    <div
                      className={`animate-scroll-up gap-3 pb-3 ${
                        heroReviewsPaused ? 'animate-scroll-up-paused' : ''
                      }`}
                    >
                      {[...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS].map((review, index) => (
                        <article
                          key={`${review.id}-hero-${index}`}
                          className="rounded-lg border border-white/15 bg-[#163423] p-4"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div
                              className="flex items-center gap-0.5"
                              aria-label={`${review.rating} out of 5 stars`}
                            >
                              {Array.from({ length: review.rating }).map((_, starIdx) => (
                                <Star
                                  key={starIdx}
                                  className="h-3.5 w-3.5 fill-[#FACC15] text-[#FACC15]"
                                />
                              ))}
                            </div>
                            <span className="text-[11px] text-white/70">{review.timeAgo}</span>
                          </div>
                          <p className="mt-2 text-xs leading-relaxed text-white/95 sm:text-sm">
                            &ldquo;{review.text}&rdquo;
                          </p>
                          <p className="mt-2.5 text-xs font-medium text-[#D9EAE0]">
                            {review.authorLabel}
                          </p>
                        </article>
                      ))}
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-3.5 text-xs">
                    <a
                      href="#reviews"
                      className="font-medium text-white/90 hover:text-white underline underline-offset-4"
                    >
                      Read all {GOOGLE_REVIEWS.length} reviews
                    </a>
                    <a
                      href={CLINIC_INFO.googleBusinessUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 font-semibold text-[#1C402B] transition-colors hover:bg-[#F2F4F0] whitespace-nowrap shrink-0"
                    >
                      Verify on Google
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 4-Column Quick Overview Strip below Hero Split */}
            <div className="mt-10 grid grid-cols-2 divide-y divide-[#E2E6DF] rounded-xl border border-[#E2E6DF] bg-[#F2F4F0]/90 backdrop-blur-[2px] sm:grid-cols-4 sm:divide-x sm:divide-y-0">
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
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                            secondaryImage: pkg.secondaryPoster,
                            description: pkg.fullDescription,
                            malayalamNote: pkg.malayalamNote,
                            includedItems: pkg.includedSteps,
                            idealFor: pkg.idealFor,
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
                          className="h-60 w-full object-contain transition-transform duration-200 group-hover:scale-[1.02] sm:h-64"
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
                    <div className="flex flex-1 flex-col justify-between p-5">
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
                              secondaryImage: pkg.secondaryPoster,
                              description: pkg.fullDescription,
                              malayalamNote: pkg.malayalamNote,
                              includedItems: pkg.includedSteps,
                              idealFor: pkg.idealFor,
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
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold tracking-wide text-[#B45F27] uppercase">
                  Individual Therapies
                </p>
                <h2 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-[#1A241E] sm:text-3xl text-balance">
                  Take what you need — single sessions or custom plans
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#3F4B43] sm:text-base">
                  You don&apos;t have to commit to a multi-day package. Pick Panchakarma, Eye
                  Treatments, Hair Treatments, Skin Treatments, or Foot care below after a brief
                  consultation with {CLINIC_INFO.doctorName}.
                </p>
              </div>

              {/* Compact Clinic Poster Card for Therapy Selection */}
              <div className="lg:col-span-5">
                {EDUCATIONAL_POSTERS.slice(0, 1).map((poster) => (
                  <div
                    key={poster.id}
                    className="flex flex-col gap-4 rounded-xl border border-[#E2E6DF] bg-white p-4 sm:flex-row sm:items-center"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setModalPoster({
                          title: poster.title,
                          subtitle: poster.malayalamTitle,
                          image: poster.image,
                          description: poster.caption,
                          includedItems: poster.options,
                          defaultSelectAll: false,
                          packageIdForBooking: 'Doctor Consultation / Custom Therapy',
                          bookingVisitType: 'clinic',
                        })
                      }
                      className="group relative flex h-32 w-full shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#F2F4F0] sm:w-32"
                    >
                      <img
                        src={poster.image}
                        alt={poster.title}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                      />
                      <span className="absolute right-1.5 bottom-1.5 inline-flex items-center gap-1 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium text-white">
                        <ZoomIn className="h-3 w-3" />
                        Select
                      </span>
                    </button>
                    <div className="min-w-0">
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
                  </div>
                ))}
              </div>
            </div>

            {/* 3-Column Main Heads: Panchakarma | Eye Treatments | Hair Treatments */}
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
              {/* Column 1: Panchakarma */}
              <div className="rounded-xl border border-[#D4DAD0] bg-white">
                {panchakarmaTherapy && (
                  <div className="p-5">
                    <button
                      type="button"
                      onClick={() => setPanchakarmaOpen((prev) => !prev)}
                      aria-expanded={panchakarmaOpen}
                      aria-controls="panchakarma-sub-therapies"
                      className="group w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4631]"
                    >
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <h3 className="font-display text-xl font-semibold text-[#1A241E] group-hover:text-[#1E4631] transition-colors">
                          {panchakarmaTherapy.name}
                        </h3>
                        <span className="text-sm font-medium text-[#1E4631]">
                          {panchakarmaTherapy.malayalamName}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs font-medium text-[#556158]">
                        {panchakarmaTherapy.focus}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[#3F4B43]">
                        {panchakarmaTherapy.description}
                      </p>
                    </button>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#E2E6DF] pt-3.5">
                      <button
                        type="button"
                        onClick={() => setPanchakarmaOpen((prev) => !prev)}
                        aria-expanded={panchakarmaOpen}
                        aria-controls="panchakarma-sub-therapies"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E4631] hover:underline underline-offset-4"
                      >
                        <span>
                          {panchakarmaOpen
                            ? `Hide ${panchakarmaSubTherapies.length} therapies`
                            : `View ${panchakarmaSubTherapies.length} therapies`}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            panchakarmaOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleSelectForBooking(
                            `${panchakarmaTherapy.name} (${panchakarmaTherapy.malayalamName}) — Single Therapy`
                          )
                        }
                        className="rounded-lg bg-[#1E4631] px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#163625] whitespace-nowrap shrink-0"
                      >
                        Book Session
                      </button>
                    </div>
                  </div>
                )}

                {panchakarmaOpen && (
                  <div
                    id="panchakarma-sub-therapies"
                    className="border-t border-[#E2E6DF] bg-[#FAFAF7]/70 px-5 py-2"
                  >
                    <div className="divide-y divide-[#E2E6DF] border-l border-[#D4DAD0] pl-4">
                      {panchakarmaSubTherapies.map((therapy, idx) => (
                        <div key={therapy.id} className="py-3.5">
                          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                            <span className="font-mono text-xs tabular-nums text-[#556158]">
                              {String(idx + 1).padStart(2, '0')}.
                            </span>
                            <h4 className="font-display text-base font-semibold text-[#1A241E]">
                              {therapy.name}
                            </h4>
                            <span className="text-xs font-medium text-[#1E4631]">
                              {therapy.malayalamName}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-[#556158]">{therapy.focus}</p>
                          <p className="mt-1.5 text-sm leading-relaxed text-[#3F4B43]">
                            {therapy.description}
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              handleSelectForBooking(
                                `${therapy.name} (${therapy.malayalamName}) — Single Therapy`
                              )
                            }
                            className="mt-2.5 inline-flex rounded-lg border border-[#D4DAD0] bg-white px-3 py-1.5 text-xs font-medium text-[#1A241E] transition-colors hover:border-[#1E4631] hover:text-[#1E4631] whitespace-nowrap"
                          >
                            Book Session
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Column 2: Eye Treatments */}
              <div className="rounded-xl border border-[#D4DAD0] bg-white">
                <div className="p-5">
                  <button
                    type="button"
                    onClick={() => setEyeTreatmentsOpen((prev) => !prev)}
                    aria-expanded={eyeTreatmentsOpen}
                    aria-controls="eye-treatments-sub-list"
                    className="group w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4631]"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <h3 className="font-display text-xl font-semibold text-[#1A241E] group-hover:text-[#1E4631] transition-colors">
                        {EYE_TREATMENT_HEAD.name}
                      </h3>
                      <span className="text-sm font-medium text-[#1E4631]">
                        {EYE_TREATMENT_HEAD.malayalamName}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs font-medium text-[#556158]">
                      {EYE_TREATMENT_HEAD.focus}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#3F4B43]">
                      {EYE_TREATMENT_HEAD.description}
                    </p>
                  </button>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#E2E6DF] pt-3.5">
                    <button
                      type="button"
                      onClick={() => setEyeTreatmentsOpen((prev) => !prev)}
                      aria-expanded={eyeTreatmentsOpen}
                      aria-controls="eye-treatments-sub-list"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E4631] hover:underline underline-offset-4"
                    >
                      <span>
                        {eyeTreatmentsOpen
                          ? `Hide ${EYE_TREATMENTS.length} eye treatments`
                          : `View ${EYE_TREATMENTS.length} eye treatments`}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          eyeTreatmentsOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleSelectForBooking(
                          `${EYE_TREATMENT_HEAD.name} (${EYE_TREATMENT_HEAD.malayalamName}) — Eye Care`
                        )
                      }
                      className="rounded-lg bg-[#1E4631] px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#163625] whitespace-nowrap shrink-0"
                    >
                      Book Session
                    </button>
                  </div>
                </div>

                {eyeTreatmentsOpen && (
                  <div
                    id="eye-treatments-sub-list"
                    className="border-t border-[#E2E6DF] bg-[#FAFAF7]/70 px-5 py-2"
                  >
                    <div className="divide-y divide-[#E2E6DF] border-l border-[#D4DAD0] pl-4">
                      {EYE_TREATMENTS.map((treatment, idx) => (
                        <div key={treatment.id} className="py-3.5">
                          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                            <span className="font-mono text-xs tabular-nums text-[#556158]">
                              {String(idx + 1).padStart(2, '0')}.
                            </span>
                            <h4 className="font-display text-base font-semibold text-[#1A241E]">
                              {treatment.name}
                            </h4>
                            <span className="text-xs font-medium text-[#1E4631]">
                              {treatment.malayalamName}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-[#556158]">{treatment.focus}</p>
                          <p className="mt-1.5 text-sm leading-relaxed text-[#3F4B43]">
                            {treatment.description}
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              handleSelectForBooking(
                                `${treatment.name} (${treatment.malayalamName}) — Eye Treatment`
                              )
                            }
                            className="mt-2.5 inline-flex rounded-lg border border-[#D4DAD0] bg-white px-3 py-1.5 text-xs font-medium text-[#1A241E] transition-colors hover:border-[#1E4631] hover:text-[#1E4631] whitespace-nowrap"
                          >
                            Book Session
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Column 3: Hair Treatments */}
              <div className="rounded-xl border border-[#D4DAD0] bg-white">
                <div className="p-5">
                  <button
                    type="button"
                    onClick={() => setHairTreatmentsOpen((prev) => !prev)}
                    aria-expanded={hairTreatmentsOpen}
                    aria-controls="hair-treatments-sub-list"
                    className="group w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4631]"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <h3 className="font-display text-xl font-semibold text-[#1A241E] group-hover:text-[#1E4631] transition-colors">
                        {HAIR_TREATMENT_HEAD.name}
                      </h3>
                      <span className="text-sm font-medium text-[#1E4631]">
                        {HAIR_TREATMENT_HEAD.malayalamName}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs font-medium text-[#556158]">
                      {HAIR_TREATMENT_HEAD.focus}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#3F4B43]">
                      {HAIR_TREATMENT_HEAD.description}
                    </p>
                  </button>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#E2E6DF] pt-3.5">
                    <button
                      type="button"
                      onClick={() => setHairTreatmentsOpen((prev) => !prev)}
                      aria-expanded={hairTreatmentsOpen}
                      aria-controls="hair-treatments-sub-list"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E4631] hover:underline underline-offset-4"
                    >
                      <span>
                        {hairTreatmentsOpen
                          ? `Hide ${HAIR_TREATMENTS.length} hair treatments`
                          : `View ${HAIR_TREATMENTS.length} hair treatments`}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          hairTreatmentsOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleSelectForBooking(
                          `${HAIR_TREATMENT_HEAD.name} (${HAIR_TREATMENT_HEAD.malayalamName}) — Hair Care`
                        )
                      }
                      className="rounded-lg bg-[#1E4631] px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#163625] whitespace-nowrap shrink-0"
                    >
                      Book Session
                    </button>
                  </div>
                </div>

                {hairTreatmentsOpen && (
                  <div
                    id="hair-treatments-sub-list"
                    className="border-t border-[#E2E6DF] bg-[#FAFAF7]/70 px-5 py-2"
                  >
                    <div className="divide-y divide-[#E2E6DF] border-l border-[#D4DAD0] pl-4">
                      {HAIR_TREATMENTS.map((treatment, idx) => (
                        <div key={treatment.id} className="py-3.5">
                          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                            <span className="font-mono text-xs tabular-nums text-[#556158]">
                              {String(idx + 1).padStart(2, '0')}.
                            </span>
                            <h4 className="font-display text-base font-semibold text-[#1A241E]">
                              {treatment.name}
                            </h4>
                            <span className="text-xs font-medium text-[#1E4631]">
                              {treatment.malayalamName}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-[#556158]">{treatment.focus}</p>
                          <p className="mt-1.5 text-sm leading-relaxed text-[#3F4B43]">
                            {treatment.description}
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              handleSelectForBooking(
                                `${treatment.name} (${treatment.malayalamName}) — Hair Treatment`
                              )
                            }
                            className="mt-2.5 inline-flex rounded-lg border border-[#D4DAD0] bg-white px-3 py-1.5 text-xs font-medium text-[#1A241E] transition-colors hover:border-[#1E4631] hover:text-[#1E4631] whitespace-nowrap"
                          >
                            Book Session
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Row 2, Column 1 (Below Panchakarma): Skin Treatments */}
              <div className="rounded-xl border border-[#D4DAD0] bg-white">
                <div className="p-5">
                  <button
                    type="button"
                    onClick={() => setSkinTreatmentsOpen((prev) => !prev)}
                    aria-expanded={skinTreatmentsOpen}
                    aria-controls="skin-treatments-sub-list"
                    className="group w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4631]"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <h3 className="font-display text-xl font-semibold text-[#1A241E] group-hover:text-[#1E4631] transition-colors">
                        {SKIN_TREATMENT_HEAD.name}
                      </h3>
                      <span className="text-sm font-medium text-[#1E4631]">
                        {SKIN_TREATMENT_HEAD.malayalamName}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs font-medium text-[#556158]">
                      {SKIN_TREATMENT_HEAD.focus}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#3F4B43]">
                      {SKIN_TREATMENT_HEAD.description}
                    </p>
                  </button>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#E2E6DF] pt-3.5">
                    <button
                      type="button"
                      onClick={() => setSkinTreatmentsOpen((prev) => !prev)}
                      aria-expanded={skinTreatmentsOpen}
                      aria-controls="skin-treatments-sub-list"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E4631] hover:underline underline-offset-4"
                    >
                      <span>
                        {skinTreatmentsOpen
                          ? `Hide ${SKIN_TREATMENTS.length} skin treatments`
                          : `View ${SKIN_TREATMENTS.length} skin treatments`}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          skinTreatmentsOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleSelectForBooking(
                          `${SKIN_TREATMENT_HEAD.name} (${SKIN_TREATMENT_HEAD.malayalamName}) — Skin Care`
                        )
                      }
                      className="rounded-lg bg-[#1E4631] px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#163625] whitespace-nowrap shrink-0"
                    >
                      Book Session
                    </button>
                  </div>
                </div>

                {skinTreatmentsOpen && (
                  <div
                    id="skin-treatments-sub-list"
                    className="border-t border-[#E2E6DF] bg-[#FAFAF7]/70 px-5 py-2"
                  >
                    <div className="divide-y divide-[#E2E6DF] border-l border-[#D4DAD0] pl-4">
                      {SKIN_TREATMENTS.map((treatment, idx) => (
                        <div key={treatment.id} className="py-3.5">
                          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                            <span className="font-mono text-xs tabular-nums text-[#556158]">
                              {String(idx + 1).padStart(2, '0')}.
                            </span>
                            <h4 className="font-display text-base font-semibold text-[#1A241E]">
                              {treatment.name}
                            </h4>
                            <span className="text-xs font-medium text-[#1E4631]">
                              {treatment.malayalamName}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-[#556158]">{treatment.focus}</p>
                          <p className="mt-1.5 text-sm leading-relaxed text-[#3F4B43]">
                            {treatment.description}
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              handleSelectForBooking(
                                `${treatment.name} (${treatment.malayalamName}) — Skin Treatment`
                              )
                            }
                            className="mt-2.5 inline-flex rounded-lg border border-[#D4DAD0] bg-white px-3 py-1.5 text-xs font-medium text-[#1A241E] transition-colors hover:border-[#1E4631] hover:text-[#1E4631] whitespace-nowrap"
                          >
                            Book Session
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Row 2, Column 2 (After Skin Treatments): Foot */}
              <div className="rounded-xl border border-[#D4DAD0] bg-white">
                <div className="p-5">
                  <button
                    type="button"
                    onClick={() => setFootTreatmentsOpen((prev) => !prev)}
                    aria-expanded={footTreatmentsOpen}
                    aria-controls="foot-treatments-sub-list"
                    className="group w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4631]"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <h3 className="font-display text-xl font-semibold text-[#1A241E] group-hover:text-[#1E4631] transition-colors">
                        {FOOT_TREATMENT_HEAD.name}
                      </h3>
                      <span className="text-sm font-medium text-[#1E4631]">
                        {FOOT_TREATMENT_HEAD.malayalamName}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs font-medium text-[#556158]">
                      {FOOT_TREATMENT_HEAD.focus}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#3F4B43]">
                      {FOOT_TREATMENT_HEAD.description}
                    </p>
                  </button>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#E2E6DF] pt-3.5">
                    <button
                      type="button"
                      onClick={() => setFootTreatmentsOpen((prev) => !prev)}
                      aria-expanded={footTreatmentsOpen}
                      aria-controls="foot-treatments-sub-list"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E4631] hover:underline underline-offset-4"
                    >
                      <span>
                        {footTreatmentsOpen
                          ? `Hide ${FOOT_TREATMENTS.length} foot treatments`
                          : `View ${FOOT_TREATMENTS.length} foot treatments`}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          footTreatmentsOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleSelectForBooking(
                          `${FOOT_TREATMENT_HEAD.name} (${FOOT_TREATMENT_HEAD.malayalamName}) — Foot & Nail Care`
                        )
                      }
                      className="rounded-lg bg-[#1E4631] px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#163625] whitespace-nowrap shrink-0"
                    >
                      Book Session
                    </button>
                  </div>
                </div>

                {footTreatmentsOpen && (
                  <div
                    id="foot-treatments-sub-list"
                    className="border-t border-[#E2E6DF] bg-[#FAFAF7]/70 px-5 py-2"
                  >
                    <div className="divide-y divide-[#E2E6DF] border-l border-[#D4DAD0] pl-4">
                      {FOOT_TREATMENTS.map((treatment, idx) => (
                        <div key={treatment.id} className="py-3.5">
                          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                            <span className="font-mono text-xs tabular-nums text-[#556158]">
                              {String(idx + 1).padStart(2, '0')}.
                            </span>
                            <h4 className="font-display text-base font-semibold text-[#1A241E]">
                              {treatment.name}
                            </h4>
                            <span className="text-xs font-medium text-[#1E4631]">
                              {treatment.malayalamName}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-[#556158]">{treatment.focus}</p>
                          <p className="mt-1.5 text-sm leading-relaxed text-[#3F4B43]">
                            {treatment.description}
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              handleSelectForBooking(
                                `${treatment.name} (${treatment.malayalamName}) — Foot Treatment`
                              )
                            }
                            className="mt-2.5 inline-flex rounded-lg border border-[#D4DAD0] bg-white px-3 py-1.5 text-xs font-medium text-[#1A241E] transition-colors hover:border-[#1E4631] hover:text-[#1E4631] whitespace-nowrap"
                          >
                            Book Session
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
                      onClick={() => openPackageById('amritam-geriatric')}
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
                      onClick={() => openPackageById('prasavaraksha')}
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
                        openPackageById(
                          'home-service',
                          '/assets/aistudio/home_service_new_9f602148.png'
                        )
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

                  <div className="flex flex-wrap items-center gap-3 border-t border-[#E2E6DF] pt-4">
                    <span className="text-xs font-medium text-[#556158]">Follow us:</span>
                    <a
                      href={CLINIC_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#D4DAD0] bg-[#FAFAF7] px-3 py-1.5 text-xs font-medium text-[#1A241E] transition-colors hover:border-[#1E4631] hover:text-[#1E4631]"
                    >
                      <InstagramIcon className="h-3.5 w-3.5 text-[#1E4631]" />
                      Instagram
                    </a>
                    <a
                      href={CLINIC_INFO.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#D4DAD0] bg-[#FAFAF7] px-3 py-1.5 text-xs font-medium text-[#1A241E] transition-colors hover:border-[#1E4631] hover:text-[#1E4631]"
                    >
                      <FacebookIcon className="h-3.5 w-3.5 text-[#1E4631]" />
                      Facebook
                    </a>
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
                      className="h-72 w-full object-cover object-[center_44%] transition-transform duration-200 group-hover:scale-[1.01]"
                    />
                  </a>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-1">
                    <div className="flex items-center gap-3">
                      <img
                        src={CLINIC_INFO.googleBadgeImage}
                        alt="Google Reviews"
                        referrerPolicy="no-referrer"
                        className="h-12 w-16 rounded-md border border-[#E2E6DF] bg-white px-1.5 py-0.5 object-contain"
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
                  Fill in your details to send your booking directly via WhatsApp or{' '}
                  <button
                    type="button"
                    onClick={() => setOnlineConsultOpen(true)}
                    className="font-medium text-[#1E4631] underline underline-offset-4 hover:text-[#163625]"
                  >
                    fill the Online Consultation Form
                  </button>
                  .
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
                      {submittedRequest.selectedItems.length > 0 && (
                        <div className="border-t border-[#D6E4DA] pt-2">
                          <dt className="text-[#556158]">Selected Items Needed</dt>
                          <dd className="mt-1 space-y-1 text-xs font-medium text-[#1A241E]">
                            {submittedRequest.selectedItems.map((item) => (
                              <div key={item}>• {item}</div>
                            ))}
                          </dd>
                        </div>
                      )}
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
                        onChange={(e) => {
                          setSelectedService(e.target.value);
                          setSelectedPackageItems([]);
                        }}
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
                        <optgroup label="Eye Treatments (Netra Chikitsa)">
                          <option
                            value={`${EYE_TREATMENT_HEAD.name} (${EYE_TREATMENT_HEAD.malayalamName}) — Eye Care`}
                          >
                            {EYE_TREATMENT_HEAD.name} ({EYE_TREATMENT_HEAD.malayalamName}) — Eye Care
                          </option>
                          {EYE_TREATMENTS.map((et) => {
                            const label = `${et.name} (${et.malayalamName}) — Eye Treatment`;
                            return (
                              <option key={et.id} value={label}>
                                {label}
                              </option>
                            );
                          })}
                        </optgroup>
                        <optgroup label="Hair Treatments (Kesa Chikitsa)">
                          <option
                            value={`${HAIR_TREATMENT_HEAD.name} (${HAIR_TREATMENT_HEAD.malayalamName}) — Hair Care`}
                          >
                            {HAIR_TREATMENT_HEAD.name} ({HAIR_TREATMENT_HEAD.malayalamName}) — Hair Care
                          </option>
                          {HAIR_TREATMENTS.map((ht) => {
                            const label = `${ht.name} (${ht.malayalamName}) — Hair Treatment`;
                            return (
                              <option key={ht.id} value={label}>
                                {label}
                              </option>
                            );
                          })}
                        </optgroup>
                        <optgroup label="Skin Treatments (Twak Chikitsa)">
                          <option
                            value={`${SKIN_TREATMENT_HEAD.name} (${SKIN_TREATMENT_HEAD.malayalamName}) — Skin Care`}
                          >
                            {SKIN_TREATMENT_HEAD.name} ({SKIN_TREATMENT_HEAD.malayalamName}) — Skin Care
                          </option>
                          {SKIN_TREATMENTS.map((st) => {
                            const label = `${st.name} (${st.malayalamName}) — Skin Treatment`;
                            return (
                              <option key={st.id} value={label}>
                                {label}
                              </option>
                            );
                          })}
                        </optgroup>
                        <optgroup label="Foot, Hand & Nail Care (Pada Chikitsa)">
                          <option
                            value={`${FOOT_TREATMENT_HEAD.name} (${FOOT_TREATMENT_HEAD.malayalamName}) — Foot & Nail Care`}
                          >
                            {FOOT_TREATMENT_HEAD.name} ({FOOT_TREATMENT_HEAD.malayalamName}) — Foot & Nail Care
                          </option>
                          {FOOT_TREATMENTS.map((ft) => {
                            const label = `${ft.name} (${ft.malayalamName}) — Foot Treatment`;
                            return (
                              <option key={ft.id} value={label}>
                                {label}
                              </option>
                            );
                          })}
                        </optgroup>
                      </select>

                      {selectedPackageItems.length > 0 && (
                        <div className="mt-2.5 rounded-lg border border-[#CFE0D4] bg-[#F2F7F4] p-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-semibold text-[#1E4631]">
                              Selected Items Included ({selectedPackageItems.length})
                            </span>
                            <button
                              type="button"
                              onClick={() => setSelectedPackageItems([])}
                              className="text-xs font-medium text-[#556158] hover:text-[#1A241E] hover:underline"
                            >
                              Clear selection
                            </button>
                          </div>
                          <ul className="mt-1.5 space-y-1 text-xs text-[#2A352E]">
                            {selectedPackageItems.map((item) => (
                              <li key={item}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
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
            <button
              type="button"
              onClick={() => setOnlineConsultOpen(true)}
              className="hover:text-[#1E4631]"
            >
              Online Consultation
            </button>
            <a
              href={CLINIC_INFO.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1E4631]"
            >
              Google Business Profile
            </a>
            <div className="flex items-center gap-2.5">
              <a
                href={CLINIC_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SriSri Ayurveda on Instagram"
                title="Instagram"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#E2E6DF] bg-[#FAFAF7] text-[#3F4B43] transition-colors hover:border-[#1E4631] hover:text-[#1E4631]"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={CLINIC_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SriSri Ayurveda on Facebook"
                title="Facebook"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#E2E6DF] bg-[#FAFAF7] text-[#3F4B43] transition-colors hover:border-[#1E4631] hover:text-[#1E4631]"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
            </div>
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
        secondaryImage={modalPoster?.secondaryImage}
        description={modalPoster?.description}
        malayalamNote={modalPoster?.malayalamNote}
        includedItems={modalPoster?.includedItems}
        defaultSelectAll={modalPoster?.defaultSelectAll}
        idealFor={modalPoster?.idealFor}
        onBook={
          modalPoster?.packageIdForBooking
            ? (chosenItems) =>
                handleSelectForBooking(
                  modalPoster.packageIdForBooking!,
                  modalPoster.bookingVisitType ?? 'clinic',
                  chosenItems
                )
            : undefined
        }
      />

      {/* Online Consultation Form Modal */}
      <ConsultationFormModal
        isOpen={onlineConsultOpen}
        onClose={() => setOnlineConsultOpen(false)}
      />
    </div>
  );
}
