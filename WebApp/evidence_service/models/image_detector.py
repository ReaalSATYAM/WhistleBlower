import torch
from PIL import Image
from transformers import CLIPProcessor, CLIPModel, pipeline

CLIP_MODELS = {
    "vit-base-32": "openai/clip-vit-base-patch32",
    "vit-base-16": "openai/clip-vit-base-patch16",
    "vit-large-14": "openai/clip-vit-large-patch14"
}

clip_models = {}
clip_processors = {}

for name, model_id in CLIP_MODELS.items():
    clip_models[name] = CLIPModel.from_pretrained(model_id)
    clip_models[name].eval()
    clip_processors[name] = CLIPProcessor.from_pretrained(model_id)

VISION_PROMPTS = [
    "an authentic photo",
    "a manipulated picture",
    "a computer-generated picture",
    "a synthetic image"
]

deepfake_classifier = pipeline(
    "image-classification",
    model="prithivMLmods/deepfake-detector-model-v1"
)

def evaluate_image(image_location, vision_cutoff=0.65, classifier_cutoff=0.6):
    picture = Image.open(image_location).convert("RGB")

    fake_probs = []
    real_probs = []

    for name in clip_models:
        processor = clip_processors[name]
        model = clip_models[name]

        vision_data = processor(
            text=VISION_PROMPTS,
            images=picture,
            return_tensors="pt",
            padding=True
        )

        with torch.no_grad():
            vision_results = model(**vision_data)
            vision_probabilities = vision_results.logits_per_image.softmax(dim=1)[0]

        authentic_probability = vision_probabilities[0].item()
        manipulated_probability = max(
            vision_probabilities[1].item(),
            vision_probabilities[2].item(),
            vision_probabilities[3].item()
        )

        real_probs.append(authentic_probability)
        fake_probs.append(manipulated_probability)

    avg_authentic_prob = sum(real_probs) / len(real_probs)
    avg_manipulated_prob = sum(fake_probs) / len(fake_probs)

    vision_judgment = "MANIPULATED" if avg_manipulated_prob > vision_cutoff else "AUTHENTIC_OR_INDETERMINATE"

    classifier_predictions = deepfake_classifier(picture)
    classifier_category = classifier_predictions[0]["label"].lower()
    classifier_confidence = classifier_predictions[0]["score"]
    classifier_judgment = "MANIPULATED" if "fake" in classifier_category and classifier_confidence > classifier_cutoff else "AUTHENTIC"

    if vision_judgment == "MANIPULATED" and classifier_judgment == "MANIPULATED":
        overall_judgment = "MANIPULATED"
        overall_confidence = max(avg_manipulated_prob, classifier_confidence)

    elif classifier_judgment == "MANIPULATED":
        overall_judgment = "MANIPULATED"
        overall_confidence = classifier_confidence

    elif vision_judgment == "MANIPULATED":
        overall_judgment = "QUESTIONABLE"
        overall_confidence = avg_manipulated_prob

    else:
        overall_judgment = "AUTHENTIC"
        overall_confidence = max(avg_authentic_prob, 1 - avg_manipulated_prob)

    return {
        "final_verdict": overall_judgment,
        "confidence": round(overall_confidence, 4),

        "clip_analysis": {
            "verdict": vision_judgment,
            "fake_score": round(avg_manipulated_prob, 4),
            "real_score": round(avg_authentic_prob, 4)
        },

        "cnn_analysis": {
            "verdict": classifier_judgment,
            "label": classifier_category,
            "score": round(classifier_confidence, 4)
        }
    }
