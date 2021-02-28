import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

TodoFeature.propTypes = {

};

function TodoFeature(props) {
  const match = useRouteMatch();
  return (
    <div>
      {/* TODO SHARED UI
      <Switch>
        <Route path={match.path} compoenent={ListPage} exact/>
        <Route path={`${match.path}/:id`} compoenent={DetailPage} exact/>

        <Route component={NotFound} />
      </Switch> */}
      <ListPage />
    </div>
  );
}

export default TodoFeature;