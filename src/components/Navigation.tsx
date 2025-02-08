'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Mobile menu dropdown

  const isActive = (path: string) => {
    return pathname === path 
      ? 'text-[var(--nav-text-primary)]' 
      : 'text-[var(--nav-text-secondary)] hover:text-[var(--nav-text-primary)]';
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/compress" className="text-xl font-bold text-[var(--nav-text-secondary)]">
              Image Compressor
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href="/compress"
              className={`inline-flex items-center px-5 pt-1 border-b-2 min-w-[100px] text-center justify-center
                ${pathname === '/compress' ? 'border-[var(--nav-border-active)]' : 'border-transparent'}
                ${isActive('/compress')}`}
            >
              Compress
            </Link>
            <Link
              href="/api-docs"
              className={`inline-flex items-center px-5 pt-1 border-b-2 min-w-[100px] text-center justify-center
                ${pathname === '/api-docs' ? 'border-[var(--nav-border-active)]' : 'border-transparent'}
                ${isActive('/api-docs')}`}
            >
              API Docs
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="transition delay-150 duration-300 ease-in-out md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-[var(--nav-text-secondary)] hover:bg-gray-100"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Menu Icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close Icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/compress"
            className={`block px-3 py-2 rounded-md text-base font-medium 
              ${pathname === '/compress' 
                ? 'bg-[var(--nav-bg-hover)] text-[var(--nav-text-primary)]' 
                : 'text-[var(--nav-text-secondary)] hover:bg-[var(--nav-bg-hover)] hover:text-[var(--nav-text-primary)]'
              }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Compress
          </Link>
          <Link
            href="/api-docs"
            className={`block px-3 py-2 rounded-md text-base font-medium 
              ${pathname === '/api-docs' 
                ? 'bg-[var(--nav-bg-hover)] text-[var(--nav-text-primary)]' 
                : 'text-[var(--nav-text-secondary)] hover:bg-[var(--nav-bg-hover)] hover:text-[var(--nav-text-primary)]'
              }`}
            onClick={() => setIsMenuOpen(false)}
          >
            API Docs
          </Link>
        </div>
      </div>
    </nav>
  );
} 