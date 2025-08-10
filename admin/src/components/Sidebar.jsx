import React from 'react';
import { NavLink } from 'react-router-dom';
import { sidebarItems } from '../items/sidebarItmes';

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 border-gray-300'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        {sidebarItems.map((item, index) => (
          <NavLink
            key={index}
            className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'
            to={item.link}
          >
            <img className='w-5 h-5' src={item.icon} alt={item.title} />
            <span className='hidden md:block'>{item.title}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
