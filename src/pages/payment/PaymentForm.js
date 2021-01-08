import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function PaymentForm({state, setState}) {

  
  const handleChange = (event) => {
    setState({ ...state, [event.target.id]: event.target.value });
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="nameOnCard"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            defaultValue={state.nameOnCard}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            defaultValue={state.cardNumber}
            type='number'
            onChange={handleChange}
            InputProps={{
              inputProps: { 
                min: 0,
              }
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="cardExDate"
            name="publishDate"
            required
            label="Expiry date"
            defaultValue={state.cardExDate}
            type="date"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardCvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            defaultValue={state.cardCvv}
            type='number'
            onChange={handleChange}
            InputProps={{
              inputProps: { 
                min: 0,
              }
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}