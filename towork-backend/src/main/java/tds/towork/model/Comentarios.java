package tds.towork.model;

import io.quarkus.mongodb.panache.common.MongoEntity;
import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoEntity;
import javax.validation.constraints.NotBlank;

@MongoEntity(collection = "Comentarios")
public class Comentarios extends ReactivePanacheMongoEntity{
    
    @NotBlank(message = "ID de comentario")
    private String idCom;
    @NotBlank(message = "ID del post")
    private String idPost;
    private String comentario;
    @NotBlank(message = "ID del dueño del comentario")
    private String dueñoId;
    @NotBlank(message = "Dueño del comentario")
    private String dueño;
    @NotBlank(message = "Fecha de subida")
    private String fecha;
    
    public void setIdCom(String idCom){
        this.idCom = idCom;
    }
    public String getIdCom(){
        return idCom;
    }
    
    public void setPost(String idPost){
        this.idPost = idPost;
    }
    public String getPost(){
        return dueño;
    }
    
    public void setComentario(String comentario){
        this.comentario = comentario;
    }
    public String getComentario(){
        return comentario;
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
}
