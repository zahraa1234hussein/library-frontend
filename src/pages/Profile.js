import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Grid } from "@material-ui/core";
import EditProfileModal from '../components/modals/EditProfileModal';
import { useSelector } from 'react-redux';
import Page from '../components/Page';

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

const Profile = () => {
  const classes = useStyles();
  const {user} = useSelector((state) => state.auth);
  const [isOpen, setOpen] = useState(false);

  const handleEditModalOpen = () => {
      setOpen(true);
  };
  console.log("user", user)

  return (
    <Page>
        <Grid container alignItems="center" alignContent="center" justify="center">
                <Card className={classes.root}>
                    <CardHeader
                        action={ user.userType.localeCompare("CLIENT") === 0 &&
                            (<IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: isOpen,
                                })}
                                onClick={handleEditModalOpen}
                                aria-expanded={isOpen}
                                aria-label="show more"
                            >
                                <EditIcon />
                            </IconButton>)
                        }
                        title={user.name}
                        subheader={user.email}
                    />
                    {user.phoneNumber && 
                        (<CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                            Phone number: {user.phoneNumber}
                            </Typography>
                        </CardContent>)
                    }
                </Card>
                <EditProfileModal
                    user={user}
                    open={isOpen}
                    onClose={() => {
                        setOpen(false);
                    }}
                />
        </Grid>
    </Page>
  );
}

export default Profile;