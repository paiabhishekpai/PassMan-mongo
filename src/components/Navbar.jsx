import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-black text-white '>
      <div className="md:mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo px-4 font-bold ">
        <span className='text-green-500'> &lt;</span>
        <span>Pass</span><span className='text-green-500'>Man/&gt;</span>
        </div>
        <ul className='flex gap-5 justify-between px-3'>
            <li className='cursor-pointer hover:font-bold'>Home</li>
            <li className='cursor-pointer hover:font-bold'>About</li>
            <li className='cursor-pointer hover:font-bold'>Contact</li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
