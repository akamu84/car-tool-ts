import { Car, CarActionTypes, AppThunk } from '../types/types';
import {
  REFRESH_CARS_REQUEST,
  REFRESH_CARS_DONE,
  APPEND_CAR_REQUEST,
  APPEND_CAR_DONE,
  REPLACE_CAR_REQUEST,
  REPLACE_CAR_DONE,
  DELETE_CAR_REQUEST,
  DELETE_CAR_DONE,
  BULK_DELETE_CARS_REQUEST,
  BULK_DELETE_CARS_DONE,
  EDIT_CAR,
  CANCEL_CAR,
  SORT_COL,
  TOGGLE_CAR,
  TOGGLE_ALL_CARS,
} from '../types/actionTypes';
// action types are generally strings assigned to const
// variables to reduce typos from re-typing the string
// over and over

// each action should be created with an action creator function
// some actions will have no data and some actions will include
// additional data
export const createRefreshCarsRequestAction = (): CarActionTypes => ({
  type: REFRESH_CARS_REQUEST,
});

// the return value of this function is an action object which
// can be handled directly by redux
export const createRefreshCarsDoneAction = (cars: Car[]): CarActionTypes => ({
  // payload is common name for the data property but the
  // data property can be named anything
  // on the payload property I always put an object which has
  // a property with a more descriptive name for the data
  // traveling with the action
  type: REFRESH_CARS_DONE,
  payload: { cars },
});

// the return value of this function is a function which CANNOT
// be handled directly by Redux, instead the Thunk middleware
// will intercept it in the action pipline and invoke the function
export const refreshCars = (): AppThunk => {
  // when the thunk middleware invokes this funtion it will pass
  // the store's dispatch function which will be used to dispatch
  // the appropriate request and done actions
  return async dispatch => {
    dispatch(createRefreshCarsRequestAction());

    // using async/await enables easier to read code
    // than using promises or callbacks
    const res = await fetch('http://localhost:3050/cars');
    const cars = await res.json();

    dispatch(createRefreshCarsDoneAction(cars));
  };
};

export const createAppendCarRequestAction = (car: Car): CarActionTypes => ({
  type: APPEND_CAR_REQUEST,
  payload: { car },
});

export const createAppendCarDoneAction = (car: Car): CarActionTypes => ({
  type: APPEND_CAR_DONE,
  payload: { car },
});

export const appendCar = (car: Car): AppThunk => {
  return async dispatch => {
    dispatch(createAppendCarRequestAction(car));
    const res = await fetch('http://localhost:3050/cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car),
    });
    const appendedCar = await res.json();
    dispatch(createAppendCarDoneAction(appendedCar));
    dispatch(refreshCars());
  };
};

export const createReplaceCarRequestAction = (car: Car): CarActionTypes => ({
  type: REPLACE_CAR_REQUEST,
  payload: { car },
});

export const createReplaceCarDoneAction = (car: Car): CarActionTypes => ({
  type: REPLACE_CAR_DONE,
  payload: { car },
});

export const replaceCar = (car: Car): AppThunk => {
  return async dispatch => {
    dispatch(createReplaceCarRequestAction(car));
    const res = await fetch(
      `http://localhost:3050/cars/${encodeURIComponent(car.id)}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car),
      }
    );
    const replacedCar = await res.json();
    dispatch(createReplaceCarDoneAction(replacedCar));
    dispatch(refreshCars());
  };
};

export const createDeleteCarRequestAction = (
  carId: number
): CarActionTypes => ({
  type: DELETE_CAR_REQUEST,
  payload: { carId },
});

export const createDeleteCarDoneAction = (carId: number): CarActionTypes => ({
  type: DELETE_CAR_DONE,
  payload: { carId },
});

export const deleteCar = (carId: number): AppThunk => {
  return async dispatch => {
    dispatch(createDeleteCarRequestAction(carId));
    await fetch(`http://localhost:3050/cars/${encodeURIComponent(carId)}`, {
      method: 'DELETE',
    });
    dispatch(createDeleteCarDoneAction(carId));
    dispatch(refreshCars());
  };
};

export const createBulkDeleteCarsRequestAction = (
  carIds: number[]
): CarActionTypes => ({
  type: BULK_DELETE_CARS_REQUEST,
  payload: { carIds },
});

export const createBulkDeleteCarsDoneAction = (
  carIds: number[]
): CarActionTypes => ({
  type: BULK_DELETE_CARS_DONE,
  payload: { carIds },
});

export const bulkDeleteCars = (carIds: number[]): AppThunk => {
  return async dispatch => {
    dispatch(createBulkDeleteCarsRequestAction(carIds));

    // even though we are in an async/await function, functions
    // like Promise.all and Promise.race can still be used
    await Promise.all(
      carIds.map(carId =>
        fetch(`http://localhost:3050/cars/${encodeURIComponent(carId)}`, {
          method: 'DELETE',
        })
      )
    );

    dispatch(createBulkDeleteCarsDoneAction(carIds));
    dispatch(refreshCars());
  };
};

export const createEditCarAction = (carId: number): CarActionTypes => ({
  type: EDIT_CAR,
  payload: { carId },
});

export const createCancelCarAction = (): CarActionTypes => ({
  type: CANCEL_CAR,
});

export const createSortColAction = (sortColName: string): CarActionTypes => ({
  type: SORT_COL,
  payload: { sortColName },
});

export const createToggleCarAction = (carId: number): CarActionTypes => ({
  type: TOGGLE_CAR,
  payload: { carId },
});

export const createToggleAllCarsAction = (): CarActionTypes => ({
  type: TOGGLE_ALL_CARS,
});
