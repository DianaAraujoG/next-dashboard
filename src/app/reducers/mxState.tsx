import { names } from '../config/names';
import * as Types from '@/types';

let MxStateInfo = null;
if (typeof window !== "undefined") {
  MxStateInfo = localStorage.getItem('@CURRENT_MX_STATE:key');
}


export const initialState: Types.IStateCtxMxState = {
  city: MxStateInfo ? JSON.parse(MxStateInfo).city : names.cityDefaultValue,
  coord: MxStateInfo ? JSON.parse(MxStateInfo).coord : null,
  error: MxStateInfo ? JSON.parse(MxStateInfo).error : '',
};

export const MxStateReducer = (
  state: Types.IStateCtxMxState,
  action: Types.TMxStateActions
) => {
  const { type } = action;
  switch (type) {
    case Types.EMxStateReducer.city: {
      const {
        payload: { city }
      } = action as Types.IMxStateReducerCity;
      return {
        ...state,
        city
      };
    }
    case Types.EMxStateReducer.coord: {
      const {
        payload: { coord }
      } = action as Types.IMxStateReducerCoord;
      return {
        ...state,
        coord
      };
    }
    case Types.EMxStateReducer.update: {
      const {
        payload: { city, coord }
      } = action as Types.IMxStateReducerUpdate;
      return {
        ...state,
        city,
        coord
      };
    }
    case Types.EMxStateReducer.error: {
      const {
        payload: { error }
      } = action as Types.IMxStateReducerError;
      return {
        ...state,
        error
      };
    }
    default: {
      throw new Error('Unhandled action type for MxStateReducer');
      return state;
    }
  }
};
