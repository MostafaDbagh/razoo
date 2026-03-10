import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, AlertCircle, Sparkles, ChevronRight, Camera, ChevronDown, Calendar, Clock, User, Phone } from 'lucide-react';
import { bookAppointment, getMyStyle, type AnalyzeResponse, type HairLength } from '../lib/api';
import { SERVICES } from '../data/services';
import DirhamIcon from '../components/DirhamIcon';
import SEO from '../components/SEO';

type Step = 'choose' | 'upload' | 'analyzing' | 'results' | 'book';

const HAIR_LENGTH_OPTIONS: { value: HairLength; label: string }[] = [
  { value: 'short', label: 'Short' },
  { value: 'medium', label: 'Medium' },
  { value: 'long', label: 'Long' },
];

function formatFaceShape(shape: string): string {
  const s = (shape || '').trim().toLowerCase();
  if (!s) return shape;
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ');
}

export default function Book() {
  const [searchParams, setSearchParams] = useSearchParams();
  const serviceFromUrl = searchParams.get('service');

  const [step, setStep] = useState<Step>('choose');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [hairLength, setHairLength] = useState<HairLength>('short');
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResponse | null>(null);
  const [selectedStyleForBooking, setSelectedStyleForBooking] = useState<string | null>(null);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(e.target as Node)) {
        setServiceDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    hairstyle: '',
    preferred_date: '',
    preferred_time_slot: '' as 'morning' | 'afternoon' | 'night' | '',
    time_from: '',
    time_to: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (serviceFromUrl) {
      const matching = SERVICES.find((s) => s.name === serviceFromUrl);
      if (matching) {
        setForm((prev) => ({ ...prev, hairstyle: matching.name }));
        setSelectedStyleForBooking(matching.name);
        setStep('book');
        setSearchParams({}, { replace: true });
      }
    }
  }, [serviceFromUrl, setSearchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (errorMsg) setErrorMsg('');
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setAnalysisError(null);
    if (!file) {
      setPhotoFile(null);
      setPhotoPreview(null);
      return;
    }
    if (!file.type.startsWith('image/')) {
      setAnalysisError('Please choose an image (JPEG, PNG or WebP).');
      return;
    }
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const runAnalysis = async () => {
    if (!photoFile) return;
    setStep('analyzing');
    setAnalysisError(null);
    setAnalysisResult(null);
    try {
      const res = await getMyStyle(photoFile, hairLength);
      if (res.success && res.data) {
        setAnalysisResult(res.data);
        setStep('results');
      } else {
        setAnalysisError(res.error ?? 'Analysis failed. Try another photo.');
        setStep('upload');
      }
    } catch {
      setAnalysisError('Something went wrong. Please try again.');
      setStep('upload');
    }
  };

  const handleBookWithStyle = (style: string) => {
    setSelectedStyleForBooking(style);
    setForm((prev) => ({ ...prev, hairstyle: style }));
    setStep('book');
  };

  const timeSlotLabel = (slot: string) =>
    slot === 'morning' ? 'Morning' : slot === 'afternoon' ? 'Afternoon' : slot === 'night' ? 'Night' : '';

  const preferredTimeString =
    form.preferred_time_slot && (form.time_from || form.time_to)
      ? `${timeSlotLabel(form.preferred_time_slot)}${form.time_from && form.time_to ? `, ${form.time_from} - ${form.time_to}` : form.time_from ? `, from ${form.time_from}` : form.time_to ? `, until ${form.time_to}` : ''}`
      : form.preferred_time_slot
        ? timeSlotLabel(form.preferred_time_slot)
        : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone.trim()) {
      setErrorMsg('Phone number is required.');
      return;
    }
    if (!form.hairstyle.trim()) {
      setErrorMsg('Please select a service / hairstyle.');
      return;
    }
    setLoading(true);
    setStatus('idle');
    setErrorMsg('');
    try {
      const res = await bookAppointment({
        name: form.name,
        phone: form.phone.trim(),
        hairstyle: form.hairstyle.trim(),
        preferred_date: form.preferred_date || undefined,
        preferred_time: preferredTimeString || undefined,
        notes: form.notes || undefined,
      });
      if (res.success) {
        setStatus('success');
        setForm({
          name: '',
          phone: '',
          hairstyle: '',
          preferred_date: '',
          preferred_time_slot: '',
          time_from: '',
          time_to: '',
          notes: '',
        });
      } else {
        setStatus('error');
        setErrorMsg(res.error ?? 'Booking failed');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <SEO
        title="Book Appointment | AI Haircut Dubai"
        description="Book your elite barber appointment in Dubai. OpenAI-powered AI face analysis suggests the perfect haircut—upload a photo or book directly. Luxury grooming at your doorstep."
        canonical="https://www.barber2door.com/book"
        keywords="OpenAI haircut Dubai, book barber Dubai, AI haircut appointment Dubai, Barber2Door book, premium barber booking Dubai"
      />
      <section className="flex-1 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="w-[92%] sm:w-full max-w-xl mx-auto min-w-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Book an Appointment</h1>
          <p className="text-gray-400 mb-6 sm:mb-10 text-sm sm:text-base">
            {step === 'choose' ? 'Start with a style suggestion or go straight to booking.' : 'Fill in your details and we’ll get back to you to confirm.'}
          </p>

          {/* Step: Choose path */}
          {step === 'choose' && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setStep('book')}
                className="w-full flex items-center justify-between gap-3 sm:gap-4 rounded-xl border-2 border-amber-500/50 bg-amber-500/10 p-4 sm:p-6 text-left hover:border-amber-500 hover:bg-amber-500/20 transition"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="rounded-full bg-amber-500/20 p-3">
                    <ChevronRight className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <span className="block font-semibold text-white">Skip to booking</span>
                    <span className="block text-sm text-gray-400">I already know what I want.</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-amber-500 flex-shrink-0" />
              </button>
              <div
                className="w-full flex items-center justify-between gap-4 rounded-xl border border-amber-500/20 bg-neutral-800/80 p-6 text-left opacity-70 cursor-not-allowed pointer-events-none"
                aria-disabled="true"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="rounded-full bg-neutral-700 p-3 flex-shrink-0">
                    <Sparkles className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <span className="block font-semibold text-gray-400">Get my hair style</span>
                    <span className="block text-sm text-gray-500">Upload a selfie and we’ll recommend styles that suit your face.</span>
                    <span className="mt-2 inline-block rounded-md bg-amber-500/20 px-2.5 py-1 text-xs font-medium text-amber-400">
                      Still under development
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step: Upload photo */}
          {step === 'upload' && (
            <div className="space-y-6">
              <p className="text-amber-500 text-sm">Step 1 of 3</p>
              <h2 className="text-xl font-semibold text-white">Upload a selfie</h2>
              <p className="text-gray-400 text-sm">Face the camera in good lighting. We’ll suggest styles that suit your face shape.</p>
              <label className="flex flex-col cursor-pointer rounded-xl border-2 border-dashed border-amber-500/30 bg-neutral-800/50 p-6 hover:border-amber-500/50 transition">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0 [clip:rect(0,0,0,0)]"
                  aria-label="Choose a photo"
                />
                {photoPreview ? (
                  <div className="text-center pointer-events-none">
                    <img src={photoPreview} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-lg" />
                    <p className="text-xs text-amber-500 mt-2">Click here to change photo</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400 pointer-events-none">
                    <Camera className="h-10 w-10" />
                    <span className="text-sm">Choose a photo</span>
                    <span className="text-xs text-gray-500">JPEG, PNG or WebP</span>
                  </div>
                )}
                <span className="mt-4 inline-block w-full py-3 px-6 rounded-lg bg-amber-500 text-black text-center text-sm font-semibold pointer-events-none">Choose File</span>
              </label>
              <div>
                <label className="block text-white font-medium mb-2">Current hair length</label>
                <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-row">
                  {HAIR_LENGTH_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setHairLength(opt.value)}
                      className={`flex-1 rounded-lg border py-2.5 text-sm font-medium transition ${
                        hairLength === opt.value ? 'border-amber-500 bg-amber-500/20 text-amber-500' : 'border-amber-500/20 text-gray-400 hover:border-amber-500/40'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              {analysisError && (
                <div className="flex items-center gap-3 rounded-lg border border-red-500/50 bg-red-500/10 p-4">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-400">{analysisError}</p>
                </div>
              )}
              <div className="flex flex-col-reverse sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => { setStep('choose'); setPhotoFile(null); setPhotoPreview(null); setAnalysisError(null); }}
                  className="rounded-lg border border-amber-500/20 px-4 py-3 sm:py-2.5 text-sm font-medium text-gray-300 hover:bg-neutral-800"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={runAnalysis}
                  disabled={!photoFile}
                  className="rounded-lg bg-amber-500 py-3 sm:py-2.5 text-sm font-semibold text-black hover:bg-amber-400 disabled:opacity-50 disabled:pointer-events-none sm:flex-1"
                >
                  Get my style
                </button>
              </div>
            </div>
          )}

          {/* Step: Analyzing */}
          {step === 'analyzing' && (
            <div className="rounded-xl border border-amber-500/20 bg-neutral-800 p-12 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20 mb-4">
                <Sparkles className="h-6 w-6 text-amber-500 animate-pulse" />
              </div>
              <p className="text-white font-medium">Analyzing your photo</p>
              <p className="text-sm text-gray-400 mt-1">Finding styles that suit your face shape…</p>
            </div>
          )}

          {/* Step: Results */}
          {step === 'results' && analysisResult && (
            <div className="space-y-6">
              <p className="text-amber-500 text-sm">Step 2 of 3</p>
              <h2 className="text-xl font-semibold text-white">Styles for you</h2>
              <p className="text-gray-400 text-sm">
                Your face shape: <span className="text-amber-500 font-medium">{formatFaceShape(analysisResult.face_shape)}</span>
                {analysisResult.confidence > 0 && <span className="text-gray-500"> · {Math.round(analysisResult.confidence * 100)}% match</span>}
              </p>
              {analysisResult.annotated_image && (
                <div className="rounded-xl overflow-hidden border border-amber-500/20">
                  <img src={`data:image/jpeg;base64,${analysisResult.annotated_image}`} alt="Your face outline" className="w-full h-auto" />
                </div>
              )}
              <div>
                <p className="text-white font-medium mb-3">Recommended styles</p>
                <ul className="space-y-2">
                  {(analysisResult.suggestions || []).map((style) => (
                    <li key={style}>
                      <button
                        type="button"
                        onClick={() => handleBookWithStyle(style)}
                        className="w-full flex items-center justify-between rounded-lg border border-amber-500/20 bg-neutral-800 px-4 py-3 text-left hover:border-amber-500/40 hover:bg-neutral-700 transition"
                      >
                        <span className="text-white">{style}</span>
                        <span className="text-amber-500 text-sm font-medium">Book this</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => { setStep('upload'); setPhotoFile(null); setPhotoPreview(null); setAnalysisResult(null); setAnalysisError(null); }}
                  className="rounded-lg border border-amber-500/20 px-4 py-3 sm:py-2.5 text-sm font-medium text-gray-300 hover:bg-neutral-800"
                >
                  Try another photo
                </button>
                <button
                  type="button"
                  onClick={() => { setStep('book'); setSelectedStyleForBooking(null); }}
                  className="rounded-lg border border-amber-500/20 px-4 py-3 sm:py-2.5 text-sm font-medium text-gray-300 hover:bg-neutral-800"
                >
                  Skip to booking
                </button>
              </div>
            </div>
          )}

          {/* Step: Booking form */}
          {step === 'book' && (
            <>
              {selectedStyleForBooking && (
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 mb-5">
                  <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                  <p className="text-sm text-amber-200 flex-1 min-w-0">Booking with: <strong>{selectedStyleForBooking}</strong></p>
                  <button
                    type="button"
                    onClick={() => { setForm((f) => ({ ...f, hairstyle: '' })); setSelectedStyleForBooking(null); }}
                    className="text-xs text-gray-400 hover:text-white py-1 -mr-1"
                  >
                    Change
                  </button>
                </div>
              )}
              <p className="text-amber-500 text-sm mb-2">{selectedStyleForBooking ? 'Step 3 of 3' : 'Booking'}</p>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="min-w-0">
              <label className="block text-white font-medium mb-2">Full Name *</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-500/60 pointer-events-none" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full min-w-0 bg-neutral-800/80 border border-amber-500/25 rounded-xl pl-12 pr-4 py-3.5 text-base text-white placeholder-gray-500 transition-colors duration-200 hover:border-amber-500/40 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  placeholder="Enter your name"
                />
              </div>
            </div>
            <div className="min-w-0">
              <label className="block text-white font-medium mb-2">Phone *</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-500/60 pointer-events-none" />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full min-w-0 bg-neutral-800/80 border border-amber-500/25 rounded-xl pl-12 pr-4 py-3.5 text-base text-white placeholder-gray-500 transition-colors duration-200 hover:border-amber-500/40 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  placeholder="+971 50 123 4567"
                />
              </div>
            </div>
            <div className="min-w-0" ref={serviceDropdownRef}>
              <label className="block text-white font-medium mb-2">Service / Hairstyle *</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
                  className="w-full flex items-center justify-between gap-2 min-w-0 bg-neutral-800 border border-amber-500/20 rounded-lg px-4 py-3 text-base text-white focus:outline-none focus:border-amber-500 text-left"
                >
                  {form.hairstyle ? (
                    <>
                      <span className="truncate">{form.hairstyle}</span>
                      {(() => {
                        const service = SERVICES.find((s) => s.name === form.hairstyle);
                        return service ? (
                          <span className="flex items-center gap-1 text-amber-500 flex-shrink-0">
                            <DirhamIcon className="h-5 w-5" />
                            {service.price}
                          </span>
                        ) : null;
                      })()}
                    </>
                  ) : (
                    <span className="text-gray-500">Select...</span>
                  )}
                  <ChevronDown className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform ${serviceDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {serviceDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 z-10 bg-neutral-800 border border-amber-500/20 rounded-lg shadow-xl overflow-hidden max-h-60 overflow-y-auto">
                    {SERVICES.map((s) => (
                      <button
                        key={s.name}
                        type="button"
                        onClick={() => {
                          setErrorMsg('');
                          setForm((prev) => ({ ...prev, hairstyle: s.name }));
                          setServiceDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between gap-2 px-4 py-3 text-left text-white hover:bg-amber-500/10 border-b border-amber-500/10 last:border-0"
                      >
                        <span>{s.name}</span>
                        <span className="flex items-center gap-1.5 text-amber-500 flex-shrink-0">
                          <DirhamIcon className="h-5 w-5" />
                          {s.price}
                        </span>
                      </button>
                    ))}
                    {(analysisResult?.suggestions || []).filter((s) => !SERVICES.some((sv) => sv.name === s)).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setErrorMsg('');
                          setForm((prev) => ({ ...prev, hairstyle: s }));
                          setServiceDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between gap-2 px-4 py-3 text-left text-white hover:bg-amber-500/10 border-b border-amber-500/10 last:border-0"
                      >
                        <span>{s}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Preferred Date */}
            <div className="form-field">
              <label htmlFor="preferred_date" className="form-label">Preferred Date</label>
              <div className={`form-input-with-icon ${!form.preferred_date ? 'form-input-date-empty' : ''}`}>
                <Calendar className="form-input-icon" aria-hidden />
                <input
                  id="preferred_date"
                  type="date"
                  name="preferred_date"
                  value={form.preferred_date}
                  onChange={handleChange}
                  className="form-input form-input-date"
                  aria-label="Select preferred date (dd/mm/yyyy)"
                />
                {!form.preferred_date && <span className="form-input-placeholder">dd/mm/yyyy</span>}
              </div>
            </div>

            {/* Preferred Time */}
            <div className="form-field">
              <label className="form-label">Preferred Time</label>
              <div className="form-time-section">
                <p className="form-time-hint">Choose a period and optional time range</p>
                <div className="form-time-buttons">
                  {(['morning', 'afternoon', 'night'] as const).map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, preferred_time_slot: prev.preferred_time_slot === slot ? '' : slot }))}
                      className={`form-time-btn ${form.preferred_time_slot === slot ? 'form-time-btn-active' : ''}`}
                    >
                      {slot === 'morning' ? 'Morning' : slot === 'afternoon' ? 'Afternoon' : 'Night'}
                    </button>
                  ))}
                </div>
                <div className="form-time-range">
                  <div className="form-time-input-wrap">
                    <label htmlFor="time_from" className="form-time-label">From</label>
                    <div className="form-input-with-icon">
                      <Clock className="form-input-icon" aria-hidden />
                      <input
                        id="time_from"
                        type="time"
                        name="time_from"
                        value={form.time_from}
                        onChange={handleChange}
                        className="form-input form-input-time"
                        aria-label="Time from"
                      />
                      {!form.time_from && <span className="form-input-placeholder">--:--</span>}
                    </div>
                  </div>
                  <div className="form-time-input-wrap">
                    <label htmlFor="time_to" className="form-time-label">To</label>
                    <div className="form-input-with-icon">
                      <Clock className="form-input-icon" aria-hidden />
                      <input
                        id="time_to"
                        type="time"
                        name="time_to"
                        value={form.time_to}
                        onChange={handleChange}
                        className="form-input form-input-time"
                        aria-label="Time to"
                      />
                      {!form.time_to && <span className="form-input-placeholder">--:--</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-w-0">
              <label className="block text-white font-medium mb-2">Notes (optional)</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                className="w-full min-w-0 bg-neutral-800 border border-amber-500/20 rounded-lg px-4 py-3 text-base text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 resize-none"
                placeholder="Any special requests..."
              />
            </div>
            {status === 'success' && (
              <div className="flex items-center gap-3 rounded-lg border border-green-500/50 bg-green-500/10 p-4">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <p className="text-green-400">Booking submitted! We’ll contact you to confirm.</p>
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-3 rounded-lg border border-red-500/50 bg-red-500/10 p-4">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <p className="text-red-400">{errorMsg}</p>
              </div>
            )}
            <div className="flex flex-col-reverse sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setStep(analysisResult ? 'results' : 'choose')}
                className="rounded-lg border border-amber-500/20 px-4 py-3 sm:py-2.5 text-sm font-medium text-gray-300 hover:bg-neutral-800 min-h-[44px] sm:min-h-0"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading || !form.name.trim() || !form.phone.trim() || !form.hairstyle.trim()}
                className="flex-1 rounded-lg bg-amber-500 py-3 text-black font-semibold hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed min-h-[48px]"
              >
                {loading ? 'Submitting…' : 'Book Appointment'}
              </button>
            </div>
          </form>
            </>
          )}
        </div>
      </section>
      <footer className="mt-auto bg-black border-t border-amber-600/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Barber2Door. Professional Home Barber Services.
        </div>
      </footer>
    </div>
  );
}
