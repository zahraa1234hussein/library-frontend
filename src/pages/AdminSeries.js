import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MaterialTable from "material-table";

import CreateserieModal from "../components/modals/CreateSerieModal";
import { deleteSerie, getSeries, updateSerie } from "../actions/seriesAction";
import { AddBox } from "@material-ui/icons";
import {tableIcons} from "../utils/tableIcons"
import Page from "../components/Page";

const AdminSeries = () => {

  const {isLoading} = useSelector((state) => state.auth);
  const [serieRows, setSerieRows] = useState([]);
  const [createSerieOpen, setCreateSerieOpen] = useState(false);
  const columns = [
    {
      title: "Name",
      field: "name",
    },
  ];

  async function initSeries() {
    getSeries()
      .then((series) => {
            const rows = series
                ? series.map((serie) => {
                    return {
                        id: serie.id,
                        name: serie.name,
                    };
                    })
                : [];
            setSerieRows(rows);
      });
  }
  useEffect(() => {
    initSeries();
  }, [isLoading]);

  const handleCreateserieOpen = () => {
    setCreateSerieOpen(true);
  };

  const handleCreateserieClose = () => {
    setCreateSerieOpen(false);
  };

  const handleUpdateSerie = async (newData) => {
    console.log("newData", newData);
    const updateSeriePayload = {
      id: newData.id,
      name: newData.name,
    };

    await updateSerie(updateSeriePayload);
    initSeries();
  };

  const handleDeleteserie = async (oldData) => {
    await deleteSerie(oldData.id);
    initSeries();
  };

  return (
    <Page>
      <MaterialTable
          icons={tableIcons}
        title="Manage series"
        columns={columns}
        data={serieRows}
        actions={
          [
            {
              icon: () => <AddBox />,
              tooltip: "my tooltip",
              position: "toolbar",
              onClick: () => {
                handleCreateserieOpen();
              },
            },
          ]
        }
        editable={{
          onRowUpdate: (newData) => handleUpdateSerie(newData),
          onRowDelete: (oldData) => handleDeleteserie(oldData),
        }}
        options={{
          search: false,
          actionsColumnIndex: -1,
          pageSize: 20,
          pageSizeOptions: [20, 50],
          maxBodyHeight: "75vh",
        }}
      />
      <CreateserieModal
        initSeries={initSeries}
        open={createSerieOpen}
        onClose={handleCreateserieClose}
        aria-labelledby="create-serie-modal"
        aria-describedby="create-serie-modal"
      />
    </Page>
  );
};

export default AdminSeries;