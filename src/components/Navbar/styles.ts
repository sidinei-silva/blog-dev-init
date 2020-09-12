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
    title: {
      marginLeft: theme.spacing(2),
      flex: 1
    },
    mediaPost: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    }
  })
);
