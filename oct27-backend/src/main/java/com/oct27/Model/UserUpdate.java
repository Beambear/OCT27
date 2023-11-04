package com.oct27.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "t_user_update")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String name;
    private String email;
    private String phone;
    @JsonIgnore
    private String password;
    private String avatarUrl;
    private long userId;
    private int confirmed;
}
