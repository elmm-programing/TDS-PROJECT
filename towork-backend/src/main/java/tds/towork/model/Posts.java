package tds.towork.model;

import io.quarkus.mongodb.panache.common.MongoEntity;
import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoEntity;
import javax.validation.constraints.NotBlank;

@MongoEntity(collection = "Posts")
public class Posts extends ReactivePanacheMongoEntity {

    @NotBlank(message = "ID de la publicacion")
    private String idPosts;
    @NotBlank(message = "Titulo de la publicacion")
    private String titulo;
    @NotBlank(message = "Comentario de la publicacion")
    private String comentario;
    private String file;
    private String fileName;
    @NotBlank(message = "ID del dueño de la publicacion")
    private String dueñoId;
    @NotBlank(message = "Dueño de la publicacion")
    private String dueño;
    private String perfil;
    @NotBlank(message = "Fecha de subida")
    private String fecha;

    public void setIdPosts(String idPosts) {
        this.idPosts = idPosts;
    }

    public String getIdPosts() {
        return idPosts;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public String getFile() {
        return file;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileName() {
        return fileName;
    }

    public void setDueñoId(String dueñoId) {
        this.dueñoId = dueñoId;
    }

    public String getDueñoId() {
        return dueñoId;
    }

    public void setDueño(String dueño) {
        this.dueño = dueño;
    }

    public String getDueño() {
        return dueño;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getFecha() {
        return fecha;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public String getComentario() {
        return comentario;
    }

    public void setPerfil(String perfil) {
        this.perfil = perfil;
    }

    public String getPerfil() {
        return perfil;
    }
}
