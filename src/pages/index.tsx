/* eslint-disable no-underscore-dangle */
import {
  Typography,
  Grid,
  Box,
  Divider,
  Hidden,
  Link,
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Head from 'next/head';
import React from 'react';

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { fetchAPI } from '../lib/api-prismic';

import 'moment/locale/pt-br';

moment.locale('pt-br');

interface Post {
  node: {
    _meta: {
      uid: string;
      firstPublicationDate: string;
    };
    title: string;
    subtitle: string;
    thumbnail: {
      url: string;
      alt: string;
    };
    content: string;
  };
}

interface HomeProps {
  posts: Post[];
}

const useStyles = makeStyles(theme =>
  createStyles({
    imgThumbnail: {
      width: '100%',
    },
  }),
);

const Home: React.FC<HomeProps> = ({ posts }) => {
  const classes = useStyles();
  const highlight = posts[0];
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
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Link href="/">
                        <img
                          className={classes.imgThumbnail}
                          src={highlight.node.thumbnail.url}
                          alt={highlight.node.thumbnail.alt}
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={12}>
                      <Link href="/">
                        <Typography variant="h4">
                          {highlight.node.title}
                        </Typography>
                        <Typography variant="subtitle1">
                          {highlight.node.subtitle}
                        </Typography>
                        <Typography variant="caption">
                          <span>Criado em </span>
                          {moment(
                            highlight.node._meta.firstPublicationDate,
                          ).format('DD-MM-YYYY ')}
                        </Typography>
                      </Link>
                    </Grid>
                  </Grid>
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
};

export default Home;

export async function getServerSideProps() {
  const posts = await fetchAPI(
    `
    query {
      allPosts(sortBy: meta_lastPublicationDate_ASC) {
        edges {
          node{
            _meta {
              uid,
              firstPublicationDate
            }
            title
            subtitle
            thumbnail
            content
          }
        }
      }
    }
  `,
    {},
  );

  console.log(posts);

  return {
    props: {
      posts: posts.allPosts.edges,
    },
  };
}
