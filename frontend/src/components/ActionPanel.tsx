
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  HardDrive, 
  ShieldOff, 
  Search, 
  FileDown,
  User,
  Server,
  Laptop,
  DownloadCloud
} from "lucide-react";

interface ActionPanelProps {
  className?: string;
}

const ActionCard: React.FC<{ 
  title: string; 
  icon: React.ReactNode; 
  description: string;
  buttonText: string;
  buttonIcon: React.ReactNode;
  color: string;
}> = ({ title, icon, description, buttonText, buttonIcon, color }) => {
  return (
    <div className="glass p-4 rounded-md flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className={cn(
          "rounded-md p-2 bg-opacity-20",
          color === "blue" && "bg-blue-500/20",
          color === "red" && "bg-red-500/20",
          color === "green" && "bg-green-500/20",
          color === "yellow" && "bg-yellow-500/20"
        )}>
          {icon}
        </div>
        <div className="text-xs text-white/60">Action</div>
      </div>
      <h3 className="text-sm font-semibold mb-1">{title}</h3>
      <p className="text-xs text-white/70 mb-3">{description}</p>
      <Button 
        className={cn(
          "mt-auto text-xs h-8",
          color === "blue" && "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400",
          color === "red" && "bg-red-500/20 hover:bg-red-500/30 text-red-400",
          color === "green" && "bg-green-500/20 hover:bg-green-500/30 text-green-400",
          color === "yellow" && "bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400"
        )}
      >
        {buttonIcon}
        <span className="ml-1">{buttonText}</span>
      </Button>
    </div>
  );
};

const ActionPanel: React.FC<ActionPanelProps> = ({ className }) => {
  return (
    <div className={cn("glass h-full flex flex-col", className)}>
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <h3 className="text-sm font-semibold text-white/90 flex items-center">
          <HardDrive className="h-4 w-4 mr-2" />
          Response Actions
        </h3>
      </div>
      
      <div className="flex-1 p-3 grid grid-cols-1 md:grid-cols-2 gap-3">
        <ActionCard 
          title="Isolate Host"
          icon={<ShieldOff className="h-5 w-5 text-red-400" />}
          description="Disconnect a compromised host from the network"
          buttonText="Isolate"
          buttonIcon={<Laptop className="h-3.5 w-3.5" />}
          color="red"
        />
        
        <ActionCard 
          title="Full System Scan"
          icon={<Search className="h-5 w-5 text-blue-400" />}
          description="Run a comprehensive security scan on selected hosts"
          buttonText="Scan"
          buttonIcon={<Server className="h-3.5 w-3.5" />}
          color="blue"
        />
        
        <ActionCard 
          title="Quarantine Files"
          icon={<FileDown className="h-5 w-5 text-yellow-400" />}
          description="Isolate suspicious files detected in the system"
          buttonText="Quarantine"
          buttonIcon={<DownloadCloud className="h-3.5 w-3.5" />}
          color="yellow"
        />
        
        <ActionCard 
          title="Suspend User"
          icon={<User className="h-5 w-5 text-green-400" />}
          description="Temporarily disable compromised user accounts"
          buttonText="Suspend"
          buttonIcon={<User className="h-3.5 w-3.5" />}
          color="green"
        />
      </div>
    </div>
  );
};

export default ActionPanel;
