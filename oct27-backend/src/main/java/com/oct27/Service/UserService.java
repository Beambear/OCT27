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
        Long id = logRequest.getId();
        Optional<UserUpdate> dbUpdate = userUpdateRepo.findByUserIdAndConfirmed(id, 0);
        dbUpdate.ifPresentOrElse(update->{  //no duplicate new update info
            update.setName(logRequest.getName());
            update.setEmail(logRequest.getEmail());
            update.setPhone(logRequest.getPhone());
            update.setPassword(logRequest.getPassword());
            update.setConfirmed(0);
            userUpdateRepo.save(update);
        }, ()->{
            UserUpdate update = new UserUpdate();
            update.setUserId(id);
            update.setName(logRequest.getName());
            update.setEmail(logRequest.getEmail());
            update.setPhone(logRequest.getPhone());
            update.setPassword(logRequest.getPassword());
            update.setConfirmed(0);
            userUpdateRepo.save(update);
        });

    }

    public void confirmUserUpdate(UserUpdate userUpdate) {
        long userId = userUpdate.getUserId();
        long updateId = userUpdate.getId();
        int confirmedCode = userUpdate.getConfirmed();
        //dbUser
        User dbUser = userRepo.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("No user found with id: " + userId));
        //dbUpdate
        UserUpdate dbUpdate = userUpdateRepo.findById(updateId)
                .orElseThrow(() -> new NoSuchElementException("No update found for user with id: " + updateId));

        dbUser.setName(dbUpdate.getName());
        dbUser.setPhone(dbUpdate.getPhone());
        dbUser.setPassword(dbUpdate.getPassword() == null ? dbUser.getPassword() : dbUpdate.getPassword());
        dbUser.setEmail(dbUpdate.getEmail());
        dbUser.setAvatarName(dbUpdate.getAvatarName());
        //save user
        userRepo.save(dbUser);
        //save update info
        dbUpdate.setConfirmed(confirmedCode);
        userUpdateRepo.save(dbUpdate);
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
        Optional<User> dbUser = userRepo.findById(logRequest.getId());

        dbUser.ifPresentOrElse(u -> {
            u.setPassword(logRequest.getPassword());
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

    //save avatar filename to db
    public void saveUserAvatar(Long userId, String avatarName) {
        Optional<User> dbUser = userRepo.findById(userId);
        dbUser.ifPresentOrElse(u ->{
            u.setAvatarName(avatarName);
            userRepo.save(u);
        }, () ->{
            throw new NoSuchElementException("No user found ");
        });
    }

    public void saveUpdateUserAvatar(Long userId, String avatarName) {
        Optional<UserUpdate> dbUpdate = userUpdateRepo.findByUserIdAndConfirmed(userId,0);
        dbUpdate.ifPresentOrElse(u->{
            u.setAvatarName(avatarName);
            userUpdateRepo.save(u);
        }, ()->{
            throw new NoSuchElementException("No user found ");
        });
    }

    public Object getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }
}
