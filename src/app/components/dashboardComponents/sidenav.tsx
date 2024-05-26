'use client'

import NavLinks from '@/app/components/dashboardComponents/nav-links';
import useUserStore from '../../../../store/authStore';
import { Link } from '@nextui-org/react';
import { IoLogOut } from "react-icons/io5";

export default function SideNav() {
  const { logout } = useUserStore();

  const handleLogOut = () => {
    logout();
  }

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          {/* Aquí puedes poner el logo o título de tu aplicación */}
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <div>
          <Link href={'/'} onClick={handleLogOut} className="flex items-center justify-between h-[48px] w-full gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:justify-start md:p-2 md:px-3">
            <div className="flex items-center">
              <IoLogOut className='w-6 h-6' />
              <span className="hidden md:block ml-2">Cerrar sesión</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
