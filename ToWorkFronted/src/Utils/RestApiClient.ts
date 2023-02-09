const REST_API_URL = "http://localhost:8080";

export const RestApiClient = async (endpoint: string, config: RequestInit = {})=>{
return await fetch(`${REST_API_URL}/${endpoint}`, config)
      .then( (response) => {
        if (response.status === 401) {
				console.log("No Autorizado")
        }
        return response;
      })
      .then( (response) => {
        if (response && response.ok) {
          return response.json();
        }
        return Promise.reject(`Error fetch: ${response.statusText}`);
      });

}
