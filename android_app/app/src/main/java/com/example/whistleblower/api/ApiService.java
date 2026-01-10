package com.example.whistleblower.api;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;
import retrofit2.http.Path;
import java.util.List;

public interface ApiService {

    // 1. Submit Report (Text + Files)
    @Multipart
    @POST("/api/report")
    Call<ReportResponse> submitReport(
            @Part("title") RequestBody title,
            @Part("description") RequestBody description,
            @Part("dept") RequestBody dept,
            @Part List<MultipartBody.Part> files
    );

    // 2. Check Status
    @GET("/api/status/{id}")
    Call<ReportResponse> checkStatus(@Path("id") String id);
}
