package org.acme.websockets;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import javax.enterprise.context.ApplicationScoped;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import io.quarkus.vertx.ConsumeEvent;

@ServerEndpoint("/api/live/ws")         
@ApplicationScoped
public class NotificationSocket {

    Map<String, Session> sessions = new ConcurrentHashMap<>();
    
    @OnOpen
    public void onOpen(Session session) {
        sessions.put(session.getId(), session);
    }

    @OnClose
    public void onClose(Session session) {
        sessions.remove(session.getId());
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        sessions.remove(session.getId());
    }

    // @ConsumeEvent("notification")
    // public void sendMessage(WebsocketEvent websocketEvent) {
    //     /** Create JSON */
    //     WebsocketMessage websocketMessage = new WebsocketMessage(websocketEvent.toString(), UUID.randomUUID().toString());
    //     Jsonb jsonb = JsonbBuilder.create();
    //     String result = jsonb.toJson(websocketMessage);
    //
    //     broadcast(result);
    // }
    @OnMessage
    public void onMessage(String message) {
            broadcast(message);
    }
    private void broadcast(String message) {
        sessions.values().forEach(s -> {
            s.getAsyncRemote().sendObject(message, result -> {
                if (result.getException() != null) {
                    System.out.println("Unable to send message: " + result.getException());
                }
            });
        });
    }

}
