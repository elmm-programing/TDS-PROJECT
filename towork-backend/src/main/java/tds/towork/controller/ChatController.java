package tds.towork.controller;

import java.util.List;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import io.quarkus.mongodb.panache.PanacheQuery;
import tds.towork.model.PrivateChat;
import tds.towork.repository.PrivateChatRepository;

/**
 * ChatController
 */
@Path("/chat")
public class ChatController {
    private final PrivateChatRepository privateChat;

    @Inject
    public ChatController(PrivateChatRepository privateChat) {
        this.privateChat = privateChat;
    }

    // @RolesAllowed("USER")
    @Path("/user")
    @PermitAll
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response GetAllChats(String userName) {
        try{

String queryFormatted = String.format("{'members': [ %s}}", userName);
return Response.status(Response.Status.OK)
                    .entity(privateChat.find(queryFormatted).list()).build();
}catch (Exception ex) {
            return Response.status(Response.Status.NOT_ACCEPTABLE)
                    .entity("Hubo un fallo con la publicacion: " + ex.toString()).build();
        }

    }

    // @RolesAllowed("USER")
    @PermitAll
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response sendMessage(PrivateChat chat) {
        try {
            privateChat.persistOrUpdate(chat);
            return Response.status(Response.Status.CREATED).entity("Estoy vivo").build();

        } catch (Exception ex) {
            return Response.status(Response.Status.NOT_ACCEPTABLE)
                    .entity("Hubo un fallo con la publicacion: " + ex.toString()).build();
        }
    }

}
