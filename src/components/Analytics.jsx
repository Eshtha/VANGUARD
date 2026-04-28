import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import mockThreats from '../data/mockThreats.json';

export default function Analytics() {
  // Logic: Count threats by severity for the Donut Chart
  const severityCounts = { Critical: 0, High: 0, Medium: 0, Low: 0 };
  mockThreats.forEach(threat => {
    if (severityCounts[threat.severity] !== undefined) {
      severityCounts[threat.severity] += 1;
    }
  });

  const pieData = [
    { name: 'Critical', value: severityCounts.Critical, color: '#ef4444' }, // Red
    { name: 'High', value: severityCounts.High, color: '#f97316' },     // Orange
    { name: 'Medium', value: severityCounts.Medium, color: '#eab308' }, // Yellow
    { name: 'Low', value: severityCounts.Low, color: '#78716c' },       // Muted Gray
  ];

  // Logic: Map individual CVSS scores for the Bar Chart
  const barData = mockThreats.map(threat => ({
    name: threat.cveId,
    cvss: threat.cvssScore
  }));

  // Custom Tooltip to match our dark theme
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dashboard-surface border border-dashboard-muted/20 p-3 rounded-lg shadow-xl">
          <p className="text-dashboard-accent font-medium mb-1">
            {payload[0].name || payload[0].payload.name}
          </p>
          <p className="text-dashboard-highlight font-mono">
            Value: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2">
      <h2 className="text-xl font-bold text-dashboard-accent tracking-wide uppercase border-b border-dashboard-muted/20 pb-4">
        Threat Analytics Matrix
      </h2>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Chart 1: Severity Distribution (Donut) */}
        <div className="bg-dashboard-surface border border-dashboard-muted/20 p-6 rounded-xl h-96 flex flex-col hover:border-dashboard-highlight/30 transition-colors">
          <h3 className="text-sm uppercase tracking-wider text-dashboard-muted mb-4 font-medium">Severity Distribution</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: CVSS Base Scores (Bar) */}
        <div className="bg-dashboard-surface border border-dashboard-muted/20 p-6 rounded-xl h-96 flex flex-col hover:border-dashboard-highlight/30 transition-colors">
          <h3 className="text-sm uppercase tracking-wider text-dashboard-muted mb-4 font-medium">CVSS Base Scores by CVE</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="name" 
                  stroke="#78716C" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="#78716C" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff0a' }} />
                <Bar 
                  dataKey="cvss" 
                  fill="#F59E0B" 
                  radius={[4, 4, 0, 0]} 
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}