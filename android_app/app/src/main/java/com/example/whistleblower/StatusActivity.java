package com.example.whistleblower;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

public class StatusActivity extends AppCompatActivity {

    // Declare the UI elements
    EditText etReportId;
    Button btnCheckStatus;
    LinearLayout layoutResult;
    TextView tvDeptName, tvAdminNote;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_status); // Connects to your XML

        // Initialize the UI elements by their IDs from the XML
        etReportId = findViewById(R.id.etReportId);
        btnCheckStatus = findViewById(R.id.btnCheckStatus);
        layoutResult = findViewById(R.id.layoutResult);
        tvDeptName = findViewById(R.id.tvDeptName);
        tvAdminNote = findViewById(R.id.tvAdminNote);

        btnCheckStatus.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String id = etReportId.getText().toString().trim();

                if (id.isEmpty()) {
                    Toast.makeText(StatusActivity.this, "Please enter a Report ID", Toast.LENGTH_SHORT).show();
                } else {
                    // This simulates your React 'check' function
                    checkStatusLocally(id);
                }
            }
        });
    }

    private void checkStatusLocally(String id) {
        // This makes the result card visible just like in your web version
        layoutResult.setVisibility(View.VISIBLE);
        tvDeptName.setText("Vigilance Department");
        tvAdminNote.setText("Admin Note: Report ID " + id + " is under verification.");
    }
}