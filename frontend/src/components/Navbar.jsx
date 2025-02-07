import React, { useState } from 'react'
import Button from './button/Button';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = ({setUser}) => {

    // console.log("navbar menerima setUser", setUser)

    if(!setUser || typeof setUser !== 'function'){
        console.error("Error: setUser is not defined");
        return null;
    }
    
    let [open, setOpen] = useState(false);
    const navigate = useNavigate();
    
    let Links = [
        {name: "Home", link: "/dashboard"},
        {name: "About", link:"/about"},
        {name: "Contact", link:"/contact"},
        {name: "History", link:"/history"}
    ];
    const handleLogout = async () => {
        // console.log("Logout clicked");
        try {
            const response = await fetch('http://localhost:5000/logout', { method: 'POST', credentials: 'include' });
            
            if (response.ok) {
                // console.log('Logout clear token');
                localStorage.removeItem('token');
                if(setUser && typeof setUser === 'function'){
                    setUser(null);
                    // console.log('User set to null');
                } else {
                    console.error("Error: setUser is not a function");
                }
                navigate('/login');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error saat logout:', error);
        }
    }

  return (
    <div className='shadow-md w-full fixed top-0 left-0'>
        <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
            <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
                <span className='text-3xl text-indigo-600 mr-1 pt-2'>
                <ion-icon name="water-outline"></ion-icon>
                </span>
                Pandaikali
            </div>

            <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
                <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
            </div>
            <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-slate-200 md:bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 opacity-100' : 'top-[-490px]'} md:opacity-100 opacity-0`}>
            {
                Links.map((link) => (
                    <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
                        <Link to={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</Link>
                    </li>
                ))
            }
            <Button onClick={handleLogout} className="bg-indigo-600 text-white font[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 duration-500 cursor-pointer">
                Logout
            </Button>
            </ul>
        </div>
    </div>
  )
}

export default Navbar;