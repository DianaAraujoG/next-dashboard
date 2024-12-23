"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, createContext, Dispatch, useReducer, JSX } from 'react';
import { initialState, MxStateReducer } from '../reducers/mxState';

interface IPropsContext {
  children: JSX.Element
}

const MxStateStateContext = createContext(initialState);
const MxStateDispatchContext = createContext({} as Dispatch<any>);

export const useMxStateState = () => {
  const context = useContext(MxStateStateContext);
  if (context === undefined) {
    throw new Error('useMxStateState must be used within a MxStateProvider');
  }

  return context;
};

export const useMxStateDispatch = () => {
  const context = useContext(MxStateDispatchContext);
  if (context === undefined) {
    throw new Error('useMxStateDispatch must be used within a MxStateProvider');
  }

  return context;
};

export const MxStateProvider = ({ children }: IPropsContext) => {
  const [MxState, dispatch] = useReducer(MxStateReducer, initialState);

  return (
    <MxStateStateContext.Provider value={{ ...MxState }}>
      <MxStateDispatchContext.Provider value={dispatch}>
        {children}
      </MxStateDispatchContext.Provider>
    </MxStateStateContext.Provider>
  );
};
