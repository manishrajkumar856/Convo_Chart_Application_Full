import React from 'react'

const SearchMaterial = ({peoples}) => {

  return (
    <div className='absolute top-12 z-100 left-0 min-w-100 px-2 py-3 shadow shadow-[#a7a7a7] bg-[#ffffff] flex justify-center flex-col items-center gap-3 rounded-xl'>
        {
            peoples && peoples.map((people)=>{
                return <div className='w-full px-2 py-1 rounded-2xl hover:bg-[#60a1c43c] flex items-center justify-start  gap-3'>
                    <div className='w-10 h-10 bg-[#b615159f] rounded-full overflow-hidden flex items-center justify-center'>
                        {
                            people.profilePicInfo?.profileUrl && <img className='w-full h-full object-cover' src={people.profilePicInfo.profileUrl} alt="" />
                        }
                        {
                            !people.profilePicInfo?.profileUrl && <div className='w-full flex text-white text-xl font-semibold justify-center items-center'>{people.firstName.split("")[0]}</div>
                        }
                    </div>

                    <h3>{people.firstName +" "+ people.serName}</h3>
                </div>
            })
        }

        {
            peoples.length<=0 && <div className='text-[#636262]'>
                No serch result found
            </div>
        }
    </div>
  )
}

export default SearchMaterial