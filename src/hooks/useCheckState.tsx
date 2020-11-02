import { useState, useEffect } from 'react'

type CheckState = {
  [key: string]: boolean
}

const useCheckState = (categories: string[]) => {
  const [checkState, setCheckState] = useState<CheckState>({})
  useEffect(() => {
    const createCheckState = async () => {
      let whatever = await categories.reduce(
        (acc, cur) => ({
          ...acc,
          [cur]: false,
        }),
        {}
      )
      setCheckState(whatever)
    }
    createCheckState()
  }, [categories])

  return { checkState }
}

export default useCheckState