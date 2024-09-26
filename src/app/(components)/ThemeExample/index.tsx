"use client"

import { useAppContext } from '@/app/context/AppContext';
import React from 'react'

const ThemeExample = () => {
  const { state, dispatch } = useAppContext();
    
  return (
    <div>ThemeExample

      <button onClick={() => {
        dispatch({type: "add_number", value: 3 });
      }}>Set app state</button>

      <br />
      <br />
      <hr />

      <h1>Number: {state.number}</h1>
    </div>
  )
}

export default ThemeExample