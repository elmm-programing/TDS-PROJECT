import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { queryClient } from './Utils/QueryClient'

function App() {
  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8081/api/live/ws');

    websocket.onopen = () => {
      console.log('connected');
    }

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
    }
  
    return () => {
      websocket.close()
    }
  }, [])}

export default App
