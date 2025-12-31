# Backend – WhistleBlower Platform

## Overview

The **Backend** is the core orchestration layer of the WhistleBlower platform. It securely handles report submissions, manages evidence uploads, integrates AI-based verification services, and logs critical actions to the blockchain for immutability.

### Flowchart 
<img src="https://mermaid.ink/img/pako:eNqFkctu2zAQRX-FmGxto7JsWeSigB3FD6AFiqjtolIWDDmyCEukQVFOUsP_HkpWg3hVruZx7h1c8AzCSAQGRWVeRMmtIz-TXBP_ltmvBi1J2-dauYY84tFY90TG469kla24OKCWZPlj93TFV_3mPkudsUgeTkqiFkjWqsLmBkmytFN-EM6Q5Y6kaE9K4EAmPfmQPaJAdcIO-I1WKuFurNbZBjVa7j4d3PKmHKB1D22yb2bfj4nRZFUZcfBBlb5x2mYp93euIcl3dFxyxwdk2yO7bClrpUninZ4Ntz68ENh04a5Y494q9H6Fqip2V9Bi1DhrDsjuwjAc6vGLkq5k0-PrZ81m0NAi-o8GRrC3SgJztsUR1Ghr3rVw7vxycCXWmAPzpeT2kEOuL15z5PqPMfU_mTXtvgRW8KrxXXv0WTFRfG95_TG1_pPQ3ptWO2DT6WLRuwA7wyuwYBZOIhrNwiiex0FAu-0bsNlkGtM4ppTO6SKOQzq_jOBvf_jLJA79cEbDYBFENKCXdxHRw_s?type=png" width="600">

## Tech Stack

- **Node.js + Express.js** – REST API server  
- **Multer** – Secure evidence file uploads  
- **Filesystem Storage** – Evidence storage (Round 1)  
- **AI Evidence Service** – Deepfake detection (image & video)  
- **Blockchain (Ethereum / EVM)** – Immutable evidence hash logging  

## Core Responsibilities

### 1. Report Submission

- Accepts **title**, **description**, and **evidence files**
- Supports multiple evidence types:
  - Images
  - Videos
  - *(Audio pipeline explored, not deployed in Round 1)*

### 2. Evidence Handling

- Files stored in the `/uploads` directory
- Metadata saved in an in-memory database (prototype stage)
- Evidence hashes sent to blockchain for tamper-proof logging

### 3. AI Integration

- Sends uploaded evidence to `evidence_service`
- Receives AI verdicts:
  - `REAL`
  - `SUSPICIOUS`
  - `FAKE`
- AI verdicts are stored alongside report metadata

### 4. Blockchain Logging

- Generates cryptographic hash of evidence
- Logs hash and timestamp using a smart contract
- Ensures immutability without exposing sensitive data


### 5. Admin Operations

- Fetch all submitted reports
- Update report status:
  - Pending
  - Accepted
  - Rejected
- Attach admin notes for transparency and accountability


