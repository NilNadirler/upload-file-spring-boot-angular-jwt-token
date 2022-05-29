package com.example.ets.repo;

import com.example.ets.model.File;
import org.springframework.data.jpa.repository.JpaRepository;


public interface FileRepository extends JpaRepository<File,String> {
}
