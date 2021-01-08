import React, { memo, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";

import { createLanguage } from "../../actions/languagesAction";
import { CardContent, Dialog } from "@material-ui/core";
import LanguageForm from "../forms/LanguageForm";

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

const CreateLanguageModal = memo(({ initLanguages, open, onClose }) => {
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
      const status = await createLanguage(payload);
      if (status === 201) {
        alert("Language successfully created")
        initLanguages();
      }
    } catch (error) {
      alert("Failed to create language")
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
                    <AddBoxIcon /> Create Language
                </h2>
                <form onSubmit={handleSubmit(saveClickHandler)}>
                    <LanguageForm
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

export default CreateLanguageModal;