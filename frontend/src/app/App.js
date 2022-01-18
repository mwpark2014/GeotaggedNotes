import GoogleMap from '../features/geo/GoogleMap';
import useGeolocationAPI from '../features/geo/useGeolocationAPI';
import './App.css';

function App() {
  useGeolocationAPI();

  return (
    <div className="App">
      <GoogleMap center={{ lat: 37.7716736, lng: -122.3983104 }} />
    </div>
  );
}

export default App;
