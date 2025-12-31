# Blockchain Module – WhistleBlower

## Overview

The Blockchain module ensures immutability, transparency, and integrity of all evidence submitted by whistleblowers. While sensitive evidence files (images, videos, audio) are stored on the server, their hashes and submission timestamps are recorded on the blockchain. This guarantees that evidence cannot be tampered with once submitted.

### Flowchart 
<img src="https://mermaid.ink/img/pako:eNqNkE1z2jAQhv_KjjK5GVIwBkuHzoBt2lzrtIeaHIS9xhosySPLJJThv1cYk49Tq4Nmd7XP-672RHJdIGGkrPVLXnFj4SneKHBnmSUHUaDKEdJuK4W1WMD2CD9bNM8wGn2FVZaiOaCBSMums9jCG_Gdt9XzVWfV90ZZxOsa2l7pBzbaOWkFqbxYRlpZw3M7EFFPxFlqtcHPmsBVAU9CYmu5bC4Kq1rneze5UAMd93SSJc4Irk7v8ycHVDebpG9cZ8tCCtXCA6yNmwOdQcQVrNHm1cBfvv0YD9i6x75lv9CI8vg-3qNjd0bYI3StULuPK7je9_eQ2mPt3q556xKEJZSirtldSUuvtUbvkd35vj_EoxdR2IpNm9ePTDwwtJz_N5PcfMrtPxjiEfePgjBrOvSIRCP5JSWni96G2AolbghzYcHNfkM26uyYhqvfWssbZnS3qwgred26rGsKbjEWfGe4fKsat2w0ke6UJWw6Xfi9CmEn8krYZOaP53Q-8-dhEE4mdLHwyJGw2Xga0jCklAZ0EYY-Dc4e-dMbfxmHvivOqD_3gzAIgsn5Lzks6kM?type=png" width="200">

## Features

- **Immutable Evidence Logging**: Evidence hashes are permanently stored on-chain.
- **Timestamp Verification**: Every report has a blockchain-verified timestamp.
- **Event-Driven Notifications**: Emits `ReportSubmitted` events for real-time dashboard updates.
- **Secure & Transparent**: Only hashes are stored, maintaining user privacy.
- **Easy Retrieval**: Admins and applications can query reports and verify integrity.

# Integration with Backend

1. **Hash Evidence:**
Each uploaded file is hashed on the server using a secure hashing algorithm (e.g., SHA-256).

2. **Submit to Blockchain:**
The server calls `submitReport(hash)` on the deployed smart contract.

3. **Event Listening:**
Backend listens to `ReportSubmitted` events to update the database or notify admins.

4. **Verification:**
Admins can fetch reports using `getReport(index)` to verify integrity.
