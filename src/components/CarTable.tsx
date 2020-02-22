import React from 'react';

import { CarViewRow } from './CarViewRow';
import { CarEditRow } from './CarEditRow';
import { SortColHeader } from './SortColHeader';
import { Car } from '../types/types';

interface CarTableProps {
  config: {
    cols: { id: number; name: string; header: string }[];
  };
  cars: Car[];
  editCarId: number;
  selectedCarIds: number[];
  onEditCar: Function;
  onSelectCar: Function;
  onToggleAllCars: (event: React.MouseEvent<HTMLElement>) => void;
  onDeleteCar: Function;
  onBulkDeleteCars: Function;
  CarEditRowComponent: Function;
  onSaveCar: Function;
  onCancelCar: Function;
  onSort: Function;
  sortColName: 'id' | 'make' | 'model' | 'year' | 'color' | 'price';
  onRefreshCars: (event: React.MouseEvent<HTMLElement>) => void;
}

export const CarTable: React.FC<CarTableProps> = ({
  config,
  cars,
  editCarId,
  selectedCarIds,
  onEditCar: editCar,
  onSelectCar: selectCar,
  onToggleAllCars: toggleAllCars,
  onDeleteCar: deleteCar,
  onBulkDeleteCars: bulkDeleteCars,
  CarEditRowComponent,
  onSaveCar: saveCar,
  onCancelCar: cancelCar,
  onSort: sort,
  sortColName,
  onRefreshCars: refreshCars,
}) => {
  const TheCarEditRow = CarEditRowComponent || CarEditRow;

  let sortedCars: Car[] = [];

  if (cars && cars.length > 0) {
    sortedCars = cars.concat().sort((a, b) => {
      const key: keyof Car = sortColName;
      if (a[key] > b[key]) {
        return 1;
      }
      if (a[key] < b[key]) {
        return -1;
      }
      return 0;
    });
  }

  return (
    <>
      <button type="button" onClick={() => bulkDeleteCars(selectedCarIds)}>
        Bulk Delete
      </button>
      <button type="button" onClick={toggleAllCars}>
        Toggle All
      </button>
      <button type="button" onClick={refreshCars}>
        Refresh Cars
      </button>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            {config.cols.map(col => (
              <SortColHeader
                key={col.id}
                colName={col.name}
                onSort={sort}
                sortColName={sortColName}
                headerText={col.header}
              />
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedCars.length > 0 ? (
            sortedCars.map(car =>
              car.id === editCarId ? (
                <TheCarEditRow
                  key={car.id}
                  car={car}
                  onSaveCar={saveCar}
                  onCancelCar={cancelCar}
                />
              ) : (
                <CarViewRow
                  key={car.id}
                  car={car}
                  selected={selectedCarIds.includes(car.id)}
                  onSelectCar={selectCar}
                  onDeleteCar={deleteCar}
                  onEditCar={editCar}
                />
              )
            )
          ) : (
            <tr>
              <td>No Cars</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

CarTable.defaultProps = {
  editCarId: -1,
};
