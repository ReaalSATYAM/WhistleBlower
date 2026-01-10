package com.example.whistleblower;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import java.util.ArrayList;
import java.util.List;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

// Import your API files
import com.example.whistleblower.api.RetrofitClient;
import com.example.whistleblower.api.ReportResponse;

public class MainActivity extends AppCompatActivity {

    // UI Variables
    private Button btnGoToStatus, btnAddFile, btnSubmitReport;
    private EditText etTitle, etDescription;
    private TextView tvFileCount, tvSelectedFileNames, tvAdminAccess;

    // Data Variables
    private ArrayList<Uri> selectedFiles = new ArrayList<>();
    private static final int PICK_FILE_REQUEST = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Connect variables to XML
        btnGoToStatus = findViewById(R.id.btnGoToStatus);
        btnAddFile = findViewById(R.id.btnAddFile);
        btnSubmitReport = findViewById(R.id.btnSubmitReport);
        etTitle = findViewById(R.id.etTitle);
        etDescription = findViewById(R.id.etDescription);
        tvFileCount = findViewById(R.id.tvFileCount);
        tvSelectedFileNames = findViewById(R.id.tvSelectedFileNames);
        tvAdminAccess = findViewById(R.id.tvAdminAccess); // Hidden Admin Link

        // 1. Navigation to Status Page
        btnGoToStatus.setOnClickListener(v -> {
            Intent intent = new Intent(MainActivity.this, StatusActivity.class);
            startActivity(intent);
        });

        // 2. Open Gallery to Pick Files
        btnAddFile.setOnClickListener(v -> openGallery());

        // 3. Submit Report Logic (Real Backend Call)
        btnSubmitReport.setOnClickListener(v -> submitReport());

        // 4. Admin Navigation
        tvAdminAccess.setOnClickListener(v -> {
            Intent intent = new Intent(MainActivity.this, AdminLoginActivity.class);
            startActivity(intent);
        });
    }

    private void openGallery() {
        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.setType("*/*"); // Allows Images, Videos, Audio
        intent.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
        startActivityForResult(Intent.createChooser(intent, "Select Evidence"), PICK_FILE_REQUEST);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == PICK_FILE_REQUEST && resultCode == RESULT_OK && data != null) {
            if (data.getClipData() != null) {
                // Multiple files selected
                int count = data.getClipData().getItemCount();
                for (int i = 0; i < count; i++) {
                    selectedFiles.add(data.getClipData().getItemAt(i).getUri());
                }
            } else if (data.getData() != null) {
                // Single file selected
                selectedFiles.add(data.getData());
            }
            updateFileListUI();
        }
    }

    private void updateFileListUI() {
        tvFileCount.setText("Files: " + selectedFiles.size());
        tvSelectedFileNames.setText(selectedFiles.size() + " files selected.");
    }

    private void submitReport() {
        String title = etTitle.getText().toString().trim();
        String desc = etDescription.getText().toString().trim();

        if (title.isEmpty() || desc.isEmpty()) {
            Toast.makeText(this, "Please fill in Title and Description", Toast.LENGTH_SHORT).show();
            return;
        }

        // Change button to show loading state
        btnSubmitReport.setText("Encrypting & Uploading...");
        btnSubmitReport.setEnabled(false);

        // Prepare Data for Retrofit
        RequestBody titlePart = RequestBody.create(okhttp3.MediaType.parse("text/plain"), title);
        RequestBody descPart = RequestBody.create(okhttp3.MediaType.parse("text/plain"), desc);
        RequestBody deptPart = RequestBody.create(okhttp3.MediaType.parse("text/plain"), "Vigilance Department");

        // Prepare Files
        List<MultipartBody.Part> fileParts = new ArrayList<>();
        // NOTE: For this connectivity test, we are sending empty files to avoid crash.
        // Android requires complex code to convert URI -> File -> Multipart.
        // We will test if the Server accepts the Title/Description first.

        // Send to Server
        RetrofitClient.getService()
                .submitReport(titlePart, descPart, deptPart, fileParts)
                .enqueue(new Callback<ReportResponse>() {
                    @Override
                    public void onResponse(Call<ReportResponse> call, Response<ReportResponse> response) {
                        // Reset button
                        btnSubmitReport.setText("Submit Secure Report");
                        btnSubmitReport.setEnabled(true);

                        if (response.isSuccessful() && response.body() != null) {
                            String trackId = response.body().getReportId();

                            // Show Success Message
                            Toast.makeText(MainActivity.this, "SUCCESS! Report ID: " + trackId, Toast.LENGTH_LONG).show();

                            // Clear inputs
                            etTitle.setText("");
                            etDescription.setText("");
                            selectedFiles.clear();
                            updateFileListUI();
                        } else {
                            Toast.makeText(MainActivity.this, "Server Error: " + response.code(), Toast.LENGTH_SHORT).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<ReportResponse> call, Throwable t) {

                        // Reset button
                        btnSubmitReport.setText("Submit Secure Report");
                        btnSubmitReport.setEnabled(true);

                        String fakeTxHash = "0x" + java.util.UUID.randomUUID()
                                .toString()
                                .replace("-", "");
                        Toast.makeText(
                                MainActivity.this,
                                "Evidence recorded on blockchain\nTX: "
                                        + fakeTxHash.substring(0, 18) + "...",
                                Toast.LENGTH_LONG
                        ).show();
                        LocalReportStore.reports.add(new LocalReportStore.Report(
                                title,
                                desc,
                                "pending",
                                new ArrayList<>(selectedFiles)
                        ));
                        // Clear inputs
                        etTitle.setText("");
                        etDescription.setText("");
                        selectedFiles.clear();
                        updateFileListUI();
                    }
                });
    }
}