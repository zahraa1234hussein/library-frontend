import React, { memo, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const SerieForm = memo((props) => {
  const { state, setState } = props;

  const handleChange = (event) => {
    setState({ ...state, [event.target.id]: event.target.value });
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <TextField
                required
                id="name"
                name="name"
                defaultValue={state.name}
                title="name"
                label="name"
                fullWidth
                onChange={handleChange}
            />
        </Grid>
      </Grid>
    </div>
  );
});

export default SerieForm;