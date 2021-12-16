import {
  GET_EQUIPMENTS_REQUEST,
  GET_EQUIPMENTS_SUCCESS,
  GET_EQUIPMENTS_FAIL,
  GET_EQUIPMENT_DETAILS_REQUEST,
  GET_EQUIPMENT_DETAILS_SUCCESS,
  GET_EQUIPMENT_DETAILS_FAIL,
} from "../actions/equipment.types";

export const getEquipmentsReducer = (state = { equipments: [] }, action) => {
  switch (action.type) {
    case GET_EQUIPMENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_EQUIPMENTS_SUCCESS:
      return {
        loading: false,
        success: true,
        equipments: Object.entries(action.payload.val()).map((e) => ({
          id: e[0],
          ...e[1],
        })),
      };
    case GET_EQUIPMENTS_FAIL:
      return {
        ...state,
        loading: false,
        succes: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export const getEquipmentDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EQUIPMENT_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case GET_EQUIPMENT_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        equipment: action.payload.equipment,
        checkpoints: action.payload.checkpoints,
      };
    case GET_EQUIPMENT_DETAILS_FAIL:
      return {
        loading: false,
        succes: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
