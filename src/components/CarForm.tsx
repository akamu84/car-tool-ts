import React from 'react';

import { useForm } from '../hooks/useForm';
import { Car } from '../types/types';

const getInitCarForm = () => ({
  make: '',
  model: '',
  year: 1900,
  color: '',
  price: 0,
});

interface CarFormProps {
  onSubmitCar: (event: React.MouseEvent<HTMLElement>) => void;
  buttonText?: string;
  car?: Car;
  onCancelCar?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const CarForm: React.FC<CarFormProps> = ({
  onSubmitCar,
  buttonText,
  car,
  onCancelCar: cancelCar,
}) => {
  const [carForm, change, resetCarForm] = useForm(car || getInitCarForm());

  const submitCar = () => {
    onSubmitCar({ ...carForm });

    resetCarForm();
  };

  return (
    <form>
      <div>
        <label htmlFor="make-input">
          Make
          <input
            type="text"
            id="make-input"
            name="make"
            value={carForm.make}
            onChange={change}
          />
        </label>
      </div>
      <div>
        <label htmlFor="model-input">
          Model
          <input
            type="text"
            id="model-input"
            name="model"
            value={carForm.model}
            onChange={change}
          />
        </label>
      </div>
      <div>
        <label htmlFor="year-input">
          Year
          <input
            type="number"
            id="year-input"
            name="year"
            value={carForm.year}
            onChange={change}
          />
        </label>
      </div>
      <div>
        <label htmlFor="color-input">
          Color
          <input
            type="text"
            id="color-input"
            name="color"
            value={carForm.color}
            onChange={change}
          />
        </label>
      </div>
      <div>
        <label htmlFor="price-input">
          Price
          <input
            type="number"
            id="price-input"
            name="price"
            value={carForm.price}
            onChange={change}
          />
        </label>
      </div>
      <button type="button" onClick={submitCar}>
        {buttonText}
      </button>
      {cancelCar && (
        <button type="button" onClick={cancelCar}>
          Cancel
        </button>
      )}
    </form>
  );
};

// default props specify default values for props which
// are not passed to the component
CarForm.defaultProps = {
  buttonText: 'Submit Car',
};
