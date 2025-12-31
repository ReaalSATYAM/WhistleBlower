# Frontend – WhistleBlower Platform

## Overview

The **Frontend** provides a clean, accessible interface for whistleblowers and administrators.  
It focuses on **ease of use**, **anonymity**, and **clarity of AI results**, ensuring that users can submit reports without fear or technical barriers.


### Flowchart 
<img src="https://mermaid.ink/img/pako:eNqFkMFvgjAYxf-V5tsVzRCVtoclKLp4W-bmYeChQtFGSklbosz4v68iLrutp-977_de014gUzkHCkWpTtmBaYs-4rRC7kTJp-EarSrLdcEyvkWDwQuaJetmJ4VF77xWjl4qLbf3wKwD5smMZUde5Sh6W_XOvHPiJFqhqGJla4RxedOU1vRE3BGLJBamLlmLNlznIrPIKhTlUlQ9tuiwZdJpKOaZMEI9zGVnviZry2xj0MZ5u5LfKm4PcdAdM7Z1aoQKUZb0qSCFZ6xWR06fgiDo58FJ5PZAR_X5b2bxyBS7fzLgwV6LHKjVDfdAci3ZbYXLrS8Fe-CSp0DdmDN9TCGtri5Ts-pLKfmIadXsD0ALVhq3NXXOLI8F22smf1XtfprruWoqC3Q0wn7XAvQCZ6D-OBhOyXQcTPEE-z4JQw9aoOPhCBOMCSETEmIckMnVg-_u4uchDpw4JoEf-lPik-sPRfOpEw?type=png" width="200">

## Tech Stack

- **React.js**
- **Tailwind CSS** – Responsive UI
- **Axios / Fetch API** – Backend communication
- **React Router** – Navigation


## User Roles

### 1. Whistleblower (Public User)

- Submit corruption reports **anonymously**
- Upload evidence (image / video)
- Track report status using a unique **Report ID**

### 2. Admin (Authority)

- View all submitted reports
- Review uploaded evidence
- View AI-generated verdicts
- Accept or reject reports with official notes


## Key Features

### Report Submission

- Simple and minimal form:
  - Title
  - Description
  - Evidence upload
- No login required → encourages participation and anonymity


### Status Tracking

- Users can check:
  - Report status
  - Assigned department
  - Admin notes and feedback


### Admin Dashboard

- Segregated views:
  - Pending
  - Accepted
  - Rejected
- AI verdicts clearly shown as:
  - **REAL**
  - **SUSPICIOUS**
  - **FAKE**
- Evidence preview support for images and videos
