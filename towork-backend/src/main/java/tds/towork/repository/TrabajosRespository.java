package tds.towork.repository;

import javax.enterprise.context.ApplicationScoped;

import io.quarkus.mongodb.panache.PanacheMongoRepository;
import tds.towork.model.trabajos;

/**
 * TrabajosRespository
 */
@ApplicationScoped
public class TrabajosRespository implements PanacheMongoRepository<trabajos> {

}
