import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review({book, paymentInfo}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        <ListItem className={classes.listItem}>
          <ListItemText primary={book?.title} secondary={book?.description} />
          <Typography variant="body2">{book?.price}</Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>{paymentInfo.nameOnCard}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{paymentInfo.cardNumber}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{paymentInfo.cardCvv}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{paymentInfo.cardExDate}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}