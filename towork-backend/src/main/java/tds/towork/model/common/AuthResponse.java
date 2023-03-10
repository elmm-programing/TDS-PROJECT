package tds.towork.model.common;

/**
 * AuthResponse
 */
public class AuthResponse {
    public String token;

    public AuthResponse() {
    }

    public AuthResponse( String token) {
        this.token = token;
    }


    public String getToken() {
        return token;
    }

    public void setToken(String password) {
        this.token = password;
    }

    @Override
    public String toString() {
        return String.format("%s", token);
    }

    
}
