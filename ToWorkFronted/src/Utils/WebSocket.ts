import { useEffect } from 'react';
import { queryClient } from '../Utils/QueryClient';

const useReactQuerySubscription = () => {
  // creamos un cliente de React Query
  
  useEffect(() => {
    const websocket = new WebSocket('wss://echo.websocket.org/');
    
    // conectado
    websocket.onopen = () => {
      console.log('connected');
    }
    // al recibir un mensaje
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data)
      // auto-crear la queryKey a partir del evento recibido
      const queryKey = [...data.entity, data.id].filter(Boolean);
      // invalidar las solicitudes afectadas
      queryClient.invalidateQueries(queryKey);
    }
    // desconexi—n
    return () => {
      websocket.close();
    }
  }, [queryClient]);
}
