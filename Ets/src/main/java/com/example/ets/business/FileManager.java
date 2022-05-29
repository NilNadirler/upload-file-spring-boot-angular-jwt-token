package com.example.ets.business;

import com.example.ets.model.FileStorageException;
import org.springframework.util.StringUtils;
import com.example.ets.model.File;
import com.example.ets.repo.FileRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

@Service
public class FileManager implements FileService {

    private FileRepository _fileRepository;

    public FileManager(FileRepository _fileRepository) {
        this._fileRepository = _fileRepository;
    }

    @Override
    public File saveFile(MultipartFile _file) throws FileStorageException {

        String fileName = StringUtils.cleanPath(_file.getOriginalFilename());
        String pathUrl="";

        pathUrl= ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/download/")
                .toUriString();

        try {
            if ((fileName.contains(".png")) || (fileName.contains(".jpeg")) || (fileName.contains(".jpg")) || (fileName.contains(".docx")) || (fileName.contains(".pdf")) || (fileName.contains(".xlsx"))) {
                File file = new File(fileName,_file.getContentType(),_file.getBytes(),pathUrl,_file.getSize());

                return _fileRepository.save(file);
            }else throw new FileStorageException("Sorry! Filename contains invalid path " + fileName);


        } catch (Exception e) {

            throw new FileStorageException("Could not save file: " +fileName);
        }

    }

    @Override
    public List<File> getAll() {
        return this._fileRepository.findAll();
    }


    @Override
    public void deleteFile(String id) {

        File file = this._fileRepository.getById(id);
        _fileRepository.delete(file);
    }

    @Override
    public File update(MultipartFile _file, String fileId) {
        return null;
    }

    @Override
    public File getById(String id) {

        if(id==null){
            new FileStorageException("Could not find the file: ");
        }

        System.out.println(_fileRepository.getById(id).getName());
        return  _fileRepository.getById(id);
    }


}
