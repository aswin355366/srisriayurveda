import { useEffect } from 'react';
import { X, Phone, Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface PosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  image: string;
  onBook?: () => void;
}

export function PosterModal({
  isOpen,
  onClose,
  title,
  subtitle,
  image,
  onBook,
}: PosterModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-[#E2E6DF] px-5 py-3.5">
          <div className="min-w-0">
            <h3 className="truncate font-display text-lg font-semibold text-[#1A241E]">
              {title}
            </h3>
            {subtitle && (
              <p className="truncate text-xs text-[#556158]">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close poster view"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E2E6DF] text-[#1A241E] transition-colors hover:bg-[#F2F4F0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4631]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-auto bg-[#F2F4F0] p-4 flex items-center justify-center">
          <img
            src={image}
            alt={title}
            referrerPolicy="no-referrer"
            className="max-h-[68vh] w-auto rounded-lg object-contain"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E2E6DF] bg-white px-5 py-3.5">
          <a
            href={CLINIC_INFO.telHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1E4631] hover:underline whitespace-nowrap shrink-0"
          >
            <Phone className="h-4 w-4" />
            Call {CLINIC_INFO.phoneDisplay}
          </a>
          {onBook && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onBook();
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-[#1E4631] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#163625] whitespace-nowrap shrink-0"
            >
              <Calendar className="h-4 w-4" />
              Book This Package
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
