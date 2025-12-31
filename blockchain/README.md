# Blockchain Module – WhistleBlower

## Overview
The **Blockchain module** ensures the immutability, transparency, and integrity of any evidence submitted by whistleblowers. It is used to store sensitive evidence files, such as images, videos, and audio, on the server, while recording the hash and submission timestamp on the blockchain. This guarantees that evidence can never be tampered with once it has been submitted.

## Flowchart
### Flowchart 
<img src="https://mermaid.ink/img/pako:eNqNkE1z2jAQhv_KjjK5GVIwBkuHzoBt2lzrtIeaHIS9xhosySPLJJThv1cYk49Tq4Nmd7XP-672RHJdIGGkrPVLXnFj4SneKHBnmSUHUaDKEdJuK4W1WMD2CD9bNM8wGn2FVZaiOaCBSMums9jCG_Gdt9XzVWfV90ZZxOsa2l7pBzbaOWkFqbxYRlpZw3M7EFFPxFlqtcHPmsBVAU9CYmu5bC4Kq1rneze5UAMd93SSJc4Irk7v8ycHVDebpG9cZ8tCCtXCA6yNmwOdQcQVrNHm1cBfvv0YD9i6x75lv9CI8vg-3qNjd0bYI3StULuPK7je9_eQ2mPt3q556xKEJZSirtldSUuvtUbvkd35vj_EoxdR2IpNm9ePTDwwtJz_N5PcfMrtPxjiEfePgjBrOvSIRCP5JSWni96G2AolbghzYcHNfkM26uyYhqvfWssbZnS3qwgred26rGsKbjEWfGe4fKsat2w0ke6UJWw6Xfi9CmEn8krYZOaP53Q-8-dhEE4mdLHwyJGw2Xga0jCklAZ0EYY-Dc4e-dMbfxmHvivOqD_3gzAIgsn5Lzks6kM?type=png" width="300">

## Features

- **Immutable Evidence Logging**:  
  Evidence hashes are stored immutably on-chain.

- **Timestamp Verification**:  
  Each report bears a blockchain-verified timestamp.

- **Event-Driven Notifications**:  
  Emits `ReportSubmitted` events to enable real-time dashboard updates.

- **Secure & Transparent**:  
  Only the evidence hashes are stored, which ensures user privacy.

- **Easy Retrieval**:  
  Admins and applications can query the reports and check for integrity.

## Integrating with Backend

- **Evidence Hashing**:  
  Each file uploaded is hashed on the server side using a secure hashing algorithm such as **SHA-256**.

- **Send to Blockchain**:  
  The server invokes the `submitReport(hash)` method on the deployed smart contract.

- **Event Listening**:  
  The backend listens for `ReportSubmitted` events for database updates or to notify the admins. Verification can be done by admins fetching reports via `getReport(index)` to ensure integrity.

