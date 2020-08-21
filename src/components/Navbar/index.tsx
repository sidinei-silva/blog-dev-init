import { Container, Typography, Box, Link, Divider } from '@material-ui/core';
import React from 'react';

import useStyles from './styles';

const Navbar: React.FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Box p={5}>
        <Typography align="center" className={classes.groupLink}>
          <Link className={classes.link} href="/">
            Home
          </Link>
          <Link className={classes.link} href="/">
            Teste
          </Link>
          <Link className={classes.link} href="/">
            Teste 2
          </Link>
        </Typography>
      </Box>
      <Box>
        <Divider variant="fullWidth" />
      </Box>
    </Container>
  );
};

export default Navbar;
