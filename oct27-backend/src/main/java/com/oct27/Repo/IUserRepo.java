package com.oct27.Repo;

import com.oct27.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepo extends JpaRepository<User,Long> {
    @Query("select user from User as user where user.email = ?1 and user.password=?2")
    Optional<User> loginUser(String email, String password);

    Optional<User> findById(Long id);
    Optional<User> findByName(String name);

    Optional<User> findByEmail(String email);
}
