package lpnu.Carsharing.repo;

import lpnu.Carsharing.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity>findUserEntitiesByUsername(String username);
    Optional<UserEntity>findUserEntitiesById(Long id);

    boolean existsByUsername(String username);
}
