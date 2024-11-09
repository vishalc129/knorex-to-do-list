import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Link, Paper, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const paginationModel = { page: 0, pageSize: 5 };

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://672f4df1229a881691f2813e.mockapi.io/api/v1/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((err) => {
        //
      });
  }, []);

  const handleButtonClick = (path) => {
    navigate(path);
  };

  const onDeleteClick = (id) => {
    axios
      .delete(`https://672f4df1229a881691f2813e.mockapi.io/api/v1/tasks/${id}`)
      .then(() => {
        axios
          .get("https://672f4df1229a881691f2813e.mockapi.io/api/v1/tasks")
          .then((response) => {
            setTasks(response.data);
          })
          .catch((err) => {
            //
          });
      })
      .catch((err) => {
        //
      });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      renderCell: (params) => {
        return (
          <Link
            sx={{ marginLeft: "1rem" }}
            variant="contained"
            onClick={() => {
              navigate(`/tasks/${params.id}`);
            }}
          >
            {params.id}
          </Link>
        );
      },
    },
    { field: "title", headerName: "Title", width: 250 },
    { field: "description", headerName: "Description", width: 500 },
    { field: "creationDate", headerName: "Creation Date", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              onClick={() => {
                handleButtonClick(`/edit/${params.id}`);
              }}
            >
              Edit
            </Button>
            <Button
              sx={{ marginLeft: "1rem" }}
              variant="contained"
              onClick={() => {
                onDeleteClick(params.id);
              }}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const onSearch = (val) => {
    const newData = tasks.filter((i) => {
      return (
        i.title.toLowerCase().includes(val) ||
        i.description.toLowerCase().includes(val)
      );
    });
    setTasks(newData);
  };

  return (
    <div>
      <h1>Todo List</h1>

      <Paper sx={{ height: 400, width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
          <Button
            sx={{ marginLeft: "1rem" }}
            variant="contained"
            onClick={() => handleButtonClick("/add")}
          >
            Create New Task
          </Button>
          <TextField
            sx={{ borderRadius: "10px", width: 500 }}
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={(e) => onSearch(e.target.value)}
          />
        </Box>

        <DataGrid
          rows={tasks}
          columns={columns}
          initialState={{
            pagination: { paginationModel },
          }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
}

export default TaskList;
