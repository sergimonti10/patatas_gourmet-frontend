'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMdHome } from 'react-icons/io';
import { FaShop } from 'react-icons/fa6';
import { IoCart } from 'react-icons/io5';
import { MdAdminPanelSettings } from 'react-icons/md';
import useUserStore from '../../../../store/authStore';

export default function NavLinks() {
  const pathname = usePathname();
  const { user, role } = useUserStore();
  const initialLinks = [
    { name: 'Menú principal', href: '/dashboard', icon: IoMdHome },
    { name: 'Tienda', href: '/dashboard/store', icon: FaShop },
    { name: 'Carrito de compra', href: '/dashboard/delivers', icon: IoCart },
  ];

  const [links, setLinks] = useState(initialLinks);

  useEffect(() => {
    if (user && role && role.includes('super-admin')) {
      setLinks((prevLinks) => {
        if (!prevLinks.find(link => link.name === 'Admin Panel')) {
          return [...prevLinks, { name: 'Admin Panel', href: '/dashboard/admin', icon: MdAdminPanelSettings }];
        }
        return prevLinks;
      });
    }
  }, [user, role]);

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 ${pathname === link.href ? 'bg-sky-100 text-blue-600' : ''}`}
          >
            <LinkIcon className="w-6 h-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
