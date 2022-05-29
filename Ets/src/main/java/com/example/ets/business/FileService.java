package com.example.ets.business;

import com.example.ets.model.File;
import com.example.ets.model.FileStorageException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileService {

    public File saveFile(MultipartFile _file) throws FileStorageException;

    public List<File> getAll();

    public void deleteFile(String id);

    public File update(MultipartFile _file, String id);

    public File getById(String id);
}
