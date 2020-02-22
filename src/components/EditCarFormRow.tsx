import React from 'react';

import { CarForm } from './CarForm';
import { Car } from '../types/types';

interface EditCarFormRowProps {
  onSaveCar: (event: React.MouseEvent<HTMLElement>) => void;
  onSubmitCar: (event: React.MouseEvent<HTMLElement>) => void;
  car: Car;
  onCancelCar: (event: React.MouseEvent<HTMLElement>) => void;
}

export const EditCarFormRow: React.FC<EditCarFormRowProps> = ({
  onSaveCar,
  onSubmitCar,
  car,
  onCancelCar,
}) => {
  let submitFunction = onSubmitCar;

  if (onSaveCar) {
    submitFunction = onSaveCar;
  }

  return (
    <tr>
      <td colSpan={8}>
        <CarForm
          buttonText="Save"
          onSubmitCar={submitFunction}
          onCancelCar={onCancelCar}
          car={car}
        />
      </td>
    </tr>
  );
};
