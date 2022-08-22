import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import "./movie.css";

import API from "../Config/axiosInstance";

const Movie = () => {
  const [movieList, setMovieList] = useState([]);
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    { field: "title", headerName: "Title", width: 300 },
    { field: "year", headerName: "Year", width: 100 },
    { field: "cast", headerName: "Cast", width: 450 },
    { field: "genres", headerName: "Genres", width: 450 },
  ];

  const getMovies = async (e) => {
    try {
      e?.preventDefault();

      setIsLoading(true);

      const { data } = await API.post("/movie", {
        filter: {
          page: page,
          limit: limit,
        },
        value,
      });

      if (data?.data?.data?.length > 0) {
        setMovieList(data.data.data);
      }

      setIsLoading(false);

      setTotal(Math.ceil(data?.data?.total / limit));
    } catch (e) {
      setIsLoading(false);
      console.log("Unable to get movies ---- ", e.message);
    }
  };

  useEffect(() => {
    getMovies();
  }, [page]);

  return (
    <Box className='movie__container'>
      <div className='movie__header'>
        <h1 className='movie__headerText'>Movies Mania</h1>
        <FormGroup row>
          <TextField
            className='movie_search'
            label='Search'
            variant='outlined'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            color='primary'
            variant='contained'
            onClick={getMovies}
            disableElevation
          >
            Search
          </Button>
        </FormGroup>
      </div>

      <Box sx={{ height: "90vh", width: "100%" }}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={movieList}
          columns={columns}
          rowCount={total}
          loading={isLoading}
          rowsPerPageOptions={[limit]}
          pagination
          page={page - 1}
          pageSize={limit}
          paginationMode='server'
          onPageChange={(newPage) => setPage(newPage + 1)}
        />
      </Box>
    </Box>
  );
};

export default Movie;
