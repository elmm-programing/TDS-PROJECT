package tds.towork.repository;

import javax.enterprise.context.ApplicationScoped;
import io.quarkus.mongodb.panache.PanacheMongoRepository;
import tds.towork.model.Posts;

/**
 * PostsRepository
 */

 @ApplicationScoped
public class PostsRepository implements PanacheMongoRepository<Posts> {
    
}
