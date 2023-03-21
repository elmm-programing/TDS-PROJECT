package tds.towork.model;

import java.util.List;

import io.quarkus.mongodb.panache.common.MongoEntity;
import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoEntity;
import tds.towork.model.common.Message;

@MongoEntity(collection = "PrivateChats")
public class PrivateChat extends ReactivePanacheMongoEntity {
    private List<String> members;
    private List<Message> messages;

    public List<String> getMembers() {
        return members;
    }

    public void setMembers(List<String> members) {
        this.members = members;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

}
