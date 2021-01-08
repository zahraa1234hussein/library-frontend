import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useParams } from 'react-router-dom';
import { createBookClientWithPayment, getOrder } from '../../actions/bookClientsAction';
import { getBook } from '../../actions/booksAction';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function Checkout() {
  const classes = useStyles();
  const {isLoading} = useSelector((state) => state.auth);
  const {book_id} = useParams();
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = ['Payment details', 'Review your order'];

  const initialState = {
    cardNumber: undefined,
    cardCvv: undefined,
    cardExDate: undefined,
    nameOnCard: undefined,
  };
  const [state, setState] = useState(initialState);
  const [book, setBook] = useState();
  const [orderId, setOrderId] = useState();

  
  useEffect(() => {
    async function initBook() {
      getBook(book_id)
        .then((bookRes) => {
          setBook(bookRes);
        });
    }
    if (book_id) {
      initBook();
    }
  },[book_id, isLoading]);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PaymentForm state={state} setState={setState} />;
      case 1:
        return <Review book={book} paymentInfo={state}/>;
      default:
        throw new Error('Unknown step');
    }
  }
  async function createPayment() {
    const status = await createBookClientWithPayment(
      book_id, 
      { cardNumber: state.cardNumber, 
        cardCvv:state.cardCvv, 
        cardExDate:state.cardExDate, 
        nameOnCard:state.nameOnCard
    })
    console.log('status', status);
  }

  const handleNext = async () => {
    if(activeStep === steps.length - 1){
      createPayment();
      const orderRes = await getOrder(book_id)
      setActiveStep(activeStep + 1);
      setOrderId(orderRes.id)
    }
    if(activeStep === 0){
      let date;
      if(state.cardExDate ) date = new Date(state.cardExDate);
      if(state.nameOnCard && state.cardCvv && date && state.cardNumber){
        if(date.getTime() >= Date.now() && state.cardCvv > 0 && date && state.cardNumber > 0){
          setActiveStep(activeStep + 1);
        }else alert("Wrong info provided")
      }else alert("All inputs are obligatory")
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #{orderId}.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <div className={classes.buttons}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      </Paper>
    </main>
  );
}