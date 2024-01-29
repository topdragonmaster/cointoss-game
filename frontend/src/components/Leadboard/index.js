import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Grow,
  Box,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Button,
  Avatar,
  Stack
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { tossCoin, initializeHistory } from "../../actions/game";
import Input from "../Login/Input";
import * as messages from "../../messages"
import * as api from "../../api";

const columns = [

  { field: 'name', headerName: 'User Name', width: 200 },
  {
    field: 'totalWagers',
    headerName: 'Total Wager',
    width: 200,
  },
  {
    field: 'balance',
    headerName: 'Balance',
    width: 200,
  }
];

const LeaderBoard = () => {
  const [userList, setUserList] = useState([])

  useEffect(() => {
    (async () => {
      const { data } = await api.getLeaderboard()
      const columns = data.map((item) => ({ ...item, id: item._id, name: item.userDetails.name, balance: item.userDetails.balance }))
      setUserList(columns)
      console.log(data)
    })()
  }, [])

  return (
    <Grow in>
      <Container component="main" >
        <Paper elevation={3}>
          <DataGrid
            rows={userList}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </Paper>
      </Container>
    </Grow >
  );
};

export default LeaderBoard;
