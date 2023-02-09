package tds.towork.repository;

import javax.enterprise.context.ApplicationScoped;

import io.quarkus.mongodb.panache.PanacheMongoRepository;
import tds.towork.model.User;

/**
 * UserRepository
 */
@ApplicationScoped
public class UserRepository implements PanacheMongoRepository<User> {

    
}
