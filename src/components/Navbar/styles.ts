import { makeStyles, createStyles } from '@material-ui/core/styles';

export default makeStyles(theme =>
  createStyles({
    groupLink: {
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },

    link: {
      textTransform: 'uppercase',
      color: '#000000',
    },
  }),
);
