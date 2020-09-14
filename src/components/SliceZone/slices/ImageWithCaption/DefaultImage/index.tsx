import { Box, Container } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import Caption from '../Caption';

const useStyles = makeStyles(() =>
  createStyles({
    image: {
      maxWidth: '100%'
    }
  })
);

/**
 * Default image component
 */
const DefaultImage = ({ imageUrl, caption }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Box py={2} textAlign="center" className={`block-img ${caption}`}>
        <img src={imageUrl} alt={caption} className={classes.image} />
        <Caption caption={caption} />
      </Box>
    </Container>
  );
};

export default DefaultImage;
