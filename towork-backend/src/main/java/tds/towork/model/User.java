package tds.towork.model;

import io.quarkus.mongodb.panache.common.MongoEntity;
import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoEntity;
import tds.towork.model.common.Role;

import java.util.Set;

import javax.validation.constraints.NotBlank;

/**
 * User
 */

@MongoEntity(collection = "Users")
public class User extends ReactivePanacheMongoEntity {

    @NotBlank(message = "The user need a name")
    private String name;
    @NotBlank(message = "The user need a lastname")
    private String lastName;
    @NotBlank(message = "The user need a email")
    private String email;
    @NotBlank(message = "The user need a username")
    private String username;
    @NotBlank(message = "The user need a password")
    private String password;

    private Set<Role> roles;

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
