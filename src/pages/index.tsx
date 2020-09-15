import {
  Typography,
  Grid,
  Box,
  Divider,
  Hidden,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  Avatar,
  Chip,
  CardActionArea,
  Link
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Head from 'next/head';
import React from 'react';

import Footer from '../components/Footer/index';
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
      tags: string[];
    };
    title: string;
    subtitle: string;
    thumbnail: {
      url: string;
      alt: string;
    };
    content: string;
    author: {
      name: string;
      avatar: {
        url: string;
        alt: string;
      };
    };
  };
}

interface HomeProps {
  posts: Post[];
  categories: [];
}

const useStyles = makeStyles(() =>
  createStyles({
    imgThumbnail: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    },
    postCard: {
      minHeight: '100%'
    },
    mediaPost: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    },
    avatar: {
      backgroundColor: '#112D4E'
    }
  })
);

const Home: React.FC<HomeProps> = ({ posts, categories }) => {
  const classes = useStyles();
  const highlight = posts[0];

  return (
    <>
      <Head>
        <title>Dev Init | Home</title>
      </Head>
      <Header />
      <Navbar categories={categories} />
      <Container maxWidth="lg">
        <Box my={4}>
          <Grid container spacing={6}>
            <Grid item md={9} xs={12}>
              <CardActionArea>
                <Link
                  href={`posts/${highlight.node._meta.uid}`}
                  underline="none"
                >
                  <Grid container spacing={4} alignItems="center">
                    <Grid item md={8} xs={12}>
                      <CardMedia
                        className={classes.imgThumbnail}
                        image={highlight.node.thumbnail.url}
                        title={highlight.node.thumbnail.alt}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="h4">
                        {highlight.node.title}
                      </Typography>
                      <Typography variant="subtitle1">
                        {highlight.node.subtitle}
                      </Typography>
                      <Typography variant="caption">
                        <span>Criado em </span>
                        {moment(
                          highlight.node._meta.firstPublicationDate
                        ).format('DD-MM-YYYY ')}
                        <span>Por </span>
                        <span>{highlight.node.author.name ?? ''}</span>
                      </Typography>
                    </Grid>
                  </Grid>
                </Link>
              </CardActionArea>
            </Grid>
            <Grid item md={3} xs={12}>
              <Hidden smDown>
                <Grid container direction="column" spacing={5}>
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
        <Box my={4}>
          <Grid container spacing={6}>
            <Grid item md={9} xs={12}>
              <Box>
                <Grid container spacing={5}>
                  {posts &&
                    posts.map(post => (
                      <Grid key={post.node.title} item xs={12} md={4}>
                        <Card className={classes.postCard}>
                          <CardActionArea className={classes.postCard}>
                            <Link
                              href={`posts/${post.node._meta.uid}`}
                              underline="none"
                            >
                              <CardHeader
                                avatar={
                                  <Avatar
                                    alt={post.node.author.avatar.alt ?? ''}
                                    src={post.node.author.avatar.url ?? ''}
                                  />
                                }
                                title={post.node.author.name ?? ''}
                                subheader={moment(
                                  post.node._meta.firstPublicationDate
                                ).format('DD-MM-YYYY ')}
                              />
                              <CardMedia
                                className={classes.mediaPost}
                                image={post.node.thumbnail.url}
                                title={post.node.thumbnail.alt}
                              />
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  align="center"
                                >
                                  {post.node.title}
                                </Typography>
                                <Typography
                                  gutterBottom
                                  align="center"
                                  variant="subtitle2"
                                >
                                  {post.node.subtitle}
                                </Typography>
                                <Grid
                                  container
                                  justify="center"
                                  alignItems="center"
                                  alignContent="center"
                                >
                                  {post.node._meta.tags &&
                                    post.node._meta.tags.map(tag => {
                                      return (
                                        <Box
                                          m={0.5}
                                          key={tag}
                                          alignItems="center"
                                        >
                                          <Chip label={tag} size="small" />
                                        </Box>
                                      );
                                    })}
                                </Grid>
                              </CardContent>
                            </Link>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
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
      <Footer />
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const posts = await fetchAPI(
    `
    query {
      allPosts(sortBy: meta_lastPublicationDate_DESC) {
        edges {
          node{
            _meta {
              uid,
              firstPublicationDate,
              tags,
            }
            title
            subtitle
            thumbnail
            content
            author {
              ... on Author{
                name
                avatar
              }
            }
          }
        }
      }
    }
  `,
    {}
  );

  const categories = await fetchAPI(
    `
    query {

      allCategorys(sortBy: meta_lastPublicationDate_DESC, first: 4){
        edges {
          node {
            name
          }
        }
      }
    }
  `,
    {}
  );

  return {
    props: {
      posts: posts.allPosts.edges,
      categories: categories.allCategorys.edges
    }
  };
}
