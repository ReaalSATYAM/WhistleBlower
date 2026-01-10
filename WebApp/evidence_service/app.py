from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import uuid
import time

from models.image_detector import detect_image
from models.video_detector import analyze_video
# from models.audio_detector import detect_audio

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app = Flask(__name__)
CORS(app)

@app.route("/check-evidence", methods=["POST"])
def check_evidence():
    start_time = time.time()

    print("\nIncoming evidence request")

    if "file" not in request.files:
        print("No file found in request")
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    evidence_type = request.form.get("type")

    print(f"File received: {file.filename}")
    print(f"Evidence type: {evidence_type}")

    ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4().hex}.{ext}"
    filepath = os.path.join(UPLOAD_DIR, filename)
    file.save(filepath)

    print(f"Saved to: {filepath}")

    try:
        if evidence_type == "image":
            print("Running IMAGE deepfake detection")
            result = detect_image(filepath)

        elif evidence_type == "video":
            print("🎥 Running VIDEO deepfake detection")
            result = analyze_video(filepath)

        # elif evidence_type == "audio":
        #     print("Running AUDIO deepfake detection")
        #     result = detect_audio(filepath)

        else:
            print("Invalid evidence type")
            return jsonify({"error": "Invalid evidence type"}), 400

    except Exception as e:
        print("Model inference failed:", str(e))
        return jsonify({"error": "AI processing failed"}), 500

    elapsed = round(time.time() - start_time, 2)

    print(f"Analysis completed in {elapsed}s")
    print(f"Verdict: {result.get('final_verdict', 'N/A')}")

    return jsonify({
        "status": "success",
        "type": evidence_type,
        "analysis": result,
        "processing_time_sec": elapsed
    })

if __name__ == "__main__":
    print("====================================")
    print("Evidence AI Service STARTED")
    print("Listening on http://localhost:5001")
    print("Models loaded & ready")
    print("====================================")

    app.run(host="0.0.0.0", port=5001, debug=True)
