import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import style from './SearchTrips.module.css'

const SearchTrips = ({ setSearch }) => {
    const [searchTerm, setSearchTerm] = useState("")
    const handleSubmit = (e)=> {
        e.preventDefault();
        setSearch(searchTerm)
    }
  return (
    <form onSubmit={handleSubmit} className={style.searchForm}>
        <input onChange={e => setSearchTerm(e.target.value)} className={style.searchForm__input} type="text" placeholder='Search by country or logger' name="search" id="" />
        <button className={style.searchForm__submit} type='submit'><BsSearch/></button>
    </form>
  )
}

export default SearchTrips