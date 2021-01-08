import React, { memo, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";

import { createAuthor } from "../../actions/authorsAction";
import { CardContent, Dialog } from "@material-ui/core";
import AuthorForm from "../forms/AuthorForm";

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

const CreateAuthorModal = memo(({ initAuthors, open, onClose }) => {
  const classes = useStyles();

  const initialState = {
    name: "",
    image: null,
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
        image: state.image,
    };
    handleFormClose();
    try {
      const status = await createAuthor(payload);
      if (status === 201) {
        alert("Author successfully created")
        initAuthors();
      }
    } catch (error) {
      alert("Failed to create author")
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
                    <AddBoxIcon /> Create Author
                </h2>
                <form onSubmit={handleSubmit(saveClickHandler)}>
                    <AuthorForm
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

export default CreateAuthorModal;