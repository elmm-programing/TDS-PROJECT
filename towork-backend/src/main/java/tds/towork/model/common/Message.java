package tds.towork.model.common;

import java.time.LocalDateTime;

/**
 * Message
 */
public class Message {

	public String from;
	public String body;
	public LocalDateTime timestamp;
	public String getFrom() {
		return from;
	}
	public void setFrom(String from) {
		this.from = from;
	}
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	public LocalDateTime getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}
	
	
}
