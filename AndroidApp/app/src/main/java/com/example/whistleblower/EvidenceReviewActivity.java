package com.example.whistleblower;

import android.net.Uri;
import android.os.Bundle;
import android.util.Base64;
import android.view.View;
import android.widget.TextView;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.VideoView;
import android.widget.MediaController;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.InputStream;
import java.io.ByteArrayOutputStream;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class EvidenceReviewActivity extends AppCompatActivity {

    TextView tvTitle, tvDesc, tvTx, tvAiVerdict;
    Button btnAccept, btnReject;
    ImageView ivEvidence;
    VideoView vvEvidence;

    LocalReportStore.Report report;
    OkHttpClient client = new OkHttpClient();

    private static final String HF_SPACE_URL =
            "https://reaalsatyam-deepfakedetector.hf.space/run/deepfake_detector";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_evidence_review);

        // Bind UI
        tvTitle = findViewById(R.id.tvEvidenceTitle);
        tvDesc = findViewById(R.id.tvEvidenceDesc);
        tvTx = findViewById(R.id.tvFakeBlockchainHash);
        tvAiVerdict = findViewById(R.id.tvAiVerdict);

        btnAccept = findViewById(R.id.btnAccept);
        btnReject = findViewById(R.id.btnReject);
        ivEvidence = findViewById(R.id.ivEvidence);
        vvEvidence = findViewById(R.id.vvEvidence);

        // Get report index
        int reportIndex = getIntent().getIntExtra("report_index", -1);

        if (reportIndex == -1 || reportIndex >= LocalReportStore.reports.size()) {
            Toast.makeText(this, "Invalid report", Toast.LENGTH_SHORT).show();
            finish();
            return;
        }

        report = LocalReportStore.reports.get(reportIndex);

        // Populate text
        tvTitle.setText(report.title);
        tvDesc.setText(report.desc);

        // blockchain hash (demo)
        String fakeTxHash = "0x" + java.util.UUID.randomUUID().toString().replace("-", "");
        tvTx.setText("Blockchain TX: " + fakeTxHash);

        // Show evidence preview
        if (!report.files.isEmpty()) {
            Uri fileUri = report.files.get(0);
            showEvidence(fileUri);
            runAiAnalysis(fileUri);
        }

        // Accept
        btnAccept.setOnClickListener(v -> {
            report.status = "accepted";
            Toast.makeText(this, "Report Accepted", Toast.LENGTH_SHORT).show();
            finish();
        });

        // Reject
        btnReject.setOnClickListener(v -> {
            report.status = "rejected";
            Toast.makeText(this, "Report Rejected", Toast.LENGTH_SHORT).show();
            finish();
        });
    }

    private void showEvidence(Uri uri) {
        String mime = getContentResolver().getType(uri);
        if (mime == null) return;

        if (mime.startsWith("image")) {
            ivEvidence.setImageURI(uri);
            ivEvidence.setVisibility(View.VISIBLE);
            vvEvidence.setVisibility(View.GONE);
        } else if (mime.startsWith("video")) {
            vvEvidence.setVideoURI(uri);
            vvEvidence.setMediaController(new MediaController(this));
            vvEvidence.start();
            vvEvidence.setVisibility(View.VISIBLE);
            ivEvidence.setVisibility(View.GONE);
        } else {
            ivEvidence.setVisibility(View.GONE);
            vvEvidence.setVisibility(View.GONE);
            Toast.makeText(this, "Audio file detected (no preview)", Toast.LENGTH_SHORT).show();
        }
    }

    private void runAiAnalysis(Uri uri) {
        tvAiVerdict.setText("AI Analysis: Processing...");

        new Thread(() -> {
            try {
                // 1️⃣ Read file bytes safely
                InputStream is = getContentResolver().openInputStream(uri);
                ByteArrayOutputStream buffer = new ByteArrayOutputStream();
                int nRead;
                byte[] data = new byte[4096];
                while ((nRead = is.read(data, 0, data.length)) != -1) {
                    buffer.write(data, 0, nRead);
                }
                buffer.flush();
                byte[] bytes = buffer.toByteArray();
                is.close();

                // 2️⃣ Convert to Base64
                String encodedFile = Base64.encodeToString(bytes, Base64.NO_WRAP);

                // 3️⃣ Determine type
                String mime = getContentResolver().getType(uri);
                String type = "audio";
                if (mime != null) {
                    if (mime.startsWith("image")) type = "image";
                    else if (mime.startsWith("video")) type = "video";
                }

                // 4️⃣ Build JSON
                JSONObject jsonBody = new JSONObject();
                JSONArray dataArray = new JSONArray();
                dataArray.put(encodedFile);
                dataArray.put(type);
                jsonBody.put("data", dataArray);

                RequestBody body = RequestBody.create(
                        jsonBody.toString(),
                        MediaType.parse("application/json")
                );

                // 5️⃣ Send POST request
                Request request = new Request.Builder()
                        .url(HF_SPACE_URL)
                        .post(body)
                        .build();

                client.newCall(request).enqueue(new Callback() {
                    @Override
                    public void onFailure(Call call, java.io.IOException e) {
                        runOnUiThread(() -> tvAiVerdict.setText("AI Verdict: Service Unavailable"));
                    }

                    @Override
                    public void onResponse(Call call, Response response) throws java.io.IOException {
                        if (!response.isSuccessful()) {
                            runOnUiThread(() -> tvAiVerdict.setText("AI Verdict: Failed"));
                            return;
                        }

                        String respStr = response.body().string();
                        try {
                            JSONObject respJson = new JSONObject(respStr);
                            JSONArray resultData = respJson.getJSONArray("data");
                            JSONObject analysis = resultData.getJSONObject(0);
                            String verdict = analysis.getString("final_verdict");

                            runOnUiThread(() -> tvAiVerdict.setText("AI Verdict: " + verdict));
                        } catch (Exception ex) {
                            runOnUiThread(() -> tvAiVerdict.setText("AI Verdict: Failed"));
                        }
                    }
                });

            } catch (Exception e) {
                runOnUiThread(() -> tvAiVerdict.setText("AI Verdict: Failed"));
            }
        }).start();
    }
}
