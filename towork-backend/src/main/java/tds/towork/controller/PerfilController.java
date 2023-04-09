package tds.towork.controller;

import java.util.List;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import tds.towork.model.Perfil;
import tds.towork.model.common.AuthResponse;

import javax.inject.Inject;

import tds.towork.repository.PerfilRepository;

@Path("/perfil")
public class PerfilController {
    private final PerfilRepository perfilRepo;

    @Inject
    public PerfilController(PerfilRepository perfilRepo) {
        this.perfilRepo = perfilRepo;
    }

    @POST
    @Path("recibir/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<Perfil> GetItems(String idUser) {
        System.out.println(idUser);
        return perfilRepo.list("idUser = " + idUser + "");
    }

    @POST
    @Path("recibir/imagen")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserImage(String idUser) {
        Perfil imagen = perfilRepo.find("idUser = " + idUser + "").firstResult();
        System.out.println(imagen.getImagen());
        return Response.status(Response.Status.CREATED).entity(new AuthResponse(imagen.getImagen())).build();

    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)

    public Response subirPerfil(Perfil perfil) {
        try {
            Perfil id = perfilRepo.find("idUser", perfil.getIdUser()).firstResult();
            if (id == null) {
                perfilRepo.persist(perfil);
            } else {
                perfilRepo.delete(id);
                perfilRepo.persist(perfil);
            }

            return Response.status(Response.Status.CREATED).entity("Estoy vivo").build();

        } catch (Exception ex) {
            return Response.status(Response.Status.NOT_ACCEPTABLE)
                    .entity("Hubo un fallo con la publicacion: " + ex.toString()).build();
        }
    }

}
