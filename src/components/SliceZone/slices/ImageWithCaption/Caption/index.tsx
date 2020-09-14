import { Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    imageCaption: {
      display: 'block',
      textAlign: 'center',
      fontStyle: 'italic',
      fontSize: '14px',
      color: 'rgb(148, 148, 148)'
    }
  })
);

/**
 * Image caption component
 */
const Caption = ({ caption }) => {
  const classes = useStyles();
  if (caption !== '') {
    return (
      <Typography align="center" className={classes.imageCaption}>
        {caption}
      </Typography>
    );
  }

  return null;
};

export default Caption;
