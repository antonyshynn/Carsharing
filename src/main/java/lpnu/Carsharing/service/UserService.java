package lpnu.Carsharing.service;

import lpnu.Carsharing.entity.UserEntity;
import lpnu.Carsharing.repo.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    public List<UserEntity> findAllUserEntities() {
        return userRepo.findAll();
    }

    public UserEntity saveUser(UserEntity user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public UserEntity updateUser(UserEntity user) {
        return userRepo.save(user);
    }

    public UserEntity findUserEntityByUsername(String username) {
        UserEntity user = userRepo.findUserEntitiesByUsername(username).orElseThrow();
        return user;
    }
}
