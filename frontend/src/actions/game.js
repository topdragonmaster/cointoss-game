import { UPDATEBALANCE, INITIALIZEHISTORY, UPDATEHISTORY } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const tossCoin = (formData, handleResult, setIsLoading) => async (dispatch) => {
  try {
    setIsLoading(true)
    const { data } = await api.tossCoin(formData);
    handleResult(data)
    dispatch({ type: UPDATEBALANCE, data });
    dispatch({ type: UPDATEHISTORY, data });
    setIsLoading(false)
  } catch (error) {
    messages.error(error.response.data.message);
  }
};

export const initializeHistory = () => async (dispatch) => {
  try {
    const { data } = await api.getHistory();
    console.log(data)
    dispatch({ type: INITIALIZEHISTORY, data });
  } catch (error) {
    messages.error(error.response.data.message);
  }
};