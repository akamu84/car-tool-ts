import React, { useCallback } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { SystemState, CarActionTypes } from '../types/types';

import {
  refreshCars,
  appendCar,
  replaceCar,
  deleteCar,
  bulkDeleteCars,
  createEditCarAction,
  createCancelCarAction,
  createSortColAction,
  createToggleCarAction,
  createToggleAllCarsAction,
} from '../actions/carToolActions';
import { CarTool } from '../components/CarTool';

// produces an object of dispatch-bound actions
const mapDispatchToProps = (dispatch: Dispatch<CarActionTypes>) =>
  bindActionCreators<any, any>(
    {
      onAppendCar: appendCar,
      onReplaceCar: replaceCar,
      onDeleteCar: deleteCar,
      onEditCar: createEditCarAction,
      onCancelCar: createCancelCarAction,
      onSortCol: createSortColAction,
      onToggleCar: createToggleCarAction,
      onToggleAllCars: createToggleAllCarsAction,
      onBulkDeleteCars: bulkDeleteCars,
      onRefreshCars: refreshCars,
    },
    dispatch
  );

export const CarToolContainer = () => {
  const dispatch = useDispatch();

  // // only produce a new object of bound actions if the dispatch
  // // function reference changes (which it should never do)
  const {
    onAppendCar,
    onReplaceCar,
    onDeleteCar,
    onEditCar,
    onCancelCar,
    onSortCol,
    onToggleCar,
    onToggleAllCars,
    onBulkDeleteCars,
    onRefreshCars,
  } = useCallback(mapDispatchToProps(dispatch), [dispatch]);

  // select the data props from the state which will be passed into
  // component
  const { cars, editCarId, selectedCarIds, sortColName } = useSelector(
    (state: SystemState) => ({
      cars: state.cars,
      editCarId: state.editCarId,
      selectedCarIds: state.selectedCarIds,
      sortColName: state.sortColName,
    })
  );

  // using a JSX spread, pass the bound actions and data
  return (
    <CarTool
      onAppendCar={onAppendCar}
      onReplaceCar={onReplaceCar}
      onDeleteCar={onDeleteCar}
      onEditCar={onEditCar}
      onCancelCar={onCancelCar}
      onSortCol={onSortCol}
      onToggleCar={onToggleCar}
      onToggleAllCars={onToggleAllCars}
      onBulkDeleteCars={onBulkDeleteCars}
      onRefreshCars={onRefreshCars}
      cars={cars}
      editCarId={editCarId}
      selectedCarIds={selectedCarIds}
      sortColName={sortColName}
    />
  );
};
