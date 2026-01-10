import os
import uuid
import torch
import librosa
from pydub import AudioSegment
from transformers import AutoFeatureExtractor, AutoModelForAudioClassification

# Initialize audio analysis model
AUDIO_MODEL_ID = "wavlm_asvspoof_hav_hindi.pth" #UPDATED trained model which is finetuned and does not work with this code 
#It needs a seperate code for work

audio_extractor = AutoFeatureExtractor.from_pretrained(AUDIO_MODEL_ID)
audio_model = AutoModelForAudioClassification.from_pretrained(AUDIO_MODEL_ID)
audio_model.eval()

def assess_audio(audio_location):
    temporary_file = f"temp_{uuid.uuid4().hex}.wav"

    try:
        sound_clip = AudioSegment.from_file(audio_location)
        sound_clip = sound_clip.set_channels(1).set_frame_rate(16000)
        sound_clip.export(temporary_file, format="wav")

        audio_waveform, _ = librosa.load(temporary_file, sr=16000)

        model_inputs = audio_extractor(
            audio_waveform,
            sampling_rate=16000,
            return_tensors="pt"
        )

        with torch.no_grad():
            model_outputs = audio_model(**model_inputs).logits
            prediction_probabilities = torch.softmax(model_outputs, dim=-1)[0]

        predicted_index = torch.argmax(prediction_probabilities).item()
        predicted_category = audio_model.config.id2label[predicted_index]
        prediction_confidence = round(prediction_probabilities[predicted_index].item(), 4)

        # Determine authenticity
        if predicted_category == "label_0":
            authenticity_verdict = "SYNTHETIC"
        else:
            authenticity_verdict = "NATURAL"

        return {
            "final_verdict": authenticity_verdict,
            "confidence": prediction_confidence,
            "label": predicted_category
        }

    except Exception as analysis_error:
        print("Audio analysis failed:", analysis_error)
        return {
            "final_verdict": "ANALYSIS_FAILED",
            "confidence": 0,
            "error": str(analysis_error)
        }

    finally:
        if os.path.exists(temporary_file):
            os.remove(temporary_file)

