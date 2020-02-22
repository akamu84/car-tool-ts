import { Car, CarActionTypes, SystemState } from '../types/types';
import {
  REFRESH_CARS_DONE,
  EDIT_CAR,
  CANCEL_CAR,
  SORT_COL,
  TOGGLE_CAR,
  TOGGLE_ALL_CARS,
} from '../types/actionTypes';

// reducers follow the pattern:
// newState = reducerFn(currentState, action)
// every action must have a type property and an optional payload
// property with data
const carsReducer = (cars: Car[] = [], action: CarActionTypes): Car[] => {
  switch (action.type) {
    case REFRESH_CARS_DONE:
      return action.payload.cars;
    // if an action does not need to be handled by the
    // reducer then the original state passed in should be returned
    default:
      return cars;
  }
};

const editCarIdReducer = (editCarId = -1, action: CarActionTypes) => {
  if (action.type === EDIT_CAR) {
    return action.payload.carId;
  }

  if (action.type === REFRESH_CARS_DONE || action.type === CANCEL_CAR) {
    return -1;
  }

  return editCarId;
};

const selectedCarIdsReducer = (
  selectedCarIds: number[] = [],
  action: CarActionTypes,
  carIds: number[]
) => {
  if (action.type === TOGGLE_ALL_CARS) {
    if (selectedCarIds.length > 0) {
      return [];
    }
    return carIds.concat();
  }

  if (action.type === TOGGLE_CAR) {
    if (selectedCarIds.includes(action.payload.carId)) {
      return selectedCarIds.filter(carId => carId !== action.payload.carId);
    }
    return selectedCarIds.concat(action.payload.carId);
  }

  if (action.type === REFRESH_CARS_DONE) {
    return [];
  }

  return selectedCarIds;
};

const sortColReducer = (sortColName = '', action: CarActionTypes) => {
  if (action.type === SORT_COL) {
    return action.payload.sortColName;
  }

  return sortColName;
};

const initialState: SystemState = {
  cars: [],
  selectedCarIds: [],
  editCarId: -1,
  sortColName: 'id',
};

export const carToolReducer = (
  state: SystemState = initialState,
  action: CarActionTypes
) => {
  // always copy the original state in case there are extra
  // properties added by other reducers so those properties are not lost
  return {
    ...state,
    // other reducer functions can be called by the top level reducer so
    // long as they are pure functions
    cars: carsReducer(state.cars, action),
    editCarId: editCarIdReducer(state.editCarId, action),
    selectedCarIds: selectedCarIdsReducer(
      state.selectedCarIds,
      action,
      // if needed, extra data can be passed in
      state.cars ? state.cars.map(c => c.id) : []
    ),
    sortColName: sortColReducer(state.sortColName, action),
  };
};
