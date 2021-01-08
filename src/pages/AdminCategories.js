import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MaterialTable from "material-table";

import CreatecategoryModal from "../components/modals/CreateCategoryModal";
import { deleteCategory, getCategories, updateCategory } from "../actions/categoriesAction";
import { AddBox } from "@material-ui/icons";
import {tableIcons} from "../utils/tableIcons"
import Page from "../components/Page";

const AdminCategories = () => {

  const {isLoading} = useSelector((state) => state.auth);
  const [categoryRows, setCategoryRows] = useState([]);
  const [createCategoryOpen, setCreateCategoryOpen] = useState(false);
  const columns = [
    {
      title: "Name",
      field: "name",
    },
  ];

  async function initCategories() {
    getCategories()
      .then((categories) => {
            const rows = categories
                ? categories.map((category) => {
                    return {
                        id: category.id,
                        name: category.name,
                    };
                    })
                : [];
            setCategoryRows(rows);
      });
  }
  useEffect(() => {
    initCategories();
  }, [isLoading]);

  const handleCreatecategoryOpen = () => {
    setCreateCategoryOpen(true);
  };

  const handleCreatecategoryClose = () => {
    setCreateCategoryOpen(false);
  };

  const handleUpdateCategory = async (newData) => {
    console.log("newData", newData);
    const updateCategoryPayload = {
      id: newData.id,
      name: newData.name,
    };

    await updateCategory(updateCategoryPayload);
    initCategories();
  };

  const handleDeletecategory = async (oldData) => {
    await deleteCategory(oldData.id);
    initCategories();
  };

  return (
    <Page>
      <MaterialTable
          icons={tableIcons}
        title="Manage categories"
        columns={columns}
        data={categoryRows}
        actions={
          [
            {
              icon: () => <AddBox />,
              tooltip: "my tooltip",
              position: "toolbar",
              onClick: () => {
                handleCreatecategoryOpen();
              },
            },
          ]
        }
        editable={{
          onRowUpdate: (newData) => handleUpdateCategory(newData),
          onRowDelete: (oldData) => handleDeletecategory(oldData),
        }}
        options={{
          search: false,
          actionsColumnIndex: -1,
          pageSize: 20,
          pageSizeOptions: [20, 50],
          maxBodyHeight: "75vh",
        }}
      />
      <CreatecategoryModal
        initCategories={initCategories}
        open={createCategoryOpen}
        onClose={handleCreatecategoryClose}
        aria-labelledby="create-category-modal"
        aria-describedby="create-category-modal"
      />
    </Page>
  );
};

export default AdminCategories;