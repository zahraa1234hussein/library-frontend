import React, { memo, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { Checkbox, InputLabel, Select, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getPublishers } from "../../actions/publishersAction";
import { getSeries } from "../../actions/seriesAction";
import { getLanguages } from "../../actions/languagesAction";
import moment from 'moment';

const BookForm = memo((props) => {
  const {isLoading} = useSelector((state) => state.auth);
  const { state, setState } = props;
  const [uploadedImageError, setUploadedImageError] = useState("");
  const [uploadedPdfError, setUploadedPdfError] = useState("");
  const [publishers, setPublishers] = useState([]);
  const [series, setSeries] = useState([]);
  const [languages, setLanguages] = useState([]);

  async function initPublishers() {
    getPublishers()
      .then((publishersRes) => {
        setPublishers(publishersRes);
      });
  }

  async function initSeries() {
    getSeries()
      .then((seriesRes) => {
        setSeries(seriesRes);
      });
  }
  
  async function initLanguages() {
    getLanguages()
      .then((languagesRes) => {
        setLanguages(languagesRes);
      });
  }

  useEffect(() => {
    initPublishers();
    initSeries();
    initLanguages();
  }, [isLoading]);

  const handleChange = (event) => {
    setState({ ...state, [event.target.id]: event.target.value });
  };

  function handleUploadFile(e, key) {
    const uploadedFile = e.target.files[0];

    const { type, size } = uploadedFile;
    const fileExtension = type.split("/").pop();
    let flag = true;
    if(key === "IMAGE") {
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
    } else {
      switch (fileExtension) {
        case "pdf":
          if (size > 20 * 1000 * 1000) {
            setUploadedPdfError(
              "the file size of type pdf should be maximum of 20MB"
            );
            flag = false;
            e.target.value = null;
          }
          break;
        default:
          setUploadedPdfError(
            "file type should be either pdf"
          );
          flag = false;
          e.target.value = null;
      }
    }
    

    if (uploadedFile && flag) {
      console.log(uploadedFile)
      if(key === "IMAGE") {
        setUploadedImageError("");
        setState({ ...state, image: uploadedFile });
      }
      if(key === "PDF") {
        setUploadedPdfError("");
        setState({ ...state, pdf: uploadedFile });
      }
    }
  }

  
  const TextInput = ({name, value, type, min}) => {
    return (
      <TextField
        required
        id={name}
        name={name}
        defaultValue={value}
        title={name}
        label={name}
        type={type}
        InputProps={{
          inputProps: { 
            min: min || undefined,
            step: type === "number" && name === "price" ? "0.01": undefined
          }
        }}
        fullWidth
        onChange={handleChange}
      />
    )
  }
  
  const SelectInput = ({options, value, name, id}) => {
    return (
      <>
        <InputLabel id="label">{name}</InputLabel>
        <Select
          required={name.localeCompare("series") === 0 ? false : true}
          native
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
        >
          {name.localeCompare("series") === 0 &&
            <option value="">
              None
            </option>
          }
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </Select>
      </>
    );
  }

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <TextInput name="title" value={state.title} type='text' />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput name="description" value={state.description} type='text' />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectInput name="publisher" value={state.publisher_id} id="publisher_id" options={publishers} />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectInput name="series" value={state.serie_id} id="serie_id" options={series} />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectInput name="languages" value={state.language_id} id="language_id" options={languages} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput name="price" value={state.price} type='number' min={0} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput name="chapters" value={state.chapters} type='number' min={1} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput name="pages" value={state.pages} type='number' min={1} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Checkbox
            id="isProhibited"
            name="isProhibited"
            checked={state.isProhibited}
            onChange={() => {
              setState({ ...state, isProhibited: !state.isProhibited });
            }}
            color="primary"
          />{" "}
          prohibited
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="publishDate"
            name="publishDate"
            required
            label="publish date"
            defaultValue={moment(state.publishDate).format("YYYY-MM-DD")}
            type="date"
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
            onChange={(e) => handleUploadFile(e, "IMAGE")}
          />
          <Typography color="error">{uploadedImageError}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel id="label">Pdf</InputLabel>
          <input
            required
            id="upload-pdf-file"
            name="upload-pdf-file"
            type="file"
            onChange={(e) => handleUploadFile(e, "PDF")}
          />
          <Typography color="error">{uploadedPdfError}</Typography>
        </Grid>
      </Grid>
    </div>
  );
});

export default BookForm;