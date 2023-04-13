package tds.towork.controller;

import java.util.List;

import javax.annotation.security.PermitAll;
import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.bson.types.ObjectId;

import tds.towork.model.trabajos;
import tds.towork.repository.TrabajosRespository;

/**
 * TrabajosController
 */

@Path("/trabajos")
public class TrabajosController {
    private final TrabajosRespository trabajosRespository;

    @Inject
    public TrabajosController(TrabajosRespository trabajosRespository) {
        this.trabajosRespository = trabajosRespository;
    }

    @PermitAll
    // @RolesAllowed("USER")
    @GET
    @Path("/{idUser}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response GetWorkUserName(String idUser) {
        try {
            String query = String.format("{'idUser': { '$regex': /^%s/i }}", idUser);
            return Response.status(Response.Status.CREATED).entity(trabajosRespository.find(query).list()).build();
        } catch (Exception e) {
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(e).build();
        }

    }

    @PermitAll
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addWork(@Valid trabajos user) {
        try {
            String query = String.format("{'idPost': { '$regex': /^%s/i },'idUser': { '$regex': /^%s/i }}",
                    user.getIdPost(), user.getIdUser());
            List<trabajos> traba = trabajosRespository.find(query).list();
            if (traba.isEmpty()) {
                trabajosRespository.persist(user);
                return Response.status(Response.Status.CREATED).entity("Se creo").build();
            }
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity("No se agrego").build();
        } catch (Exception e) {
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(e).build();
        }

    }

    @PermitAll
    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteWork(ObjectId id) {
        try {
            trabajosRespository.deleteById(id);
            return Response.status(Response.Status.ACCEPTED).entity("Se elimino").build();

        } catch (Exception e) {
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(e).build();
        }

    }

}
