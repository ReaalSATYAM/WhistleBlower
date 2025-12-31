import os
import uuid
import torch
import librosa
from pydub import AudioSegment
from transformers import AutoFeatureExtractor, AutoModelForAudioClassification

# Load model ONCE
MODEL_ID = "DavidCombei/wav2vec2-xls-r-300m-deepfake-V1"

feature_extractor = AutoFeatureExtractor.from_pretrained(MODEL_ID)
model = AutoModelForAudioClassification.from_pretrained(MODEL_ID)
model.eval()

def detect_audio(audio_path):
    temp_wav = f"temp_{uuid.uuid4().hex}.wav"

    try:
        audio = AudioSegment.from_file(audio_path)
        audio = audio.set_channels(1).set_frame_rate(16000)
        audio.export(temp_wav, format="wav")

        audio_input, _ = librosa.load(temp_wav, sr=16000)

        inputs = feature_extractor(
            audio_input,
            sampling_rate=16000,
            return_tensors="pt"
        )

        with torch.no_grad():
            logits = model(**inputs).logits
            probs = torch.softmax(logits, dim=-1)[0]

        pred_id = torch.argmax(probs).item()
        raw_label = model.config.id2label[pred_id]
        confidence = round(probs[pred_id].item(), 4)

        # ✅ FINAL CORRECT LOGIC
        if raw_label == "label_0":
            final_verdict = "FAKE"
        else:
            final_verdict = "REAL"

        return {
            "final_verdict": final_verdict,
            "confidence": confidence,
            "label": raw_label
        }

    except Exception as e:
        print("🔥 Audio detection error:", e)
        return {
            "final_verdict": "ERROR",
            "confidence": 0,
            "error": str(e)
        }

    finally:
        if os.path.exists(temp_wav):
            os.remove(temp_wav)

