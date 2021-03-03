import React from 'react';
import PropTypes from 'prop-types';
import ListPage from './pages';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Box } from '@material-ui/core';

ProductFeature.propTypes = {};

function ProductFeature(props) {
  const match = useRouteMatch();
  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.url} component={ListPage} />
      </Switch>
    </Box>
  );
}

export default ProductFeature;
