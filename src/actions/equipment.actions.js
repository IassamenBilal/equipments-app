import {
  GET_EQUIPMENTS_FAIL,
  GET_EQUIPMENTS_REQUEST,
  GET_EQUIPMENTS_SUCCESS,
  GET_EQUIPMENT_DETAILS_FAIL,
  GET_EQUIPMENT_DETAILS_REQUEST,
  GET_EQUIPMENT_DETAILS_SUCCESS,
} from "./equipment.types";
import { database } from "../firebase";

export const getEquipments = () => async (dispatch) => {
  const dbRef = database.ref();
  dispatch({ type: GET_EQUIPMENTS_REQUEST });
  try {
    const data = await dbRef.child("Equipments").get();
    dispatch({
      type: GET_EQUIPMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_EQUIPMENTS_FAIL, payload: error });
  }
};

export const getEquipmentDetails = (id) => async (dispatch) => {
  const equipmentsCollection = database.ref("Equipments");
  const checkPointsCollection = database.ref("Checkpoints");

  dispatch({ type: GET_EQUIPMENT_DETAILS_REQUEST });
  try {
    const data1 = await equipmentsCollection.child(id).get();
    const data2 = checkPointsCollection
      .orderByChild("equipmentKey")
      .equalTo(id);
    const checkpoints = await data2.once("value");
    dispatch({
      type: GET_EQUIPMENT_DETAILS_SUCCESS,
      payload: {
        equipment: data1.val(),
        checkpoints: Object.entries(checkpoints.val()).map((e) => ({
          id: e[0],
          ...e[1],
        })),
      },
    });
  } catch (error) {
    dispatch({ type: GET_EQUIPMENT_DETAILS_FAIL, payload: error });
  }
};
