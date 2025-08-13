
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Home, 
  Calculator, 
  FileText, 
  LayoutDashboard, 
  Users, 
  Building2,
  Menu,
  Phone,
  Mail,
  Newspaper,
  Sun,
  Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Home", url: createPageUrl("LandingPage"), icon: Home },
  { title: "Compare Loans", url: createPageUrl("CompareLoans"), icon: Calculator },
  { title: "Apply Now", url: createPageUrl("ApplicationForm"), icon: FileText },
  { title: "News & Updates", url: createPageUrl("News"), icon: Newspaper },
];

const adminItems = [
  { title: "Dashboard", url: createPageUrl("AdminDashboard"), icon: LayoutDashboard },
  { title: "Users", url: createPageUrl("AdminUsers"), icon: Users }, // Added Users item with Users icon
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const isAdminPage = location.pathname.startsWith(createPageUrl("AdminDashboard")) || location.pathname.startsWith(createPageUrl("AdminUsers")); // Updated to include AdminUsers

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-slate-200/60 dark:border-slate-700/60">
        <Link to={createPageUrl("LandingPage")} className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg transform rotate-[-15deg]">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Andromeda</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Loan Distribution</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {(isAdminPage ? adminItems : navigationItems).map((item) => (
          <Link
            key={item.title}
            to={item.url}
            onClick={() => setIsSidebarOpen(false)}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
              location.pathname === item.url
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="font-semibold">{item.title}</span>
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-200/60 dark:border-slate-700/60">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 text-center">
            <h4 className="font-bold text-slate-800 dark:text-white">Need Help?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 mb-3">Contact our expert team for guidance.</p>
            <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <a href="tel:+918882533792"><Phone className="w-4 h-4 mr-2"/>Contact Us</a>
            </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen flex w-full bg-slate-50 dark:bg-slate-900 transition-colors duration-300`}>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 border-r border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-50 transform lg:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)}></div>
        <div className="relative w-72 h-full bg-white dark:bg-slate-900 shadow-2xl">
          <SidebarContent />
        </div>
      </div>

      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800 px-6 py-4 sticky top-0 z-40">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-slate-700 dark:text-slate-200" />
          </Button>
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              <Sun className="w-5 h-5 text-slate-700 dark:text-slate-200 hidden dark:block" />
              <Moon className="w-5 h-5 text-slate-700 dark:text-slate-200 block dark:hidden" />
            </Button>
             <Link to={createPageUrl(isAdminPage ? 'LandingPage' : 'AdminDashboard')}>
                <Button variant="outline" className="hidden sm:flex">
                  {isAdminPage ? "View Site" : "Admin Panel"}
                </Button>
            </Link>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
