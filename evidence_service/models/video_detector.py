import cv2
import torch
from PIL import Image
from transformers import CLIPProcessor, CLIPModel, pipeline

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
# Video Analysis Function
# -------------------------------
def analyze_video(
    video_path,
    frame_interval=10,
    clip_threshold=0.65,
    cnn_threshold=0.6,
    fake_ratio_threshold=0.3
):
    cap = cv2.VideoCapture(video_path)

    frame_id = 0
    checked_frames = 0

    clip_fake_frames = 0
    cnn_fake_frames = 0
    consensus_fake_frames = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        if frame_id % frame_interval == 0:
            checked_frames += 1
            image = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))

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

            clip_fake = max(
                clip_probs[1].item(),
                clip_probs[2].item(),
                clip_probs[3].item()
            )
            clip_is_fake = clip_fake > clip_threshold
            if clip_is_fake:
                clip_fake_frames += 1

            # ===== CNN INFERENCE =====
            cnn_preds = cnn_detector(image)
            cnn_label = cnn_preds[0]["label"].lower()
            cnn_score = cnn_preds[0]["score"]

            cnn_is_fake = ("fake" in cnn_label) and (cnn_score > cnn_threshold)
            if cnn_is_fake:
                cnn_fake_frames += 1

            # ===== FRAME-LEVEL FUSION =====
            if clip_is_fake and cnn_is_fake:
                consensus_fake_frames += 1

        frame_id += 1

    cap.release()

    if checked_frames == 0:
        return {"error": "No frames processed"}

    consensus_ratio = consensus_fake_frames / checked_frames

    # ===== VIDEO-LEVEL DECISION =====
    if consensus_ratio > fake_ratio_threshold:
        final_verdict = "FAKE"
    elif cnn_fake_frames / checked_frames > fake_ratio_threshold:
        final_verdict = "FAKE"
    elif clip_fake_frames / checked_frames > fake_ratio_threshold:
        final_verdict = "SUSPICIOUS"
    else:
        final_verdict = "REAL"

    return {
        "final_verdict": final_verdict,
        "checked_frames": checked_frames,

        "clip_fake_ratio": round(clip_fake_frames / checked_frames, 4),
        "cnn_fake_ratio": round(cnn_fake_frames / checked_frames, 4),
        "consensus_fake_ratio": round(consensus_ratio, 4)
    }
