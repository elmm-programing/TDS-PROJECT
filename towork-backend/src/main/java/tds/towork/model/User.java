package tds.towork.model;

import io.quarkus.mongodb.panache.common.MongoEntity;
import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoEntity;
import tds.towork.model.common.Role;

import java.util.List;
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
    private String telefono;
    private String direccion;
    private List<String> area;
    private List<String> conocimientos;
    private List<String> experiencias;
    private List<String> certificados;
    private String descripcion;
    private String imagen;

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public List<String> getArea() {
        return area;
    }

    public void setArea(List<String> area) {
        this.area = area;
    }

    public List<String> getConocimientos() {
        return conocimientos;
    }

    public void setConocimientos(List<String> conocimientos) {
        this.conocimientos = conocimientos;
    }

    public List<String> getExperiencias() {
        return experiencias;
    }

    public void setExperiencias(List<String> experiencias) {
        this.experiencias = experiencias;
    }

    public List<String> getCertificados() {
        return certificados;
    }

    public void setCertificados(List<String> certificados) {
        this.certificados = certificados;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

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
