import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
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
} from './actionTypes';

interface RefreshCarsRequestAction {
  type: typeof REFRESH_CARS_REQUEST;
}

interface RefreshCarsDoneAction {
  type: typeof REFRESH_CARS_DONE;
  payload: {
    cars: Car[];
  };
}

interface AppendCarRequestAction {
  type: typeof APPEND_CAR_REQUEST;
  payload: {
    car: Car;
  };
}

interface AppendCarDoneAction {
  type: typeof APPEND_CAR_DONE;
  payload: {
    car: Car;
  };
}

interface ReplaceCarRequestAction {
  type: typeof REPLACE_CAR_REQUEST;
  payload: {
    car: Car;
  };
}

interface ReplaceCarDoneAction {
  type: typeof REPLACE_CAR_DONE;
  payload: {
    car: Car;
  };
}

interface DeleteCarRequestAction {
  type: typeof DELETE_CAR_REQUEST;
  payload: {
    carId: number;
  };
}

interface DeleteCarDoneAction {
  type: typeof DELETE_CAR_DONE;
  payload: {
    carId: number;
  };
}

interface BulkDeleteCarsRequestAction {
  type: typeof BULK_DELETE_CARS_REQUEST;
  payload: {
    carIds: number[];
  };
}

interface BulkDeleteCarsDoneAction {
  type: typeof BULK_DELETE_CARS_DONE;
  payload: {
    carIds: number[];
  };
}

interface EditCarAction {
  type: typeof EDIT_CAR;
  payload: {
    carId: number;
  };
}

interface CancelCarAction {
  type: typeof CANCEL_CAR;
}

interface SortColAction {
  type: typeof SORT_COL;
  payload: {
    sortColName: string;
  };
}

interface ToggleCarAction {
  type: typeof TOGGLE_CAR;
  payload: {
    carId: number;
  };
}

interface ToggleAllCarsAction {
  type: typeof TOGGLE_ALL_CARS;
}

export type CarActionTypes =
  | RefreshCarsRequestAction
  | RefreshCarsDoneAction
  | AppendCarRequestAction
  | AppendCarDoneAction
  | ReplaceCarRequestAction
  | ReplaceCarDoneAction
  | DeleteCarRequestAction
  | DeleteCarDoneAction
  | BulkDeleteCarsRequestAction
  | BulkDeleteCarsDoneAction
  | EditCarAction
  | CancelCarAction
  | SortColAction
  | ToggleCarAction
  | ToggleAllCarsAction;

export interface SystemState {
  cars: Car[];
  selectedCarIds: number[];
  editCarId: number;
  sortColName: 'id' | 'make' | 'model' | 'year' | 'color' | 'price';
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  SystemState,
  unknown,
  Action<string>
>;

export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  price: number;
}
