
import React from "react";
import { cn } from "@/lib/utils";
import { BarChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart } from "recharts";
import { BarChart3, TrendingUp, Clock } from "lucide-react";

interface PerformanceDashboardProps {
  className?: string;
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({ className }) => {
  // Sample data for charts
  const alertData = [
    { name: "00:00", value: 12 },
    { name: "02:00", value: 8 },
    { name: "04:00", value: 5 },
    { name: "06:00", value: 10 },
    { name: "08:00", value: 22 },
    { name: "10:00", value: 18 },
    { name: "12:00", value: 23 },
    { name: "14:00", value: 15 },
    { name: "16:00", value: 21 },
    { name: "18:00", value: 19 },
    { name: "20:00", value: 27 },
    { name: "22:00", value: 15 },
  ];

  const threatTypeData = [
    { name: "Malware", value: 45 },
    { name: "Phishing", value: 32 },
    { name: "Intrusion", value: 28 },
    { name: "DDoS", value: 15 },
    { name: "Data Exfil", value: 21 },
  ];

  const responseTimeData = [
    { name: "Mon", value: 3.2 },
    { name: "Tue", value: 2.8 },
    { name: "Wed", value: 4.1 },
    { name: "Thu", value: 3.5 },
    { name: "Fri", value: 2.9 },
    { name: "Sat", value: 3.8 },
    { name: "Sun", value: 3.3 },
  ];

  return (
    <div className={cn("glass h-full flex flex-col", className)}>
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <h3 className="text-sm font-semibold text-white/90 flex items-center">
          <BarChart3 className="h-4 w-4 mr-2" />
          Security Performance
        </h3>
      </div>
      
      <div className="flex-1 p-3 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass rounded-md p-3 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-medium text-white/90 flex items-center">
              <TrendingUp className="h-3.5 w-3.5 mr-1 text-blue-400" />
              Alert Volume (24h)
            </h4>
          </div>
          <div className="flex-1 mt-1">
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={alertData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorAlert" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="name"
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
                  stroke="rgba(255,255,255,0.1)"
                />
                <YAxis 
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
                  stroke="rgba(255,255,255,0.1)"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.7)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#colorAlert)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="glass rounded-md p-3 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-medium text-white/90 flex items-center">
              <BarChart3 className="h-3.5 w-3.5 mr-1 text-purple-400" />
              Threat Types
            </h4>
          </div>
          <div className="flex-1 mt-1">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={threatTypeData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
                  stroke="rgba(255,255,255,0.1)"
                />
                <YAxis 
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
                  stroke="rgba(255,255,255,0.1)"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.7)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }} 
                />
                <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="glass rounded-md p-3 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-medium text-white/90 flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1 text-green-400" />
              Response Time (min)
            </h4>
          </div>
          <div className="flex-1 mt-1">
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={responseTimeData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorResponse" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="name"
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
                  stroke="rgba(255,255,255,0.1)"
                />
                <YAxis 
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
                  stroke="rgba(255,255,255,0.1)"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.7)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10B981" 
                  fillOpacity={1} 
                  fill="url(#colorResponse)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="glass rounded-md p-3 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-medium text-white/90">Security Summary</h4>
          </div>
          <div className="flex-1 space-y-3">
            <div className="bg-background/50 rounded-md p-2 flex justify-between items-center">
              <span className="text-xs">Total Alerts</span>
              <span className="text-sm font-semibold">187</span>
            </div>
            <div className="bg-background/50 rounded-md p-2 flex justify-between items-center">
              <span className="text-xs">Critical Events</span>
              <span className="text-sm font-semibold text-red-400">23</span>
            </div>
            <div className="bg-background/50 rounded-md p-2 flex justify-between items-center">
              <span className="text-xs">Avg Response Time</span>
              <span className="text-sm font-semibold">3.4 min</span>
            </div>
            <div className="bg-background/50 rounded-md p-2 flex justify-between items-center">
              <span className="text-xs">Security Score</span>
              <span className="text-sm font-semibold text-green-400">86/100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
