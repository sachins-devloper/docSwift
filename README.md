# DocSwift Mobile Client

The React Native mobile client for **DocSwift** - High Performance 100% Offline On-Device PDF & Document Utility.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start Metro Bundler
npm start

# 3. Build & Run on Android Device / Emulator
npm run android
```

---

## 🛠️ Feature Suite (16 Tools)

- 🚀 **Shortcuts**: ID Card Scan, Scan Docs, Book Scan, QR Code Reader/Gen, To Text (OCR).
- 📁 **Process Files**: Import Files, Collage Images, PDF Watermark, PDF Merge, Compression.
- 📄 **PDF Tools**: PDF Signature, PDF Password, Page Reorder, PDF to Word, Word to PDF, Split PDF.

---

## 🧠 Offline Engine Integration

- **`PdfLibEngine.ts`**: 100% client-side PDF creation, merging, splitting, stream compression, page reordering, watermarking, e-signature placement, and password protection.
- **`DocxGeneratorEngine.ts`**: Client-side `.docx` Word document generator.
- **Native Android Layer**:
  - OpenCV C++ engine for document perspective transform, deskewing, and 5 scanner color filters.
  - Google ML Kit On-Device OCR for offline text recognition.
  - PDFium & Apache PDFBox for high-speed PDF rendering and stream concatenation.
  - Chaquopy embedded Python engine for local `pdf2docx` conversion.

---

## 🏛️ Clean Architecture Layers

- `src/app`: Application entry point, providers, and navigators (`RootNavigator`, `MainNavigator`).
- `src/features/onboarding`: `SplashScreen.tsx` (native `react-native-bootsplash`) & `OnboardingScreen.tsx` (2 slides).
- `src/features/scanner`: Camera viewfinder, 5 visual filters, multi-format export (`.pdf`, `.docx`, `.jpg`, `.png`, `.txt`).
- `src/features/conversion`: PDF operations, `PdfLibEngine`, `DocxGeneratorEngine`, tool screens.
- `src/features/home`: Home workspace tools grid (`Shortcuts`, `Process Files`, `PDF Tools`).
- `src/shared/services/nativeBridge.service.ts`: Kotlin Native Android Module bridge interface signatures.
- `src/store`: Zustand state stores (`conversion.store.ts`, `app.store.ts`, `theme.store.ts`).
