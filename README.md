# WhistleBlower: Decentralized Evidence Verification Platform  

**Team:** Chill Coders  
**Round 2: The Slingshot Submission**  

---

## Project Overview

**WhistleBlower** is a decentralized, multi-platform system designed to securely collect, verify, and store evidence in a tamper-resistant manner. It leverages **AI-powered deepfake detection** alongside blockchain-inspired logging to provide trustworthy validation for images, videos, and audio submissions.  

The system is built around three primary components:

---

### 1. Evidence Submission & Processing

- **Android App & Web Frontend:**  
  - Users submit evidence through the mobile or web interface.  
  - Supports multi-modal input: images, videos, and audio files.  
  - Automatic MIME type detection to route files for appropriate AI processing.  

- **AI Integration:**  
  - **DeepFake Detection Models:**  
    - For **image/video**: Vision-language consistency models (CLIP + CNN-based classifiers).  
    - For **audio**: Wav2Vec2-based deepfake detection model.  
  - **Processing Flow:**  
    1. File is received from the client.  
    2. File is preprocessed (resized images, video frame extraction, audio resampling to 16kHz).  
    3. AI model predicts synthetic vs natural content.  
    4. Confidence scores and final verdict are returned to the client.

- **Ensemble & Verdict Generation:**  
  - For images and videos, multiple frames are analyzed and aggregated into a final “AI Verdict.”  
  - Confidence thresholds determine if the result is **SYNTHETIC**, **NATURAL**, or **QUESTIONABLE**.  

---

### 2. Evidence Storage & Logging

- **Blockchain-Inspired Hashing:**  
  - Every piece of evidence is hashed and stored alongside a timestamp.  
  - Ensures tamper-resistance without requiring a full blockchain implementation.  

- **Database Architecture:**  
  - **Relational Database (PostgreSQL/MySQL):**  
    - Tables for users, reports, evidence metadata, AI results.  
  - **Data Flow:**  
    - Evidence → Preprocessing → AI Analysis → Verdict → Database storage.  
  - Supports indexing for rapid retrieval and verification.

- **Scalability Considerations:**  
  - File storage can be offloaded to cloud storage (S3, GCP, or similar).  
  - AI processing is modular and can scale horizontally using task queues (Celery / RabbitMQ) or serverless functions.  
  - Database designed with indexing and caching layers to support increasing user loads.

---

## Repository Structure

This repository contains two main modules:  

| Folder      | Description                                                                 |
|------------|-----------------------------------------------------------------------------|
| `AndroidAPP` | Android mobile application for submitting evidence and receiving AI verdicts. Each activity, API integration, and AI handling is documented in its own `README.md`. |
| `webAPP`    | Web application for accessing the platform, submitting evidence, and reviewing reports. Frontend and backend setup, along with deployment instructions, are documented in its own `README.md`. |

> **Note:** Each folder has a detailed README explaining installation, setup, and usage for that specific module. Please refer to them for module-specific instructions.

---

## How to Navigate

1. Explore this **main repository README** for overall context and project goals.
2. Visit the `AndroidAPP` folder to learn about the **mobile app**, AI integration, and usage.
3. Visit the `webAPP` folder to explore the **web interface** and backend components.
4. All setup instructions, dependencies, and demo details are provided in each folder’s README.

---

## Evaluation Focus

For Round 2 our focus was on **execution, scalability, and technical depth**. We have ensured:

- Modular and maintainable code for both Android and Web platforms.
- Clear AI integration for evidence verification.
- Scalability considerations for future user growth.
- Proper Git workflow with feature branches and PRs for all contributions.

---
## Quick Demo
**Frontend Demo:** : [WhistleBlower Frontend Demo](https://reaalsatyam.github.io/WhistleBlower/)

**AI Models** : [AI Model Demo](https://huggingface.co/spaces/ReaalSATYAM/DeepFakeDetector)
