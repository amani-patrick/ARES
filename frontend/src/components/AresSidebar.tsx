
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { 
  Search, 
  Zap, 
  Terminal, 
  Activity, 
  Shield, 
  Lock, 
  Database, 
  HardDrive, 
  AlertTriangle, 
  BarChart,
  User,
  Target
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface AresSidebarProps {
  mode: "red" | "blue";
  setMode: (mode: "red" | "blue") => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const AresSidebar: React.FC<AresSidebarProps> = ({ 
  mode, 
  setMode, 
  activeSection, 
  setActiveSection 
}) => {
  const navigate = useNavigate();
  
  const redTeamItems = [
    { title: "Reconnaissance", icon: Search, id: "reconnaissance" },
    { title: "Exploitation", icon: Zap, id: "exploitation" },
    { title: "Post-Exploitation", icon: Terminal, id: "post-exploitation" },
  ];

  const blueTeamItems = [
    { title: "Event Feed", icon: Activity, id: "event-feed" },
    { title: "Defense Simulation", icon: Target, id: "defense-simulation" },
    { title: "Firewall Rules", icon: Shield, id: "firewall-rules" },
    { title: "Log Analysis", icon: Database, id: "log-analysis" },
    { title: "Actions", icon: HardDrive, id: "actions" },
    { title: "Dashboard", icon: BarChart, id: "dashboard" },
  ];
  
  const handleMenuItemClick = (id: string) => {
    setActiveSection(id);
  };
  
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center p-3">
        <div className="flex items-center space-x-2">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-subtle"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-primary font-bold text-2xl">A</span>
            </div>
          </div>
          <span className="font-bold text-lg tracking-tight">ARES</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <div className="px-3 pt-4 pb-8">
          <ThemeToggle mode={mode} setMode={setMode} className="mb-8 w-full" />
          
          <SidebarGroup>
            <SidebarGroupLabel className={cn(
              "text-xs font-semibold",
              mode === "red" ? "text-destructive" : "text-primary"
            )}>
              {mode === "red" ? "ATTACK VECTOR" : "DEFENSE MATRIX"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {(mode === "red" ? redTeamItems : blueTeamItems).map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => handleMenuItemClick(item.id)}
                      className={cn(
                        "transition-all duration-300",
                        activeSection === item.id
                          ? mode === "red"
                            ? "text-destructive bg-destructive/10 border-l-2 border-destructive"
                            : "text-primary bg-primary/10 border-l-2 border-primary"
                          : "hover:bg-accent/50"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
      
      <SidebarFooter className="p-3">
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </Button>
      </SidebarFooter>
      
      <SidebarTrigger className="absolute left-[270px] top-4">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border border-input bg-background"
        >
          <AlertTriangle className="h-4 w-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SidebarTrigger>
    </Sidebar>
  );
};

export default AresSidebar;
