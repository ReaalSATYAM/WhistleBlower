package com.example.whistleblower.api;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitAiClient {
    private static final String BASE_URL =
            "https://hf.space/embed/ReaalSATYAM/DeepFakeDetector/";

    private static Retrofit retrofit;

    public static AiService getService() {
        if (retrofit == null) {
            retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit.create(AiService.class);
    }
}

