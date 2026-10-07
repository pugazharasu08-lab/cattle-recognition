# Cattle Recognition — Smart Cattle Identification with AI

An AI-powered cattle breed recognition web application developed for **Smart India Hackathon (SIH)** prototype demonstration.

The system helps field-level livestock inspectors, veterinary officers, dairy cooperatives, and artificial insemination technicians identify indigenous and crossbred cattle & buffalo breeds quickly and accurately, minimizing manual misidentification errors.

---

## 🏆 Prototype Highlights

- **Field Worker Friendly UI**: Large touch targets, intuitive drag-and-drop or device camera capture, high-contrast labels, and clear diagnostic markers.
- **Multimodal AI Vision**: Integration with Google Gemini Vision API (`gemini-1.5-flash`) for real-time morphological analysis.
- **100% Reliable Demo Mode Fallback**: Built-in curated high-resolution bovine specimens (Gir Cow, Sahiwal Cow, Murrah Buffalo, Holstein Friesian, Ongole Bull) with instant 1-click test buttons so the prototype works anywhere, even without internet or an API key.
- **Detailed Morphological Breakdown**: Identifies animal type (Cow / Buffalo), primary breed, confidence percentage ring, gender, age category, physical characteristics (horn structure, cranial dome, dewlap folds, coat pattern), and an alternative possible breeds distribution.
- **Persistent Local History**: Stores previous field inspection records in `localStorage` with CSV export, search, and filtering by breed and species.
- **Comprehensive Breed Catalog**: Full reference directory of 13+ recognized Indian cattle and buffalo breeds (Gir, Sahiwal, Red Sindhi, Tharparkar, Kankrej, Ongole, Hariana, Rathi, Jersey, Holstein Friesian, Murrah, Surti, Jaffarabadi) with milk yield metrics and key distinctions.

---

## 🚀 Live Demo Flow

The complete evaluation workflow is pre-configured and fully functional:

1. **Landing Page (`/`)**: Overview of the Smart India Hackathon challenge, AI vision capabilities, and catalog preview.
2. **Login (`/login`)**: Use the **One-Click Demo Officer Login** button for instant access.
3. **Dashboard (`/dashboard`)**: Live inspection statistics (Total Scans, Identifications, Unique Breeds, Accuracy), recent scan dossier spotlight, and quick actions.
4. **Recognize Cattle (`/recognize`)**:
   - **Option 1**: Upload any JPG, JPEG, PNG, or WEBP image.
   - **Option 2**: Use the device camera with live video feed and framing reticle.
   - **Demo Test Specimens**: Select Gir, Sahiwal, Murrah Buffalo, or edge-case test specimens.
5. **AI Processing Loading Screen**: Smooth 4-step animated loader showing morphological scan progress.
6. **Recognition Result (`/result`)**:
   - Side-by-side cattle photo and AI classification.
   - Animated confidence ring meter.
   - Physical characteristics checklist and breed background.
   - **Possible Breeds Breakdown** (e.g. Gir 92%, Red Sindhi 5%, Sahiwal 3%).
   - Celebration confetti on high confidence detection.
7. **Recognition History (`/history`)**: Filter by cow/buffalo, search by breed, delete records, or export records to CSV.
8. **Breed Catalog (`/breeds`)**: Browse all 13+ breeds with interactive modal dossiers.
9. **Officer Profile & Settings (`/profile`)**: View field officer badge and paste your own Gemini API key or switch between Demo Mode and Live AI.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Lucide React Icons
- **Animation**: Framer Motion, Canvas Confetti
- **Routing**: React Router v7
- **AI Vision**: Google Gemini 1.5 Flash API (with automatic intelligent Demo Fallback)
- **Data Storage**: Client-side LocalStorage (zero external database configuration required)

---

## 💻 Getting Started Locally

### 1. Clone & Install Dependencies

```bash
cd d:/CATTLE_RECOGNITION
npm install
```

### 2. Environment Configuration (Optional)

You can run the application directly in **Demo Mode** without an API key!

To enable live Google Gemini Vision API calls:
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Add your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey):
   ```env
   VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```
*(You can also paste the API key directly in the `/profile` page in the web app anytime!)*

### 3. Start Development Server

```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

### 4. Build for Production

```bash
npm run build
npm run preview
```

---

## 🐮 Recognized Indigenous & Exotic Breeds

| Breed | Species | Native State / Tract | Primary Purpose | Average Milk Yield |
| :--- | :--- | :--- | :--- | :--- |
| **Gir** | Cow | Gujarat | Dairy | 1,800 - 3,200 kg / lactation |
| **Sahiwal** | Cow | Punjab / Haryana | Dairy | 2,200 - 3,500 kg / lactation |
| **Red Sindhi** | Cow | Sindh / Rajasthan | Dairy | 1,800 - 2,800 kg / lactation |
| **Tharparkar** | Cow | Rajasthan / Gujarat | Dual Purpose | 1,600 - 2,500 kg / lactation |
| **Kankrej** | Cow | Gujarat (Kutch) | Dual Purpose | 1,400 - 2,200 kg / lactation |
| **Ongole** | Cow | Andhra Pradesh | Dual Purpose / Draught | Foundation of Brahman cattle |
| **Hariana** | Cow | Haryana / Western UP | Dual Purpose | 1,200 - 1,800 kg / lactation |
| **Rathi** | Cow | Rajasthan | Dairy | 1,500 - 2,500 kg / lactation |
| **Jersey** | Cow | Exotic / Pan-India | Dairy | 4,000 - 5,500 kg / lactation |
| **Holstein Friesian**| Cow | Exotic / Pan-India | Dairy | 6,000 - 9,000 kg / lactation |
| **Murrah** | Buffalo | Haryana / Punjab | Dairy ("Black Gold") | 2,000 - 3,500 kg (7-8.5% fat) |
| **Surti** | Buffalo | Gujarat | Dairy | 1,500 - 2,200 kg / lactation |
| **Jaffarabadi** | Buffalo | Gujarat | Dairy | Heaviest Indian buffalo breed |

---

## 🛡️ License

Developed for the Smart India Hackathon Prototype Presentation. All rights reserved.
