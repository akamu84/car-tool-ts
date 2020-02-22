import React from 'react';

import { useForm } from '../hooks/useForm';
import { Car } from '../types/types';

interface CarEditRowProps {
  car: Car;
  onSaveCar: (event: React.MouseEvent<HTMLElement>) => void;
  onCancelCar: (event: React.MouseEvent<HTMLElement>) => void;
}

export const CarEditRow: React.FC<CarEditRowProps> = ({
  car,
  onSaveCar,
  onCancelCar: cancelCar,
}) => {
  const [carForm, change] = useForm({ ...car });

  const saveCar = () => {
    onSaveCar({
      // the spread works here because the property names of the carForm object are the
      // same property names as car object
      ...carForm,
      id: car.id,
    });
  };

  // for the above change handler to work, the carForm property name (such as 'make')
  // needs to match the property name used in the input's 'value' attribute and the
  // input's 'name' attribute

  return (
    <tr>
      <td />
      <td>{car.id}</td>
      <td>
        {' '}
        <input
          type="text"
          id="make-input"
          name="make"
          value={carForm.make}
          onChange={change}
        />
      </td>
      <td>
        <input
          type="text"
          id="model-input"
          name="model"
          value={carForm.model}
          onChange={change}
        />
      </td>
      <td>
        <input
          type="number"
          id="year-input"
          name="year"
          value={carForm.year}
          onChange={change}
        />
      </td>
      <td>
        <input
          type="text"
          id="color-input"
          name="color"
          value={carForm.color}
          onChange={change}
        />
      </td>
      <td>
        <input
          type="number"
          id="price-input"
          name="price"
          value={carForm.price}
          onChange={change}
        />
      </td>
      <td>
        <button type="button" onClick={saveCar}>
          Save
        </button>
        <button type="button" onClick={cancelCar}>
          Cancel
        </button>
      </td>
    </tr>
  );
};
