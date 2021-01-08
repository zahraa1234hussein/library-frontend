import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Grid } from "@material-ui/core";
import { BookDetailsDialog } from './modals/BookDetailsDialog';
import { createBookClient, getBookClient } from '../actions/bookClientsAction';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

const BookItem = ({book, initBooks}) => {
  const classes = useStyles();
	const history = useHistory();
  const {user} = useSelector((state) => state.auth);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const handleModalOpen = () => {
      setIsDetailsDialogOpen(true);
  };
  async function downloadPdf() {
    createBookClient(book.id);
    initBooks();
  }

  async function handlePayment() {
    const createBookClientResp = await getBookClient(book.id);
    if (createBookClientResp) {
      downloadPdf();
    }else {history.push(`/payment/${book.id}`)}
  }

  return (
    <Grid item key={book.title} xs={4}>
        <Card className={classes.root}>
            <CardHeader
                avatar={
                  <Avatar
                    alt={book.authors[0]?.name}
                    src={book.authors[0] && `${process.env.REACT_APP_PORT_NUMBER}images/authors/${book.authors[0].imageName}`}
                    aria-label="recipe"
                    className={classes.avatar}
                  />
                }
                action={
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: isDetailsDialogOpen,
                        })}
                        onClick={handleModalOpen}
                        aria-expanded={isDetailsDialogOpen}
                        aria-label="show more"
                    >
                        <MoreVertIcon />
                    </IconButton>
                }
                title={book.title}
                subheader={`Publish Date: ${moment(new Date(book.publishDate)).format('YYYY/MM/DD')}`}
            />
            <CardMedia
                className={classes.media}
                image={`${process.env.REACT_APP_PORT_NUMBER}images/books/${book.imageName}`}
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {book.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                { book.price !==0 ?
                  (
                    <>
                      <AttachMoneyIcon /> {book.price}
                    </>
                  ) : (
                    <>
                      <MoneyOffIcon /> 
                      <Typography variant="body2" color="primary" component="p">Free</Typography>
                    </>
                  )
                }
                <Typography
                  className={clsx(classes.expand)}
                  variant="body2"
                  color="textSecondary" 
                  component="p"
                >
                  {book.downloads}
                </Typography>
                { user.userType === "CLIENT" && !book.isProhibited && book.price === 0 ? (
                    <IconButton
                      aria-label="Download Pdf"
                      onClick={downloadPdf}
                    >
                        <GetAppIcon />
                    </IconButton>
                  ) : 
                    user.userType === "CLIENT" && !book.isProhibited && book.price !== 0 ? (
                      <IconButton
                        aria-label="Download Pdf"
                        onClick={handlePayment}
                      >
                          <GetAppIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="Download Pdf"
                        disabled
                      >
                          <GetAppIcon />
                      </IconButton>
                    )
                }
            </CardActions>
        </Card>
        <BookDetailsDialog
            book={book}
            open={isDetailsDialogOpen}
            handleClose={() => {
                setIsDetailsDialogOpen(false);
            }}
        />
    </Grid>
  );
}

export default BookItem;