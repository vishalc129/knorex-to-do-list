import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TaskDetails() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`https://672f4df1229a881691f2813e.mockapi.io/api/v1/tasks/${id}`)
        .then((response) => {
          setTitle(response.data.title);
          setDesc(response.data.description);
          setCreationDate(response.data.creationDate);
        });
    }
  }, [id]);

  return (
    <div>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          ID: {id}
        </Typography>
        <Typography variant="h4" gutterBottom>
          Title: {title}
        </Typography>
        <Typography variant="h4" gutterBottom>
          Description: {desc}
        </Typography>
        <Typography variant="h4" gutterBottom>
          Creation Date: {creationDate}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </Button>
      </Box>
    </div>
  );
}

export default TaskDetails;
