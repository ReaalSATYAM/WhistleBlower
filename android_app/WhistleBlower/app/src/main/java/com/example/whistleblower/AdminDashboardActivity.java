package com.example.whistleblower;

import android.graphics.Color;
import android.os.Bundle;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

public class AdminDashboardActivity extends AppCompatActivity {

    LinearLayout layoutReportList;
    Button btnLogout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_admin_dashboard);

        layoutReportList = findViewById(R.id.layoutReportList);
        btnLogout = findViewById(R.id.btnLogout);

        btnLogout.setOnClickListener(v -> finish()); // Go back to Login

        // Simulate fetching reports (We will replace this with Retrofit later)
        loadDummyReports();
    }

    private void loadDummyReports() {
        // Report 1
        addReportCard("Financial Misconduct in Dept A", "Suspicious transactions observed in the ledger...", "pending");
        // Report 2
        addReportCard("Bribery Evidence", "Video proof of officer accepting cash.", "accepted");
        // Report 3
        addReportCard("Fake Project Report", "Project X does not exist on ground.", "rejected");
    }

    private void addReportCard(String title, String desc, String status) {
        // Create Card
        CardView card = new CardView(this);
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
        );
        params.setMargins(0, 0, 0, 40);
        card.setLayoutParams(params);
        card.setRadius(20f);
        card.setCardElevation(10f);
        card.setContentPadding(40, 40, 40, 40);

        // Content Layout
        LinearLayout content = new LinearLayout(this);
        content.setOrientation(LinearLayout.VERTICAL);

        // Header (Title + Status)
        LinearLayout header = new LinearLayout(this);
        header.setOrientation(LinearLayout.HORIZONTAL);

        TextView tvTitle = new TextView(this);
        tvTitle.setText(title);
        tvTitle.setTextSize(18f);
        tvTitle.setTypeface(null, android.graphics.Typeface.BOLD);
        tvTitle.setTextColor(Color.parseColor("#0F172A")); // Slate 900
        tvTitle.setLayoutParams(new LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f));

        TextView tvStatus = new TextView(this);
        tvStatus.setText(status.toUpperCase());
        tvStatus.setTextSize(12f);
        tvStatus.setPadding(16, 8, 16, 8);

        // Color coding based on status
        if (status.equals("accepted")) {
            tvStatus.setBackgroundColor(Color.parseColor("#D1FAE5")); // Emerald 100
            tvStatus.setTextColor(Color.parseColor("#047857"));     // Emerald 700
        } else if (status.equals("rejected")) {
            tvStatus.setBackgroundColor(Color.parseColor("#FFE4E6")); // Rose 100
            tvStatus.setTextColor(Color.parseColor("#BE123C"));     // Rose 700
        } else {
            tvStatus.setBackgroundColor(Color.parseColor("#FEF3C7")); // Amber 100
            tvStatus.setTextColor(Color.parseColor("#B45309"));     // Amber 700
        }

        header.addView(tvTitle);
        header.addView(tvStatus);

        // Description
        TextView tvDesc = new TextView(this);
        tvDesc.setText(desc);
        tvDesc.setTextColor(Color.parseColor("#64748B")); // Slate 500
        tvDesc.setPadding(0, 20, 0, 40);

        // Review Button
        Button btnReview = new Button(this);
        btnReview.setText("Review Evidence");
        btnReview.setBackgroundColor(Color.parseColor("#1E293B")); // Slate 800
        btnReview.setTextColor(Color.WHITE);
        btnReview.setOnClickListener(v -> {
            Toast.makeText(this, "Opening AI Analysis...", Toast.LENGTH_SHORT).show();
            // TODO: Open Evidence Activity
        });

        content.addView(header);
        content.addView(tvDesc);
        content.addView(btnReview);
        card.addView(content);

        layoutReportList.addView(card);
    }
}