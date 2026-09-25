# AI Resume Maker

A React + Vite resume builder with a Node/Express backend for Gemini ATS analysis and AI writing assistance.

## Included
- Live A4 resume preview
- Personal Information
- Professional Summary
- Experience
- Projects
- Education
- Skills with categories
- Awards & Certifications
- Extra-Curricular Activities
- Target Job Description
- Gemini ATS analysis through the backend
- Gemini summary improvement
- Browser localStorage persistence
- PDF export through the browser print dialog
- Four application themes: Midnight, Ocean, Emerald and Sunset
- Responsive UI and subtle scroll/load/hover animations
- Footer credit: Suyash Verma, B.Tech in Information Technology

## Run frontend
```bash
cd frontend
npm install
npm run dev
```

## Run backend
Create `backend/.env` from `.env.example`, add your Gemini API key, then:

```bash
cd backend
npm install
npm run dev
```

Never put the Gemini API key in the frontend.
