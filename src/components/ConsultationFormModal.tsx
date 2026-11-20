import { useEffect, useState, type FormEvent } from 'react';
import { X, CheckCircle2, MessageCircle, Mail, Phone } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface ConsultationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ConsultationFormState {
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  phoneNo: string;
  emailId: string;
  gender: string;
  height: string;
  weight: string;
  age: string;
  profession: string;
  presentComplaints: string;
  historyOfPresentIllness: string;
  pastHistory: string;
  habits: string;
  smoking: string;
  alcohol: string;
  familyHistory: string;
  usualFoodHabits: string;
  treatmentHistory: string;
  digestiveCapacity: string;
  bowelMovements: string;
  bowelMovementsPerDay: string;
  menstrualCycle: string;
  urinaryComplaints: string;
}

const INITIAL_FORM_STATE: ConsultationFormState = {
  firstName: '',
  lastName: '',
  streetAddress: '',
  city: '',
  state: '',
  pinCode: '',
  country: 'India',
  phoneNo: '',
  emailId: '',
  gender: '',
  height: '',
  weight: '',
  age: '',
  profession: '',
  presentComplaints: '',
  historyOfPresentIllness: '',
  pastHistory: '',
  habits: '',
  smoking: '',
  alcohol: '',
  familyHistory: '',
  usualFoodHabits: '',
  treatmentHistory: '',
  digestiveCapacity: '',
  bowelMovements: '',
  bowelMovementsPerDay: '',
  menstrualCycle: '',
  urinaryComplaints: '',
};

const COUNTRY_OPTIONS = [
  'India',
  'United Arab Emirates',
  'Saudi Arabia',
  'Qatar',
  'Oman',
  'Kuwait',
  'United Kingdom',
  'United States',
  'Canada',
  'Singapore',
  'Australia',
  'Other',
];

const inputClass =
  'w-full rounded border border-[#E2E4E0] bg-[#FAFAFA] px-3.5 py-2.5 text-sm text-[#1A241E] placeholder:text-[#8A948D] focus:border-[#1E4631] focus:bg-white focus:outline-none';

const selectClass =
  'w-full rounded border border-[#E2E4E0] bg-[#FAFAFA] px-3 py-2.5 text-sm text-[#1A241E] focus:border-[#1E4631] focus:bg-white focus:outline-none';

const textareaClass =
  'w-full min-h-[82px] resize-y rounded border border-[#E2E4E0] bg-[#FAFAFA] px-3.5 py-2.5 text-sm text-[#1A241E] placeholder:text-[#8A948D] focus:border-[#1E4631] focus:bg-white focus:outline-none';

const labelClass = 'mb-1.5 block text-xs font-medium text-[#2A352E]';

export function ConsultationFormModal({
  isOpen,
  onClose,
}: ConsultationFormModalProps) {
  const [form, setForm] = useState<ConsultationFormState>(INITIAL_FORM_STATE);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedSummary, setSubmittedSummary] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const updateField = <K extends keyof ConsultationFormState>(
    key: K,
    value: ConsultationFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const buildSummaryText = (data: ConsultationFormState) => {
    const entries: [string, string][] = [
      ['Name', `${data.firstName.trim()} ${data.lastName.trim()}`.trim()],
      [
        'Address',
        [data.streetAddress, data.city, data.state, data.pinCode, data.country]
          .filter((v) => v.trim())
          .join(', '),
      ],
      ['Phone No', data.phoneNo.trim()],
      ['Email ID', data.emailId.trim()],
      ['Gender', data.gender],
      ['Age', data.age.trim()],
      ['Height', data.height.trim()],
      ['Weight', data.weight.trim()],
      ['Profession', data.profession.trim()],
      ['Present Complaints', data.presentComplaints.trim()],
      ['History Of Present Illness', data.historyOfPresentIllness.trim()],
      ['Past History (Other Major Diseases)', data.pastHistory.trim()],
      ['Habits', data.habits.trim()],
      ['Smoking', data.smoking],
      ['Alcohol', data.alcohol],
      ['Family History', data.familyHistory.trim()],
      ['Usual Food Habits', data.usualFoodHabits.trim()],
      ['Treatment History', data.treatmentHistory.trim()],
      ['Digestive Capacity', data.digestiveCapacity],
      ['Bowel Movements', data.bowelMovements],
      ['Bowel Movements/Day', data.bowelMovementsPerDay],
      ['Menstrual Cycle (Females)', data.menstrualCycle.trim()],
      ['Urinary Complaints', data.urinaryComplaints.trim()],
    ];

    const lines = [
      'Namaskaram Dr. Anagha Aswin,',
      'Online Ayurvedic Consultation Form:',
      ...entries
        .filter(([, val]) => val.length > 0)
        .map(([label, val]) => `• ${label}: ${val}`),
    ];

    return lines.join('\n');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const first = form.firstName.trim();
    const digits = form.phoneNo.replace(/\D/g, '');
    const email = form.emailId.trim();

    if (first.length < 2) {
      setErrorMsg('Please enter your First Name.');
      return;
    }
    if (digits.length < 10) {
      setErrorMsg('Please enter a valid Phone No (at least 10 digits).');
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid Email ID.');
      return;
    }

    setErrorMsg('');
    setSubmittedSummary(buildSummaryText(form));
  };

  const handleReset = () => {
    setSubmittedSummary(null);
    setErrorMsg('');
    setForm(INITIAL_FORM_STATE);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-label="Online Consultation Form"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Close Bar */}
        <div className="flex items-center justify-between border-b border-[#E2E6DF] px-5 py-3">
          <span className="text-xs font-medium text-[#556158]">
            Online Consultation · {CLINIC_INFO.doctorName}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close consultation form"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E6DF] text-[#1A241E] transition-colors hover:bg-[#F2F4F0]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-10 sm:py-8">
          <div className="text-center">
            <p className="font-display text-lg italic text-[#3F4B43]">
              Consultation Form
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-[#1A241E] sm:text-3xl">
              Fill In The Form
            </h2>
          </div>

          {submittedSummary ? (
            <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-[#CFE0D4] bg-[#F2F7F4] p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E4631]" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-[#1A241E]">
                    Consultation details prepared
                  </h3>
                  <p className="mt-1 text-sm text-[#3F4B43]">
                    Send your completed consultation form directly to{' '}
                    <strong>{CLINIC_INFO.doctorName}</strong> via WhatsApp or Email.
                  </p>
                </div>
              </div>

              <pre className="mt-4 max-h-60 overflow-y-auto whitespace-pre-wrap rounded-lg border border-[#D6E4DA] bg-white p-4 font-sans text-xs leading-relaxed text-[#2A352E]">
                {submittedSummary}
              </pre>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={`${CLINIC_INFO.whatsappBase}?text=${encodeURIComponent(submittedSummary)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#1E4631] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#163625] whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="h-4 w-4" />
                  Send via WhatsApp
                </a>
                <a
                  href={`mailto:aswin@srisriayu.com?subject=${encodeURIComponent(
                    `Online Consultation Form - ${form.firstName} ${form.lastName}`.trim()
                  )}&body=${encodeURIComponent(submittedSummary)}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#D4DAD0] bg-white px-4 py-2.5 text-sm font-medium text-[#1A241E] transition-colors hover:bg-[#F2F4F0] whitespace-nowrap shrink-0"
                >
                  <Mail className="h-4 w-4 text-[#1E4631]" />
                  Send via Email
                </a>
                <a
                  href={CLINIC_INFO.telHref}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1E4631] hover:underline whitespace-nowrap shrink-0"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Call {CLINIC_INFO.phoneDisplay}
                </a>
                <button
                  type="button"
                  onClick={() => setSubmittedSummary(null)}
                  className="ml-auto text-xs font-medium text-[#556158] underline underline-offset-4 hover:text-[#1A241E]"
                >
                  Edit Form
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-medium text-[#556158] underline underline-offset-4 hover:text-[#1A241E]"
                >
                  Clear
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
              {errorMsg && (
                <div
                  role="alert"
                  className="rounded-lg border border-[#E6B8AF] bg-[#FDF3F1] px-4 py-2.5 text-sm text-[#8F2D1B]"
                >
                  {errorMsg}
                </div>
              )}

              {/* Row 1: First Name / Last Name */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  aria-label="First Name"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  className={inputClass}
                  required
                />
                <input
                  type="text"
                  aria-label="Last Name"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Row 2: Street Address */}
              <div>
                <input
                  type="text"
                  aria-label="Street Address"
                  placeholder="Street Address"
                  value={form.streetAddress}
                  onChange={(e) => updateField('streetAddress', e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Row 3: City / State */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  aria-label="City"
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  className={inputClass}
                />
                <input
                  type="text"
                  aria-label="State"
                  placeholder="State"
                  value={form.state}
                  onChange={(e) => updateField('state', e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Row 4: Pin code / Country */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  aria-label="Pin code"
                  placeholder="Pin code"
                  value={form.pinCode}
                  onChange={(e) => updateField('pinCode', e.target.value)}
                  className={inputClass}
                />
                <select
                  aria-label="Country"
                  value={form.country}
                  onChange={(e) => updateField('country', e.target.value)}
                  className={selectClass}
                >
                  {COUNTRY_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 5: Phone No / Email ID */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="tel"
                  aria-label="Phone No"
                  placeholder="Phone No"
                  value={form.phoneNo}
                  onChange={(e) => updateField('phoneNo', e.target.value)}
                  className={inputClass}
                  required
                />
                <input
                  type="email"
                  aria-label="Email ID"
                  placeholder="Email ID"
                  value={form.emailId}
                  onChange={(e) => updateField('emailId', e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Row 6: Gender / Height / Weight */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="consult-gender" className={labelClass}>
                    Gender
                  </label>
                  <select
                    id="consult-gender"
                    value={form.gender}
                    onChange={(e) => updateField('gender', e.target.value)}
                    className={selectClass}
                  >
                    <option value="">—Please choose an option—</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="consult-height" className={labelClass}>
                    Height
                  </label>
                  <input
                    id="consult-height"
                    type="text"
                    placeholder="cm / ft / inch"
                    value={form.height}
                    onChange={(e) => updateField('height', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="consult-weight" className={labelClass}>
                    Weight
                  </label>
                  <input
                    id="consult-weight"
                    type="text"
                    placeholder="kgs / lbs"
                    value={form.weight}
                    onChange={(e) => updateField('weight', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Row 7: Age / Profession */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  aria-label="Age"
                  placeholder="Age"
                  value={form.age}
                  onChange={(e) => updateField('age', e.target.value)}
                  className={inputClass}
                />
                <input
                  type="text"
                  aria-label="Profession"
                  placeholder="Profession"
                  value={form.profession}
                  onChange={(e) => updateField('profession', e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Row 8: Present Complaints / History Of Present Illness / Past History */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <textarea
                  aria-label="Present Complaints"
                  placeholder="Present Complaints"
                  value={form.presentComplaints}
                  onChange={(e) => updateField('presentComplaints', e.target.value)}
                  className={textareaClass}
                />
                <textarea
                  aria-label="History Of Present Illness"
                  placeholder="History Of Present Illness"
                  value={form.historyOfPresentIllness}
                  onChange={(e) => updateField('historyOfPresentIllness', e.target.value)}
                  className={textareaClass}
                />
                <textarea
                  aria-label="Past History (Other Major Diseases)"
                  placeholder="Past History (Other Major Diseases)"
                  value={form.pastHistory}
                  onChange={(e) => updateField('pastHistory', e.target.value)}
                  className={textareaClass}
                />
              </div>

              {/* Row 9: Habits / Smoking / Alcohol */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="consult-habits" className={labelClass}>
                    Habits
                  </label>
                  <input
                    id="consult-habits"
                    type="text"
                    placeholder="(If Any)"
                    value={form.habits}
                    onChange={(e) => updateField('habits', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="consult-smoking" className={labelClass}>
                    Smoking
                  </label>
                  <select
                    id="consult-smoking"
                    value={form.smoking}
                    onChange={(e) => updateField('smoking', e.target.value)}
                    className={selectClass}
                  >
                    <option value="">—Please choose an option—</option>
                    <option value="No">No</option>
                    <option value="Occasionally">Occasionally</option>
                    <option value="Regularly">Regularly</option>
                    <option value="Former">Former</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="consult-alcohol" className={labelClass}>
                    Alcohol
                  </label>
                  <select
                    id="consult-alcohol"
                    value={form.alcohol}
                    onChange={(e) => updateField('alcohol', e.target.value)}
                    className={selectClass}
                  >
                    <option value="">—Please choose an option—</option>
                    <option value="No">No</option>
                    <option value="Occasionally">Occasionally</option>
                    <option value="Regularly">Regularly</option>
                    <option value="Former">Former</option>
                  </select>
                </div>
              </div>

              {/* Row 10: Family History / Usual Food Habits / Treatment History */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <textarea
                  aria-label="Has any one had this problem in your family?"
                  placeholder="Has any one had this problem in your family?"
                  value={form.familyHistory}
                  onChange={(e) => updateField('familyHistory', e.target.value)}
                  className={textareaClass}
                />
                <textarea
                  aria-label="Usual Food Habits"
                  placeholder="Usual Food Habits"
                  value={form.usualFoodHabits}
                  onChange={(e) => updateField('usualFoodHabits', e.target.value)}
                  className={textareaClass}
                />
                <textarea
                  aria-label="Treatment History (Including The Diagnosis)"
                  placeholder="Treatment History (Including The Diagnosis)"
                  value={form.treatmentHistory}
                  onChange={(e) => updateField('treatmentHistory', e.target.value)}
                  className={textareaClass}
                />
              </div>

              {/* Row 11: Digestive Capacity / Bowel Movements / Number of Bowel Movements/Day */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="consult-digestive" className={labelClass}>
                    Digestive Capacity
                  </label>
                  <select
                    id="consult-digestive"
                    value={form.digestiveCapacity}
                    onChange={(e) => updateField('digestiveCapacity', e.target.value)}
                    className={selectClass}
                  >
                    <option value="">—Please choose an option—</option>
                    <option value="Good / Regular">Good / Regular</option>
                    <option value="Low / Weak">Low / Weak</option>
                    <option value="Variable / Irregular">Variable / Irregular</option>
                    <option value="Excess / Sharp">Excess / Sharp</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="consult-bowel" className={labelClass}>
                    Bowel Movements
                  </label>
                  <select
                    id="consult-bowel"
                    value={form.bowelMovements}
                    onChange={(e) => updateField('bowelMovements', e.target.value)}
                    className={selectClass}
                  >
                    <option value="">—Please choose an option—</option>
                    <option value="Normal / Regular">Normal / Regular</option>
                    <option value="Constipated / Hard">Constipated / Hard</option>
                    <option value="Loose / Frequent">Loose / Frequent</option>
                    <option value="Irregular">Irregular</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="consult-bowel-count" className={labelClass}>
                    Number of Bowel Movements/Day
                  </label>
                  <select
                    id="consult-bowel-count"
                    value={form.bowelMovementsPerDay}
                    onChange={(e) => updateField('bowelMovementsPerDay', e.target.value)}
                    className={selectClass}
                  >
                    <option value="">—Please choose an option—</option>
                    <option value="1 time / day">1 time / day</option>
                    <option value="2 times / day">2 times / day</option>
                    <option value="3 or more / day">3 or more / day</option>
                    <option value="Less than once / day">Less than once / day</option>
                  </select>
                </div>
              </div>

              {/* Row 12: Menstrual Cycle (Females) / Urinary Complaints (If Any) */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <textarea
                  aria-label="Menstrual Cycle (Females)"
                  placeholder="Menstrual Cycle (Females)"
                  value={form.menstrualCycle}
                  onChange={(e) => updateField('menstrualCycle', e.target.value)}
                  className={textareaClass}
                />
                <textarea
                  aria-label="Urinary Complaints (If Any)"
                  placeholder="Urinary Complaints (If Any)"
                  value={form.urinaryComplaints}
                  onChange={(e) => updateField('urinaryComplaints', e.target.value)}
                  className={textareaClass}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded bg-[#629E6E] px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4F895A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4631]"
                >
                  Send
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
