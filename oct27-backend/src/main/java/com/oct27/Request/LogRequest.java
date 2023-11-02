package com.oct27.Request;

import lombok.Data;

@Data
public class LogRequest {
    private Long id;
    private String name;
    private String phone;
    private String email;
    private String password;
}
