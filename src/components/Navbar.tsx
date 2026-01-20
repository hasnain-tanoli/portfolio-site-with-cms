'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

interface NavbarProps {
  data: {
    logoText?: string | null
    navLinks?: Array<{ label: string; link: string; id?: string | null }> | null
    ctaText?: string | null
  }
}

export const Navbar = ({ data }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false)

  const links = data.navLinks?.length
    ? data.navLinks
    : [
        { label: 'Home', link: '/' },
        { label: 'About', link: '/#about' },
        { label: 'Projects', link: '/#projects' },
        { label: 'Blog', link: '/blog' },
        { label: 'Contact', link: '/#contact' },
      ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 px-6 py-8 ${
        scrolled
          ? 'py-4 backdrop-blur-xl bg-white/70 dark:bg-stone-950/70 border-b border-stone-200/50 dark:border-stone-800/50 shadow-sm'
          : ''
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 group"
        >
          {data.logoText || 'HT'}
          <span className="text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors">
            .
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.link}
              className="text-sm font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="flex items-center gap-4 border-l border-stone-200 dark:border-stone-800 pl-8">
            <ThemeToggle />
            <a
              href="#contact"
              className="rounded-full bg-stone-900 dark:bg-stone-100 px-8 py-3 text-sm font-bold text-white dark:text-stone-900 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-stone-200 dark:shadow-none"
            >
              {data.ctaText || 'Hire Me'}
            </a>
          </div>
        </div>

        {/* Mobile Toggle (Simple) */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button className="text-stone-900 dark:text-stone-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}
