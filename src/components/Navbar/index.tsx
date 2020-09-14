/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Container,
  Typography,
  Box,
  Link,
  Divider,
  Slide,
  IconButton,
  Dialog,
  AppBar,
  Toolbar,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Grid,
  CardMedia,
  InputAdornment
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import moment from 'moment';
import Prismic from 'prismic-javascript';
import React, { useEffect } from 'react';

import { PrismicClient } from '../../lib/api-prismic';
import useStyles from './styles';

import 'moment/locale/pt-br';

moment.locale('pt-br');

interface Category {
  node: {
    name: string;
  };
}

interface NavbarProps {
  categories: Category[];
}

interface Post {
  uid: string;
  firstPublicationDate: string;
  tags: string[];

  data: {
    title: string;
    subtitle: string;
    thumbnail: {
      url: string;
      alt: string;
    };
    author: {
      slug: string;
    };
  };
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Navbar: React.FC<NavbarProps> = ({ categories }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [textSearch, setTextSearch] = React.useState('');
  const [posts, setPosts] = React.useState<Post[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTextSearch('');
    setPosts([]);
  };

  const getPosts = async () => {
    const response = await PrismicClient.query([
      Prismic.Predicates.at('document.type', 'post'),
      Prismic.Predicates.fulltext('document', textSearch)
    ]);

    console.log(response);

    setPosts(response.results || []);
  };

  useEffect(() => {
    if (textSearch.length > 0) getPosts();
    else setPosts([]);
  }, [textSearch]);

  return (
    <>
      <Container maxWidth="lg">
        <Box py={2}>
          <Toolbar>
            <Grid container alignItems="center" justify="space-between">
              <Grid item xs={12} md={11} className={classes.links}>
                <Typography className={classes.groupLink}>
                  <Link className={classes.link} href="/">
                    Home
                  </Link>
                  {categories &&
                    categories.map(category => (
                      <Link
                        key={category.node.name}
                        className={classes.link}
                        href="/"
                      >
                        {category.node.name}
                      </Link>
                    ))}
                </Typography>
              </Grid>
              <Grid item md xs={12} className={classes.searchButton}>
                <IconButton
                  aria-label="buscar"
                  color="primary"
                  component="span"
                  onClick={handleClickOpen}
                >
                  <SearchIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </Box>
        <Box mb={10}>
          <Divider variant="fullWidth" />
        </Box>
      </Container>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Buscar
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container>
          <Box py={4}>
            <TextField
              label="Buscar"
              placeholder="Buscar..."
              fullWidth
              value={textSearch}
              onChange={event => setTextSearch(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Limpar busca"
                      onClick={() => setTextSearch('')}
                      edge="start"
                    >
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Box>
        </Container>

        <List>
          {posts &&
            posts.map(post => (
              <Box key={post.uid}>
                <Link href={`/posts/${post.uid}`} underline="none">
                  <ListItem button>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item md={2} xs={12}>
                        <CardMedia
                          className={classes.mediaPost}
                          image={post.data.thumbnail.url}
                          title={post.data.thumbnail.alt}
                        />
                      </Grid>
                      <Grid item md={10} xs={12}>
                        <Grid container direction="column">
                          <Grid item>
                            <Typography variant="caption">
                              <span>Criado em </span>
                              {moment(post.firstPublicationDate).format(
                                'DD-MM-YYYY '
                              )}
                              <span>Por </span>
                              <span>{post.data.author.slug ?? ''}</span>
                            </Typography>
                          </Grid>
                          <Grid item>
                            <ListItemText
                              primary={post.data.title}
                              secondary={post.data.subtitle}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </ListItem>
                </Link>
                <Divider />
              </Box>
            ))}
        </List>
      </Dialog>
    </>
  );
};

export default Navbar;
