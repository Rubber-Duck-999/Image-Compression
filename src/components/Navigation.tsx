'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'text-blue-500' : 'text-gray-600 hover:text-blue-500';
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-800">
                Image Compressor
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 
                  ${pathname === '/' ? 'border-blue-500' : 'border-transparent'}
                  ${isActive('/')}`}
              >
                Home
              </Link>
              <Link
                href="/compress"
                className={`inline-flex items-center px-1 pt-1 border-b-2 
                  ${pathname === '/compress' ? 'border-blue-500' : 'border-transparent'}
                  ${isActive('/compress')}`}
              >
                Compress
              </Link>
              <Link
                href="/api-docs"
                className={`inline-flex items-center px-1 pt-1 border-b-2 
                  ${pathname === '/api-docs' ? 'border-blue-500' : 'border-transparent'}
                  ${isActive('/api-docs')}`}
              >
                API Docs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 