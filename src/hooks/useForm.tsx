import { useState } from 'react';

export const useForm = (initialForm: any) => {
  const [form, setForm] = useState({ ...initialForm });

  const change = (e: any) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'number' ? Number(e.target.value) : e.target.value,
    });
  };

  return [form, change, () => setForm({ ...initialForm })];
};
