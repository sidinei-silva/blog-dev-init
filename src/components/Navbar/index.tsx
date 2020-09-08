import { Container, Typography, Box, Link, Divider } from '@material-ui/core';
import React from 'react';

import useStyles from './styles';

interface Category {
  node: {
    name: string;
  };
}

interface NavbarProps {
  categories: Category[];
}

const Navbar: React.FC<NavbarProps> = ({ categories }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Box py={5}>
        <Typography align="center" className={classes.groupLink}>
          <Link className={classes.link} href="/">
            Home
          </Link>
          {categories &&
            categories.map(category => (
              <Link key={category.node.name} className={classes.link} href="/">
                {category.node.name}
              </Link>
            ))}
        </Typography>
      </Box>
      <Box>
        <Divider variant="fullWidth" />
      </Box>
    </Container>
  );
};

export default Navbar;
