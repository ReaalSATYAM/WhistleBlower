package com.example.whistleblower.api;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitClient {

    // If using USB Cable + 'adb reverse', use localhost:5000
    // If using WiFi, use your Laptop's IP address (e.g., "http://192.168.1.5:5000/")
    private static final String BASE_URL = "http://localhost:5000/";

    private static Retrofit retrofit = null;

    public static ApiService getService() {
        if (retrofit == null) {
            retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit.create(ApiService.class);
    }
}