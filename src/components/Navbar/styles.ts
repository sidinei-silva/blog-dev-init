import { makeStyles, createStyles } from '@material-ui/core/styles';

export default makeStyles(theme =>
  createStyles({
    groupLink: {
      '& > * + *': {
        marginLeft: theme.spacing(2)
      }
    },

    link: {
      textTransform: 'uppercase',
      color: '#000000'
    },

    appBar: {
      position: 'relative'
    },
    mediaPost: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    },

    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },

    searchButton: {
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center'
      }
    },

    links: {
      order: 0,
      [theme.breakpoints.down('sm')]: {
        order: 1
      }
    }
  })
);
