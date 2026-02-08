package services;

import models.User;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.ArrayList;

public class UserManager {

    private final StorageService storageService;
    private final Map<String, User> users = new ConcurrentHashMap<>();

    public UserManager(StorageService storageService) {
        this.storageService = storageService;
        loadUsers();
    }

    private void loadUsers() {
        List<User> loadedUsers = storageService.loadUsers();
        if (loadedUsers != null) {
            for (User user : loadedUsers) {
                users.put(user.getId(), user);
            }
        }
    }

    private void persist() {
        storageService.saveUsers(new ArrayList<>(users.values()));
    }

    public User addUser(User user) {
        if (user == null || user.getId() == null) {
            throw new IllegalArgumentException("User or User ID cannot be null");
        }
        users.put(user.getId(), user);
        persist();
        return user;
    }

    public User getUser(String userId) {
        return userId == null ? null : users.get(userId);
    }

    public List<User> getAllUsers() {
        return new ArrayList<>(users.values());
    }

    public boolean removeUser(String userId) {
        if (userId == null) return false;
        boolean removed = users.remove(userId) != null;
        if (removed) persist();
        return removed;
    }
}
