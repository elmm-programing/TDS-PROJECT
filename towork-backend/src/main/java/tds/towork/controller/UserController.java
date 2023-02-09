package tds.towork.controller;

import java.util.List;
import java.util.Set;

import javax.inject.Inject;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.jboss.logging.Logger;

import tds.towork.model.User;
import tds.towork.repository.UserRepository;

/**
 * UserController
 */

@Path("/users")
public class UserController {
    private static final Logger LOG = Logger.getLogger(UserController.class);
    private final UserRepository userRepo;
    @Inject
    Validator validator;

    @Inject
    public UserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> GetAllUsers() {
        return userRepo.listAll();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addUser(User user) {

        User fEmail = userRepo.find("email", user.getEmail()).firstResult();
        User fUsername = userRepo.find("username", user.getUsername()).firstResult();
        try {
            Set<ConstraintViolation<User>> violations = validator.validate(user);
            if (violations.isEmpty()) {
                if (fEmail == null && fUsername == null) {
                    userRepo.persist(user);
                    return Response.status(Response.Status.CREATED).entity(user).build();
                } else {
                    return Response.status(Response.Status.NOT_ACCEPTABLE).entity("El Usuario ya existe").build();
                }
            } else {
                return Response.status(Response.Status.NOT_ACCEPTABLE).entity("El formato del json esta mal").build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(e).build();
        }

    }

    @POST
    @Path("/users/login")
    public Response Login(User user) {
        if (user.getUsername() != null || user.getEmail() != null) {
            User fEmail = userRepo.find("email", user.getEmail()).firstResult();
            User fUsername = userRepo.find("username", user.getUsername()).firstResult();
            if (fEmail != null) {
                if (fEmail.getPassword().equals(user.getPassword().toString())) {
                    return Response.status(Response.Status.CREATED).entity(true).build();
                } else {
                    return Response.status(Response.Status.CREATED).entity(false).build();
                }
            } else if (fUsername != null) {
                if (fUsername.getPassword().equals(user.getPassword().toString())) {
                    return Response.status(Response.Status.CREATED).entity(true).build();
                } else {
                    return Response.status(Response.Status.CREATED).entity(false).build();
                }
            } else {
                return Response.status(Response.Status.NOT_ACCEPTABLE).entity("User Not Found").build();
            }
        }else{
                return Response.status(Response.Status.NOT_ACCEPTABLE).entity("Username or Email not added in request").build();
        }

    }

}
