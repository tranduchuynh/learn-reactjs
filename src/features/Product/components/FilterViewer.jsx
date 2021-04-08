import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    padding: 0,

    margin: theme.spacing(2, 0),
    listStyleType: 'none',

    '& > li': {
      margin: 0,
      padding: theme.spacing(1),
    },
  },
}));

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => 'Giao hàng miễn phí',
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemoveAble: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = {...filters}
      if(newFilters.isFreeShip) {
        delete newFilters.isFreeShip
      }else {
        newFilters.isFreeShip = true
      }
      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: () => 'Có Khuyến mãi',
    isActive: (filters) => filters.isPromotion,
    isVisible: (filters) => filters.isPromotion,
    isRemoveAble: true,
    onRemove: (filters) => {
      const newFilters = {...filters}
      delete newFilters.isPromotion
      return newFilters;
    },
    onToggle: () => {

    },
  },
  {
    id: 3,
    getLabel: (filters) => `${filters.salePrice_gte}đ đến ${filters.salePrice_lte}đ`,
    isActive: (filters) => filters.salePrice_gte || filters.salePrice_lte,
    isVisible: (filters) => filters.salePrice_gte || filters.salePrice_lte,
    isRemoveAble: true,
    onRemove: (filters) => {
      const newFilters = {...filters}
      delete newFilters.salePrice_gte
      delete newFilters.salePrice_lte
      return newFilters;
    },
    onToggle: () => {},
  },
];

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

function FilterViewer({ filters = {}, onChange = null }) {
  const classes = useStyles();

  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters))
  }, [filters])

  return (
    <Box component="ul" className={classes.root}>
      {visibleFilters.map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? 'primary' : 'default'}
            clickable={!x.isRemoveAble}
            onClick={x.isRemoveAble ? null : () => {
              if(!onChange) return;

              const newFilters = x.onToggle(filters);

              onChange(newFilters);
            }}
            onDelete={x.isRemoveAble ? () => {
              if(!onChange) return;

              const newFilters = x.onRemove(filters);

              onChange(newFilters);
            } : null}
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;
