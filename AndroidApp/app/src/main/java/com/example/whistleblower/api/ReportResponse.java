package com.example.whistleblower.api;

public class ReportResponse {
    private boolean success;
    private String reportId;
    private String message;

    // Status Page fields
    private boolean found;
    private String status;
    private String dept;
    private String note;
    private String createdAt;

    // Getters
    public boolean isSuccess() { return success; }
    public String getReportId() { return reportId; }
    public String getMessage() { return message; }

    public boolean isFound() { return found; }
    public String getStatus() { return status; }
    public String getDept() { return dept; }
    public String getNote() { return note; }
    public String getCreatedAt() { return createdAt; }
}