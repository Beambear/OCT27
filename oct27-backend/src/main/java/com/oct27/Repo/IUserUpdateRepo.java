package com.oct27.Repo;

import com.oct27.Model.UserUpdate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IUserUpdateRepo extends JpaRepository<UserUpdate,Long> {

     Optional<UserUpdate> findByUserId(Long id);

     List<UserUpdate> findByConfirmed(int i);

     Optional<UserUpdate> findByUserIdAndConfirmed(Long userId, Integer confirmed);
}
