package com.example.ets.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileResponse {

    private String fileName;
    private String fileExtension;
    private String filePath;
    private long fileSize;

}
