package tds.towork.repository;

import javax.enterprise.context.ApplicationScoped;
import io.quarkus.mongodb.panache.PanacheMongoRepository;
import tds.towork.model.Comentarios;

/**
 * ComentariosRepository
 */

 @ApplicationScoped
public class ComentariosRepository implements PanacheMongoRepository<Comentarios> {
    
}
