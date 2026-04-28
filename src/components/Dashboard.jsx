import { useState } from 'react';
import { Search, Filter, ShieldAlert, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import mockThreats from '../data/mockThreats.json';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('All');

  // SOP Requirement: Search & Filter Logic
  const filteredThreats = mockThreats.filter((threat) => {
    const matchesSearch = threat.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          threat.cveId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          threat.affectedSystem.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = filterSeverity === 'All' || threat.severity === filterSeverity;
    
    return matchesSearch && matchesSeverity;
  });

  // UI Helpers for Threat Badges
  const getSeverityStyles = (severity) => {
    switch(severity) {
      case 'Critical': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'High': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Low': return 'bg-dashboard-muted/20 text-dashboard-accent border-dashboard-muted/30';
      default: return 'bg-dashboard-muted/10 text-dashboard-muted border-transparent';
    }
  };

  const getSeverityIcon = (severity) => {
    switch(severity) {
      case 'Critical': return <ShieldAlert className="w-4 h-4" />;
      case 'High': return <AlertTriangle className="w-4 h-4" />;
      case 'Medium': return <AlertCircle className="w-4 h-4" />;
      case 'Low': return <Info className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      
      {/* Control Panel: Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between gap-4 p-4 rounded-xl border border-dashboard-muted/20 bg-dashboard-surface">
        
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dashboard-muted" />
          <input 
            type="text" 
            placeholder="Search CVEs, systems, or threats..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-dashboard-base border border-dashboard-muted/20 rounded-lg focus:outline-none focus:border-dashboard-highlight text-dashboard-accent transition-colors"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative flex items-center gap-2">
          <Filter className="w-5 h-5 text-dashboard-muted" />
          <select 
            value={filterSeverity} 
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="appearance-none bg-dashboard-base border border-dashboard-muted/20 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:border-dashboard-highlight text-dashboard-accent cursor-pointer"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

      </div>

      {/* The Data Grid */}
      <div className="flex-1 overflow-auto rounded-xl border border-dashboard-muted/20 bg-dashboard-surface">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-dashboard-muted/20 text-dashboard-muted text-sm uppercase tracking-wider bg-dashboard-base/50">
              <th className="p-4 font-medium">Threat ID</th>
              <th className="p-4 font-medium">Vulnerability</th>
              <th className="p-4 font-medium">System Affected</th>
              <th className="p-4 font-medium">Severity</th>
              <th className="p-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dashboard-muted/10">
            {filteredThreats.length > 0 ? (
              filteredThreats.map((threat) => (
                <tr key={threat.id} className="hover:bg-dashboard-base/50 transition-colors group">
                  <td className="p-4 font-mono text-sm text-dashboard-highlight">{threat.cveId}</td>
                  <td className="p-4">
                    <p className="font-medium text-white">{threat.title}</p>
                    <p className="text-sm text-dashboard-muted mt-1">{threat.id}</p>
                  </td>
                  <td className="p-4 text-dashboard-accent">{threat.affectedSystem}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getSeverityStyles(threat.severity)}`}>
                      {getSeverityIcon(threat.severity)}
                      {threat.severity}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-dashboard-muted flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${threat.status === 'Active' ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                      {threat.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-8 text-center text-dashboard-muted">
                  No threats matched your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}