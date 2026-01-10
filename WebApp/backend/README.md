# WhistleBlower Platform - Backend

## Overview
The **Backend** represents the core orchestration layer for the WhistleBlower platform. It securely handles report submissions, manages evidence uploads, integrates AI-based verification services, and logs critical actions to the blockchain for immutability.

## Flowchart
<img src="https://mermaid.ink/img/pako:eNqFkctu2zAQRX-FmGxto7JsWeSigB3FD6AFiqjtolIWDDmyCEukQVFOUsP_HkpWg3hVruZx7h1c8AzCSAQGRWVeRMmtIz-TXBP_ltmvBi1J2-dauYY84tFY90TG469kla24OKCWZPlj93TFV_3mPkudsUgeTkqiFkjWqsLmBkmytFN-EM6Q5Y6kaE9K4EAmPfmQPaJAdcIO-I1WKuFurNbZBjVa7j4d3PKmHKB1D22yb2bfj4nRZFUZcfBBlb5x2mYp93euIcl3dFxyxwdk2yO7bClrpUninZ4Ntz68ENh04a5Y494q9H6Fqip2V9Bi1DhrDsjuwjAc6vGLkq5k0-PrZ81m0NAi-o8GRrC3SgJztsUR1Ghr3rVw7vxycCXWmAPzpeT2kEOuL15z5PqPMfU_mTXtvgRW8KrxXXv0WTFRfG95_TG1_pPQ3ptWO2DT6WLRuwA7wyuwYBZOIhrNwiiex0FAu-0bsNlkGtM4ppTO6SKOQzq_jOBvf_jLJA79cEbDYBFENKCXdxHRw_s?type=png" width="900">

## Stack of Technologies
- **Node.js + Express.js** – REST API server
- **Multer** – Secure evidence file uploads
- **Filesystem Storage** – Evidence storage (Round 1)
- **AI Evidence Service** – Deepfake Detection (Image & Video)
- **Blockchain** – Immutable proof hash logging (Ethereum / EVM)

## Primary Responsibilities

### 1. Submission of Report
- Accepts a title, description, and evidence files.
- The system supports various evidence types, including:
  - Images
  - Videos
  - Audio (explored, not deployed in Round 1)

### 2. Evidence Handling
- Files are stored in the `/uploads` directory.
- Metadata is stored in an in-memory database (prototype).
- Evidence hashes are sent to the blockchain for tamperproof logging.

### 3. AI Integration
- Sends uploaded evidence to the **evidence_service**.
- Receives AI verdicts:
  - **REAL**
  - **SUSPICIOUS**
  - **FAKE**
- The metadata of the reports and AI verdicts are stored together.

### 4. Blockchain Logging
- Generates a cryptographic hash of the evidence.
- The hash and timestamp are logged using a smart contract.
- Guarantees immutability without revealing sensitive data.

### 5. Admin Operations
- Retrieve all submitted reports.
- Update report status:
  - **Pending**
  - **Accepted**
  - **Rejected**
- Attach admin notes for transparency and accountability.
