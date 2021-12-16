import { combineReducers } from "redux";
import {
  getEquipmentsReducer,
  getEquipmentDetailsReducer,
} from "./equipment.reducer";

const reducers = combineReducers({
  getEquipmentsReducer,
  getEquipmentDetailsReducer,
});

export default reducers;
