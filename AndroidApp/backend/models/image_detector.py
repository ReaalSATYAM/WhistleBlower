import torch
from PIL import Image
from transformers import (
    CLIPProcessor,
    CLIPModel,
    pipeline
)

# -------------------------------
# Load CLIP
# -------------------------------
clip_model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
clip_processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
clip_model.eval()

CLIP_TEXTS = [
    "a real photograph",
    "a fake image",
    "an AI generated image",
    "a deepfake image"
]

# -------------------------------
# Load CNN Deepfake Detector
# -------------------------------
cnn_detector = pipeline(
    "image-classification",
    model="prithivMLmods/deepfake-detector-model-v1"
)

# -------------------------------
# Image Detection Function
# -------------------------------
def detect_image(image_path, clip_threshold=0.65, cnn_threshold=0.6):
    image = Image.open(image_path).convert("RGB")

    # ===== CLIP INFERENCE =====
    clip_inputs = clip_processor(
        text=CLIP_TEXTS,
        images=image,
        return_tensors="pt",
        padding=True
    )

    with torch.no_grad():
        clip_outputs = clip_model(**clip_inputs)
        clip_probs = clip_outputs.logits_per_image.softmax(dim=1)[0]

    clip_real = clip_probs[0].item()
    clip_fake = max(
        clip_probs[1].item(),
        clip_probs[2].item(),
        clip_probs[3].item()
    )

    clip_verdict = "FAKE" if clip_fake > clip_threshold else "REAL_OR_UNCERTAIN"

    # ===== CNN INFERENCE =====
    cnn_preds = cnn_detector(image)

    cnn_label = cnn_preds[0]["label"].lower()
    cnn_score = cnn_preds[0]["score"]

    cnn_verdict = "FAKE" if "fake" in cnn_label and cnn_score > cnn_threshold else "REAL"

    # ===== FUSION LOGIC =====
    if clip_verdict == "FAKE" and cnn_verdict == "FAKE":
        final_verdict = "FAKE"
        confidence = max(clip_fake, cnn_score)

    elif cnn_verdict == "FAKE":
        final_verdict = "FAKE"
        confidence = cnn_score

    elif clip_verdict == "FAKE":
        final_verdict = "SUSPICIOUS"
        confidence = clip_fake

    else:
        final_verdict = "REAL"
        confidence = max(clip_real, 1 - clip_fake)

    return {
        "final_verdict": final_verdict,
        "confidence": round(confidence, 4),

        "clip_analysis": {
            "verdict": clip_verdict,
            "fake_score": round(clip_fake, 4),
            "real_score": round(clip_real, 4)
        },

        "cnn_analysis": {
            "verdict": cnn_verdict,
            "label": cnn_label,
            "score": round(cnn_score, 4)
        }
    }
