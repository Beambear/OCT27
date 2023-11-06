package com.oct27.Controller;

import com.oct27.Model.User;
import com.oct27.Model.UserUpdate;
import com.oct27.Request.LogRequest;
import com.oct27.Response.CommonResponse;
import com.oct27.Service.FileService;
import com.oct27.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;

@RestController
@CrossOrigin(origins ="*")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private FileService fileService;

    @GetMapping("/avatarFile/{avatarName}")
    public ResponseEntity<Resource> getAvatar(@PathVariable String avatarName){
        try{
            Resource fileResource = fileService.getFileAsResource(avatarName);
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(fileResource);
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
    }

    //save avatar pic to local,  type 1 = User, type 2 = updateUser
    @PostMapping("/avatarFile")
    public ResponseEntity<?> saveAvatar(@RequestParam("avatarFile")MultipartFile avatarFile,
                                        @RequestParam("userId")Long userId,
                                        @RequestParam("type")int type){
        CommonResponse response = new CommonResponse();
        try{
            String avatarName = fileService.saveUploadedFile(avatarFile);
            if(type ==1){
                userService.saveUserAvatar(userId,avatarName);
            }else if(type ==2){
                userService.saveUpdateUserAvatar(userId,avatarName);
            }else{
                throw new RuntimeException();
            }
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    @GetMapping("admin/userList")
    public ResponseEntity<?> getUserList(){
        return ResponseEntity.ok(userService.getUserList());
    }
    @GetMapping("admin/updateList")
    public ResponseEntity<?> getUpdateList(){
        return ResponseEntity.ok(userService.getUpdateList());
    }

    @PutMapping("/admin/update")
    public ResponseEntity<?> confirmUpdate(@RequestBody UserUpdate userUpdate){
        CommonResponse response = new CommonResponse();
        try{
            userService.confirmUserUpdate(userUpdate);
            response.setMessage("update confirmed");
            return ResponseEntity.ok(response);
        } catch ( Exception e){
            response.setMessage(e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/user/update")
    public ResponseEntity<?> addUpdate(@RequestBody LogRequest logRequest){
        CommonResponse response = new CommonResponse();
        try{
            userService.createUpdateUser(logRequest);
            response.setMessage("update submitted");
            return ResponseEntity.ok(response);
        } catch ( Exception e) {
            response.setMessage(e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("user/login")
    public User login(@RequestBody LogRequest logRequest){
        return userService.login(logRequest);
    }

    @PatchMapping("user/setPassword")
    public ResponseEntity<?> setPassword(@RequestBody LogRequest logRequest){
        CommonResponse response = new CommonResponse();
        try{
            userService.setPassword(logRequest);
            response.setMessage("password set");
            return ResponseEntity.ok(response);
        } catch ( Exception e){
            response.setMessage(e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/admin/create")
    public ResponseEntity<?> addUser(@RequestBody LogRequest logRequest){
        CommonResponse response = new CommonResponse();
        try{
            userService.createUser(logRequest);
            response.setMessage("user created");
            return ResponseEntity.ok(response);
        }catch (Exception e){
            response.setMessage( e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/user/email/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email){
        CommonResponse response = new CommonResponse();
        try{
            return ResponseEntity.ok(userService.getUserByEmail(email));
        }catch (Exception e){
            response.setMessage( e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id){
        CommonResponse response = new CommonResponse();
        try{
            response.setMessage("user found");
            return ResponseEntity.ok(userService.getUserById(id));
        }catch (Exception e){
            response.setMessage( e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
