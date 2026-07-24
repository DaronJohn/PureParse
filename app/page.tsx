"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type DragEvent,
  type ChangeEvent,
} from "react";
import {
  Upload,
  Copy,
  Check,
  Shield,
  Zap,
  Lock,
  Eye,
  FileText,
  Cpu,
  ChevronDown,
  ArrowRight,
  ScanText,
  ImageIcon,
  X as XIcon,
  Moon,
  Sun,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Status = "idle" | "processing" | "done" | "error";

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------
interface NavbarProps {
  darkMode: boolean;
  toggleDark: () => void;
}

function Navbar({ darkMode, toggleDark }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm shadow-sm border-b border-gray-100 dark:border-slate-800"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
            <ScanText className="w-4 h-4 text-white" />
          </div>
          <span className="text-slate-900 dark:text-slate-100 font-semibold text-lg tracking-tight">
            PureParse
          </span>
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            ["Features", "#features"],
            ["How It Works", "#how-it-works"],
            ["FAQ", "#faq"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-150 font-medium"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right side: dark mode toggle + CTA */}
        <div className="flex items-center gap-3">
          <button
            id="dark-mode-toggle"
            onClick={toggleDark}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:border-gray-300 dark:hover:border-slate-600 transition-all duration-200"
          >
            {darkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          <a
            href="#upload"
            className="hidden md:inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            Try Free
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Trust Badges
// ---------------------------------------------------------------------------
function TrustBadges() {
  const badges = [
    { icon: Shield, label: "100% Private" },
    { icon: Zap, label: "Instant Results" },
    { icon: Lock, label: "No Data Stored" },
    { icon: Cpu, label: "Runs In Browser" },
  ];
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6">
      {badges.map(({ icon: Icon, label }) => (
        <span
          key={label}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-full px-3 py-1.5"
        >
          <Icon className="w-3.5 h-3.5 text-blue-500" />
          {label}
        </span>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Upload Zone
// ---------------------------------------------------------------------------
interface UploadZoneProps {
  onFile: (file: File) => void;
  isDragOver: boolean;
  setIsDragOver: (v: boolean) => void;
}

function UploadZone({ onFile, isDragOver, setIsDragOver }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) onFile(file);
    },
    [onFile, setIsDragOver]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onFile(file);
      e.target.value = "";
    },
    [onFile]
  );

  return (
    <div
      id="upload"
      role="button"
      aria-label="Upload image for text extraction"
      tabIndex={0}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      className={`relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed cursor-pointer select-none transition-all duration-200 py-14 px-8 ${isDragOver
          ? "border-blue-400 bg-blue-50 dark:bg-blue-950/30"
          : "border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-gray-50/60 dark:hover:bg-slate-800/60"
        }`}
    >
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${isDragOver
            ? "bg-blue-100 dark:bg-blue-900/40"
            : "bg-gray-100 dark:bg-slate-800"
          }`}
      >
        <Upload
          className={`w-6 h-6 transition-colors duration-200 ${isDragOver ? "text-blue-500" : "text-slate-400 dark:text-slate-500"
            }`}
        />
      </div>
      <div className="text-center">
        <p className="text-slate-800 dark:text-slate-200 font-semibold text-base">
          {isDragOver ? "Drop to extract text" : "Drop an image here"}
        </p>
        <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
          or{" "}
          <span className="text-blue-600 font-medium underline underline-offset-2">
            browse files
          </span>{" "}
          · paste a screenshot (⌘V)
        </p>
        <p className="text-slate-300 dark:text-slate-600 text-xs mt-2">
          PNG, JPG, WEBP, BMP, TIFF · Max 20 MB
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        id="file-input"
        accept="image/*"
        className="sr-only"
        onChange={handleChange}
        aria-label="Image file input"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Processing State
// ---------------------------------------------------------------------------
function ProcessingState({ progress }: { progress: number }) {
  return (
    <div className="flex flex-col items-center gap-5 py-10 px-8">
      <div className="relative w-16 h-16">
        <svg
          className="w-16 h-16 -rotate-90 animate-spin"
          style={{ animationDuration: "1.2s" }}
          viewBox="0 0 64 64"
        >
          <circle
            cx="32"
            cy="32"
            r="26"
            fill="none"
            stroke="currentColor"
            className="text-gray-100 dark:text-slate-700"
            strokeWidth="6"
          />
          <circle
            cx="32"
            cy="32"
            r="26"
            fill="none"
            stroke="#2563eb"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${(progress / 100) * 163.4} 163.4`}
            className="transition-all duration-300"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-700 dark:text-slate-300">
          {progress}%
        </span>
      </div>
      <div className="text-center">
        <p className="text-slate-800 dark:text-slate-200 font-semibold text-base">
          Extracting text…
        </p>
        <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
          Tesseract OCR is running locally in your browser
        </p>
      </div>
      <div className="w-full max-w-xs h-1.5 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Result Panel
// ---------------------------------------------------------------------------
interface ResultPanelProps {
  text: string;
  imagePreview: string | null;
  onReset: () => void;
}

function ResultPanel({ text, imagePreview, onReset }: ResultPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Image preview card */}
        {imagePreview && (
          <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-slate-700">
              <ImageIcon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Source Image
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center p-4 min-h-[160px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="Uploaded source for OCR"
                className="max-h-48 rounded-lg object-contain shadow-sm"
              />
            </div>
          </div>
        )}

        {/* Extracted text card */}
        <div
          className={`bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-700 flex flex-col shadow-sm ${!imagePreview ? "sm:col-span-2" : ""
            }`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Extracted Text
              </span>
            </div>
            <button
              id="copy-button"
              onClick={handleCopy}
              aria-label="Copy extracted text to clipboard"
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 ${copied
                  ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-800"
                  : "bg-gray-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-gray-100 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-100 dark:hover:border-blue-800"
                }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
          <div className="flex-1 p-4">
            <div
              className="result-scroll overflow-y-auto max-h-48 min-h-[120px]"
              role="region"
              aria-label="Extracted text content"
            >
              {text.trim() ? (
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-mono">
                  {text}
                </p>
              ) : (
                <p className="text-sm text-slate-400 dark:text-slate-500 italic">
                  No text could be detected in this image. Try a clearer image
                  with distinct characters.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Extract another */}
      <button
        id="reset-button"
        onClick={onReset}
        className="w-full text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2.5 rounded-xl border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-100 dark:hover:border-blue-800 transition-all duration-150"
      >
        Extract from another image →
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hero Section
// ---------------------------------------------------------------------------
interface HeroSectionProps {
  status: Status;
  progress: number;
  extractedText: string;
  imagePreview: string | null;
  isDragOver: boolean;
  setIsDragOver: (v: boolean) => void;
  onFile: (file: File) => void;
  onReset: () => void;
}

function HeroSection({
  status,
  progress,
  extractedText,
  imagePreview,
  isDragOver,
  setIsDragOver,
  onFile,
  onReset,
}: HeroSectionProps) {
  return (
    <section className="pt-32 pb-20 px-6 bg-white dark:bg-slate-950">
      <div className="max-w-3xl mx-auto text-center">
        {/* Eyebrow */}
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900 rounded-full px-3 py-1 mb-6">
          <Zap className="w-3 h-3" />
          Runs 100% in your browser — zero uploads
        </span>

        <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-slate-50 leading-[1.1] tracking-tight mb-5">
          Extract text from{" "}
          <span className="text-blue-600 dark:text-blue-400">any image</span>,
          <br className="hidden sm:block" /> instantly.
        </h1>

        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto mb-4">
          PureParse uses on-device OCR to pull text from screenshots, photos,
          and scanned docs in seconds. Your data never leaves your browser.
        </p>

        <TrustBadges />

        {/* Upload area */}
        <div className="mt-10">
          {status === "idle" && (
            <UploadZone
              onFile={onFile}
              isDragOver={isDragOver}
              setIsDragOver={setIsDragOver}
            />
          )}
          {status === "processing" && (
            <div className="rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
              <ProcessingState progress={progress} />
            </div>
          )}
          {(status === "done" || status === "error") && (
            <div className="rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden p-4">
              <ResultPanel
                text={extractedText}
                imagePreview={imagePreview}
                onReset={onReset}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Before / After Preview Section
// ---------------------------------------------------------------------------
function BeforeAfterSection() {
  const sampleText = `INVOICE #00147

Date: January 14, 2025
Due: February 14, 2025

Bill To:
Acme Corporation
123 Business Ave, Suite 400
San Francisco, CA 94105

Services Rendered:
- Design System Audit    $2,400.00
- UI Component Library   $3,800.00
- Accessibility Review   $1,200.00

Subtotal               $7,400.00
Tax (8.5%)               $629.00

TOTAL DUE              $8,029.00`;

  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight mb-3">
            See it in action
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base max-w-md mx-auto">
            From a scanned invoice to clean, copyable text — in under two
            seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Before */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 dark:border-slate-700">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <span className="ml-2 text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                Source Image
              </span>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-slate-700/50 min-h-[260px] flex items-center justify-center">
              <div className="w-full max-w-[280px] bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-600 p-5 font-mono text-[10px] text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">
                  INVOICE #00147
                </div>
                <div className="text-[9px] text-slate-400 dark:text-slate-500 mb-4 space-y-0.5">
                  <div>Date: January 14, 2025</div>
                  <div>Due: February 14, 2025</div>
                </div>
                <div className="border-t border-dashed border-gray-200 dark:border-slate-600 pt-3 space-y-1 text-[9px]">
                  <div className="flex justify-between">
                    <span>Design System Audit</span>
                    <span>$2,400</span>
                  </div>
                  <div className="flex justify-between">
                    <span>UI Component Library</span>
                    <span>$3,800</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accessibility Review</span>
                    <span>$1,200</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 dark:border-slate-600 mt-3 pt-3 flex justify-between text-[10px] font-bold text-slate-800 dark:text-slate-100">
                  <span>TOTAL DUE</span>
                  <span>$8,029.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* After */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between gap-2 px-5 py-4 border-b border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                  Extracted Text
                </span>
              </div>
              <span className="text-[10px] font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800 rounded-full px-2 py-0.5">
                ✓ Done in 1.2s
              </span>
            </div>
            <div className="p-6 min-h-[260px]">
              <pre className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-mono whitespace-pre-wrap">
                {sampleText}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Features Grid
// ---------------------------------------------------------------------------
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/50 rounded-xl flex items-center justify-center">
        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      </div>
      <div>
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-base mb-1.5">
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function FeaturesGrid() {
  const features = [
    {
      icon: Lock,
      title: "Zero Data Sharing",
      description:
        "Tesseract OCR runs entirely inside your browser tab. Your images are never transmitted to any server, ever.",
    },
    {
      icon: Zap,
      title: "Sub-Second Speed",
      description:
        "Leverages WebAssembly to run machine-learning OCR at near-native speeds, even on large documents.",
    },
    {
      icon: Eye,
      title: "Crystal-Clear Output",
      description:
        "Supports printed text, handwriting, invoices, receipts, and screenshots across dozens of languages.",
    },
    {
      icon: Shield,
      title: "Offline-Ready",
      description:
        "After the first load, PureParse can extract text with no internet connection whatsoever.",
    },
    {
      icon: ImageIcon,
      title: "Any Image Format",
      description:
        "PNG, JPEG, WEBP, BMP, TIFF — just drop any image file and PureParse handles the rest automatically.",
    },
    {
      icon: FileText,
      title: "Paste to Extract",
      description:
        "Take a screenshot and paste it directly (⌘V / Ctrl+V) into PureParse without saving a file first.",
    },
  ];

  return (
    <section id="features" className="py-20 px-6 bg-white dark:bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight mb-3">
            Built around your privacy
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base max-w-md mx-auto">
            Every design decision was made to keep your data exactly where it
            belongs — with you.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// How It Works
// ---------------------------------------------------------------------------
function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Drop or paste your image",
      description:
        "Drag a file into the upload zone, click to browse, or paste a screenshot directly from your clipboard.",
    },
    {
      number: "02",
      title: "OCR runs locally",
      description:
        "Tesseract.js processes your image in a browser Web Worker — no network requests, no waiting for servers.",
    },
    {
      number: "03",
      title: "Copy your clean text",
      description:
        "The extracted text appears instantly. Hit Copy, paste it anywhere — done. Your image is never stored.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight mb-3">
            How it works
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base max-w-md mx-auto">
            Three steps. No account. No credit card. No waiting.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute left-[3.25rem] top-10 bottom-10 w-px bg-gray-200 dark:bg-slate-700" />

          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-[4.5rem] h-[4.5rem] bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm rounded-2xl flex items-center justify-center relative z-10">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {step.number}
                  </span>
                </div>
                <div className="pt-3">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-base mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// FAQ Accordion
// ---------------------------------------------------------------------------
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-gray-100 dark:border-slate-700 last:border-b-0">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150">
          {question}
        </span>
        <ChevronDown
          className={`flex-shrink-0 w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-48 pb-5" : "max-h-0"
          }`}
      >
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Does PureParse upload my images to a server?",
      answer:
        "Absolutely not. PureParse uses Tesseract.js, which runs entirely inside your browser using WebAssembly. Your image data never leaves your device and is never transmitted over the network.",
    },
    {
      question: "Which image formats are supported?",
      answer:
        "PureParse supports PNG, JPEG, WEBP, BMP, TIFF, and most common image formats. As long as your browser can display the image, PureParse can extract text from it.",
    },
    {
      question: "How accurate is the text extraction?",
      answer:
        "Accuracy depends on image quality and font clarity. For printed text in standard fonts, accuracy typically exceeds 95%. For handwriting or low-resolution scans, results may vary. Uploading a higher-resolution image always improves output.",
    },
    {
      question: "Can I use PureParse offline?",
      answer:
        "After your first visit, the Tesseract language data is cached in your browser. You can then extract text from images even without an internet connection.",
    },
    {
      question: "Is PureParse free to use?",
      answer:
        "Yes — PureParse is completely free, with no account required and no usage limits. It runs on open-source technology (Tesseract.js) and is designed to remain free.",
    },
  ];

  return (
    <section id="faq" className="py-20 px-6 bg-white dark:bg-slate-950">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight mb-3">
            Frequently asked questions
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base">
            Everything you need to know about PureParse.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm px-6">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// CTA Section
// ---------------------------------------------------------------------------
function CTASection() {
  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ScanText className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight mb-4">
          Ready to extract some text?
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-8 max-w-md mx-auto">
          No sign-up. No credit card. Just drop your image and get your text —
          completely free, forever.
        </p>
        <a
          href="#upload"
          id="cta-try-button"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md text-sm"
        >
          Try PureParse — It&apos;s Free
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-slate-800 py-10 px-6 bg-white dark:bg-slate-950">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
            <ScanText className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            PureParse
          </span>
          <span className="text-slate-300 dark:text-slate-600 text-sm">·</span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} All rights reserved.
          </span>
          <span className="text-slate-300 dark:text-slate-600 text-sm">·</span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            Made with love by{" "}
            <span className="font-medium text-slate-600 dark:text-slate-300">Daron John</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors duration-150"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors duration-150"
          >
            Terms
          </a>
          <a
            href="https://github.com/DaronJohn/PureParse"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors duration-150"
          >
            GitHub
          </a>
          <a
            href="https://x.com/yesdaron?s=11"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors duration-150"
          >
            <XIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function PureParsePage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Apply / remove dark class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  // Respect system preference on first load
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);
  }, []);

  const toggleDark = useCallback(() => setDarkMode((prev) => !prev), []);

  // Global paste listener
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (status === "processing") return;
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          const pastedFile = item.getAsFile();
          if (pastedFile) {
            processFile(pastedFile);
            break;
          }
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const processFile = useCallback(async (f: File) => {
    setImagePreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });

    const preview = URL.createObjectURL(f);
    setImagePreview(preview);
    setStatus("processing");
    setProgress(0);
    setExtractedText("");

    document
      .getElementById("upload")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });

    try {
      const { createWorker } = await import("tesseract.js");

      const worker = await createWorker("eng", 1, {
        logger: (m: { status: string; progress: number }) => {
          if (m.status === "recognizing text") {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });

      const { data } = await worker.recognize(f);
      await worker.terminate();

      setExtractedText(data.text);
      setProgress(100);
      setStatus("done");
    } catch (err) {
      console.error("Tesseract error:", err);
      setStatus("error");
      setExtractedText("An error occurred during text extraction.");
    }
  }, []);

  const handleReset = useCallback(() => {
    setImagePreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setStatus("idle");
    setProgress(0);
    setExtractedText("");
    document
      .getElementById("upload")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <Navbar darkMode={darkMode} toggleDark={toggleDark} />

      <main className="flex-1">
        <HeroSection
          status={status}
          progress={progress}
          extractedText={extractedText}
          imagePreview={imagePreview}
          isDragOver={isDragOver}
          setIsDragOver={setIsDragOver}
          onFile={processFile}
          onReset={handleReset}
        />
        <BeforeAfterSection />
        <FeaturesGrid />
        <HowItWorksSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
