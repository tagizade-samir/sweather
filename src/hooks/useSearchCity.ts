import {useState} from 'react'

import {useDebounce} from './useDebounce'
import {Api} from '../services/api'

export const useSearchCity = <T>() => {
  const [value, setValue] = useState('')
  const [result, setResult] = useState<T[]>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChangeSearch = (text: string) => {
    setValue(text)
  }

  useDebounce(
    async () => {
      if (value) {
        try {
          setLoading(true)
          const result = await Api.searchCity(value)
          setResult(result)
        } catch (e) {
          setError(true)
          console.log(e)
        } finally {
          setLoading(false)
        }
      }
    },
    [value],
    500
  )

  return {value, handleChangeSearch, result, error, loading}
}
