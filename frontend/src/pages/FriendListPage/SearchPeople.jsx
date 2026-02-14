import React from 'react'
import { IoSearch } from "react-icons/io5";

const SearchPeople = ({getPeoples, setPeopleList}) => {
  const handleSearchInput = (e)=>{
    console.log(getPeoples);
    console.log(e.target.value);

    // Filter Data
    const filterResult = getPeoples.filter((people) => {
      const Pname = people.firstName+" "+people.serName;
      return Pname.toLowerCase().startsWith(e.target.value);
    })

    setPeopleList(filterResult);


  }
  return (
    <div className='w-full flex justify-center items-center'>
        <form className="w-full  relative flex justify-center items-center gap-2 md:gap-5">
          <div className='relative w-full max-w-200 flex justify-center items-center'>
            <div className='text-xl absolute left-5 text-[#9a9a9a]'><IoSearch/></div>
            <input  onChange={handleSearchInput} className='w-full text-[0.8em] md:text-xl  outline-none bg-[#ababab32]  md:py-2 px-12 py-1 rounded-full border border-[#898989a1]' type="text" placeholder='Search people...'/>
          </div>
            <button className='active:scale-95 bg-[#4b8ad7ab]  md:px-10 md:py-2 px-5 py-1 text-white rounded-full'>Search</button>
        </form>
    </div>
  )
}

export default SearchPeople
