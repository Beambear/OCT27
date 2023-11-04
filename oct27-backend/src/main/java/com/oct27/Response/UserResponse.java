package com.oct27.Response;

import org.springframework.web.multipart.MultipartFile;

public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private MultipartFile avatarUrl;
    private int confirmed;
}
