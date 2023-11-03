package com.oct27.Service;

import com.mysql.cj.log.Log;
import com.oct27.Model.User;
import com.oct27.Model.UserUpdate;
import com.oct27.Repo.IUserRepo;
import com.oct27.Repo.IUserUpdateRepo;
import com.oct27.Request.LogRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    IUserRepo userRepo;

    @Autowired
    IUserUpdateRepo userUpdateRepo;
    public void createUser(LogRequest logRequest) {
        User user = new User();
        try{
            user.setName(logRequest.getName());
            user.setEmail(logRequest.getEmail());
            user.setPhone(logRequest.getPhone());
            userRepo.save(user);
        }catch ( Exception e){
            throw e;
        }
    }

    public void createUpdateUser(LogRequest logRequest) {
        UserUpdate update = new UserUpdate();
        try{
            update.setUserId(logRequest.getId());
            update.setName(logRequest.getName());
            update.setEmail(logRequest.getEmail());
            update.setPhone(logRequest.getPhone());
            update.setConfirmed(0);
            userUpdateRepo.save(update);
        }catch ( Exception e ){
            throw e;
        }
    }

    public void confirmUserUpdate(LogRequest logRequest) {
        long id = logRequest.getId();

        User actualUser = userRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("No user found with id: " + id));

        UserUpdate actualUpdate = userUpdateRepo.findByUserId(id)
                .orElseThrow(() -> new NoSuchElementException("No update found for user with id: " + id));

        actualUser.setName(actualUpdate.getName());
        actualUser.setPhone(actualUpdate.getPhone());
        actualUser.setPassword(actualUpdate.getPassword());
        actualUser.setEmail(actualUpdate.getEmail());

        //save user
        userRepo.save(actualUser);
        //save update info
        actualUpdate.setConfirmed(1);
        userUpdateRepo.save(actualUpdate);
    }


    public List<User> getUserList() {
        List<User> users = userRepo.findAll();
        return users;
    }

    public List<UserUpdate> getUpdateList() {
        List<UserUpdate> updates = userUpdateRepo.findByConfirmed(0);   //find unconfirmed updates
        return updates;
    }

    public void setPassword(LogRequest logRequest) {
        Optional<User> user = userRepo.findById(logRequest.getId());

        user.ifPresentOrElse(actualUser -> {
            actualUser.setPassword(logRequest.getPassword());
        }, () -> {
            throw new NoSuchElementException("No user found ");
        });
    }

    public User login(LogRequest logRequest) {
        Optional<User> optionalUser = userRepo.findByEmail(logRequest.getEmail());

        // find user
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // match password or null password
            if (user.getPassword() == null || user.getPassword().equals(logRequest.getPassword())) {
                // set password if null
                if (user.getPassword() == null) {
                    user.setPassword(logRequest.getPassword());
                    userRepo.save(user);
                }
                return user;
            }
        }
        return null;
    }

    public User getUserById(Long id) {
        return userRepo.findById(id).get();
    }
}
