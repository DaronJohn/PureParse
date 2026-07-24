<div align="center">

<img src="public/next.svg" width="40" alt="PureParse logo" />

# PureParse

**Instant, private image-to-text extraction — 100% in your browser.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8?logo=tailwindcss)](https://tailwindcss.com)
[![Tesseract.js](https://img.shields.io/badge/Tesseract.js-7.0-orange)](https://tesseract.projectnaptha.com)

</div>

---

## What is PureParse?

PureParse is a modern, single-page OCR (Optical Character Recognition) SaaS web application that extracts text from any image — entirely inside your browser. No files are ever uploaded to a server. No accounts. No waiting.

It is powered by [Tesseract.js](https://github.com/naptha/tesseract.js), which runs the Tesseract OCR engine via WebAssembly in a browser Web Worker.

---

## Features

- 🔒 **100% Private** — your images never leave your device
- ⚡ **Instant** — WebAssembly-powered OCR with real-time progress
- 📋 **Paste to extract** — paste a screenshot directly with ⌘V / Ctrl+V
- 🖱️ **Drag & drop** — drop any image file onto the upload zone
- 📄 **Copy to clipboard** — one-click copy with a visual success flash
- 🌙 **Dark mode** — system-preference aware with a manual toggle
- 📱 **Responsive** — works on desktop and mobile
- 🔌 **Offline-ready** — after first load, works without internet

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| UI | [React 19](https://react.dev) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Icons | [lucide-react](https://lucide.dev) |
| OCR Engine | [Tesseract.js 7](https://github.com/naptha/tesseract.js) |
| Font | Geist (via `next/font/google`) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/DaronJohn/PureParse.git
cd PureParse

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## How It Works

1. **Drop or paste** an image into the upload zone
2. **Tesseract.js** processes it locally in a browser Web Worker — no network requests
3. **Copy** the extracted text and paste it anywhere

The entire OCR pipeline runs client-side. The image data is represented as a browser `Blob` / `objectURL` and is never serialised or transmitted.

---

## Project Structure

```
PureParse/
├── app/
│   ├── globals.css      # Tailwind v4 entry, dark mode variant, scrollbar styles
│   ├── layout.tsx       # Root layout with Geist font and SEO metadata
│   └── page.tsx         # Full single-page app (all components inlined)
├── public/              # Static assets
├── next.config.ts       # Next.js config (allowedDevOrigins for mobile testing)
├── postcss.config.mjs   # Tailwind v4 PostCSS plugin
└── tsconfig.json
```

---

## Author

**Daron John** — [@yesdaron](https://x.com/yesdaron?s=11) · [GitHub](https://github.com/DaronJohn)

Made with ❤️ by Daron John.