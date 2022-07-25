import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import style from './SearchTrips.module.css'

const SearchTrips = ({ setSearch }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(searchTerm)
  }
  const emptyInputField = () => {
    setSearchTerm('')
    setSearch('')
  }
  return (
    <form onSubmit={handleSubmit} className={style.searchForm}>
      <div className={style.searchForm__inputContainer}>
        <input onChange={e => setSearchTerm(e.target.value)} value={searchTerm} className={style.searchForm__input} type="text" placeholder='Search by country or logger' name="search" id="" />
        {
          searchTerm
            ? <AiOutlineClose onClick={emptyInputField} className={style.searchForm__x} />
            : ''
        }
      </div>
      <button className={style.searchForm__submit} type='submit'><BsSearch /></button>
    </form>
  )
}

export default SearchTrips