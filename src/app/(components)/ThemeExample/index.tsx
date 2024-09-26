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
    </div>
  )
}

export default ThemeExample