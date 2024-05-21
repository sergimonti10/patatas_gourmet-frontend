import { Montserrat } from 'next/font/google';
import { Roboto } from 'next/font/google';
import { Josefin_Sans } from 'next/font/google';
import { Dancing_Script } from 'next/font/google';
import { Caveat } from 'next/font/google';
import { Parisienne } from 'next/font/google';
import { Unna } from 'next/font/google';
import { Pinyon_Script } from 'next/font/google';
import { Satisfy } from 'next/font/google';



export const pinyon = Pinyon_Script({ subsets: ['latin'], weight: '400' })
export const parisienne = Parisienne({ subsets: ['latin'], weight: '400' })
export const roboto = Roboto({ subsets: ['latin'], weight: '400' })
export const josefin = Josefin_Sans({ subsets: ['latin'], weight: '400' })
export const caveat = Caveat({ subsets: ['latin'], weight: '400' })
export const montserrat = Montserrat({ subsets: ['latin'], weight: '400' })
export const dancing = Dancing_Script({ subsets: ['latin'], weight: '400' })
export const unna = Unna({ subsets: ['latin'], weight: '400' })
export const satisfy = Satisfy({ subsets: ['latin'], weight: '400' })

export const fontClasses = {
    'font-pinyon': pinyon.className,
    'font-parisienne': parisienne.className,
    'font-roboto': roboto.className,
    'font-josefin': josefin.className,
    'font-caveat': caveat.className,
    'font-montserrat': montserrat.className,
    'font-dancing': dancing.className,
    'font-unna': unna.className,
    'font-satisfy': satisfy.className,
};