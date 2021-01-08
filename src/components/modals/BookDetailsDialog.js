import React from "react";

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CardContent, Dialog, Typography } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export function BookDetailsDialog({ book, open, handleClose }) {
  const classes = useStyles();

  function FormRow({header, body}) {
    return (
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Typography paragraph component="h6" variant="h6">{header}</Typography>
          <Typography paragraph>
            {body}
          </Typography>
        </Paper>
      </Grid>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
        <CardContent>
          <div className={classes.root}>
            <Grid container spacing={1}>
              <FormRow header="Title" body={book.title}/>
              <FormRow header="Description" body={book.description}/>
              <FormRow header="Language" body={book.language.name}/>
              <FormRow header="Number of pages" body={book.pages}/>
              <FormRow header="Number of chapters" body={book.chapters}/>
              <FormRow header="number of downloads" body={book.downloads}/>
              <FormRow header="Price" body={book.price}/>
              <FormRow header="Series/ Collection" body={book.serie?.name}/>
              <FormRow header="Publisher" body={book.publisher.name}/>
              <FormRow header="Publish date" body={book.publishDate}/>
              <FormRow
                header="Authors" 
                body={
                  book.authors.map((data) => (
                      <Typography paragraph key={data.id}>
                        {data.name}
                      </Typography>
                  ))
                }
              />
            <FormRow
                header="Categories" 
                body={
                  book.categories.map((data) => (
                      <Typography paragraph key={data.id}>
                        {data.name}
                      </Typography>
                  ))
                }
              />
              { book.isProhibited ?
                <Grid>
                  <Paper className={classes.paper}>
                    <Typography paragraph>This book can't be downloaded</Typography>
                  </Paper>
                </Grid>
                :
                <></>
              }
            </Grid>
          </div>
        </CardContent>      
    </Dialog>
  );
}
