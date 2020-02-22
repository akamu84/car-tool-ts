import React from 'react';
import { Car } from '../types/types';

interface CarViewRowProps {
  car: Car;
  selected: boolean;
  onEditCar: Function;
  onSelectCar: Function;
  onDeleteCar: Function;
}

export const CarViewRow: React.FC<CarViewRowProps> = ({
  car,
  selected,
  onEditCar: editCar,
  onSelectCar: selectCar,
  onDeleteCar: deleteCar,
}) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={selected}
          onChange={() => selectCar(car.id)}
        />
      </td>
      <td>{car.id}</td>
      <td>{car.make}</td>
      <td>{car.model}</td>
      <td>{car.year}</td>
      <td>{car.color}</td>
      <td>{car.price}</td>
      <td>
        <button type="button" onClick={() => editCar(car.id)}>
          Edit
        </button>
        <button type="button" onClick={() => deleteCar(car.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};
