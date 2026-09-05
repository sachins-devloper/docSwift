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

## 🏛️ Clean Architecture Layers

- `src/app`: Application entry point, providers, and navigators (`RootNavigator`, `MainNavigator`).
- `src/features/scanner`: Camera viewfinder, OpenCV edge detection, ML Kit OCR, 5 visual filters, and export formats (`.pdf`, `.docx`, `.jpg`, `.png`, `.txt`).
- `src/features/conversion`: PDF operations, `PdfLibEngine`, `DocxGeneratorEngine`, tool screens, and progress trackers.
- `src/features/home`: Home dashboard, tool cards, and quick conversion actions.
- `src/shared/services/nativeBridge.service.ts`: Kotlin Native Android Module bridge interface signatures.
- `src/store`: Zustand state stores (`conversion.store.ts`, `app.store.ts`, `theme.store.ts`).
- `src/config/theme`: Material 3 design system tokens (`colors`, `typography`, `spacing`, `radius`, `shadows`).
