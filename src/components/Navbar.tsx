
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Search, 
  Menu, 
  X,
  UserCircle,
  MessageSquare,
  Calendar
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<'student' | 'faculty' | 'public'>('student');

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <BookOpen className="h-8 w-8 text-academy-600" />
              <span className="ml-2 text-xl font-bold text-academy-900">Scholar Nexus</span>
            </Link>
          </div>

          {/* Search bar (hidden on mobile) */}
          <div className="hidden md:flex md:items-center md:w-1/3 lg:w-1/2">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input 
                type="text" 
                placeholder="Search for resources..." 
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Main navigation (hidden on mobile) */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/browse" className="text-gray-600 hover:text-academy-600 px-3 py-2 rounded-md text-sm font-medium">
              Browse
            </Link>
            <Link to="/forum" className="text-gray-600 hover:text-academy-600 px-3 py-2 rounded-md text-sm font-medium">
              Forums
            </Link>
            <Link to="/request" className="text-gray-600 hover:text-academy-600 px-3 py-2 rounded-md text-sm font-medium">
              Request
            </Link>
            
            {/* User dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <UserCircle className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  Account
                  <div className="text-xs font-normal text-muted-foreground">
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile" className="flex w-full">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/bookmarks" className="flex w-full">Bookmarks</Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onSelect={() => {
                    // Cycle through roles for demo purposes
                    if (userRole === 'student') setUserRole('faculty');
                    else if (userRole === 'faculty') setUserRole('public');
                    else setUserRole('student');
                  }}
                >
                  Change Role
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="pt-2 pb-3 space-y-1 px-4">
            {/* Search bar on mobile */}
            <div className="relative mb-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input 
                type="text" 
                placeholder="Search for resources..." 
                className="pl-10 w-full"
              />
            </div>
            
            <Link 
              to="/browse" 
              className="flex items-center text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BookOpen className="mr-3 h-5 w-5" />
              Browse
            </Link>
            
            <Link 
              to="/forum" 
              className="flex items-center text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MessageSquare className="mr-3 h-5 w-5" />
              Forums
            </Link>
            
            <Link 
              to="/request" 
              className="flex items-center text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Calendar className="mr-3 h-5 w-5" />
              Request
            </Link>
            
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <UserCircle className="h-10 w-10 text-gray-400" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">Demo User</div>
                  <div className="text-sm font-medium text-gray-500">
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link 
                  to="/bookmarks" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Bookmarks
                </Link>
                <button 
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50"
                  onClick={() => {
                    // Cycle through roles for demo purposes
                    if (userRole === 'student') setUserRole('faculty');
                    else if (userRole === 'faculty') setUserRole('public');
                    else setUserRole('student');
                  }}
                >
                  Change Role
                </button>
                <button 
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
