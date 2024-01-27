import './App.css'
import Map from './map/Map'
import { useEffect , useState } from "react";

function App() {

  const [ city, setCity ] = useState<string>();
  const [ location, setLocation ] = useState({
    latitude: 25.3176,
    longitude:82.9739,
    display_name: "",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      getCurrentCityName,    
    );
  }, []);
 
//reverse geocoding search
  function getCurrentCityName(position: GeolocationPosition) {      
   
    const url = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat='
    + position.coords.latitude + '&lon='  
    + position.coords.longitude ;
   
    fetch(url, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {     
        setLocation({ latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          display_name:`${ data.address.city }, ${ data.address.country }` })         
      });
    }

  //search for city coordinated based on form data
  function submitHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault(); 
    const url = `https://nominatim.openstreetmap.org/search?city='${city}'&format=json&limit=1`;
   
    fetch(url, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        if (response.ok) {                  
          return response.json();
        }
      })
      .then((data) => {
          setLocation({
          latitude: data[0].lat,
          longitude: data[0].lon,
          display_name: data[0].display_name,
        })       
      }).catch(() => alert("Please Check your input"));
  }      
     
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  return (
    <div className='App'>
      <section className='map-container'>
         <Map location = { location }/>
      </section>
     
      <section className="form-container">
        <form>        
          <label>Enter the city:</label>
          <input
            placeholder="Los Angeles"
            type="text"
            value={city}
            onChange={ handleChange }
            id="city"
            style={{display:"absolute", left:"10px"}}
          />        

          <button onClick={ ( e )=> submitHandler( e ) }>Search</button>
        </form>
      </section>     
    </div>
  )
}

export default App