
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, Shield, Search, BadgeAlert, Terminal } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Event {
  id: string;
  timestamp: Date;
  type: "alert" | "warning" | "info";
  title: string;
  description: string;
  source: string;
}

interface EventFeedProps {
  className?: string;
}

const EventFeed: React.FC<EventFeedProps> = ({ className }) => {
  const [events, setEvents] = useState<Event[]>([]);
  
  useEffect(() => {
    // Initial events
    const initialEvents: Event[] = [
      {
        id: "1",
        timestamp: new Date(Date.now() - 20000),
        type: "alert",
        title: "Brute Force Attempt",
        description: "Multiple failed login attempts detected",
        source: "Authentication Logs"
      },
      {
        id: "2",
        timestamp: new Date(Date.now() - 60000),
        type: "warning",
        title: "Unusual Traffic Pattern",
        description: "Increased outbound traffic to unknown IPs",
        source: "Network Monitor"
      },
      {
        id: "3",
        timestamp: new Date(Date.now() - 180000),
        type: "info",
        title: "System Update",
        description: "Security patches applied successfully",
        source: "Update Service"
      }
    ];
    
    setEvents(initialEvents);
    
    // Simulate incoming events
    const interval = setInterval(() => {
      const eventTypes = ["alert", "warning", "info"];
      const eventTitles = [
        "Port Scan Detected",
        "Suspicious Process",
        "Failed Admin Login",
        "File System Changes",
        "Firewall Rule Update"
      ];
      const eventSources = [
        "Intrusion Detection",
        "Process Monitor",
        "Authentication Service",
        "File Integrity Check",
        "Firewall Manager"
      ];
      
      const newEvent: Event = {
        id: Date.now().toString(),
        timestamp: new Date(),
        type: eventTypes[Math.floor(Math.random() * eventTypes.length)] as "alert" | "warning" | "info",
        title: eventTitles[Math.floor(Math.random() * eventTitles.length)],
        description: "Potential security event requiring investigation",
        source: eventSources[Math.floor(Math.random() * eventSources.length)]
      };
      
      setEvents(prev => [newEvent, ...prev.slice(0, 19)]);
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);
  
  const renderIcon = (type: Event["type"]) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case "warning":
        return <BadgeAlert className="h-4 w-4 text-yellow-400" />;
      case "info":
        return <Shield className="h-4 w-4 text-blue-400" />;
      default:
        return <Search className="h-4 w-4 text-gray-400" />;
    }
  };
  
  return (
    <div className={cn("glass h-full flex flex-col", className)}>
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <h3 className="text-sm font-semibold text-white/90 flex items-center">
          <Terminal className="h-4 w-4 mr-2" />
          Live Event Feed
        </h3>
        <div className="flex items-center space-x-1">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs text-white/60">Live</span>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-2">
          {events.map((event) => (
            <div 
              key={event.id}
              className={cn(
                "glass p-3 rounded-md border-l-2 animate-scale-in",
                event.type === "alert" && "border-red-500",
                event.type === "warning" && "border-yellow-500",
                event.type === "info" && "border-blue-500"
              )}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center">
                  {renderIcon(event.type)}
                  <span className="ml-2 text-sm font-medium">{event.title}</span>
                </div>
                <span className="text-xs text-white/60">
                  {event.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <p className="text-xs text-white/70 mb-1">{event.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/40">{event.source}</span>
                <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">
                  {event.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default EventFeed;
