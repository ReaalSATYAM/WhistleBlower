# WhistleBlower 🚨
**A Decentralized, AI-Powered Whistleblowing Platform for Transparent Governance**  

**Theme : Government + Blockchain + AI**  
## Problem Statement

Whistleblowers play a critical role in exposing corruption, fraud, and misconduct within government and public institutions. However, existing systems suffer from:

-  Lack of true anonymity  
-  Risk of evidence tampering  
-  No reliable way to verify submitted media  
-  Poor transparency in complaint handling  
-  Fear of retaliation due to identity exposure  

These limitations discourage citizens from reporting genuine issues and reduce trust in governance systems.

## Our Solution

**WhistleBlower** is a mobile-first decentralized platform that enables citizens to securely submit reports of misconduct with multimedia evidence, while ensuring:

-  No user login or identity collection  
-  Tamper-proof evidence recording using blockchain  
-  AI-based verification of submitted media  
-  Transparent and auditable review workflow  
-  Scalable architecture for government-wide adoption  

## Data Flow Diagram (DFD)
<img src="https://mermaid.ink/img/pako:eNp9VNtu2kAQ_ZXVVpFaKUkxNhf7oZLxpUEhkECSqjV5WOwh3mKvrfWSe_696zUhG4rihxUzc87ZM-MxzzguEsAOXmbFfZwSLtClP2dzhuRzcICuKuAolLUmU60Xt5yUKbqaBdNojj0q6BMw9B39SmklMlhIKPA5vmnw9eNGk1JCNoCBAiC3LDXIIAqYkFkOZSEdJCAIzSoN4EWuECROEdzRBFgMWs2PZutFTsWGrd-Mjo5-oIE6PXX6TRFYovUoLcUr2TtlO00OPNniexWNyONOb0H0ExhwIgDFhWyBCZSSKtUQYTSFuOCJyqOCISWlAabRMM_XgiwykB3UUF1fuQ7VOd3n3R3ueHaH0rM7RNfA6ZLGRNCCfbB8Gs2kxHaQSBSSo9VHkQ9QLskKEGEke6yo_iLOIql9BzyhsT7pU-VwpM6zvT6T_L_xuv7ZcFy7rWtoKh3BPfLlmBYF4ckH0yfRdV1s3rDuZxhteHsWY_zsQ0wrOYDX9-QkcuMYyj3bci6l_kK8p3Ki-hqqc6zp14mXRu4FTXYLjdoLOt83j5kgYl014YW8uL5RfgBxCvGqQpWq3mh4r2BMqsleNiRfuQn04KQJGp-nTTBRwUUTnL8Fmo3HDCr0dTIe_UYngeujWeBdDifj2bfNy6oB6mtHS5plzpegFbbD4LASvFiB86Vldm3X2IRH9zQRqdMuH3TywNtQfS_0gt6WanS7HdP6lCp3raGGZtAPwy21O2gbbv9zar1cb-wwsILulm2HRtu097DxIb7lNMGO4Gs4xDnwnNQhfq6V51ikkMMcO_JnQvhqjufsVXJKwv4URf5G48X6NsXOkmSVjNZlIv8dfErkzufbLJfbANwr1kxgx25ZSgQ7z_gBO0d2-7jXN6xOr232LNtsy-qjTJuWfWx0TKNj9UzLMFtG7_UQP6mLjeOOZdqm3e93e1bPsgz79R9rt7ln?type=png" width="700">

### 1. Report Submission
- User enters title & description  
- Attaches image / video / audio evidence  
- No authentication or personal data required  

### 2. Evidence Handling
- Evidence is processed locally  
- Content hash is generated  
- Hash is recorded on blockchain via smart contract  

### 3. AI Verification
- Media is securely sent to AI service (Hugging Face Space)  
- AI performs deepfake and authenticity analysis  
- Verdict is returned and stored with the report  

### 4. Admin Review
- Admin views reports in dashboard  
- Sees AI verdict + blockchain transaction reference  
- Accepts or rejects report  

### 5. Status Tracking
- Reporter tracks status using **Report ID**  
- No identity disclosure at any stage  

---

## Blockchain Design
<img src="https://mermaid.ink/img/pako:eNqNkE1z2jAQhv_KjjK5GVIwBkuHzoBt2lzrtIeaHIS9xhosySPLJJThv1cYk49Tq4Nmd7XP-672RHJdIGGkrPVLXnFj4SneKHBnmSUHUaDKEdJuK4W1WMD2CD9bNM8wGn2FVZaiOaCBSMums9jCG_Gdt9XzVWfV90ZZxOsa2l7pBzbaOWkFqbxYRlpZw3M7EFFPxFlqtcHPmsBVAU9CYmu5bC4Kq1rneze5UAMd93SSJc4Irk7v8ycHVDebpG9cZ8tCCtXCA6yNmwOdQcQVrNHm1cBfvv0YD9i6x75lv9CI8vg-3qNjd0bYI3StULuPK7je9_eQ2mPt3q556xKEJZSirtldSUuvtUbvkd35vj_EoxdR2IpNm9ePTDwwtJz_N5PcfMrtPxjiEfePgjBrOvSIRCP5JSWni96G2AolbghzYcHNfkM26uyYhqvfWssbZnS3qwgred26rGsKbjEWfGe4fKsat2w0ke6UJWw6Xfi9CmEn8krYZOaP53Q-8-dhEE4mdLHwyJGw2Xga0jCklAZ0EYY-Dc4e-dMbfxmHvivOqD_3gzAIgsn5Lzks6kM?type=png" width="200">

**Smart Contract:** `WhistleblowerRegistry.sol`

### Purpose
- Ensure immutability of submitted evidence  
- Provide tamper-proof timestamping  
- Enable transparent auditing  

### Key Features
- Stores cryptographic hash of report content  
- Records submission timestamp  
- Emits events for every submission  
- Publicly verifiable on-chain  


## AI Integration
**AI Models** : [AI Model Demo](https://huggingface.co/spaces/ReaalSATYAM/DeepFakeDetector)
### AI Capabilities
- Image, video, and audio analysis  
- Deepfake detection  
- Confidence scoring  
- Multi-model verification (CNN + CLIP-based analysis)  

### Deployment
- Models deployed on **Hugging Face Spaces**  
- Accessed via secure **REST APIs**  
- Integrated directly into the admin review flow  

### Outcome
Admins receive:
- **Final verdict:** REAL / FAKE / SUSPICIOUS  
- **Confidence score**  
- **Supporting model analysis**  

This significantly reduces false reports and improves decision quality.

## API Documentation

This document outlines the APIs used by the **WhistleBlower** platform for secure report submission, AI-based evidence verification, and report status tracking. These APIs enable seamless communication between the Android client, backend services, blockchain layer, and AI infrastructure. 

<img src="https://mermaid.ink/img/pako:eNqdUl1r2zAU_StCo9BBEmI7dhw_DBwnKYHCilM2WN0H1b6ONTuSkeW0WdP_vuuPlIVlY0xPku4555778UpjmQD1aFrI5zhjSpPbMBKRIHiCgoPQD75IlOQJ8cvy8RSq6qetYmVG5izOQSQPEe1vxL9bk1t2ABXRxw7cnNBAyKZ-2nFNQiglJkLg8Lq7h1CVUlQw-s72bIAArWTKdWeg_fx4rmaiWpBBnJONZrqu_lcMDf9Wkr9GcX9NvoDiKY-Z5lKQDag9j-HMhd_UtAAoU5YDWYCGuMW2XnzeU3obPkdfdfEndz7_Z3_zoOl2IeMcB8bFhWbPG2NfM17pAp5wsKBC2OJLHUgghVYs1sPri_FRJYuL2Tt3ZDj8dLz7vLknqm31EefaxUOjjd2AAMU09HGyXhxPK3KGCyGWKiGw5wmIGEjGqgyRxoV0N8t7UrVDxmxmr2I2oR51gbNpFvEkfsRBdQj_lFzXSpA9qITHWMO5zNUV7tShgIqkUpEcDiQDllREiuLQT6IJn8oiKS8K78NyvDJXywH2UObgfRhbzsw3-ufwmSc688zy5Vc-blhHXVlLd7V6pzpz0_Ddv1LnQU9dBKtgOX2nGo5jW5MLVDqgW8UT6mlVw4DuQO1Y86SvjWxEdQY73G0PrwlTeUQj8YackolvUu5ONCXrbUa9lBUVvuoywUEvOMOt3L3_KmwJqEDWQlPPnrUa1HulL9SbOKOp67j2xHDGjmHbzoAeqOe6o4k9nVjG2LFmpjl23gb0R5t0PHJtx5hNTSQ4ljWd2W8_Abatgck?type=png" width="700">

## Report Submission API  
### Description  

Accepts a whistleblower report containing metadata and supporting evidence. The API records the report, generates a unique **Report ID**, and triggers blockchain recording for immutability.

> No user authentication or identity information is required.

### Request : Type multipart/form-data

### Request Parameters

| Field | Type | Required | Description |
|------|------|----------|-------------|
| title | String | Yes | Short summary of the issue |
| description | String | Yes | Detailed report description |
| department | String | Yes | Target government department |
| files | File[] | Optional | Evidence files (image, video, audio) |

### Sample Request (Conceptual)
```text
title=Financial Misconduct
description=Irregular transactions detected
department=Vigilance Department
files=[evidence1.mp4, evidence2.jpg]
```
###  Success Response
```json
{
  "success": true,
  "reportId": "WB-7F92A1",
  "message": "Report successfully recorded"
}
```

## API Scalability & Reliability

- Stateless API architecture supports horizontal scaling  
- AI inference services can be replicated across multiple nodes  
- Client-side timeout and retry mechanisms  
- Designed for future migration to government cloud infrastructure  

---

## Error Handling Strategy

| Scenario | System Behavior |
|--------|------------------|
| AI service unavailable | Admin manual review enabled |
| Backend failure | Local storage + blockchain record preserved |
| Network timeout | Safe retry without data loss |
| Invalid input | Graceful and informative error message |


## Database Schema (Logical)

> Current prototype uses local storage. Production-ready schema:

### Reports
| Field | Type |
|------|------|
| report_id | String |
| title | String |
| description | Text |
| status | Enum (pending / accepted / rejected) |
| blockchain_tx | String |
| ai_verdict | String |
| department | String |
| created_at | Timestamp |

### Evidence
| Field | Type |
|------|------|
| evidence_id | String |
| report_id | String |
| file_type | Image / Video / Audio |
| storage_uri | String |
| hash | String |

---

## Android Application Structure

```text
app/
 └── java/com.example.whistleblower
     ├── MainActivity              # Report Submission
     ├── StatusActivity            # Track Report Status
     ├── AdminLoginActivity        # Admin Authentication
     ├── AdminDashboardActivity    # Report Listing
     ├── EvidenceReviewActivity    # AI + Blockchain Review
     ├── LocalReportStore          # Offline-first Storage
     └── api/                      # Retrofit & AI APIs

blockchain/
 └── WhistleblowerRegistry.sol
```

##  Security & Privacy Design

- No user login required  
- No personal identifiers collected  
- Evidence integrity protected by blockchain  
- AI analysis performed without exposing user identity  
- Admin access restricted via protected login  

**Maximum anonymity and safety for whistleblowers is guaranteed.**

---

## Scalability & Future Growth

### Horizontal Scaling
- Backend APIs can be containerized and scaled  
- AI inference load-balanced across multiple model instances  

### Blockchain Scaling
Deployable on:
- Ethereum L2  
- Polygon  
- Government-controlled permissioned blockchain  

### Storage Scaling
Evidence files can be stored on:
- IPFS  
- Government cloud object storage  

---

## Failure Handling

| Scenario | Handling |
|--------|----------|
| AI service unavailable | Admin can manually review |
| Network failure | Offline-first local storage |
| Backend failure | Blockchain record remains intact |
| App crash | Reports preserved locally |

The system is designed to **fail gracefully without data loss**.

---

## Impact & Usefulness

WhistleBlower can be adopted by:
- Anti-corruption bureaus  
- Vigilance departments  
- NGOs  
- Public grievance cells  

It promotes:
- Transparency  
- Citizen trust  
- Accountable governance  
- Safe reporting culture  

---

## Demo
### 1. Enter the Evidence
   - **Action**: User uploads evidence (image, video, audio).
   - <img src="3.jpg" width="300">

### 2. Admin Login
   - **Action**: Admin logs into the dashboard to review evidence.
   - Password: admin123
   - <img src="5.jpg" width="300">

### 3. Process the Evidence Using AI Models and Accept/Reject it.
   - **Action**: Admin uses AI to analyze the evidence for authenticity and accepts or rejects the evidence after reviewing the AI results.
   - <img src="4.jpg" width="300">
   - <img src="1.jpg" width="300">

### 4. Check the Status
   - **Action**: User or admin checks the status of the report.
   - <img src="6.jpg" width="300">
   

## Conclusion

**WhistleBlower** moves beyond ideation into real execution by combining **AI verification**, **blockchain immutability**, and **mobile accessibility** to solve a critical governance problem.
