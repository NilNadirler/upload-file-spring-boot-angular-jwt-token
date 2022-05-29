package com.example.ets.model;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Data
@Entity

@NoArgsConstructor
public class File {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String name;

    private String extension;

    private long size;

    private String path;

    @Lob
    @Type(type="org.hibernate.type.ImageType")
    private byte[] data;

    public File(String fileName, String fileType, byte[] data, String path, long size) {
        this.name = fileName;
        this.extension = fileType;
        this.data = data;
        this.path =path;
        this.size =size;
    }


}
