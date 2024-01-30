import { useState, useEffect } from "react"

import { checkIfExists } from "utils/general"

export default function useLocalStorage(key) {
  const [value, setValue] = useState()

  useEffect(() => {
    const storedValue = localStorage.getItem(key)
    if (checkIfExists(storedValue)) setValue(JSON.parse(storedValue))
  }, [key])

  useEffect(() => {
    if (checkIfExists(value)) localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
