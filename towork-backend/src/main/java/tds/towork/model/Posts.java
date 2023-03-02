package tds.towork.model;
import io.quarkus.mongodb.panache.common.MongoEntity;
import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoEntity;
import javax.validation.constraints.NotBlank;


@MongoEntity(collection = "Posts")
public class Posts extends ReactivePanacheMongoEntity {
    
    @NotBlank(message = "ID de la publicacion")
    private String id;
    private String titulo;
    private String imagen;
    @NotBlank(message = "ID del dueño de la publicacion")
    private String dueñoId;
    @NotBlank(message = "Dueño de la publicacion")
    private String dueño;
    @NotBlank(message = "Fecha de subida")
    private String fecha;
    private int comentario;
public void setId(String id){
        this.id = id;
    }
    public String getId(){
        return id;
    }
    
    public void setTitulo(String titulo){
        this.titulo = titulo;
    }
    public String getTitulo(){
        return titulo;
    }
    
    public void setImagen(String imagen){
        this.imagen = imagen;
    }
    public String getImagen(){
        return imagen;
    }
    
    public void setDueñoId(String dueñoId){
        this.dueñoId = dueñoId;
    }
    public String getDueñoId(){
        return dueñoId;
    }
    
    public void setDueño(String dueño){
        this.dueño = dueño;
    }
    public String getDueño(){
        return dueño;
    }
    public void setFecha(String fecha){
        this.fecha = fecha;
    }
    public String getFecha(){
        return fecha;
    }
    
    public void setComentario(int comentario){
        this.comentario = comentario;
    }
    public int getComentario(){
        return comentario;
    }
}
