import { useState, useEffect } from "react"

export default function useLocalStorage(key) {
  const [value, setValue] = useState()

  useEffect(() => {
    const storedValue = localStorage.getItem(key)
    if (storedValue) setValue(JSON.parse(storedValue))
  }, [key])

  useEffect(() => {
    if (value) localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
