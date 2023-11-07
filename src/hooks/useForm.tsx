import React, { useState } from 'react';

interface IUseFormProps {
  [name: string]: string;
}

export function useForm(inputValues: IUseFormProps) {
    const [values, setValues] = useState(inputValues);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
  }