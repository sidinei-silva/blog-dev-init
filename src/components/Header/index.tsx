import { Box } from '@material-ui/core';
import React from 'react';

import useStyles from './styles';

const Header: React.FC = () => {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  return (
    <>
      <Box className={classes.root}>
        <img className={classes.logo} src="/logo_transparent.png" alt="" />
      </Box>
    </>
  );
};

export default Header;
