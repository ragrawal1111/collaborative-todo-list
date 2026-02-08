package services;

import models.User;
import java.util.List;

public class UserManager {

    private final StorageService storageService;

    public UserManager(StorageService storageService) {
        this.storageService = storageService;
    }

    public void addUser(User user) {
        if (user == null || user.getId() == null) {
            throw new IllegalArgumentException("Invalid user data");
        }
        storageService.saveUser(user);
    }

    public User getUser(String userId) {
        return storageService.getUser(userId);
    }

    public List<User> getAllUsers() {
        return storageService.loadUsers();
    }
}