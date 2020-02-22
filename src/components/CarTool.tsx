import React, { useEffect } from 'react';
import { Car } from '../types/types';
import { ToolHeader } from './ToolHeader';
import { CarTable } from './CarTable';
import { CarForm } from './CarForm';
import { EditCarFormRow } from './EditCarFormRow';

interface CarToolProps {
  cars: Car[];
  selectedCarIds: number[];
  editCarId: number;
  sortColName: 'id' | 'make' | 'model' | 'year' | 'color' | 'price';
  onAppendCar: (event: React.MouseEvent<HTMLElement>) => void;
  onReplaceCar: Function;
  onDeleteCar: Function;
  onEditCar: Function;
  onCancelCar: Function;
  onSortCol: Function;
  onToggleCar: Function;
  onToggleAllCars: (event: React.MouseEvent<HTMLElement>) => void;
  onBulkDeleteCars: Function;
  onRefreshCars: () => void;
}

// the first parameter to a component is the props parameter
// in this case props is being destructured into individual
// variables
export const CarTool: React.FC<CarToolProps> = ({
  cars,
  selectedCarIds,
  editCarId,
  sortColName,
  // for event handlers, I suggest prefixing prop name
  // with "on" just like React does for "onChange" and
  // "onClick"
  // when the event handler is being used within the
  // component, consider aliasing the "on" prefixed named
  // to a name without the "on" prefix
  onAppendCar: appendCar,
  onReplaceCar: replaceCar,
  onDeleteCar: deleteCar,
  onEditCar: editCar,
  onCancelCar: cancelCar,
  onSortCol: sortCol,
  onToggleCar: toggleCar,
  onToggleAllCars: toggleAllCars,
  onBulkDeleteCars: bulkDeleteCars,
  onRefreshCars: refreshCars,
}) => {
  // will run when the component first loads and when
  // the reference to the refreshCars function changes
  // if the reference to refreshCars changes on each render
  // then an endless loop of re-rendering will occur
  // the solution in this case is to wrap the bound actions
  // creation process in a useCallback hook in
  // ../containers/CarToolContainer.js
  useEffect(() => {
    refreshCars();
  }, [refreshCars /* re-run if the 'refreshCars' value/reference changes */]);

  // always separate component configuration data from the model data
  const tableConfig = {
    cols: [
      { id: 1, name: 'id', header: 'Id' },
      { id: 2, name: 'make', header: 'Make' },
      { id: 3, name: 'model', header: 'Model' },
      { id: 4, name: 'year', header: 'Year' },
      { id: 5, name: 'color', header: 'Body Color' },
      { id: 6, name: 'price', header: 'Price' },
    ],
  };

  return (
    <>
      <ToolHeader headerText="Car Tool" />
      <CarTable
        config={tableConfig}
        cars={cars}
        selectedCarIds={selectedCarIds}
        editCarId={editCarId}
        sortColName={sortColName}
        onEditCar={editCar}
        onSelectCar={toggleCar}
        onDeleteCar={deleteCar}
        onToggleAllCars={toggleAllCars}
        onBulkDeleteCars={bulkDeleteCars}
        onSaveCar={replaceCar}
        onCancelCar={cancelCar}
        CarEditRowComponent={EditCarFormRow}
        onSort={sortCol}
        onRefreshCars={refreshCars}
      />
      <CarForm onSubmitCar={appendCar} />
    </>
  );
};
