import './App.css';
import { Outlet, useRoutes } from 'react-router-dom';
/**
 * Layouts
 */
import MainLayout from './layouts/MainLayout';

/**
 * Views
 */
import HomeView from './pages/Home';
import PokemonView from './pages/Pokemon';


const App = () => {

  const routes = useRoutes([
    { path : "", element : <MainLayout/>, children : [
      {path: "", element : <HomeView/>},
      {path: ":id", element : <PokemonView />}
    ]}
  ])

  return (
    <div className="App">
      {routes}
      <Outlet/>
    </div>
  );
}

export default App;
