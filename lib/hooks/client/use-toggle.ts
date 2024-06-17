'use client';
import React, { useState } from 'react';
// import { boolean } from 'yup';

type ToggleReturnDetails = {
  toggle: () => void;
  toggleState: boolean;
  setToggle: (value: boolean) => void;
  setToggleFalse: () => void;
  setToggleTrue: () => void;
};


const useToggle = (defaultValue:boolean = false): ToggleReturnDetails => {
  const [toggleState, setToggleState] = useState<boolean>(defaultValue);

  const toggle = () => setToggleState((st) => !st);

  const setToggle = (value: boolean) => setToggleState(value);

  const setToggleTrue = () => setToggleState(true);

  const setToggleFalse = () => setToggleState(false);

  return { toggle, toggleState, setToggle, setToggleFalse, setToggleTrue };
};

export default useToggle;
