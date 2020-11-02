import { useState, useEffect } from 'react'

import { Book } from '../types'

const useCategories = (books: Book[]) => {
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchCategories = () => {
      let stringArray: string[] = []
      let uniqueArray: string[] = []
      books.map((book) => {
        return (stringArray = stringArray.concat(book.categories))
      })
      stringArray.map((value) => {
        if (uniqueArray.indexOf(value) === -1) {
          uniqueArray.push(value)
        }
        return uniqueArray
      })
      setCategories(uniqueArray)
    }
    fetchCategories()
  }, [books])

  return { categories }
}

export default useCategories