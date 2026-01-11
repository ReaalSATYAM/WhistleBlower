package com.example.whistleblower.api;

import com.google.gson.annotations.SerializedName;

public class AiResultResponse {
    @SerializedName("final_verdict")
    public String finalVerdict;
    public Double confidence;

    @SerializedName("clip_fake_ratio")
    public Double clipFakeRatio;

    @SerializedName("checked_frames")
    public Integer checkedFrames;

    @SerializedName("cnn_analysis")
    public CnnAnalysis cnnAnalysis;

    @SerializedName("clip_analysis")
    public ClipAnalysis clipAnalysis;

    public static class CnnAnalysis {
        public String verdict;
        public String label;
        public Double score;
    }

    public static class ClipAnalysis {
        public String verdict;
        @SerializedName("fake_score")
        public Double fakeScore;
        @SerializedName("real_score")
        public Double realScore;
    }
}

