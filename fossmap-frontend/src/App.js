import React, { useState } from 'react';
import MapComponent from './components/Map';
import { fetchRoute } from './services/apiService';

function App() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const route = await fetchRoute(start, end);
    // Do something with the route
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" value={start} onChange={(e) => setStart(e.target.value)} />
        <input type="text" value={end} onChange={(e) => setEnd(e.target.value)} />
        <button type="submit">Find Route</button>
      </form>
      <MapComponent />
    </div>
  );
}

export default App;
