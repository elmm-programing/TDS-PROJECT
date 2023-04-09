package tds.towork.repository;

import javax.enterprise.context.ApplicationScoped;
import io.quarkus.mongodb.panache.PanacheMongoRepository;
import tds.towork.model.Perfil;

/**
 * ComentariosRepository
 */

@ApplicationScoped
public class PerfilRepository implements PanacheMongoRepository<Perfil> {

}
