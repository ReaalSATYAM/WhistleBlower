package com.example.whistleblower;

import android.net.Uri;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.VideoView;
import android.widget.MediaController;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

import java.util.ArrayList;

public class EvidenceReviewActivity extends AppCompatActivity {

    TextView tvTitle, tvDesc, tvTx;
    Button btnAccept, btnReject;
    ImageView ivEvidence;
    VideoView vvEvidence;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_evidence_review);

        // Bind UI
        tvTitle = findViewById(R.id.tvEvidenceTitle);
        tvDesc = findViewById(R.id.tvEvidenceDesc);
        tvTx = findViewById(R.id.tvFakeBlockchainHash);
        btnAccept = findViewById(R.id.btnAccept);
        btnReject = findViewById(R.id.btnReject);
        ivEvidence = findViewById(R.id.ivEvidence);
        vvEvidence = findViewById(R.id.vvEvidence);

        // Get report index from Intent
        int reportIndex = getIntent().getIntExtra("report_index", -1);

        if (reportIndex == -1 || reportIndex >= LocalReportStore.reports.size()) {
            Toast.makeText(this, "Invalid report", Toast.LENGTH_SHORT).show();
            finish();
            return;
        }

        LocalReportStore.Report report = LocalReportStore.reports.get(reportIndex);

        // Set text fields
        tvTitle.setText(report.title);
        tvDesc.setText(report.desc);

        // Fake blockchain hash for demo
        String fakeTxHash = "0x" + java.util.UUID.randomUUID().toString().replace("-", "");
        tvTx.setText("Blockchain TX: " + fakeTxHash);

        // Display evidence (first file only for simplicity)
        if (!report.files.isEmpty()) {
            Uri evidenceUri = report.files.get(0);
            String mime = getContentResolver().getType(evidenceUri);

            if (mime != null) {
                if (mime.startsWith("image")) {
                    ivEvidence.setImageURI(evidenceUri);
                    ivEvidence.setVisibility(android.view.View.VISIBLE);
                    vvEvidence.setVisibility(android.view.View.GONE);
                } else if (mime.startsWith("video")) {
                    vvEvidence.setVideoURI(evidenceUri);
                    vvEvidence.setMediaController(new MediaController(this));
                    vvEvidence.requestFocus();
                    vvEvidence.start();
                    vvEvidence.setVisibility(android.view.View.VISIBLE);
                    ivEvidence.setVisibility(android.view.View.GONE);
                } else {
                    ivEvidence.setVisibility(android.view.View.GONE);
                    vvEvidence.setVisibility(android.view.View.GONE);
                    Toast.makeText(this, "Cannot preview this file type", Toast.LENGTH_SHORT).show();
                }
            }
        }

        // Accept button
        btnAccept.setOnClickListener(v -> {
            report.status = "accepted";
            Toast.makeText(this, "Report Accepted", Toast.LENGTH_SHORT).show();
            finish();
        });

        // Reject button
        btnReject.setOnClickListener(v -> {
            report.status = "rejected";
            Toast.makeText(this, "Report Rejected", Toast.LENGTH_SHORT).show();
            finish();
        });
    }
}
