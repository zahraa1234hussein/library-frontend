import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MaterialTable from "material-table";

import CreatepublisherModal from "../components/modals/CreatePublisherModal";
import { deletePublisher, getPublishers, updatePublisher } from "../actions/publishersAction";
import { AddBox } from "@material-ui/icons";
import {tableIcons} from "../utils/tableIcons"
import Page from "../components/Page";

const AdminPublishers = () => {

  const {isLoading} = useSelector((state) => state.auth);
  const [publisherRows, setPublisherRows] = useState([]);
  const [createPublisherOpen, setCreatePublisherOpen] = useState(false);
  const columns = [
    {
      title: "Name",
      field: "name",
    },
  ];

  async function initPublishers() {
    getPublishers()
      .then((publishers) => {
            const rows = publishers
                ? publishers.map((publisher) => {
                    return {
                        id: publisher.id,
                        name: publisher.name,
                    };
                    })
                : [];
            setPublisherRows(rows);
      });
  }
  useEffect(() => {
    initPublishers();
  }, [isLoading]);

  const handleCreatepublisherOpen = () => {
    setCreatePublisherOpen(true);
  };

  const handleCreatepublisherClose = () => {
    setCreatePublisherOpen(false);
  };

  const handleUpdatePublisher = async (newData) => {
    console.log("newData", newData);
    const updatePublisherPayload = {
      id: newData.id,
      name: newData.name,
    };

    await updatePublisher(updatePublisherPayload);
    initPublishers();
  };

  const handleDeletepublisher = async (oldData) => {
    await deletePublisher(oldData.id);
    initPublishers();
  };

  return (
    <Page>
      <MaterialTable
          icons={tableIcons}
        title="Manage publishers"
        columns={columns}
        data={publisherRows}
        actions={
          [
            {
              icon: () => <AddBox />,
              tooltip: "my tooltip",
              position: "toolbar",
              onClick: () => {
                handleCreatepublisherOpen();
              },
            },
          ]
        }
        editable={{
          onRowUpdate: (newData) => handleUpdatePublisher(newData),
          onRowDelete: (oldData) => handleDeletepublisher(oldData),
        }}
        options={{
          search: false,
          actionsColumnIndex: -1,
          pageSize: 20,
          pageSizeOptions: [20, 50],
          maxBodyHeight: "75vh",
        }}
      />
      <CreatepublisherModal
        initPublishers={initPublishers}
        open={createPublisherOpen}
        onClose={handleCreatepublisherClose}
        aria-labelledby="create-publisher-modal"
        aria-describedby="create-publisher-modal"
      />
    </Page>
  );
};

export default AdminPublishers;