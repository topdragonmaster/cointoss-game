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
import CircularProgress from '@mui/material/CircularProgress';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { tossCoin, initializeHistory } from "../../actions/game";
import Input from "../Login/Input";
import * as messages from "../../messages"

const Home = () => {

  const user = localStorage.getItem("profile")
    ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
    : "null";

  const dispatch = useDispatch()
  const isSingedIn = user;
  const [wager, setWager] = useState(0);
  const [selectedSide, setSelectedSide] = useState('Head');
  const [tossResult, setTossResult] = useState('Head');
  const [isLoading, setIsLoading] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [finalPayout, setFinalPayout] = useState(0);
  const [isVisible, setIsVisible] = useState(false)
  const game = useSelector((state) => state.game);

  const handleWagerChange = (e) => {
    setWager(e.target.value);
  };

  const handleSideChange = (e) => {
    setSelectedSide(e.target.value);
  };

  const handleResult = (data) => {
    setIsWin(data.isWin)
    setFinalPayout(data.finalPayout)
    setTossResult(data.tossResult)

    setIsVisible(true)
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);

  }

  const handleTossSubmit = async (e) => {
    e.preventDefault();

    try {
      if (parseFloat(wager) <= 0) {
        messages.error("Bet amount must be at least 0.1")
        return
      }

      if (parseFloat(wager) > game.balance) {
        messages.error("Your balance is not enough")
        return
      }

      const userId = user._id;
      const formData = {
        userId,
        wager,
        side: selectedSide
      };

      dispatch(tossCoin(formData, handleResult, setIsLoading))

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(initializeHistory())
  }, [])


  return (
    <Grow in>
      <Container component="main" >
        <Paper elevation={3}>
          {isSingedIn !== "null" && isSingedIn !== null ? (
            <form onSubmit={handleTossSubmit}>
              <Grid container spacing={2} color="primary" alignItems="center" padding={2}>
                <Grid gap={2} container justifyContent="flex-start" direction="row" xs={10} padding={2}>
                  {
                    [...game.history].reverse().map(item => <Avatar sx={item.tossResult === 'Head' ?
                      { bgcolor: deepOrange[500] }
                      : { bgcolor: deepPurple[500] }}
                      key={item.createdAt}>
                      {item.tossResult.charAt(0)}
                    </Avatar>)
                  }
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h5">
                    {`Balance: ${game.balance}`}
                  </Typography>
                </Grid>
                <Input
                  name="wager"
                  label="Wager"
                  type="number"
                  handleChange={handleWagerChange}
                  value={wager}
                  half
                />
                <Grid item xs={4}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Choose Side:</FormLabel>
                    <RadioGroup
                      row
                      aria-label="coin-toss-side"
                      name="coin-toss-side"
                      value={selectedSide}
                      onChange={handleSideChange}
                    >
                      <FormControlLabel value="Head" control={<Radio />} label="Head" />
                      <FormControlLabel value="Tail" control={<Radio />} label="Tail" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <Button type="submit" variant="contained" color="primary">
                    Toss Coin
                  </Button>
                </Grid>

                <Grid container xs={12} justifyContent="center" padding={3}>
                  {!isLoading ?
                    <>
                      {isVisible && <Stack spacing={2} alignItems="center" justifyContent="center">
                        <Avatar
                          sx={[
                            tossResult === 'Head' ?
                              { bgcolor: deepOrange[500] }
                              : { bgcolor: deepPurple[500] },
                            { width: 80, height: 80 }]}  >
                          {tossResult.charAt(0)}
                        </Avatar>
                        <Typography variant="h5">
                          {isWin ? `You won! Payout: ${finalPayout}` : 'You lost!'}
                        </Typography>
                      </Stack>}
                    </> : <Box>
                      <CircularProgress />
                    </Box>
                  }
                </Grid>

              </Grid>
            </form>
          ) : (
            <Typography variant="h4" align="center" color="primary">
              Login to Play
            </Typography>
          )}
        </Paper>
      </Container>
    </Grow >
  );
};

export default Home;
