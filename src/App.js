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
import TeamView from './pages/Team';


const App = () => {

  const routes = useRoutes([
    { path : "", element : <MainLayout/>, children : [
      {path: "", element : <HomeView/>},
      {path: ":id", element : <PokemonView />},
      {path: "team" , element : <TeamView/>}
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
