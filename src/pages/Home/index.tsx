import { Typography, Grid, Box, Divider, Hidden } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Head from 'next/head';
import React from 'react';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

export default function Home() {
  return (
    <>
      <Head>
        <title>Dev Init | Home</title>
      </Head>
      <Header />
      <Navbar />
      <Container maxWidth="lg">
        <Box my={4}>
          <Grid container spacing={6}>
            <Grid item md={9} xs={12}>
              <Grid container direction="column" spacing={5}>
                <Grid item>
                  <Box p={2} height="350px" bgcolor="#ccc">
                    <Typography align="center">Destaque</Typography>
                    <Grid container spacing={4}>
                      <Grid item md={8} xs={8}>
                        <Box height="220px" width="100%" bgcolor="#bbb">
                          <Typography>image</Typography>
                        </Box>
                      </Grid>
                      <Grid item md={4} xs={4}>
                        <Box height="220px" bgcolor="#bbb">
                          <Typography>title</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item>
                  <Hidden smDown>
                    <Box p={2} height="450px" bgcolor="#ccc">
                      <Typography align="center">Scroller</Typography>

                      <Grid container spacing={3}>
                        <Grid item xs>
                          <Box height="280px" bgcolor="#bbb">
                            Item 1
                          </Box>
                        </Grid>
                        <Grid item xs>
                          <Box height="280px" bgcolor="#bbb">
                            Item 2
                          </Box>
                        </Grid>
                        <Grid item xs>
                          <Box height="280px" bgcolor="#bbb">
                            Item 3
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Hidden>
                  <Hidden mdUp>
                    <Box p={2} height="250px" bgcolor="#ccc">
                      <Typography align="center">Scroller</Typography>
                    </Box>
                  </Hidden>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={3} xs={12}>
              <Hidden smDown>
                <Grid container direction="column" spacing={5}>
                  <Grid item>
                    <Box height="400px" bgcolor="#ccc">
                      <Typography>Banner</Typography>
                    </Box>
                  </Grid>

                  <Grid item>
                    <Box height="400px" bgcolor="#ccc">
                      <Typography>Banner</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Hidden>
              <Hidden mdUp>
                <Box height="200px" bgcolor="#ccc">
                  <Typography>Banner</Typography>
                </Box>
              </Hidden>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box my={4}>
          <Box height="300px" bgcolor="#ccc">
            <Typography>Instagram</Typography>
          </Box>
        </Box>
        <Divider />
        <Box my={4}>
          <Grid container spacing={6}>
            <Grid item md={9} xs={12}>
              <Box height="840px" bgcolor="#ccc">
                <Typography>All posts</Typography>
              </Box>
            </Grid>
            <Grid item md={3} xs={12}>
              <Hidden smDown>
                <Grid container direction="column" spacing={5}>
                  <Grid item>
                    <Box height="400px" bgcolor="#ccc">
                      <Typography>Banner</Typography>
                    </Box>
                  </Grid>

                  <Grid item>
                    <Box height="400px" bgcolor="#ccc">
                      <Typography>Banner</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Hidden>
              <Hidden mdUp>
                <Box height="200px" bgcolor="#ccc">
                  <Typography>Banner</Typography>
                </Box>
              </Hidden>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
