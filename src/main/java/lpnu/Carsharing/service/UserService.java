package lpnu.Carsharing.service;

import lpnu.Carsharing.entity.UserEntity;
import lpnu.Carsharing.entity.enums.UserDTO;
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

    public UserDTO findUserEntityById(Long id) {
        UserEntity userEntity = userRepo.findUserEntitiesById(id).orElseThrow();
        UserDTO user = new UserDTO(userEntity.getId(), userEntity.getUsername(), userEntity.getEmail(), userEntity.getFirstName(), userEntity.getLastName(),
                userEntity.getAddress(), userEntity.getImageURL(), userEntity.getUserRole());
        return user;
    }
}
