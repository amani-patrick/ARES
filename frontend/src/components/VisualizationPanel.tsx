
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Network, 
  Database, 
  FileText,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface VisualizationPanelProps {
  className?: string;
  type: "red" | "blue";
}

const NetworkGraph: React.FC = () => {
  const nodes = [
    { id: 'gateway', label: 'Gateway', x: 50, y: 25, type: 'gateway' },
    { id: 'server', label: 'Server', x: 20, y: 60, type: 'server' },
    { id: 'workstation1', label: 'Workstation 1', x: 50, y: 70, type: 'workstation' },
    { id: 'workstation2', label: 'Workstation 2', x: 80, y: 60, type: 'workstation' },
  ];
  
  const edges = [
    { from: 'gateway', to: 'server' },
    { from: 'gateway', to: 'workstation1' },
    { from: 'gateway', to: 'workstation2' },
    { from: 'server', to: 'workstation1' },
  ];
  
  return (
    <div className="relative h-full w-full">
      <svg width="100%" height="100%" viewBox="0 0 100 100" className="text-white">
        {/* Draw edges */}
        {edges.map((edge, i) => {
          const fromNode = nodes.find(n => n.id === edge.from);
          const toNode = nodes.find(n => n.id === edge.to);
          if (!fromNode || !toNode) return null;
          
          return (
            <line 
              key={`edge-${i}`}
              x1={fromNode.x} 
              y1={fromNode.y} 
              x2={toNode.x} 
              y2={toNode.y} 
              stroke="rgba(255,255,255,0.2)" 
              strokeWidth="0.5" 
            />
          );
        })}
        
        {/* Draw nodes */}
        {nodes.map((node) => {
          let fillColor;
          switch(node.type) {
            case 'gateway': fillColor = 'rgba(59, 130, 246, 0.6)'; break;
            case 'server': fillColor = 'rgba(236, 72, 153, 0.6)'; break;
            case 'workstation': fillColor = 'rgba(34, 197, 94, 0.6)'; break;
            default: fillColor = 'rgba(255, 255, 255, 0.6)';
          }
          
          return (
            <g key={node.id} className="cursor-pointer transition-all hover:opacity-80">
              <circle 
                cx={node.x} 
                cy={node.y} 
                r={4} 
                fill={fillColor}
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="0.5"
              />
              <text 
                x={node.x} 
                y={node.y + 7} 
                fontSize="3" 
                textAnchor="middle" 
                fill="rgba(255,255,255,0.8)"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const AttackPathsPanel: React.FC = () => {
  return (
    <div className="h-full grid grid-cols-1 gap-4 p-2">
      <div className="glass p-3 rounded-md">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-xs font-medium text-white/80">Path #1: Gateway → Server</h4>
          <span className="text-xs text-green-400">Success</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="bg-blue-500/20 px-2 py-0.5 rounded text-blue-300">SSH</span>
          <ChevronRight className="h-3 w-3 text-white/60" />
          <span className="bg-pink-500/20 px-2 py-0.5 rounded text-pink-300">CVE-2023-1234</span>
          <ChevronRight className="h-3 w-3 text-white/60" />
          <span className="bg-green-500/20 px-2 py-0.5 rounded text-green-300">Root Access</span>
        </div>
      </div>
      
      <div className="glass p-3 rounded-md">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-xs font-medium text-white/80">Path #2: Workstation → Server</h4>
          <span className="text-xs text-yellow-400">In Progress</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="bg-blue-500/20 px-2 py-0.5 rounded text-blue-300">SMB</span>
          <ChevronRight className="h-3 w-3 text-white/60" />
          <span className="bg-pink-500/20 px-2 py-0.5 rounded text-pink-300">Password Spray</span>
          <ChevronRight className="h-3 w-3 text-white/60" />
          <span className="bg-yellow-500/20 px-2 py-0.5 rounded text-yellow-300">User Access</span>
        </div>
      </div>
      
      <div className="glass p-3 rounded-md opacity-50">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-xs font-medium text-white/80">Path #3: Gateway → Workstation</h4>
          <span className="text-xs text-red-400">Failed</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="bg-blue-500/20 px-2 py-0.5 rounded text-blue-300">HTTP</span>
          <ChevronRight className="h-3 w-3 text-white/60" />
          <span className="bg-pink-500/20 px-2 py-0.5 rounded text-pink-300">XSS</span>
          <ChevronRight className="h-3 w-3 text-white/60" />
          <span className="bg-red-500/20 px-2 py-0.5 rounded text-red-300">WAF Blocked</span>
        </div>
      </div>
    </div>
  );
};

const PayloadsPanel: React.FC = () => {
  const payloads = [
    { id: 1, name: 'Reverse Shell', type: 'shell', status: 'ready' },
    { id: 2, name: 'SQL Injection', type: 'web', status: 'ready' },
    { id: 3, name: 'Mimikatz', type: 'creds', status: 'ready' },
    { id: 4, name: 'Custom Backdoor', type: 'shell', status: 'building' },
  ];
  
  return (
    <div className="h-full overflow-auto p-2">
      <div className="space-y-3">
        {payloads.map(payload => (
          <div 
            key={payload.id}
            className={cn(
              "glass p-3 rounded-md flex items-center justify-between",
              payload.status === 'building' && "opacity-50"
            )}
          >
            <div className="flex items-center">
              {payload.type === 'shell' && <FileText className="h-3.5 w-3.5 text-red-400 mr-2" />}
              {payload.type === 'web' && <Database className="h-3.5 w-3.5 text-blue-400 mr-2" />}
              {payload.type === 'creds' && <FileText className="h-3.5 w-3.5 text-yellow-400 mr-2" />}
              <span className="text-xs font-medium">{payload.name}</span>
            </div>
            <Button 
              size="sm" 
              variant="ghost"
              className="h-7 px-2 py-0 text-xs bg-white/5 hover:bg-white/10"
            >
              {payload.status === 'ready' ? 'Deploy' : 'Building...'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({ className, type }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  return (
    <div 
      className={cn(
        "glass flex flex-col h-full transition-all duration-300 ease-in-out",
        isCollapsed ? "w-12" : "w-full",
        className
      )}
    >
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <h3 className={cn(
          "text-sm font-semibold text-white/90 transition-opacity duration-300",
          isCollapsed && "opacity-0 w-0 overflow-hidden"
        )}>
          {type === "red" ? "Attack Visualization" : "Defense Visualization"}
        </h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 bg-white/5 hover:bg-white/10"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className={cn(
        "flex-1 overflow-hidden transition-opacity duration-300",
        isCollapsed && "opacity-0"
      )}>
        {type === "red" ? (
          <Tabs defaultValue="network" className="h-full">
            <TabsList className="grid w-full grid-cols-3 bg-background/50 p-1">
              <TabsTrigger value="network" className="text-xs">Network</TabsTrigger>
              <TabsTrigger value="paths" className="text-xs">Attack Paths</TabsTrigger>
              <TabsTrigger value="payloads" className="text-xs">Payloads</TabsTrigger>
            </TabsList>
            <TabsContent value="network" className="h-[calc(100%-41px)]">
              <NetworkGraph />
            </TabsContent>
            <TabsContent value="paths" className="h-[calc(100%-41px)]">
              <AttackPathsPanel />
            </TabsContent>
            <TabsContent value="payloads" className="h-[calc(100%-41px)]">
              <PayloadsPanel />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="p-4 text-center text-sm text-white/70 h-full flex items-center justify-center">
            <div>
              <Network className="h-10 w-10 mb-2 mx-auto text-primary opacity-50" />
              <p>Defense visualization will be displayed here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualizationPanel;
