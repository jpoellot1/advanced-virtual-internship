'use client'
import {useState, useEffect} from 'react'
import { GoSearch } from "react-icons/go";
import { CiMenuBurger } from "react-icons/ci";
import Image from 'next/image';
import Logo from "../Assets/logo.png"
import { useGetSearchBooksQuery } from '../Redux/apiSlice';
import { AudioPlayerProps } from '../types';
import SearchBookCard from './searchBookCard';
import { useAppDispatch } from '../Redux/lib/hooks';
import { toggleSidebar } from '../Redux/sidebarSlice';

export default function SearchBar() {
    const [searchValue, setSearchValue] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchValue.trim())
        }, 300);

        return () => clearTimeout(handler)
    }, [searchValue])

    const {data : searchBooks, isError, isLoading} = useGetSearchBooksQuery(debouncedSearch, {skip: !debouncedSearch})

  return (
    <div className="search__background">
      <div className="search__wrapper">
        <figure className="search__img--mask search__img--hidden">
          <Image src={Logo} alt="logo" className="search__img" />
        </figure>
        <div className="search__content">
          <div className="search">
            <div className="search__input--wrapper">
              <input
                id="search"
                type="text"
                className="search__input"
                placeholder="Search for books"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <div className="search__icon">
                <GoSearch />
              </div>
            </div>
          </div>
          <div className="sidebar__toggle--btn" onClick={() => dispatch(toggleSidebar())}>
            <CiMenuBurger />
          </div>
        </div>
        {debouncedSearch && (
          <div className="search__books--wrapper">
            {isLoading && <div>Loading books...</div>}
            
            {isError && <div>Error fetching books.</div>}

            {!isLoading && searchBooks && searchBooks.length === 0 && (
              <div>No books found</div>
            )} 
        {!isLoading && (
            searchBooks?.map((searchBook: AudioPlayerProps) => (
              <SearchBookCard
                key={searchBook.id}
                audioLink={searchBook.audioLink}
                imageLink={searchBook.imageLink}
                title={searchBook.title}
                author={searchBook.author}
                id={searchBook.id}
              />
            )))}
          </div>
        )}
      </div>
    </div>
  );
}
