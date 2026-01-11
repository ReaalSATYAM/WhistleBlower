package com.example.whistleblower.api;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;

public interface AiService {
    @Multipart
    @POST("/run/deepfake_detector")
    Call<AiResultResponse> analyzeEvidence(
            @Part MultipartBody.Part file,
            @Part("evidence_type") RequestBody type
    );
}

