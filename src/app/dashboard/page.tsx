"use client"

import React, { useEffect, useState } from 'react'
 
const Dashboard = () => {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    fetch("/api/whoAmI")
      .then((res) => res.json())
      .then((data) => setName(data.name))
  }, []);

  return (
    <h1 className="text-4xl font-medium">Dashboard Page: {name}</h1>
  )
}
 
export default Dashboard