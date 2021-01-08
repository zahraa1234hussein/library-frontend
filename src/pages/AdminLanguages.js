import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MaterialTable from "material-table";

import CreatelanguageModal from "../components/modals/CreateLanguageModal";
import { deleteLanguage, getLanguages, updateLanguage } from "../actions/languagesAction";
import { AddBox } from "@material-ui/icons";
import {tableIcons} from "../utils/tableIcons"
import Page from "../components/Page";

const AdminLanguages = () => {

  const {isLoading} = useSelector((state) => state.auth);
  const [languageRows, setLanguageRows] = useState([]);
  const [createLanguageOpen, setCreateLanguageOpen] = useState(false);
  const columns = [
    {
      title: "Name",
      field: "name",
    },
  ];

  async function initLanguages() {
    getLanguages()
      .then((languages) => {
            const rows = languages
                ? languages.map((language) => {
                    return {
                        id: language.id,
                        name: language.name,
                    };
                    })
                : [];
            setLanguageRows(rows);
      });
  }
  useEffect(() => {
    initLanguages();
  }, [isLoading]);

  const handleCreatelanguageOpen = () => {
    setCreateLanguageOpen(true);
  };

  const handleCreatelanguageClose = () => {
    setCreateLanguageOpen(false);
  };

  const handleUpdateLanguage = async (newData) => {
    console.log("newData", newData);
    const updateLanguagePayload = {
      id: newData.id,
      name: newData.name,
    };

    await updateLanguage(updateLanguagePayload);
    initLanguages();
  };

  const handleDeletelanguage = async (oldData) => {
    await deleteLanguage(oldData.id);
    initLanguages();
  };

  return (
    <Page>
      <MaterialTable
          icons={tableIcons}
        title="Manage languages"
        columns={columns}
        data={languageRows}
        actions={
          [
            {
              icon: () => <AddBox />,
              tooltip: "my tooltip",
              position: "toolbar",
              onClick: () => {
                handleCreatelanguageOpen();
              },
            },
          ]
        }
        editable={{
          onRowUpdate: (newData) => handleUpdateLanguage(newData),
          onRowDelete: (oldData) => handleDeletelanguage(oldData),
        }}
        options={{
          search: false,
          actionsColumnIndex: -1,
          pageSize: 20,
          pageSizeOptions: [20, 50],
          maxBodyHeight: "75vh",
        }}
      />
      <CreatelanguageModal
        initLanguages={initLanguages}
        open={createLanguageOpen}
        onClose={handleCreatelanguageClose}
        aria-labelledby="create-language-modal"
        aria-describedby="create-language-modal"
      />
    </Page>
  );
};

export default AdminLanguages;