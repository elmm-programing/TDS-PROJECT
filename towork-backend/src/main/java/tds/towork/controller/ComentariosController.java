package tds.towork.controller;

import java.util.List;

import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import tds.towork.model.Comentarios;
import javax.inject.Inject;

import tds.towork.repository.ComentariosRepository;

@Path("/coments")
public class ComentariosController {
    private final ComentariosRepository comentarioRepo;

    @Inject
    public ComentariosController(ComentariosRepository comentarioRepo) {
        this.comentarioRepo = comentarioRepo;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Comentarios> GetItems() {
        return comentarioRepo.listAll();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response subirComentario(Comentarios comentario) {
        try {

            comentarioRepo.persist(comentario);
            return Response.status(Response.Status.CREATED).entity(true).build();

        } catch (Exception ex) {
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity("El Usuario ya existe").build();
        }
    }

    @POST
    @Path("commentModal/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<Comentarios> subirIdPost(String idPost) {
        return comentarioRepo.list("idPost = " + idPost + "");
    }
}
