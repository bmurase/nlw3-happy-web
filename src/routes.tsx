import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CreateOrphanage from './pages/CreateOrphanage';
import Landing from './pages/Landing';
import OrphanageDetail from './pages/OrphanageDetail';
import OrphanagesMap from './pages/OrphanagesMap';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/app" component={OrphanagesMap} />

        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={OrphanageDetail} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;