package tds.towork.repository;

import javax.enterprise.context.ApplicationScoped;

import io.quarkus.mongodb.panache.PanacheMongoRepository;
import tds.towork.model.PrivateChat;

/**
 * PrivateChatRepository
 */
@ApplicationScoped
public class PrivateChatRepository implements PanacheMongoRepository<PrivateChat> {

    
}
