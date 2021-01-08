import React, { memo, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { InputLabel, Typography } from "@material-ui/core";

const AuthorForm = memo((props) => {
  const { state, setState } = props;
  const [uploadedImageError, setUploadedImageError] = useState("");

  const handleChange = (event) => {
    setState({ ...state, [event.target.id]: event.target.value });
  };

  function handleUploadFile(e) {
    const uploadedFile = e.target.files[0];

    const { type, size } = uploadedFile;
    const fileExtension = type.split("/").pop();
    let flag = true;
    switch (fileExtension) {
        case "png":
        case "jpeg":
        case "jpg":
        if (size > 20 * 1000 * 1000) {
            setUploadedImageError(
            "the file size of type image should be maximum of 20MB"
            );
            flag = false;
            e.target.value = null;
        }
        break;
        default:
            setUploadedImageError(
                "file type should be image(png/jpg/jpeg)"
            );
            flag = false;
            e.target.value = null;
    }
    if (uploadedFile && flag) {
        setUploadedImageError("");
        setState({ ...state, image: uploadedFile });
    }
  }

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
        <Grid item xs={12} md={6}>
          <InputLabel id="label">Image</InputLabel>
          <input
            required
            id="upload-image-file"
            name="upload-image-file"
            type="file"
            onChange={handleUploadFile}
          />
          <Typography color="error">{uploadedImageError}</Typography>
        </Grid>
      </Grid>
    </div>
  );
});

export default AuthorForm;