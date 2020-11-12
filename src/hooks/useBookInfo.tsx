import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios'

const useBookInfo = (bookId: string) => {
  const [oldTitle, setTitle] = useState('')
  const [oldIsbn, setIsbn] = useState('')
  const [oldPublisher, setPublisher] = useState('')
  const [oldPublishYear, setPublishYear] = useState('')
  const [oldQuantity, setQuantity] = useState('')
  const [oldAuthorsState, setAuthors] = useState({authors: []})
  const [oldCategoriesState, setCategories] = useState ({categories: []})

  useEffect(() => {
    const fetchBookInfo = async () => {
      let {data} = await axios.get(
        `https://infinite-bayou-72273.herokuapp.com/api/v1/books/${bookId}`,
        {withCredentials: true}
        )
      setTitle(data.title)
      setIsbn(data.isbn)
      setPublisher(data.publisher)
      setPublishYear(data.publishYear)
      setQuantity(data.quantity)
      setAuthors({authors: data.authors})
      setCategories({categories: data.categories})
    }
    fetchBookInfo()
  }, [bookId])

  return { oldTitle, oldIsbn, oldPublisher, oldPublishYear, oldQuantity, oldAuthorsState, oldCategoriesState }
}
  
export default useBookInfo