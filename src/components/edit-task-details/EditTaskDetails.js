import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function EditTaskDetails() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(location.pathname);

  useEffect(() => {
    if (location.pathname.includes("/edit")) {
      axios
        .get(`https://672f4df1229a881691f2813e.mockapi.io/api/v1/tasks/${id}`)
        .then((response) => {
          setTitle(response.data.title);
          setDesc(response.data.description);
        })
        .catch((err) => {
          //
        });
    }
  }, []);

  const handleSubmit = () => {
    if (location.pathname.includes("/edit")) {
      axios
        .put(`https://672f4df1229a881691f2813e.mockapi.io/api/v1/tasks/${id}`, {
          title,
          description: desc,
        })
        .then(() => {
          setTitle("");
          setDesc("");
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
            navigate("/");
          }, 5000);
        })
        .catch((err) => {
          //
        });
    } else {
      axios
        .post("https://672f4df1229a881691f2813e.mockapi.io/api/v1/tasks", {
          title,
          description: desc,
          creationDate: new Date(),
        })
        .then(() => {
          setTitle("");
          setDesc("");
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
            navigate("/");
          }, 5000);
        })
        .catch((err) => {
          //
        });
    }
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onDescChange = (e) => {
    setDesc(e.target.value);
  };

  return (
    <Container maxWidth="sm">
      {isSuccess && (
        <Alert severity="success">
          Here is a gentle confirmation that your action was successful.
        </Alert>
      )}

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add Item
        </Typography>

        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          name="name"
          value={title}
          onChange={onTitleChange}
          sx={{ mb: 2 }}
        />

        {/* Email Field */}
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          name="description"
          value={desc}
          onChange={onDescChange}
          sx={{ mb: 2 }}
        />
        <Button
          sx={{ marginRight: "1rem" }}
          variant="outlined"
          color="primary"
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Container>
  );
}

export default EditTaskDetails;
