package com.example.whistleblower;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

public class AdminLoginActivity extends AppCompatActivity {

    EditText etAdminPassword;
    Button btnLogin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_admin_login); // Connects to your XML Design

        etAdminPassword = findViewById(R.id.etAdminPassword);
        btnLogin = findViewById(R.id.btnLogin);

        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String password = etAdminPassword.getText().toString().trim();

                // Simple check matching your React code
                if (password.equals("admin123")) {
                    Toast.makeText(AdminLoginActivity.this, "Access Granted", Toast.LENGTH_SHORT).show();

                    // Navigate to Dashboard
                    Intent intent = new Intent(AdminLoginActivity.this, AdminDashboardActivity.class);
                    startActivity(intent);
                    finish(); // Closes login page so you can't go back
                } else {
                    Toast.makeText(AdminLoginActivity.this, "Invalid Access Code", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
}