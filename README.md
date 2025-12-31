# WhistleBlower 🚨

A decentralized platform for securely submitting and reviewing complaints or reports of misconduct, combining **AI, blockchain, and modern web technologies**.


## Overview

**WhistleBlower** allows users to submit reports with multimedia evidence, which are then verified using AI models. All submissions are stored on a **tamper-proof blockchain**, ensuring transparency and integrity. Admins can review, verify, and manage reports efficiently through a dynamic dashboard.

**Theme Selected:** Government + Blockchain + AI

## Features Implemented (Round 1)
### Flowchart 
<img src="https://mermaid.ink/img/pako:eNqNkttu4jAQhl_FcqW9ol0ChEMuVqLQUnpcwbaVNvTC2BPwktjIduiB8u47OAEVVastV57M988_B9aUawE0okmqn_mcGUd-9SeK4K8b31sw5Dt5nEvrUpgiAeaJHB__IKfxOJ9m0pERLDVqVpKRR5g-FcpTz_Ti-2WqmSBnKylAcYjIMGMzqJAHjHXJ9jzbj8dgVug2Ag5yBXZX-NteXfJ9z5_FY6cN7JNEKjIGnuOnbQJdDvDz-FrPdiVvwDHBHCNOk9NU8wWOLdUBP4hHuSLdIXkAIxPJmZN6RwwKIoj9MLgePw3pAywTtgB8OOCf-Xrc0yopux1zbaSa4XRoICR3ZAAKzIFN4HUX5aDYS1ex9NXK7Wpsnjq7A-sFWEQXPhjGXZHhSvrMzqeaGYGalYTnUjL00OW6hIBLi8abInm5Tb53OYeleydXeERcFuyWN3bM5TYiRR7E00fRCP7g6O_k-h-iIr8XXfk2buJzADFlfOFPBwK3cqsdrh2feKLDf1-hvC6URXDjg1u8R5Y7Nk23trhfQbT6fN9bD9_FZ0qQn0ZzsBZPWPbZS7X13RWsda9YrEsSmabRUdJJKtYZvYDoqF6vl-_jZyncPKotXz5q7kpNJ2l-WTPY-STTL2su9739z4dW6MxIQSNncqjQDEzGtiFdb-tNqJtDBhMa4VMws5jQidqgZsnUb62znczofDanUcJSi1Huj9yXbGZYtv9qQAkwPZ0rR6Og2g59FRqt6QuNao3mSbXdatbqIWZazaBRoa80ChsnYTVodmphI2gHYasdbir0zRtXT1rNVhAEYb3a6TQ7QbD5C7fie9w?type=png" width="500">

### Web Interface
- User-friendly complaint submission form supporting multiple files (images, audio, video).
- Dynamic admin dashboard with:
  - Report overview
  - Evidence preview
  - AI verdict and confidence scores
  - Status management (Accepted / Rejected / Pending)

### Backend
- **Node.js + Express.js** server handling report submission, status updates, and retrieval.
- In-memory database for fast testing (to be replaced with persistent DB later).
- API endpoints:
  - `POST /api/report` → Submit new reports
  - `GET /api/reports` → Fetch all reports
  - `POST /api/update-status` → Update report status
  - `GET /api/status/:id` → Check status of a report by ID
- Automated department assignment using NLP on report description.

### AI Integration
- Image and video evidence verification.
- Detection of **fake or suspicious content**.
- Confidence scoring for each AI verdict.

### Blockchain Integration
- Tamper-proof recordkeeping for all reports and evidence.
- Immutable audit trail for admin actions and status changes.

### Security & Management
- File uploads stored in `/uploads` (excluded from Git via `.gitignore`).
- Admin role verification for dashboard access.
- Real-time rendering of AI results for each piece of evidence.

## Round 2 Planned Enhancements
### Flowchart 
<img src="https://mermaid.ink/img/pako:eNqNU9tu4jAQ_RXLK-0TdAnhmoeVUmjpjRZB25U29MHYE_CS2JHj0HYp_76TC6ioWrV58njOmTlzxtlSrgVQj4aRfuYrZiy5H84Vwc8PHlIw5Af5tZKpjWCBCDBPpF7_SU6DWbaIpSVTSDRyNpIRXwmjpSB-kuQkWDyVdU4LxiB4SCLNBDnbSAGKg0cuY7aEGnnEWNeInwmpK8qgoAyDGZgNSpgCB7mBdN_t-6FIhR8W-LNgZrWBQ5JIRWbAM7zKE9jsCH4e3OjlvuQYLBPMMmI1OY00X6MXUh3hR8E0U8S_JI9gZCg5s1LvEaMS4QTFTDh-MRQZAiQhWwMeLPCP-GZQTP0pzg0GWoXVVDOujVRLdAGFCMktGYECcyTHKXgXlSGo2Vcsek1lbmGaRTbdA5slsIrc99FFEVwGvojRyCFLVwvNjMAKGwnPVYHLAnS1rUDAZYoydmXyKk---ZxDYt_INb4AtBj2ls8ss1nqkTIP4uk9aQp_0Ig3cvMfUpk_kK4LGePgHEAsGF8XCweBHt1qi8vCIy72-CGXzJuSWQbjIrjFLcaZZYsob4tuC6LVx1dxW4DvgjMlyMRoDmmKi690DiKdHtRNAtzAGP-ziJxLBfX7TOULDLXBfyAxeoPyJmAwjln-qMulz1XJTu0rCvFJKKPI-xb2w1pqjV6D98113epcf5bCrrxm8vKec1dx-mHny5zRvk-4-DLn6qDt630mFafDP5uH1ujSSEE9azKo0RjQpTyk27zenNoVxDCnHh4FM-s5nasdchKmfmsd72lGZ8sV9UIWpRhlxaMaSrY0LD7cGlACzEBnylLPafXcogr1tvSFek3npN3ouz230ei0m-1mq0ZfqVdvt7onnVar0ey1Ow2n6zq7Gv1b9HVOuo1et9dz3G67g7B-f_cP2qy2xg?type=png" width="500">

### Platform Expansion
- Develop an **Android mobile application** for seamless report submission.
- Real-time notifications for both users and admins.
- Support for offline submission with later synchronization.

### AI Enhancements
- Fine-tune existing AI models for improved accuracy.
- Introduce **deepfake detection for audio evidence**.
- Expand verdict categories for clearer report evaluation.

### UI / UX Improvements
- Evidence filtering, sorting, and batch AI processing.
- Enhanced analytics dashboard for administrators.
- Better visualization of report trends and AI verdicts.

## Technical Flow / Architecture

1. **User Submits Report**
   - Title, description, and multimedia evidence uploaded via the web/mobile interface.
2. **Server Processing**
   - Backend stores report in database and uploads files to server storage.
   - AI model evaluates evidence and provides verdicts.
3. **Blockchain Logging**
   - Each report submission, evidence upload, and admin action is recorded on the blockchain for immutability.
4. **Admin Dashboard**
   - Admins review reports, process evidence with AI, and update status.
5. **User Notification**
   - Users can track report status and view AI verdicts.

## Getting Started

### Clone the repository

```bash
git clone https://github.com/ReaalSATYAM/WhistleBlower.git
cd WhistleBlower
```

### Run Backend
```bash
cd backend
node server.js
```

### Flask API
```bash
cd evidence_service
python app.py
```

### Run Frontend
```bash
cd frontend
npm run dev
```

## Live Demo

🔗 **Frontend Demo:**  
https://reaalsatyam.github.io/WhistleBlower/

The live demo showcases:
- Whistleblower report submission flow
- Admin login and dashboard UI
- Application routing and overall user experience
---

##  Demo Limitations

- GitHub Pages supports **frontend-only (static) hosting**
- Backend services, AI model inference, and blockchain interactions are **not active** in the live demo
- Evidence upload UI is visible, but actual AI analysis and blockchain logging run **locally**
- Full implementation details are documented in **folder-wise READMEs** (`backend`, `evidence_service`, `blockchain`, `frontend`)

> All core features are fully implemented and reproducible locally.

# Vision & Purpose

### Our Vision

To create a corruption-free, transparent, and accountable society by empowering citizens to safely report misconduct and unethical practices. WhistleBlower envisions a world where transparency is the norm, not the exception, and every voice matters.

### Why WhistleBlower is Needed

1. **Empowering Citizens:**
Many people witness corruption, mismanagement, or misuse of resources but lack a secure platform to report it. WhistleBlower ensures anonymity and protection, encouraging citizens to speak up without fear.

2. **Transparency & Accountability:**
Government departments and organizations can track reports with a tamper-proof blockchain, creating an immutable audit trail. This reduces manipulation and ensures trust in the reporting system.

3. **Efficient Investigation:**
AI-assisted verification of evidence (images, videos, audio) reduces manual effort and speeds up the evaluation process. Reports are categorized intelligently, making it easier for authorities to act promptly.

4. **Reducing Corruption at Scale:**
By making reporting easy, secure, and reliable, WhistleBlower helps uncover corruption across different sectors, contributing to a more ethical and transparent governance system.

5. **Integrating Modern Technology:**
   - Blockchain: Ensures data immutability and transparency.

   - AI: Detects fake or manipulated evidence, increasing credibility.

   - Mobile & Web Access: Anyone can report, anytime, anywhere.

### Impact

- Protects whistleblowers while ensuring evidence integrity.

- Streamlines reporting for government and organizational oversight.

- Promotes citizen participation in governance.

- Paves the way for a corruption-free India through technology-driven accountability.

## Project Documentation Structure

To ensure **clarity, transparency, and ease of evaluation**, this repository follows a **modular documentation approach**.

Each major component of the system has its **own dedicated README file**, explaining:
- Design decisions
- Technical flow
- Models, tools, and limitations
- Current implementation (Round 1)
- Planned improvements (Round 2)

### Available Module-wise READMEs

- `evidence_service/README.md` → AI models, deepfake detection pipeline (image/video/audio)
- `blockchain/README.md` → Smart contract design and immutability logic
- `backend/README.md` → API design, report handling, storage flow
- `frontend/README.md` → User interface, admin dashboard, UX flow

# License

This project is open-source and available under the MIT License.
