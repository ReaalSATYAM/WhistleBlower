
package com.example.whistleblower;

import android.net.Uri;
import java.util.ArrayList;
import java.util.List;

public class LocalReportStore {

    public static class Report {
        public String title;
        public String desc;
        public String status;
        public ArrayList<Uri> files;

        // Fixed constructor
        public Report(String title, String desc, String status, ArrayList<Uri> files) {
            this.title = title;
            this.desc = desc;
            this.status = status;
            this.files = files;
        }
    }

    public static List<Report> reports = new ArrayList<>();
}
