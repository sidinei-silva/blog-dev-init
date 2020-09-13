import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Typography
} from '@material-ui/core';
import { GitHub, Email, LinkedIn } from '@material-ui/icons';
import React from 'react';

import useStyles from './styles';

const Footer: React.FC = () => {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  return (
    <>
      <Box py={1} className={classes.footer}>
        <Container maxWidth="lg">
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
              <Typography variant="body1">© 2020 Dev .init</Typography>
            </Grid>
            <Grid item md={12}>
              <IconButton
                color="inherit"
                href="https://github.com/sidinei-silva/blog-dev-init"
                target="_blank"
              >
                <GitHub fontSize="small" />
              </IconButton>
              <IconButton
                color="inherit"
                href="mailto:sidinei.developer@gmail.com?subject=Code Toolbox - Contact"
                target="_blank"
              >
                <Email fontSize="small" />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://www.linkedin.com/in/sidinei-silva-472570b2/"
                target="_blank"
              >
                <LinkedIn fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
