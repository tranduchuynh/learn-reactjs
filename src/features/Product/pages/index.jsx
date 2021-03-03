import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import productApi from 'api/product';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductList from '../components/ProductList';
import { Pagination } from '@material-ui/lab';

ListPage.propTypes = {};

const useStyles = makeStyles({
  root: {},

  left: {
    width: '250px',
  },

  right: {
    flex: 1,
  },
});

function ListPage(props) {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    limit: 6,
    total: 10,
    page: 1
  });
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 6,
  });

  useEffect(() => {
    (async () => {
      try {
        const { _page, _limit } = filters
        const { data, pagination: pag } = await productApi.getAll({ _page, _limit });
        setProductList(data);
        setPagination({
          ...pagination,
          ...pag,
        });
      } catch (error) {
        console.log('Failed to fetch product list:', error);
      }

      setLoading(false);
    })();
  }, [filters]);

  const handlePageChange = (e, page) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _page: page
    }))
  }

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>Content Left</Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              {loading ? <ProductSkeletonList length={9} /> : <ProductList data={productList} />}
            </Paper>
            <Pagination
              count={Math.ceil(pagination.total / pagination.limit)}
              page={pagination.page}
              color="primary"
              onChange={handlePageChange}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
