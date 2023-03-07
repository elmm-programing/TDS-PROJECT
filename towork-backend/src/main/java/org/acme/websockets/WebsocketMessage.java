package org.acme.websockets;

public class WebsocketMessage {

    public String message;
    public String key;

    WebsocketMessage(String message, String key) {
        this.message = message;
        this.key = key;
    }
}
