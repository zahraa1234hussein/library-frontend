import React, { memo, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";

import { updateClient } from "../../actions/clientAction";
import { CardContent, Dialog } from "@material-ui/core";
import ClientForm from "../forms/ClientForm";

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

const EditProfileModal = memo(({ user, open, onClose }) => {
  const classes = useStyles();

  const initialState = {
    name: user.name,
    phoneNumber: user?.phoneNumber ? user.phoneNumber : "",
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
        phoneNumber: state.phoneNumber,
    };
    handleFormClose();
    try {
      const status = await updateClient(payload);
      if (status === 200) {
        alert("Client successfully updated")
      }
    } catch (error) {
      alert("Failed to update client")
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
                    <AddBoxIcon /> Update Client
                </h2>
                <form onSubmit={handleSubmit(saveClickHandler)}>
                    <ClientForm
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

export default EditProfileModal;