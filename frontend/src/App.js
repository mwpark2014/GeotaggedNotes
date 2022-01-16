import GoogleMap from './components/GoogleMap';
import useGeolocationAPI from './hooks/useGeolocationAPI';
import './App.css';

function App() {
  useGeolocationAPI();
  return (
    <div className="App">
      <GoogleMap />
    </div>
  );
}

export default App;
