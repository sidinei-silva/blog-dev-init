import { Box, Link } from '@material-ui/core';
import React from 'react';

import useStyles from './styles';

const Header: React.FC = () => {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  return (
    <>
      <Box className={classes.root}>
        <Link href="/">
          <img className={classes.logo} src="/logo.png" alt="" />
        </Link>
      </Box>
    </>
  );
};

export default Header;
