package com.oct27.Service;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileService {
     //file path
    private String getUploadDirectoryPath() {
        // get cur root
        String currentDir = System.getProperty("user.dir");
        // save to savedFiles
        String uploadDir = currentDir + File.separator + "savedFiles" + File.separator;
        // create doc if needed
        new File(uploadDir).mkdirs();
        return uploadDir;
    }

    //save file and get file name
    public String saveUploadedFile(MultipartFile file) throws IOException {
        String uploadDir = getUploadDirectoryPath();
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }

    public Resource getFileAsResource(String fileName) throws MalformedURLException {
        Path filePath = Paths.get(getUploadDirectoryPath()).resolve(fileName).normalize();
        Resource resource = new UrlResource(filePath.toUri());
        if(resource.exists() || resource.isReadable()) {
            return resource;
        } else {
            throw new RuntimeException("Could not read the file!");
        }
    }
}
