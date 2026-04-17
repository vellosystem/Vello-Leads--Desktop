'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Smartphone, 
  UserCircle, 
  CreditCard, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
  collapsed?: boolean;
}

const SidebarItem = ({ href, icon: Icon, label, active, collapsed }: SidebarItemProps) => {
  return (
    <Link href={href}>
      <div className={cn(
        "flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden",
        active 
          ? "text-white" 
          : "text-subtle-light hover:text-brand-500 dark:text-subtle-dark dark:hover:text-brand-500"
      )}>
        {/* Dynamic Backgrounds */}
        {!active && (
          <div className="absolute inset-0 bg-brand-500/0 group-hover:bg-brand-500/10 transition-colors duration-300 rounded-2xl -z-10" />
        )}
        {active && (
          <motion.div
            layoutId="sidebar-active-pill"
            className="absolute inset-0 bg-brand-500 rounded-2xl -z-10 shadow-md shadow-brand-500/20"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}

        <Icon size={20} className={cn("shrink-0 relative z-10", active ? "text-white" : "transition-transform group-hover:scale-110")} />
        {!collapsed && <span className="font-bold text-sm tracking-wide relative z-10">{label}</span>}
        
        {active && !collapsed && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="ml-auto relative z-10"
          >
            <ChevronRight size={14} className="opacity-70" />
          </motion.div>
        )}
      </div>
    </Link>
  );
};


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/leads', icon: Users, label: 'Leads' },
    { href: '/operators', icon: UserCircle, label: 'Operadores' },
    { href: '/devices', icon: Smartphone, label: 'Dispositivos' },
    { href: '/orders', icon: CreditCard, label: 'Licenças' },
  ];

  return (
    <div className="flex min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300">
      {/* Desktop Sidebar (Floating) */}
      <aside 
        className={cn(
          "hidden md:flex flex-col sticky top-6 ml-6 h-[calc(100vh-3rem)] border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark rounded-3xl shadow-sm transition-all duration-300 z-30 overflow-hidden",
          isCollapsed ? "w-[88px]" : "w-[280px]"
        )}
      >
        <div className={cn("pt-8 pb-6 px-6 flex items-center shadow-none border-b border-border-light/50 dark:border-border-dark/50", isCollapsed ? "justify-center" : "justify-start")}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-brand-500/30 flex-shrink-0">
              V
            </div>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                className="font-black text-2xl tracking-tight text-text-light dark:text-text-dark whitespace-nowrap"
              >
                Vello<span className="text-brand-500">Leads</span>
              </motion.span>
            )}
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <SidebarItem 
              key={item.href}
              {...item}
              active={pathname === item.href}
              collapsed={isCollapsed}
            />
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-border-light/50 dark:border-border-dark/50 bg-muted-light/30 dark:bg-muted-dark/30">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "flex items-center gap-3 w-full p-4 rounded-2xl text-subtle-light hover:bg-muted-light hover:text-text-light dark:text-subtle-dark dark:hover:bg-muted-dark dark:hover:text-text-dark transition-colors",
              isCollapsed && "justify-center"
            )}
            title="Recolher Menu"
          >
            {isCollapsed ? <Menu size={20} className="shrink-0" /> : <X size={20} className="shrink-0" />}
            {!isCollapsed && <span className="text-sm font-bold tracking-wide">Recolher Menu</span>}
          </button>
          
          <button 
             className={cn(
               "flex items-center gap-3 w-full p-4 mt-2 rounded-2xl text-danger-main hover:bg-danger-main/10 transition-colors group",
               isCollapsed && "justify-center"
             )}
             title="Sair"
          >
            <LogOut size={20} className="shrink-0 group-hover:scale-110 transition-transform" />
            {!isCollapsed && <span className="text-sm font-bold tracking-wide">Sair da Conta</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-card-light dark:bg-card-dark border-b border-border-light dark:border-border-dark flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white font-black shadow-sm">V</div>
          <span className="font-bold text-lg tracking-tight text-text-light dark:text-text-dark">Vello<span className="text-brand-500">Leads</span></span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-text-light dark:text-text-dark bg-muted-light dark:bg-muted-dark rounded-xl"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 pt-20 px-4 md:hidden bg-bg-light/95 dark:bg-bg-dark/95 backdrop-blur-xl"
          >
            <nav className="space-y-2 relative">
              {menuItems.map((item) => (
                <div key={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                  <SidebarItem 
                    {...item}
                    active={pathname === item.href}
                  />
                </div>
              ))}
            </nav>
            <div className="absolute bottom-8 left-4 right-4">
               <button className="flex items-center justify-center gap-3 w-full px-4 py-4 text-danger-main bg-danger-main/10 hover:bg-danger-main/20 rounded-2xl font-bold transition-colors">
                <LogOut size={20} />
                <span>Sair da Conta</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 pt-24 md:pt-8 md:pl-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
