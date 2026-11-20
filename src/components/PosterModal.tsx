import { useEffect, useState } from 'react';
import { X, Phone, Calendar, CheckSquare, Square, MessageCircle } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface PosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  image: string;
  secondaryImage?: string;
  description?: string;
  malayalamNote?: string;
  includedItems?: string[];
  defaultSelectAll?: boolean;
  idealFor?: string;
  onBook?: (selectedItems: string[]) => void;
}

export function PosterModal({
  isOpen,
  onClose,
  title,
  subtitle,
  image,
  secondaryImage,
  description,
  malayalamNote,
  includedItems,
  defaultSelectAll = true,
  idealFor,
  onBook,
}: PosterModalProps) {
  const [showSecondary, setShowSecondary] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    setShowSecondary(false);
    if (isOpen && includedItems && includedItems.length > 0) {
      setSelectedItems(defaultSelectAll ? [...includedItems] : []);
    } else {
      setSelectedItems([]);
    }
  }, [image, isOpen, includedItems, defaultSelectAll]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasChecklist = Boolean(includedItems && includedItems.length > 0);
  const hasDetails = Boolean(description || hasChecklist);
  const activeImage = showSecondary && secondaryImage ? secondaryImage : image;

  const toggleItem = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const buildDirectWhatsAppHref = () => {
    const lines = [
      `Namaskaram SriSri Ayurveda Thrissur,`,
      `I would like to book: ${title}`,
    ];
    if (selectedItems.length > 0) {
      lines.push(`Selected items needed:`);
      selectedItems.forEach((item) => lines.push(`• ${item}`));
    }
    return `${CLINIC_INFO.whatsappBase}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className={`relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-xl bg-white shadow-xl ${
          hasDetails ? 'max-w-4xl' : 'max-w-2xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
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

        {/* Body */}
        {hasDetails ? (
          <div className="grid flex-1 grid-cols-1 overflow-y-auto md:grid-cols-12">
            {/* Left: Poster Image */}
            <div className="flex flex-col items-center justify-center bg-[#F2F4F0] p-4 md:col-span-6 md:border-r md:border-[#E2E6DF]">
              <img
                src={activeImage}
                alt={title}
                referrerPolicy="no-referrer"
                className="max-h-[55vh] w-full rounded-lg object-contain md:max-h-[65vh]"
              />
              {secondaryImage && (
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSecondary(false)}
                    className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                      !showSecondary
                        ? 'bg-[#1E4631] text-white'
                        : 'bg-white text-[#556158] hover:text-[#1A241E]'
                    }`}
                  >
                    Poster 1
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSecondary(true)}
                    className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                      showSecondary
                        ? 'bg-[#1E4631] text-white'
                        : 'bg-white text-[#556158] hover:text-[#1A241E]'
                    }`}
                  >
                    Poster 2
                  </button>
                </div>
              )}
            </div>

            {/* Right: Description & Selectable Package/Therapy Options */}
            <div className="flex flex-col justify-between p-5 sm:p-6 md:col-span-6">
              <div className="space-y-4">
                {malayalamNote && (
                  <p className="rounded-lg border border-[#DCE5DE] bg-[#F2F7F4] px-3.5 py-2.5 text-sm font-medium text-[#1E4631]">
                    {malayalamNote}
                  </p>
                )}

                {description && (
                  <div>
                    <h4 className="text-xs font-semibold tracking-wide text-[#B45F27] uppercase">
                      Package Overview
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#3F4B43]">
                      {description}
                    </p>
                  </div>
                )}

                {includedItems && includedItems.length > 0 && (
                  <div className="border-t border-[#E2E6DF] pt-4">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-semibold tracking-wide text-[#B45F27] uppercase">
                        Select What You Need ({selectedItems.length}/{includedItems.length})
                      </h4>
                      <div className="flex items-center gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => setSelectedItems([...includedItems])}
                          className="font-medium text-[#1E4631] hover:underline"
                        >
                          Select All
                        </button>
                        <span aria-hidden="true" className="text-[#CBD2CA]">
                          /
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedItems([])}
                          className="font-medium text-[#556158] hover:text-[#1A241E] hover:underline"
                        >
                          Clear
                        </button>
                      </div>
                    </div>

                    <p className="mt-1 text-xs text-[#556158]">
                      Tap items below to customize your booking request:
                    </p>

                    <div className="mt-2.5 space-y-1.5">
                      {includedItems.map((item) => {
                        const isChecked = selectedItems.includes(item);
                        return (
                          <button
                            key={item}
                            type="button"
                            role="checkbox"
                            aria-checked={isChecked}
                            onClick={() => toggleItem(item)}
                            className={`flex w-full items-start gap-2.5 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                              isChecked
                                ? 'border-[#1E4631] bg-[#F2F7F4] text-[#1A241E]'
                                : 'border-[#E2E6DF] bg-white text-[#556158] hover:border-[#C5CEC6]'
                            }`}
                          >
                            {isChecked ? (
                              <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-[#1E4631]" />
                            ) : (
                              <Square className="mt-0.5 h-4 w-4 shrink-0 text-[#8A948D]" />
                            )}
                            <span className="leading-snug">{item}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {idealFor && (
                  <div className="border-t border-[#E2E6DF] pt-3">
                    <p className="text-xs text-[#556158]">
                      <span className="font-semibold text-[#1A241E]">Ideal for: </span>
                      {idealFor}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center overflow-auto bg-[#F2F4F0] p-4">
            <img
              src={activeImage}
              alt={title}
              referrerPolicy="no-referrer"
              className="max-h-[68vh] w-auto rounded-lg object-contain"
            />
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E2E6DF] bg-white px-5 py-3.5">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={CLINIC_INFO.telHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#1E4631] hover:underline whitespace-nowrap shrink-0"
            >
              <Phone className="h-4 w-4" />
              Call {CLINIC_INFO.phoneDisplay}
            </a>
            {hasChecklist && (
              <a
                href={buildDirectWhatsAppHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1E4631] hover:underline whitespace-nowrap shrink-0"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Selected ({selectedItems.length})
              </a>
            )}
          </div>

          {onBook && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onBook(selectedItems);
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-[#1E4631] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#163625] whitespace-nowrap shrink-0"
            >
              <Calendar className="h-4 w-4" />
              {selectedItems.length > 0 && hasChecklist
                ? `Book This Package (${selectedItems.length} Selected)`
                : 'Book This Package'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
