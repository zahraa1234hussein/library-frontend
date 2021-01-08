import React, {useState} from 'react';
import {adminApprove} from '../actions/registerAction';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Page from '../components/Page';
const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
const [email, setEmail] = useState('');
const [message, setMessage] = useState('');
const [errorMessage, setErrorMessage] = useState('');

    async function approve() {
        const data = await adminApprove({email});
        if(data.message)setErrorMessage(data.message);
        if(data.data)setMessage("Admin approved successfully");
    }
  return (
    <Page>
        <Grid container alignItems="center" alignContent="center" justify="center">
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Make a Admin
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Typography color="primary">{message}</Typography>
                        <Typography color="error">{errorMessage}</Typography>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={approve}
                        >
                        Approve Admin
                        </Button>
                    </form>
                </div>
            </Grid>
        </Grid>
        
    </Page>
  );
}