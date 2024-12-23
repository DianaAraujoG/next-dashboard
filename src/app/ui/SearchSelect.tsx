"use client"

import React from "react";
import { useState } from "react";
import { useMxStateDispatch, useMxStateState } from "../context/mxState";
import { names } from "../config/names";
import * as Types from "@/types";

export interface ISearchSelectProps {
  optionsStates: string[];
}

const SearchSelect = ({optionsStates}: ISearchSelectProps) => {
  const MxState = useMxStateState();
  const dispatch = useMxStateDispatch();

  const [city, setCity] = useState<string>("");
  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false)

  const filteredOptions = optionsStates.filter((option) =>
    option.toLowerCase().includes(city.toLowerCase())
  );

  const storeStateInfo= (payload: Types.IStateCtxMxState): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        names.storageKeys.MxStateInfo,
        JSON.stringify(payload)
      );
    }
  };

  const handleSearch = async () => {
    const payload: Types.IStateCtxMxState =  {...MxState, city}
    storeStateInfo(payload);
    dispatch({
      type: Types.EMxStateReducer.city,
      payload
    });
  };

  return (
    <div className="w-full mx-auto mt-4" data-testid='searchSelect-component'>
      <h1 className="text-3xl mb-4">Clima de {MxState.city} 🌤️</h1>
      <div className="flex flex-wrap md:flex-nowrap ">
        <input
          type="text"
          id="search-select"
          placeholder="Busca un estado..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onClick={()=> setIsOpenSelect(!isOpenSelect)}
          className="w-full px-3 py-2 mt-1 border rounded-l-lg rounded-r-lg md:rounded-r-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
        />
        <button onClick={() => setCity('')} className="max-w-80 min-w-36 bg-sky-950 rounded-l-lg md:rounded-l-none text-white px-3 py-2 mt-1">
          Limpiar
        </button>
        <button onClick={handleSearch} className="max-w-80 min-w-36 bg-blue-500 text-white px-3 py-2 mt-1 rounded-r-lg">
          Buscar
        </button>
      </div>
      <ul className={`absolute z-10 mt-1 bg-white border rounded-lg shadow-md max-h-40 overflow-auto dark:bg-gray-700 ${!isOpenSelect && 'hidden'}`}>
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer dark:bg-gray-700 dark:hover:bg-blue-700"
              onClick={() => {setCity(option) 
                setIsOpenSelect(false)}}
            >
              {option}
            </li>
          ))
        ) : (
          <li className="px-4 py-2 text-gray-500">Sin resultados</li>
        )}
      </ul>
    </div>
  );
};

export default SearchSelect;
