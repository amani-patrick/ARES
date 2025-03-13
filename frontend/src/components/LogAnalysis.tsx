
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Database, Filter, Download, BarChart, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LogEntry {
  id: string;
  timestamp: string;
  source: string;
  type: string;
  severity: "low" | "medium" | "high";
  message: string;
}

interface LogAnalysisProps {
  className?: string;
}

const sampleLogs: LogEntry[] = [
  {
    id: "1",
    timestamp: "2023-05-12 08:23:45",
    source: "Firewall",
    type: "CONNECTION",
    severity: "low",
    message: "Connection established from 192.168.1.5 to 74.125.24.100:443"
  },
  {
    id: "2",
    timestamp: "2023-05-12 08:24:12",
    source: "Authentication",
    type: "LOGIN",
    severity: "medium",
    message: "Failed login attempt for user admin from 192.168.1.15"
  },
  {
    id: "3",
    timestamp: "2023-05-12 08:25:03",
    source: "IDS",
    type: "ALERT",
    severity: "high",
    message: "Possible SQL injection attempt detected from 203.0.113.42"
  },
  {
    id: "4",
    timestamp: "2023-05-12 08:26:27",
    source: "Authentication",
    type: "LOGIN",
    severity: "low",
    message: "Successful login for user jsmith from 192.168.1.22"
  },
  {
    id: "5",
    timestamp: "2023-05-12 08:28:55",
    source: "Firewall",
    type: "BLOCK",
    severity: "medium",
    message: "Blocked connection attempt from 203.0.113.42 to 192.168.1.10:3389"
  },
  {
    id: "6",
    timestamp: "2023-05-12 08:30:18",
    source: "System",
    type: "CHANGE",
    severity: "medium",
    message: "Configuration change in /etc/ssh/sshd_config by user admin"
  },
  {
    id: "7",
    timestamp: "2023-05-12 08:32:41",
    source: "IDS",
    type: "ALERT",
    severity: "high",
    message: "Port scan detected from 203.0.113.100 targeting multiple services"
  },
  {
    id: "8",
    timestamp: "2023-05-12 08:35:09",
    source: "Application",
    type: "ERROR",
    severity: "low",
    message: "Web service restarted due to high memory usage"
  },
  {
    id: "9",
    timestamp: "2023-05-12 08:37:22",
    source: "Firewall",
    type: "CONNECTION",
    severity: "low",
    message: "Connection established from 192.168.1.30 to 192.168.1.10:22"
  },
  {
    id: "10",
    timestamp: "2023-05-12 08:40:05",
    source: "Authentication",
    type: "LOGIN",
    severity: "high",
    message: "Multiple failed login attempts for various users from 203.0.113.42"
  }
];

const LogAnalysis: React.FC<LogAnalysisProps> = ({ className }) => {
  const [logs, setLogs] = useState<LogEntry[]>(sampleLogs);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredLogs = logs.filter(log => 
    log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className={cn("glass h-full flex flex-col", className)}>
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <h3 className="text-sm font-semibold text-white/90 flex items-center">
          <Database className="h-4 w-4 mr-2" />
          Log Analysis
        </h3>
        <div className="flex items-center space-x-2">
          <Button 
            size="sm" 
            variant="ghost"
            className="h-7 w-7 bg-white/5 hover:bg-white/10"
          >
            <Filter className="h-3.5 w-3.5" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost"
            className="h-7 w-7 bg-white/5 hover:bg-white/10"
          >
            <Download className="h-3.5 w-3.5" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost"
            className="h-7 w-7 bg-white/5 hover:bg-white/10"
          >
            <BarChart className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      
      <div className="p-3 border-b border-white/10">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background/50 border border-white/10 rounded-md pl-8 pr-4 py-1.5 text-sm placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="divide-y divide-white/10">
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log) => (
              <div key={log.id} className="p-3 hover:bg-white/5">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center">
                    <span className={cn(
                      "inline-block h-2 w-2 rounded-full mr-2",
                      log.severity === "high" && "bg-red-500",
                      log.severity === "medium" && "bg-yellow-500",
                      log.severity === "low" && "bg-blue-500"
                    )}></span>
                    <span className="text-sm font-medium">{log.source}: {log.type}</span>
                  </div>
                  <span className="text-xs text-white/60">{log.timestamp}</span>
                </div>
                <p className="text-sm text-white/80 ml-4">{log.message}</p>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-white/60">
              <Search className="h-5 w-5 mx-auto mb-2 opacity-50" />
              <p>No matching logs found</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default LogAnalysis;
