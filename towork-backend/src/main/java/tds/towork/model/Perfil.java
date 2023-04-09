package tds.towork.model;

import java.util.List;

import io.quarkus.mongodb.panache.common.MongoEntity;
import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoEntity;

@MongoEntity(collection = "Perfil")
public class Perfil extends ReactivePanacheMongoEntity {
    private String idUser;
    private List<String> area;
    private String direccion;
    private String telefono;
    private String email;
    private List<String> conocimientos;
    private List<String> experiencias;
    private List<String> certificados;
    private String descripcion;
    private String imagen;

    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }

    public String getIdUser() {
        return idUser;
    }

    public void setArea(List<String> area) {
        this.area = area;
    }

    public List<String> getArea() {
        return area;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setConocimientos(List<String> conocimientos) {
        this.conocimientos = conocimientos;
    }

    public List<String> getConocimientos() {
        return conocimientos;
    }

    public void setExperiencias(List<String> experiencias) {
        this.experiencias = experiencias;
    }

    public List<String> getExperiencias() {
        return experiencias;
    }

    public void setCertificados(List<String> certificados) {
        this.certificados = certificados;
    }

    public List<String> getCertificados() {
        return certificados;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getImagen() {
        return imagen;
    }

}
