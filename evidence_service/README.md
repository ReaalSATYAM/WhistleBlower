# Evidence Service (AI Module)

This module handles the **verification of submitted evidence** (images, videos, and audio) using state-of-the-art AI models. It is a core part of the **WhistleBlower** project.

### Flowchart 
<img src="https://mermaid.ink/img/pako:eNqNUtFSm0AU_ZU769i-JBpCQwMP7USSKBqTjKnOtMSHFS6EEXaZXYjamH_vwpLUOD7IA8O5e865d89lQwIeInFIlPKnYEVFAb-GSwbqGfi3ecppCKN1EiILENrgZTTG0zuF-T202z_gzJ8LzAUPUMo98V4b6PfxsVbBg6AsWOniWS12N57Uhz-3uu5W9dffKF9h6N-UDNyJN4drNWLamA5r5ch3eZaXBcIN0hTWEsb0EWERcIHygDnWNtMpDBHzqGINscCg4KLhjWve-d6x4t6hCJOggC_gchYd3GpU0y_8cSkTzmDC4yRojs71kQYXNfD8c2QoqPIdJ0yN2jg7cDMaTOAUFreLued6s9uFAuPB1eh9eHXYB-HpkKa8BUnxVWrCK1z6C5rlqeojaIZSLQvXKF6AFSuIqlJjfFnPdfUuXVBXGdFgpdUH1MmbBHVwH5KvavL1Psb6rD1RQ6S6T3Pz3XomNX_6Mf__Cnb065o-89_S9AqcakcSmSwl5CgOhppqlQazGsz9QRwLjOmup_qFZJnuG8313pZsv4FF8ZImLNZYKoAwgChJU-cosqOWLAR_ROfINM3mu_2UhMXK6ebPbzVeo7Ej69Oai12f6OHTmtmnNaRFYpGExClEiS2SochoBcmm8luSYoUZLomjPkMqHpdkybZKk1P2h_NsJxO8jFfEiWgqFSrzUCU7TGisst1XBbIQhctLVhCna_TN2oU4G_JMHMO0TmzDMI2uYZqW2fmuTl-I07NOej27b3yzbNO2uv3-tkX-1n07J3ana1k9q9exTdMwu_3tP-yudw8?type=png" width="500">

## Models Used

### 1. Image & Video Deepfake Detection
We use a combination of **CLIP** and **CNN-based deepfake detection** for robust multimedia analysis.

- **CLIP Model**: `openai/clip-vit-base-patch32`
- **CNN Deepfake Detector**: `prithivMLmods/deepfake-detector-model-v1`

#### Image Detection Pipeline
1. **CLIP Analysis**
   - Compares the uploaded image against predefined text prompts:
     - `"a real photograph"`, `"a fake image"`, `"an AI generated image"`, `"a deepfake image"`
   - Generates a `clip_verdict` and `confidence_score`.
2. **CNN Classification**
   - Detects whether the image is fake using a pretrained deepfake CNN.
3. **Fusion Logic**
   - Combines CLIP and CNN outputs to determine:
     - `REAL`, `SUSPICIOUS`, or `FAKE`
   - Provides a final confidence score.

#### Video Detection Pipeline
- Processes every nth frame (configurable `frame_interval`) of the uploaded video.
- Runs both **CLIP** and **CNN** on sampled frames.
- Aggregates frame-level results into a video-level verdict using **consensus-based fusion**.


### 2. Audio Deepfake Detection (Experimental)
- **Model**: `DavidCombei/wav2vec2-xls-r-300m-deepfake-V1`
- Converts any uploaded audio to mono WAV with 16kHz.
- Performs classification to detect real vs fake audio.
- **Limitation**: The model performed poorly for Hindi language, so this module is currently **not in use** but demonstrates our experimental attempts.


## Integration with Backend

- The backend sends the uploaded evidence path to the respective AI module.
- Each module returns a structured JSON:

**Example Image/Video Output:**
```json
{
  "final_verdict": "FAKE",
  "confidence": 0.87,
  "clip_analysis": {...},
  "cnn_analysis": {...}
}
```

## Future Enhancements (Round 2)

-  Fine-tune models for mobile inference.
- Improve performance for audio deepfake detection, especially for Hindi language.
- Integrate directly with the Android app for seamless evidence verification.
