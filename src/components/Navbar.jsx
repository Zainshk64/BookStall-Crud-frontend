import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar px-20 flex items-center justify-between p-4 bg-gray-800 text-white">
        <h1 className=' text-2xl'>Logo</h1>
        <ul className='flex space-x-4'>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <button className='bg-blue-500 px-4 text-lg py-2 rounded'>
            Login
        </button>
    </div>
  )
}

export default Navbar