import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import productApi from 'api/product';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import FilterViewer from '../components/FilterViewer';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';
import queryString from 'query-string';

ListPage.propTypes = {};

const useStyles = makeStyles({
  root: {},

  left: {
    width: '250px',
  },

  right: {
    flex: 1,
  },

  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',

    marginTop: '20px',
    paddingBottom: '10px',
  },
});

function ListPage(props) {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    // true --> 'true'
    // { isPromotion: 'true' }
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 6,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    limit: 6,
    total: 10,
    page: 1,
  });
  // const [filters, setFilters] = useState({
  //   _page: 1,
  //   _limit: 6,
  //   _sort: 'salePrice:ASC',
  // });

  const [filters, setFilters] = useState({
    ...queryParams,
    _page: Number.parseInt(queryParams._page) || 1,
    _limit: Number.parseInt(queryParams._limit) || 6,
    _sort: queryParams._sort || 'salePrice:ASC',
  });

  // useEffect(() => {
  //   // Todos: sync filter to url
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify(filters),
  //   });
  // }, [history, filters]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination: pag } = await productApi.getAll(queryParams);
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
  }, [queryParams]);

  const historyUrl = (filters) => {
    return history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handlePageChange = (e, page) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _page: page,
    // }));

    const filters = {
      ...queryParams,
      _page: page,
    };

    historyUrl(filters)
  };

  const handleSortChange = (sort) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _sort: sort,
    // }));

    const filters = {
      ...queryParams,
      _sort: sort,
    };

    historyUrl(filters)
  };

  const handleFilterschange = (newFilters) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   ...newFilters,
    // }));

    const filters = {
      ...queryParams,
      ...newFilters,
    };

    historyUrl(filters)
  };

  const setNewFilters = (newFilters) => {
    // setFilters(newFilters);
    historyUrl(newFilters)
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters filters={queryParams} onChange={handleFilterschange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
            <FilterViewer filters={queryParams} onChange={setNewFilters} />
            <Paper elevation={0}>
              {loading ? <ProductSkeletonList length={9} /> : <ProductList data={productList} />}
            </Paper>
            <Box className={classes.pagination}>
              <Pagination
                count={Math.ceil(pagination.total / pagination.limit)}
                page={pagination.page}
                color="primary"
                onChange={handlePageChange}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
