import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ChuckNorrisView from './views/ChuckNorrisView';
import RickAndMortyView from './views/RickAndMortyView';
import PokeApiView from './views/PokeApiView';
import MarvelView from './views/MarvelView';
import NasaView from './views/NasaView';
import WeatherView from './views/WeatherView';
import JsonPlaceholderView from './views/JsonPlaceholderView';
import RandomUserView from './views/RandomUserView';
import RestCountriesView from './views/RestCountriesView';
import SwapiView from './views/SwapiView';

export default function App() {
  return <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/chuck" element={<ChuckNorrisView />} />
    <Route path="/rick-morty" element={<RickAndMortyView />} />
    <Route path="/pokemon" element={<PokeApiView />} />
    <Route path="/marvel" element={<MarvelView />} />
    <Route path="/nasa" element={<NasaView />} />
    <Route path="/weather" element={<WeatherView />} />
    <Route path="/jsonplaceholder" element={<JsonPlaceholderView />} />
    <Route path="/random-user" element={<RandomUserView />} />
    <Route path="/countries" element={<RestCountriesView />} />
    <Route path="/swapi" element={<SwapiView />} />
  </Routes>;
}
