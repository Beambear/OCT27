package com.oct27.Controller;

import com.oct27.Request.LogRequest;
import com.oct27.Response.CommonResponse;
import com.oct27.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins ="*")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("admin/userList")
    public ResponseEntity<?> getUserList(){
        return ResponseEntity.ok(userService.getUserList());
    }
    @GetMapping("admin/updateList")
    public ResponseEntity<?> getUpdateList(){
        return ResponseEntity.ok(userService.getUpdateList());
    }

    @PutMapping("/admin/update")
    public ResponseEntity<?> confirmUpdate(@RequestBody LogRequest logRequest){
        CommonResponse response = new CommonResponse();
        try{
            userService.confirmUserUpdate(logRequest);
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
    public Boolean login(@RequestBody LogRequest logRequest){
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
}
