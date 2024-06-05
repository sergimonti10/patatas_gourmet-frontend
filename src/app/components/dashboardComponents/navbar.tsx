'use client'

import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Image, Divider, Tooltip, Dropdown, DropdownTrigger, Avatar, DropdownItem, DropdownMenu, Badge } from '@nextui-org/react';
import { IoMdHome } from 'react-icons/io';
import { FaShop } from 'react-icons/fa6';
import { IoCart } from 'react-icons/io5';
import { TbTruckDelivery } from "react-icons/tb";
import { MdAdminPanelSettings } from 'react-icons/md';
import { IoLogOut } from 'react-icons/io5';
import useUserStore from '../../../../store/authStore';
import useCartStore from '../../../../store/cartStore';
import { usePathname } from 'next/navigation';
import { FaUser } from "react-icons/fa";
import { IMAGE_USERS_BASE_URL, USER_ID_BASE_URL } from '@/services/links';
import { fontClasses } from '../fonts';

export default function NavBar() {
    const pathname = usePathname();
    const { user, token, logout, role } = useUserStore();
    const cartCount = useCartStore(state => state.cart.length);
    const initialLinks = [
        { name: 'Menú', href: '/dashboard', icon: IoMdHome },
        { name: 'Tienda', href: '/dashboard/store', icon: FaShop },
    ];

    const [links, setLinks] = useState(initialLinks);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [imgUser, setImgUser] = useState("/images/user.png");

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${USER_ID_BASE_URL}${user.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los datos del usuario');
                }

                const data = await response.json();
                if (data.image) {
                    setImgUser(`${IMAGE_USERS_BASE_URL}${data.image}`);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        if (user && user.id) {
            fetchUser();
        }
    }, [user, token]);

    useEffect(() => {
        if (user) {
            setLinks((prevLinks) => {
                if (!prevLinks.find(link => link.name === 'Carrito')) {
                    return [...prevLinks, { name: 'Carrito', href: '/dashboard/shopping', icon: IoCart }];
                }
                if (!prevLinks.find(link => link.name === 'Pedidos')) {
                    return [...prevLinks, { name: 'Pedidos', href: '/dashboard/orders', icon: TbTruckDelivery }];
                }
                return prevLinks;
            });
        }
    }, [user]);

    useEffect(() => {
        if (user && role && role.includes('super-admin')) {
            setLinks((prevLinks) => {
                if (!prevLinks.find(link => link.name === 'Admin')) {
                    return [...prevLinks, { name: 'Admin', href: '/dashboard/admin', icon: MdAdminPanelSettings }];
                }
                return prevLinks;
            });
        }
    }, [user, role]);

    const handleLogOut = () => {
        logout();
    }

    return (
        <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className='bg-amber-950 rounded-b-full'>
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className='text-amber-100' />
            </NavbarContent>

            <NavbarContent className="sm:hidden mr-3" justify="center">
                <NavbarBrand>
                    <Link href='/' className='cursor-pointer'>
                        <Image
                            isBlurred
                            width={70}
                            className="m-5"
                            src="/images/logo.png"
                            alt="Patatas Gourmet"
                        />
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex lg:flex-1 gap-4 mx-auto" justify="start">
                <NavbarBrand className='lg:mr-10'>
                    <Link href='/' className='cursor-pointer'>
                        <Image
                            isBlurred
                            width={40}
                            className="m-5"
                            src="/images/logo.png"
                            alt="Patatas Gourmet"
                        />
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex lg:flex-2 gap-4" justify="start">
                {links.map((link, index) => (
                    <React.Fragment key={link.name}>
                        {index > 0 && <Divider orientation='vertical' className='h-1/2' />}
                        <NavbarItem className='text-amber-100'>
                            <Tooltip content={link.name} placement="bottom" className="block md:hidden">
                                <Link href={link.href} className={`flex flex-col items-center mx-2 p-1 rounded-lg ${pathname === link.href ? 'shadow-glow-amber' : ''}`}>
                                    {link.name === 'Carrito' ? (
                                        <Badge
                                            content={cartCount}
                                            color="warning"
                                            variant="solid"
                                            isInvisible={cartCount === 0}
                                            placement="top-right"
                                            shape="circle"
                                        >
                                            {React.createElement(link.icon, { className: 'w-6 h-6 mb-1' })}
                                        </Badge>
                                    ) : (
                                        React.createElement(link.icon, { className: 'w-6 h-6 mb-1' })
                                    )}
                                    <span className="hidden md:block">{link.name}</span>
                                </Link>
                            </Tooltip>
                        </NavbarItem>
                    </React.Fragment>
                ))}
            </NavbarContent>

            {mounted && user && (
                <NavbarContent as="div" justify="end">
                    <Dropdown placement="bottom-end" className='bg-amber-50'>
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="warning"
                                name={`${user.name} ${user.surname}`}
                                size="sm"
                                src={imgUser}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat" className='text-amber-950'>
                            <DropdownItem key="profile" className="h-14 gap-2 cursor-default">
                                <p className="font-semibold">{user.name} {user.surname}</p>
                                <p className="font-semibold">{user.email}</p>
                            </DropdownItem>
                            <DropdownItem key="settings">
                                <Link href={`/dashboard/userProfile/${user.id}`}>
                                    <FaUser className='w-4 h-4 mr-2' />
                                    Mi perfil
                                </Link>
                            </DropdownItem>
                            <DropdownItem key="logout" color="danger">
                                <Link href="/" onClick={handleLogOut}>
                                    <IoLogOut className='w-4 h-4 mr-2' />
                                    Cerrar sesión
                                </Link>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            )}

            <NavbarMenu className='text-amber-950'>
                {links.map((link, index) => (
                    <NavbarMenuItem key={`${link.name}-${index}`}>
                        <Link className={`w-full text-xl ${fontClasses['font-pinyon']}`} href={link.href} size="lg">
                            {link.name === 'Carrito' ? (
                                <Badge
                                    content={cartCount}
                                    color="warning"
                                    variant="solid"
                                    isInvisible={cartCount === 0}
                                    placement="top-right"
                                    shape="circle"
                                >
                                    {React.createElement(link.icon, { className: 'w-8 h-8 mr-2' })}
                                </Badge>
                            ) : (
                                React.createElement(link.icon, { className: 'w-8 h-8 mr-2' })
                            )}
                            {link.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
