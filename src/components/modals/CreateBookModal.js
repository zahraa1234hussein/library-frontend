import React, { memo, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";

import { createBook } from "../../actions/booksAction";
import { CardContent, Dialog } from "@material-ui/core";
import BookForm from "../forms/BookForm";

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

const CreateBookModal = memo(({ initBooks, open, onClose }) => {
  const classes = useStyles();

  const initialState = {
    title: "",
    description: "",
    publisher_id: 1,
    serie_id: undefined,
    language_id: 1,
    price: 1,
    chapters: 1,
    pages: 1,
    isProhibited: false,
    publishDate: new Date(),
    image: null,
    pdf: null,
  };
  const [state, setState] = useState(initialState);

  const { handleSubmit } = useForm();

  const handleFormClose = () => {
    setState(initialState);
    onClose();
  };

  const saveClickHandler = async () => {
    const date = new Date(state.publishDate);
    if (date.getTime() > Date.now()) {alert("Date/time should be smaller than current date/time")}
    else{
      const payload = {
          title: state.title,
          description: state.description,
          publisher_id: state.publisher_id,
          serie_id: state.serie_id,
          language_id: state.language_id,
          price: state.price,
          chapters: state.chapters,
          pages: state.pages,
          isProhibited: state.isProhibited,
          publishDate: state.publishDate,
          image: state.image,
          pdf: state.pdf,
      };
      handleFormClose();
      try {
        const status = await createBook(payload);
        if (status === 201) {
          alert("Book successfully created")
          initBooks();
        }
      } catch (error) {
        alert("Failed to create book")
      }
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
                <AddBoxIcon /> Create Book
            </h2>
            <form onSubmit={handleSubmit(saveClickHandler)}>
              <BookForm
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

export default CreateBookModal;