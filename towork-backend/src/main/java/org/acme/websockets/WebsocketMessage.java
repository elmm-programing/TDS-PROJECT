package org.acme.websockets;

public class WebsocketMessage {

    public String message;
    public String userName;
    public String Type;

    WebsocketMessage(String message, String userName,String Type) {
        this.message = message;
        this.userName = userName;
        this.Type = Type;
    }
}
