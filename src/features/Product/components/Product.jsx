import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { STATIC_HOST, THUMBNAIL_PLACEHODER } from 'constant';
import { useHistory } from 'react-router';
import { formatPrice } from 'utils';

Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  const history = useHistory();
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail.url}`
    : THUMBNAIL_PLACEHODER;

  const handleClick = () => {
    // Navigate to detail page: /products/:productId
    history.push(`/products/${product.id}`);
  }

  return (
    <Box padding={1} onClick={handleClick} >
      <Box padding={1} minHeight={215}>
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>
      <Box pt={0.5}>
        <Typography variant="body2">{product.name}</Typography>
        <Typography variant="body2">
          <Box component="span" fontSize="16px" fontWeight="bold" marginRight={1}>
            {formatPrice(product.salePrice)}
          </Box>
          {product.promotionPercent > 0 ? `-${product.promotionPercent}%` : ''}
        </Typography>
      </Box>
    </Box>
  );
}

export default Product;
