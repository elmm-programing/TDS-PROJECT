const REST_API_URL = "http://localhost:8080";

export const RestApiClient = async (endpoint: string, config: RequestInit = {}) => {
  return await fetch(`${REST_API_URL}/${endpoint}`, config)
    .then((response) => {
      if (response.status === 406) {
        // console.log("Ocurrio un error")
      }
      return response;
    })
    .then((response) => {
      if (response && response.ok) {
        return response.json();
      }
      return response.text();
    });

}
