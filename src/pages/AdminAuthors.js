import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MaterialTable from "material-table";

import CreateauthorModal from "../components/modals/CreateAuthorModal";
import { deleteAuthor, getAuthors, updateAuthor } from "../actions/authorsAction";
import { AddBox } from "@material-ui/icons";
import {tableIcons} from "../utils/tableIcons"
import { Avatar, makeStyles, Typography } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import Page from "../components/Page";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
    width: 140,
    backgroundColor: red[500],
  },
});

const AdminAuthors = () => {
  const classes = useStyles();

  const {isLoading} = useSelector((state) => state.auth);
  const [authorRows, setAuthorRows] = useState([]);
  const [createAuthorOpen, setCreateAuthorOpen] = useState(false);
  const [uploadedImageError, setUploadedImageError] = useState("");

  let imageToUpdate = null;

  function setImageToUpdate(v) {
    imageToUpdate = v;
  }

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
        setImageToUpdate(uploadedFile);
    }
  }

  const columns = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Image",
      field: "image",
      render: (rowData) => (
        <Avatar
          className={classes.media}
          alt={rowData.name}
          src={`${process.env.REACT_APP_PORT_NUMBER}images/authors/${rowData.imageName}`}
          aria-label="recipe"
        />
      ),
      editComponent: ({value}) => {
        return (
          <>
            <input
              id="upload-image-file"
              name="upload-image-file"
              type="file"
              onChange={(e) => handleUploadFile(e)}
            />
            <Typography color="error">{uploadedImageError}</Typography>
          </>
        );
      }
    },
  ];

  async function initAuthors() {
    getAuthors()
      .then((authors) => {
            const rows = authors
                ? authors.map((author) => {
                    return {
                        id: author.id,
                        name: author.name,
                        imageName: author.imageName,
                    };
                    })
                : [];
            setAuthorRows(rows);
      });
  }
  useEffect(() => {
    initAuthors();
  }, [isLoading]);

  const handleCreateAuthorOpen = () => {
    setCreateAuthorOpen(true);
  };

  const handleCreateAuthorClose = () => {
    setCreateAuthorOpen(false);
  };

  const handleUpdateAuthor = async (newData) => {
    const updateAuthorPayload = {
      id: newData.id,
      name: newData.name,
      image: imageToUpdate,
    };

    await updateAuthor(updateAuthorPayload);
    initAuthors();
  };

  const handleDeleteAuthor = async (oldData) => {
    await deleteAuthor(oldData.id);
    initAuthors();
  };

  return (
    <Page>
      <MaterialTable
          icons={tableIcons}
        title="Manage authors"
        columns={columns}
        data={authorRows}
        actions={
          [
            {
              icon: () => <AddBox />,
              tooltip: "my tooltip",
              position: "toolbar",
              onClick: () => {
                handleCreateAuthorOpen();
              },
            },
          ]
        }
        editable={{
          onRowUpdate: (newData) => handleUpdateAuthor(newData),
          onRowDelete: (oldData) => handleDeleteAuthor(oldData),
        }}
        options={{
          search: false,
          actionsColumnIndex: -1,
          pageSize: 20,
          pageSizeOptions: [20, 50],
          maxBodyHeight: "75vh",
        }}
      />
      <CreateauthorModal
        initAuthors={initAuthors}
        open={createAuthorOpen}
        onClose={handleCreateAuthorClose}
        aria-labelledby="create-author-modal"
        aria-describedby="create-author-modal"
      />
    </Page>
  );
};

export default AdminAuthors;