# Frontend – WhistleBlower Platform

## Introduction
The Frontend provides a clean and accessible interface for both whistleblowers and administrators. It prioritizes user-friendliness, anonymity, and clarity of results powered by AI, ensuring that reporting can be done without fear or obstacles.

### Flowchart 
<img src="https://mermaid.ink/img/pako:eNqFkMFvgjAYxf-V5tsVzRCVtoclKLp4W-bmYeChQtFGSklbosz4v68iLrutp-977_de014gUzkHCkWpTtmBaYs-4rRC7kTJp-EarSrLdcEyvkWDwQuaJetmJ4VF77xWjl4qLbf3wKwD5smMZUde5Sh6W_XOvHPiJFqhqGJla4RxedOU1vRE3BGLJBamLlmLNlznIrPIKhTlUlQ9tuiwZdJpKOaZMEI9zGVnviZry2xj0MZ5u5LfKm4PcdAdM7Z1aoQKUZb0qSCFZ6xWR06fgiDo58FJ5PZAR_X5b2bxyBS7fzLgwV6LHKjVDfdAci3ZbYXLrS8Fe-CSp0DdmDN9TCGtri5Ts-pLKfmIadXsD0ALVhq3NXXOLI8F22smf1XtfprruWoqC3Q0wn7XAvQCZ6D-OBhOyXQcTPEE-z4JQw9aoOPhCBOMCSETEmIckMnVg-_u4uchDpw4JoEf-lPik-sPRfOpEw?type=png" width="200">

## Tech Stack
- **React.js**
- **Tailwind CSS** - Responsive UI
- **Axios / Fetch API** - Backend communication
- **React Router** - Navigation
- **React**

## User Roles

### 1. Whistleblower
- Anonymous reporting of corruption cases
- Upload evidence (image/video)
- Report status tracking by a Report ID

### 2. Admin (Authority)
- Display all submitted reports
- View the uploaded evidence
- Inspect the reports list
- Accept or reject the reports with official notes

## Key Features

### Report Submission
- **Simple and Minimal Form**:
  - Title
  - Description
  - Upload of evidence
- No login required → encourages participation and anonymity

### Status Tracking
Users can verify:
- **Report Status**
- **Selected Department**
- **Admin notes and feedback**

### Admin Dashboard
- Segregated views:
  - **Waiting**
  - **Accepted**
  - **Rejected**
- AI verdicts are clearly marked as:
  - **REAL**
  - **SUSPICIOUS**
  - **FAKE**
- Evidence preview support for images and videos
