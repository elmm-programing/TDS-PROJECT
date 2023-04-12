package tds.towork.controller;

import java.util.List;

import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import tds.towork.model.Posts;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;

import tds.towork.repository.PostsRepository;

@Path("/posts")
public class PostsController {
    private final PostsRepository postRepo;

    @Inject
    public PostsController(PostsRepository postRepo) {
        this.postRepo = postRepo;
    }

    @RolesAllowed("USER")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Posts> GetItems() {
        return postRepo.listAll();
    }
    @PermitAll
    // @RolesAllowed("USER")
    @GET
    @Path("/{titulo}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response GetByTitulo(String titulo) {
        try {
        String query = String.format("{'titulo': { '$regex': /^%s/i }}", titulo);
        return Response.status(Response.Status.CREATED).entity(postRepo.find(query).list()).build();
        } catch (Exception e) {
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(e).build();
        }
        
    }
    @PermitAll
    // @RolesAllowed("USER")
    @GET
    @Path("user/{username}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response GetByUsername(String username) {
        try {
        String query = String.format("{'dueño': { '$regex': /^%s/i }}", username);
        return Response.status(Response.Status.CREATED).entity(postRepo.find(query).list()).build();
        } catch (Exception e) {
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(e).build();
        }
        
    }


    @RolesAllowed("USER")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response subirPost(Posts post) {
        try {
            postRepo.persist(post);
            return Response.status(Response.Status.CREATED).entity("Estoy vivo").build();

        } catch (Exception ex) {
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity("Hubo un fallo con la publicacion: " + ex.toString()).build();
        }
    }

}
