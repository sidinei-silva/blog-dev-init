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
  Link,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles(() =>
  createStyles({
    imgThumbnail: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    postCard: {
      minHeight: '100%',
    },
    mediaPost: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    avatar: {
      backgroundColor: '#112D4E',
    },
    authorCardHeader: {
      padding: 0,
    },
    postCardHeader: {
      padding: '16px',
    },
  }),
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
        <Box my={3} className="authorInfo">
          <Grid
            container
            justify="space-between"
            spacing={2}
            alignItems="center"
          >
            <Grid item md={10} xs={12}>
              <Typography variant="h3">{post.node.title}</Typography>
              <Typography variant="h6">{post.node.subtitle}</Typography>
            </Grid>
            <Grid item md={2} xs={12}>
              <CardHeader
                className={classes.authorCardHeader}
                avatar={
                  <Avatar
                    alt={post.node.author.avatar.alt ?? ''}
                    src={post.node.author.avatar.url ?? ''}
                  />
                }
                title={post.node.author.name ?? ''}
                subheader={moment(post.node._meta.firstPublicationDate).format(
                  'DD-MM-YYYY '
                )}
              />
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Grid item xs={12}>
          <Box py={2}>
            <DefaultImage
              imageUrl={post.node.thumbnail.url}
              caption={post.node.thumbnail.alt}
            />
          </Box>
        </Grid>
        <Box my={4}>
          <SliceZone content={post.node.content} />
        </Box>
        <Divider />
        <Box py={3}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Avatar
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
                      'DD-MM-YYYY ',
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
          <Grid container spacing={5}>
            {posts &&
              posts.map(postLoop => (
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
                            post.node._meta.firstPublicationDate,
                          ).format('DD-MM-YYYY ')}
                        />
                        <CardMedia
                          className={classes.mediaPost}
                          image={post.node.thumbnail.url}
                          title={post.node.thumbnail.alt}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" align="center">
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
              }
            }
          }
        }
      }

    }
  `,
    {
      slug: ctx.params.id,
      lang: 'pt-br',
    },
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
    {},
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
    {},
  );

  return {
    props: {
      post: post.allPosts.edges[0],
      categories: categories.allCategorys.edges,
      posts: posts.allPosts.edges,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const {
    allPosts: { edges },
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
    {},
  );

  return {
    paths: edges.map(({ node }) => `/posts/${node._meta.uid}`) || [],
    fallback: false,
  };
}

export default Post;
