package com.example.ets.controller;


import com.example.ets.business.FileService;
import com.example.ets.model.File;
import com.example.ets.model.FileResponse;
import com.example.ets.model.FileStorageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(value="/api/file")
@CrossOrigin(origins = {"http//localhost:4200"})
public class FilesController {

    @Autowired
    private FileService _fileService;

    public FilesController(FileService _fileService) {
        this._fileService = _fileService;
    }

    @PostMapping("/upload")
    public FileResponse uploadFile(@RequestPart(value = "file") MultipartFile _file) throws FileStorageException {

        File file =null;
        file = _fileService.saveFile(_file);
                 return new FileResponse(_file.getOriginalFilename()

        ,file.getPath(), _file.getContentType(),
                _file.getSize());
    }


    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String id) {
        File file =null;

        file = _fileService.getById(id);
        return  ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(file.getExtension()))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + file.getName()
                                + "\"")
                .body(new ByteArrayResource(file.getData()));

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable String id){

        this._fileService.deleteFile(id);
        return ResponseEntity.ok(null);
    }

    @GetMapping(value="getAll")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(this._fileService.getAll());
    }

}
