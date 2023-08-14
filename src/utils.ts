import React from "react"

export const validateNumber = (
  event: React.KeyboardEvent<HTMLInputElement>,
) => {
  const validateNumber = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "Backspace",
    "Tab",
  ]
  if (!validateNumber.includes(event.key)) {
    event.preventDefault()
  }
}

export const httpRequest = async (
  methodType: string,
  uri: string,
  data?: any,
) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_SERVER}/api${uri}`, {
      method: methodType,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json())
    return res
  } catch (error) {
    console.log(error)
  }
}

export const TABLE_ROWS = [
  {
    name: "John Michael",
    email: "john@creative-tim.com",
    phone: "08282812818",
    address: "Jalan sekitar indonesia",
  },
  {
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    phone: "0393928989123",
    address: "jalan jalan mulu",
  },
  {
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    phone: "0830239022",
    address: "jalan jalan mulu",
  },
  {
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    phone: "09829128918",
    address: "Jalan sekitar indonesia",
  },
  {
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    phone: "0281928197",
    address: "jalan jalan mulu",
  },
]
