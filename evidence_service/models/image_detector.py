import torch
from PIL import Image
from transformers import (
    CLIPProcessor,
    CLIPModel,
    pipeline
)

# Initialize CLIP components
vision_model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
vision_processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
vision_model.eval()

VISION_PROMPTS = [
    "an authentic photo",
    "a manipulated picture",
    "a computer-generated picture",
    "a synthetic image"
]

# Initialize deepfake detection model
deepfake_classifier = pipeline(
    "image-classification",
    model="prithivMLmods/deepfake-detector-model-v1"
)

# Function to evaluate image authenticity
def evaluate_image(image_location, vision_cutoff=0.65, classifier_cutoff=0.6):
    picture = Image.open(image_location).convert("RGB")

    # Perform vision-based analysis
    vision_data = vision_processor(
        text=VISION_PROMPTS,
        images=picture,
        return_tensors="pt",
        padding=True
    )

    with torch.no_grad():
        vision_results = vision_model(**vision_data)
        vision_probabilities = vision_results.logits_per_image.softmax(dim=1)[0]

    authentic_probability = vision_probabilities[0].item()
    manipulated_probability = max(
        vision_probabilities[1].item(),
        vision_probabilities[2].item(),
        vision_probabilities[3].item()
    )

    vision_judgment = "MANIPULATED" if manipulated_probability > vision_cutoff else "AUTHENTIC_OR_INDETERMINATE"

    # Perform classifier-based analysis
    classifier_predictions = deepfake_classifier(picture)

    classifier_category = classifier_predictions[0]["label"].lower()
    classifier_confidence = classifier_predictions[0]["score"]

    classifier_judgment = "MANIPULATED" if "fake" in classifier_category and classifier_confidence > classifier_cutoff else "AUTHENTIC"

    # Combine results
    if vision_judgment == "MANIPULATED" and classifier_judgment == "MANIPULATED":
        overall_judgment = "MANIPULATED"
        overall_confidence = max(manipulated_probability, classifier_confidence)

    elif classifier_judgment == "MANIPULATED":
        overall_judgment = "MANIPULATED"
        overall_confidence = classifier_confidence

    elif vision_judgment == "MANIPULATED":
        overall_judgment = "QUESTIONABLE"
        overall_confidence = manipulated_probability

    else:
        overall_judgment = "AUTHENTIC"
        overall_confidence = max(authentic_probability, 1 - manipulated_probability)

    return {
        "final_verdict": overall_judgment,
        "confidence": round(overall_confidence, 4),

        "clip_analysis": {
            "verdict": vision_judgment,
            "fake_score": round(manipulated_probability, 4),
            "real_score": round(authentic_probability, 4)
        },

        "cnn_analysis": {
            "verdict": classifier_judgment,
            "label": classifier_category,
            "score": round(classifier_confidence, 4)
        }
    }
