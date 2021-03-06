import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import AddToCartForm from '../components/AddToCartForm';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReviews from '../components/ProductReviews';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(3)
  },

  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`
  },

  right: {
    flex: 1,
    padding: theme.spacing(1.5),
  },

  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%'
  }
}));

DetailPage.propTypes = {

};

function DetailPage(props) {
  const classes = useStyles();
  const { url } = useRouteMatch();
  const { params: { productId }} = useRouteMatch();

  const { product, loading } = useProductDetail(productId)

  if(loading) {
    return (
      <Box className={classes.loading}>
      <LinearProgress />
    </Box>
    )
  }

  const handleAddToCartSubmit = (formValues) => {
    console.log('Form submit', formValues)
  }

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>

        <ProductMenu />

        <Switch>
          <Route exact path={url} >
              <ProductDescription product={product}/>
          </Route>
          <Route path={`${url}/additional`} component={ProductAdditional}/>
          <Route path={`${url}/reviews`} component={ProductReviews}/>
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailPage;