import React from 'react'

const DatePicker = ({ option, type, names, values, getSignupData, setSignupData}) => {

  const handleChange2 = (event)=>{
    console.log("Sat",getSignupData);
    console.log(setSignupData);
    console.log(event.target.name)
    console.log(event, "Sfdksklfjsl");

    setSignupData(()=>{
      return {...getSignupData, dob: {...getSignupData.dob, [event.target.name]:event.target.value}};
    })
    
  }

  return (
    <div className='w-full px-3 outline-none border border-[#848181] rounded-xl'>
        <select name={names} value={values} className='w-full py-[0.6em] outline-none' onChange={handleChange2} >
            <option className='w-full  ' value={""}>{type}</option>

            {option.map((d)=>(
                <option className='w-full outline-none' key={d} value={d} >{d}</option>
            ))}


        </select>
    </div>
  )
}

export default DatePicker