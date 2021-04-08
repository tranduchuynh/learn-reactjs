import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import FilterByCategory from './filters/FilterByCategory';
import FilterByPrice from './filters/FilterByPrice';
import FilterByService from './filters/FilterByService';

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func
};

function ProductFilters({ filters, onChange }) {
  const handleCategoryChange = (newCategoryId) => {
    if(!onChange) return;

    const newFilters =  {
      ...filters,
      "category.id": newCategoryId
    }

    onChange(newFilters);
  }

  const handleChange = (values) => {
    if(onChange) onChange(values);
  }

  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange}/>
      <FilterByPrice onChange={handleChange} />
      <FilterByService filters={filters} onChange={handleChange} />
    </Box>
  );
}

export default ProductFilters;