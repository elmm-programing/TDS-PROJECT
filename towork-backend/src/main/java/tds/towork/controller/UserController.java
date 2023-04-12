package tds.towork.controller;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.List;

import javax.annotation.security.PermitAll;
import javax.inject.Inject;
import javax.validation.Valid;
import javax.validation.Validator;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;
import org.jboss.resteasy.reactive.RestResponse;
import org.jboss.resteasy.reactive.RestResponse.ResponseBuilder;

import tds.towork.model.User;
import tds.towork.model.common.AuthResponse;
import tds.towork.repository.UserRepository;
import tds.towork.utils.PBKDF2Encoder;
import tds.towork.utils.TokenUtils;

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
    PBKDF2Encoder passwordEncoder;

    @ConfigProperty(name = "tds.towork.quarkusjwt.jwt.duration")
    public Long duration;
    // @ConfigProperty(name = "mp.jwt.verify.issuer")
    // public String issuer;

    @Inject
    public UserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @PermitAll
    // @RolesAllowed("USER")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> GetAllUsers() {
        return userRepo.listAll();
    }

    @PermitAll
    // @RolesAllowed("USER")
    @GET
    @Path("/{username}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response GetUser(String username) {
        try {
            String query = String.format("{'username': { '$regex': /^%s/i }}", username);
            return Response.status(Response.Status.CREATED).entity(userRepo.find(query).list()).build();
        } catch (Exception e) {
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(e).build();
        }

    }

    @PermitAll
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addUser(@Valid User user) {

        User fEmail = userRepo.find("email", user.getEmail()).firstResult();
        User fUsername = userRepo.find("username", user.getUsername()).firstResult();

        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        try {
            if (fEmail == null && fUsername == null) {
                userRepo.persist(user);

                AuthResponse entity = new AuthResponse(
                        TokenUtils.generateToken(user.getUsername(), user.getRoles(), duration), user);
                return Response.status(Response.Status.CREATED).entity(entity).build();
            } else {
                return Response.status(Response.Status.NOT_ACCEPTABLE).entity(new AuthResponse("El Usuario ya existe"))
                        .build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(e).build();
        }

    }

    @PermitAll
    @POST
    @Path("/login")
    public Response Login(User user) {

        if (user.getUsername() == null || user.getEmail() == null) {

            return Response.status(Response.Status.NOT_ACCEPTABLE)
                    .entity(new AuthResponse("Username or Email not added in request"))
                    .build();
        }

        User fEmail = userRepo.find("email", user.getEmail()).firstResult();
        User fUsername = userRepo.find("username", user.getUsername()).firstResult();
        if (fEmail != null) {
            if (fEmail.getPassword().equals(passwordEncoder.encode(user.getPassword().toString()))) {
                try {
                    AuthResponse entity = new AuthResponse(
                            TokenUtils.generateToken(fEmail.getUsername(), fEmail.getRoles(), duration), fEmail);

                    return Response.status(Response.Status.CREATED)
                            .entity(entity)
                            .build();
                } catch (Exception e) {
                    return Response.status(Response.Status.UNAUTHORIZED).build();
                }

            } else {
                return Response.status(Response.Status.CREATED).entity(new AuthResponse("Password is not correct"))
                        .build();
            }
        } else if (fUsername != null) {
            if (fUsername.getPassword().equals(passwordEncoder.encode(user.getPassword().toString()))) {
                try {

                    AuthResponse entity = new AuthResponse(
                            TokenUtils.generateToken(fUsername.getUsername(), fUsername.getRoles(), duration),
                            fUsername);
                    return Response.status(Response.Status.CREATED)
                            .entity(entity)
                            .build();
                } catch (Exception e) {
                    return Response.status(Response.Status.UNAUTHORIZED).build();
                }
            } else {
                return Response.status(Response.Status.CREATED).entity(new AuthResponse("Password is not correct"))
                        .build();
            }
        } else {
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(new AuthResponse("User Not Found")).build();
        }
    }

    @PermitAll
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateUser(@Valid User user) {

        try {
            userRepo.update(user);
            AuthResponse entity = new AuthResponse();
            entity.setUser(user);
            return Response.status(Response.Status.CREATED).entity(entity).build();
        } catch (Exception e) {
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(e).build();
        }

    }

}
