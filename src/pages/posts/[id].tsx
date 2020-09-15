import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Typography
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { GitHub, Email, LinkedIn } from '@material-ui/icons';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import moment from 'moment';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import React from 'react';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import SliceZone from '../../components/SliceZone';
import DefaultImage from '../../components/SliceZone/slices/ImageWithCaption/DefaultImage';
import { fetchAPI } from '../../lib/api-prismic';

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
    content: RichTextBlock[];
    author: {
      name: string;
      linkgithub: string;
      linklinkedin: string;
      avatar: {
        url: string;
        alt: string;
      };
    };
  };
}

interface PostProps {
  post: Post;
  categories: [];
  posts: Post[];
}

const useStyles = makeStyles(theme =>
  createStyles({
    postCard: {
      minHeight: '100%'
    },
    mediaPost: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    },

    avatarAuthor: {
      width: '80px',
      height: '80px',
      backgroundColor: '#112D4E'
    },
    titlePost: {
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        marginBottom: '15px'
      }
    }
  })
);

const Post: React.FC<PostProps> = ({ post, categories, posts }) => {
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>Dev-init | {post.node.title}</title>
      </Head>
      <Header />
      <Navbar categories={categories} />
      <Container maxWidth="md">
        <Box alignItems="center" mt={5}>
          <Grid container spacing={1}>
            <Grid item>
              <Typography variant="button" color="textSecondary">
                <ArrowBackIcon />
              </Typography>
            </Grid>
            <Grid item>
              <Link href="/">
                <Typography variant="button" color="textSecondary">
                  voltar para lista
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Grid item xs={12}>
          <Box>
            <DefaultImage
              imageUrl={post.node.thumbnail.url}
              caption={post.node.thumbnail.alt}
            />
          </Box>
        </Grid>

        <Divider />
        <Box my={3} className="authorInfo">
          <Grid
            container
            justify="space-between"
            spacing={2}
            alignItems="center"
          >
            <Grid item md={8} xs={12}>
              <Box className={classes.titlePost}>
                <Typography variant="h3">{post.node.title}</Typography>
                <Typography variant="h6" color="textSecondary">
                  {post.node.subtitle}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4} xs={12}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Avatar
                    className={classes.avatarAuthor}
                    alt={post.node.author.avatar.alt ?? ''}
                    src={post.node.author.avatar.url ?? ''}
                  />
                </Grid>
                <Grid item>
                  <Grid container>
                    <Grid item>
                      <Typography variant="h6">
                        {post.node.author.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <span>Publicado em: </span>
                        <b>
                          {moment(post.node._meta.firstPublicationDate).format(
                            'DD-MM-YYYY '
                          )}
                        </b>
                      </Typography>
                      <Box mt={0.5}>
                        <Grid container alignItems="center">
                          <Link
                            target="_blank"
                            href={post.node.author.linkgithub || '/'}
                          >
                            <GitHub fontSize="small" />
                          </Link>
                          <Link
                            target="_blank"
                            href={post.node.author.linklinkedin || '/'}
                          >
                            <LinkedIn />
                          </Link>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box my={4}>
          <SliceZone content={post.node.content} />
        </Box>
        <Divider />
        <Box py={3}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Avatar
                className={classes.avatarAuthor}
                alt={post.node.author.avatar.alt ?? ''}
                src={post.node.author.avatar.url ?? ''}
              />
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  <Typography variant="subtitle1">Escrito por</Typography>
                  <Typography variant="h6">{post.node.author.name}</Typography>
                  <Typography variant="body2">
                    {moment(post.node._meta.firstPublicationDate).format(
                      'DD-MM-YYYY '
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box py={3} mt={3}>
          <Typography variant="h5">Ver mais</Typography>
        </Box>
        <Box py={3}>
          <Grid container spacing={4}>
            {posts &&
              posts.map(postLoop => (
                <Grid key={postLoop.node.title} item xs={12} md={4}>
                  <Card className={classes.postCard}>
                    <CardActionArea className={classes.postCard}>
                      <Link
                        href={`/posts/${postLoop.node._meta.uid}`}
                        underline="none"
                      >
                        <CardHeader
                          avatar={
                            <Avatar
                              alt={postLoop.node.author.avatar.alt ?? ''}
                              src={postLoop.node.author.avatar.url ?? ''}
                            />
                          }
                          title={postLoop.node.author.name ?? ''}
                          subheader={moment(
                            postLoop.node._meta.firstPublicationDate
                          ).format('DD-MM-YYYY ')}
                        />
                        <CardMedia
                          className={classes.mediaPost}
                          image={postLoop.node.thumbnail.url}
                          title={postLoop.node.thumbnail.alt}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" align="center">
                            {postLoop.node.title}
                          </Typography>
                          <Typography
                            gutterBottom
                            align="center"
                            variant="subtitle2"
                          >
                            {postLoop.node.subtitle}
                          </Typography>
                          <Grid
                            container
                            justify="center"
                            alignItems="center"
                            alignContent="center"
                          >
                            {postLoop.node._meta.tags &&
                              postLoop.node._meta.tags.map(tag => {
                                return (
                                  <Box m={0.5} key={tag} alignItems="center">
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
      </Container>
    </>
  );
};

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const post = await fetchAPI(
    `
    query($slug: String!, $lang: String!) {
      allPosts(uid: $slug, lang: $lang, first: 1) {
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
                linkgithub
                linklinkedin
              }
            }
          }
        }
      }

    }
  `,
    {
      slug: ctx.params.id,
      lang: 'pt-br'
    }
  );

  const posts = await fetchAPI(
    `
    query {
      allPosts(sortBy: meta_lastPublicationDate_DESC, first: 3) {
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
      post: post.allPosts.edges[0],
      categories: categories.allCategorys.edges,
      posts: posts.allPosts.edges
    },
    revalidate: 1
  };
}

export async function getStaticPaths() {
  const {
    allPosts: { edges }
  } = await fetchAPI(
    `
    query {
      allPosts {
        edges {
          node {
            _meta {
              uid
            }
          }
        }
      }
    }
  `,
    {}
  );

  return {
    paths: edges.map(({ node }) => `/posts/${node._meta.uid}`) || [],
    fallback: true
  };
}

export default Post;
