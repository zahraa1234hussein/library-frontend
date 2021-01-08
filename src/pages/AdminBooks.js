import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MaterialTable from "material-table";

import CreatebookModal from "../components/modals/CreateBookModal";
import { deleteBook, getBooks, updateBook } from "../actions/booksAction";
import { AddBox } from "@material-ui/icons";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import GetAppIcon from '@material-ui/icons/GetApp';
import {tableIcons} from "../utils/tableIcons"
import { CardMedia, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, TextField, Typography } from "@material-ui/core";
import Page from "../components/Page";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import { getPublishers } from "../actions/publishersAction";
import { getSeries } from "../actions/seriesAction";
import { getLanguages } from "../actions/languagesAction";
import { getCategories } from "../actions/categoriesAction";
import { getAuthors } from "../actions/authorsAction";
import { createBookClient } from "../actions/bookClientsAction";
import DownloadsDetails from "../components/DownloadsDetails";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const ItemsList = ({ items }) => {
  return (
    <List dense>
      {items.map((item) => (
        <ListItem key={item.id}>
          <ListItemIcon>
            <ArrowRightIcon />
          </ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </List>
  );
};

const AdminBooks = () => {
  const classes = useStyles();

  const {isLoading} = useSelector((state) => state.auth);
  const [bookRows, setBookRows] = useState([]);
  const [createBookOpen, setCreateBookOpen] = useState(false);
  const [publishers, setPublishers] = useState([]);
  const [series, setSeries] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [uploadedImageError, setUploadedImageError] = useState("");
  const [uploadedPdfError, setUploadedPdfError] = useState("");

  let isProhibitedToUpdate = false;
  let languageToUpdate;
  let serieToUpdate;
  let publisherToUpdate;
  let authorsToUpdate = [];
  let categoriesToUpdate = [];
  let imageToUpdate = null;
  let pdfToUpdate = null;

  function setIsProhibitedToUpdate(v) {
    isProhibitedToUpdate = v;
  }
  function setCategoriesToUpdate(v) {
    categoriesToUpdate = v;
  }
  function setAuthorsToUpdate(v) {
    authorsToUpdate = v;
  }
  function setPublisherToUpdate(v) {
    publisherToUpdate = v;
  }
  function setSerieToUpdate(v) {
    serieToUpdate = v;
  }
  function setLanguageToUpdate(v) {
    languageToUpdate = v;
  }
  function setImageToUpdate(v) {
    imageToUpdate = v;
  }
  function setPdfToUpdate(v) {
    pdfToUpdate = v;
  }

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
  async function initCategories() {
    getCategories()
      .then((categoriesRes) => {
        setCategories(categoriesRes);
      });
  }
  async function initAuthors() {
    getAuthors()
      .then((authorsRes) => {
        setAuthors(authorsRes);
      });
  }
  useEffect(() => {
    initPublishers();
    initSeries();
    initLanguages();
    initCategories();
    initAuthors();
  }, [isLoading]);

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
        setImageToUpdate(uploadedFile);
      }
      if(key === "PDF") {
        setUploadedPdfError("");
        setPdfToUpdate(uploadedFile);
      }
    }
  }

  const columns = [
    {
      title: "Title",
      field: "title",
      editable: "onUpdate",
      validate: (rowData) =>
        (rowData.title && rowData.title.length > 1) ||
        "title should be be at least 2 characters",
    },
    {
      title: "Description",
      field: "description",
      editable: "onUpdate",
      validate: (rowData) =>
        (rowData.description && rowData.description.length > 1) ||
        "description should be be at least 2 characters",
    },
    {
      title: "Publisher",
      field: "publisher",
      editable: "onUpdate",
      render: (rowData) => (
        <span>{rowData.publisher.name}</span>
      ),
      editComponent: ({value}) => {
        return (
        <Autocomplete
          id="checkboxes-publisher"
          options={publishers}
          defaultValue={value}
          onChange={(e, v) => {
            setPublisherToUpdate(v)
          }}
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) => option.id === value.id}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="publisher" />
          )}
        />
      )},
    },
    {
      title: "Series",
      field: "serie",
      editable: "onUpdate",
      render: (rowData) => (
        <span>{rowData.serie?.name}</span>
      ),
      editComponent: ({value}) => {
        return (
        <Autocomplete
          id="checkboxes-serie"
          options={series}
          defaultValue={value}
          onChange={(e, v) => {
            setSerieToUpdate(v)
          }}
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) => option.id === value.id}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="series" />
          )}
        />
      )},
    },
    {
      title: "Language",
      field: "language",
      editable: "onUpdate",
      render: (rowData) => (
        <span>{rowData.language.name}</span>
      ),
      editComponent: ({value}) => {
        return (
        <Autocomplete
          id="checkboxes-language"
          options={languages}
          defaultValue={value}
          onChange={(e, v) => {
            setLanguageToUpdate(v)
          }}
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) => option.id === value.id}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="language" />
          )}
        />
      )},
    },
    {
      title: "Publish Date",
      field: "publishDate",
      editable: "onUpdate",
      type: 'datetime'
    },
    {
      title: "Price",
      field: "price",
      editable: "onUpdate",
      type: 'numeric'
    },
    {
      title: "Number of chapters",
      field: "chapters",
      editable: "onUpdate",
      type: 'numeric'
    },
    {
      title: "Number of pages",
      field: "pages",
      editable: "onUpdate",
      type: 'numeric'
    },
    {
      title: "Prohibited",
      field: "isProhibited",
      editable: "onUpdate",
      render: (rowData) => (
        rowData.isProhibited ? "True" : "False"
      ),
      editComponent: ({value}) => {
        return (
          <Autocomplete
            id="checkboxes-isProhibited"
            options={[{id:1, name: "True", value: true},{id: 0, name: "False", value: false}]}
            defaultValue={value === 1 ? {id:1, name: "True", value: true} : {id: 0, name: "False", value: false}}
            onChange={(e, v) => {
              setIsProhibitedToUpdate(v?.value)
            }}
            getOptionLabel={(option) => option.name}
            getOptionSelected={(option, value) => option.id === value.id}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="isProhibited" />
            )}
          />
        )
      }
    },
    {
      title: "Downloads",
      field: "downloads",
      editable: "never",
    },
    {
      title: "Image",
      field: "image",
      editable: "onUpdate",
      render: (rowData) => (
        <CardMedia
          className={classes.media}
          image={`${process.env.REACT_APP_PORT_NUMBER}images/books/${rowData.imageName}`}
          title={rowData.title}
        />
      ),
      editComponent: ({value}) => {
        return (
          <>
            <input
              id="upload-image-file"
              name="upload-image-file"
              type="file"
              onChange={(e) => handleUploadFile(e, "IMAGE")}
            />
            <Typography color="error">{uploadedImageError}</Typography>
          </>
        );
      }
    },
    {
      title: "Pdf",
      field: "pdf",
      editable: "onUpdate",
      render: (rowData) => (
        <>
          <IconButton
          aria-label="Download Pdf"
          onClick={() => {
            createBookClient(rowData.id)
          }}
          >
              <GetAppIcon />
          </IconButton>
          {rowData.pdfName}
        </>
      ),
      editComponent: ({value}) => {
        return (
          <>  
            <input
              id="upload-pdf-file"
              name="upload-pdf-file"
              type="file"
              onChange={(e) => handleUploadFile(e, "PDF")}
            />
            <Typography color="error">{uploadedPdfError}</Typography>
          </>
        );
      }
    },
    {
      title: "Authors",
      field: "authors",
      editable: "onUpdate",
      render: (rowData) => (
        <ItemsList items={rowData.authors} />
      ),
      editComponent: ({value}) => {
        return (
        <Autocomplete
          multiple
          id="checkboxes-authors"
          options={authors}
          disableCloseOnSelect
          defaultValue={value}
          onChange={(e, v) => {
            setAuthorsToUpdate(v)
          }}
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) => option.id === value.id}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="authors" />
          )}
        />
      )},
    },
    {
      title: "Categories",
      field: "categories",
      editable: "onUpdate",
      render: (rowData) => (
        <ItemsList items={rowData.categories} />
      ),
      editComponent: ({value}) => {
        return (
        <Autocomplete
          multiple
          id="checkboxes-categories"
          options={categories}
          disableCloseOnSelect
          defaultValue={value}
          onChange={(e, v) => {
            setCategoriesToUpdate(v)
          }}
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) => option.id === value.id}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="categories" />
          )}
        />
      )},
    },
  ];

  async function initBooks() {
    getBooks()
      .then((books) => {
          const rows = books
            ? books.map((book) => {
                return {
                  id: book.id,
                  publisher: book.publisher,
                  serie: book.serie,
                  language: book.language,
                  title: book.title,
                  description: book.description,
                  publishDate: book.publishDate,
                  price: book.price,
                  chapters: book.chapters,
                  pages: book.pages,
                  isProhibited: book.isProhibited,
                  downloads: book.downloads,
                  imageName: book.imageName,
                  pdfName: book.pdfName,
                  authors: book.authors,
                  categories: book.categories,
                  downloadsDetails: book.downloadsDetails,
                };
                })
            : [];
          setBookRows(rows);
      });
  }
  useEffect(() => {
    initBooks();
  }, [isLoading]);

  const handleCreateBookOpen = () => {
    setCreateBookOpen(true);
  };

  const handleCreateBookClose = () => {
    setCreateBookOpen(false);
  };

  const handleUpdateBook = async (newData) => {
    console.log("newData", newData);
    const updateBookPayload = {
      id: newData.id,
      title: newData.title,
      description: newData.description,
      pages: newData.pages,
      chapters: newData.chapters,
      isProhibited: isProhibitedToUpdate ? isProhibitedToUpdate : newData.isProhibited,
      price: newData.price,
      publishDate: newData.publishDate,
      publisher_id: publisherToUpdate ? publisherToUpdate.id : newData.publisher.id,
      language_id: languageToUpdate ? languageToUpdate.id : newData.language.id,
      serie_id: serieToUpdate ? serieToUpdate.id : newData.serie?.id,
      categories: categoriesToUpdate.length > 0 ? categoriesToUpdate : newData.categories,
      authors: authorsToUpdate.length > 0 ? authorsToUpdate : newData.authors,
      image: imageToUpdate,
      pdf: pdfToUpdate,
    };

    await updateBook(updateBookPayload);
    initBooks();
  };

  const handleDeletebook = async (oldData) => {
    await deleteBook(oldData.id);
    initBooks();
  };

  return (
    <Page>
      <MaterialTable
        icons={tableIcons}
        title="Manage books"
        columns={columns}
        data={bookRows}
        actions={
          [
            {
              icon: () => <AddBox />,
              tooltip: "create new book",
              position: "toolbar",
              onClick: () => {
                handleCreateBookOpen();
              },
            },
          ]
        }
        editable={{
          onRowUpdate: (newData) => handleUpdateBook(newData),
          onRowDelete: (oldData) => handleDeletebook(oldData),
        }}
        options={{
          actionsColumnIndex: -1,
          pageSize: 20,
          pageSizeOptions: [20, 50],
          maxBodyHeight: "75vh",
        }}
        detailPanel={(rowData) => {
          return <DownloadsDetails downloadsDetails={rowData.downloadsDetails} />;
        }}
      />
      <CreatebookModal
        initBooks={initBooks}
        open={createBookOpen}
        onClose={handleCreateBookClose}
        aria-labelledby="create-user-modal"
        aria-describedby="create-user-modal"
      />
    </Page>
  );
};

export default AdminBooks;