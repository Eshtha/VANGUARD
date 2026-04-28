import { Link, useLocation } from 'react-router-dom';
import { Shield, Activity, BarChart3, Settings } from 'lucide-react';

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-dashboard-base text-dashboard-accent overflow-hidden font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-dashboard-surface border-r border-dashboard-muted/20 flex flex-col">
        {/* Logo Area */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-dashboard-muted/20">
          <Shield className="text-dashboard-highlight w-6 h-6" />
          <h1 className="text-lg font-bold tracking-widest text-white">VANGUARD</h1>
        </div>
        
        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            to="/" 
            className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-colors ${
              useLocation().pathname === '/' 
                ? 'bg-dashboard-highlight/10 text-dashboard-highlight' 
                : 'text-dashboard-muted hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity className="w-5 h-5" />
            Live Threats
          </Link>
          <Link 
            to="/analytics" 
            className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-colors ${
              useLocation().pathname === '/analytics' 
                ? 'bg-dashboard-highlight/10 text-dashboard-highlight' 
                : 'text-dashboard-muted hover:text-white hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Analytics
          </Link>
        </nav>

        {/* Bottom Settings */}
        <div className="p-4 border-t border-dashboard-muted/20">
          <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-dashboard-muted hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
            System Config
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Bar */}
        <header className="h-16 border-b border-dashboard-muted/20 flex items-center justify-between px-8 bg-dashboard-base">
          <h2 className="text-sm tracking-wider text-dashboard-muted font-medium uppercase">Global Security Feed</h2>
          <div className="w-8 h-8 rounded-full bg-dashboard-surface border border-dashboard-highlight/50 cursor-pointer hover:bg-dashboard-highlight/20 transition-colors"></div>
        </header>
        
        {/* The Dashboard Canvas */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
        
      </main>
    </div>
  );
}