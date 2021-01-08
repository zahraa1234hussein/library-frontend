import React, { memo, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";

import { createSerie } from "../../actions/seriesAction";
import { CardContent, Dialog } from "@material-ui/core";
import SerieForm from "../forms/SerieForm";

const useStyles = makeStyles((theme) =>
  createStyles({
    buttons: {
      display: "flex",
      justifyContent: "flex-end",
    },
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

const CreateSerieModal = memo(({ initSeries, open, onClose }) => {
  const classes = useStyles();

  const initialState = {
    name: "",
  };
  const [state, setState] = useState(initialState);

  const { handleSubmit } = useForm();

  const handleFormClose = () => {
    setState(initialState);
    onClose();
  };

  const saveClickHandler = async () => {
    const payload = {
        name: state.name,
    };
    handleFormClose();
    try {
      const status = await createSerie(payload);
      if (status === 201) {
        alert("Serie successfully created")
        initSeries();
      }
    } catch (error) {
      alert("Failed to create serie")
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleFormClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <CardContent>
            <div className={classes.root}>
                <h2 id="simple-modal-title">
                    <AddBoxIcon /> Create Serie
                </h2>
                <form onSubmit={handleSubmit(saveClickHandler)}>
                    <SerieForm
                        state={state}
                        setState={setState}
                    />
                    <div className={classes.buttons}>
                    <Button type="submit" variant="contained" color="primary">
                        Save
                    </Button>
                    </div>
                </form>
            </div>
        </CardContent>
      </Dialog>
    </div>
  );
});

export default CreateSerieModal;