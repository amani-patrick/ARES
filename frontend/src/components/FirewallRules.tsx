
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Plus, 
  Edit2, 
  Trash2, 
  CheckCircle, 
  XCircle 
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

interface FirewallRule {
  id: string;
  name: string;
  source: string;
  destination: string;
  port: string;
  protocol: "TCP" | "UDP" | "ICMP" | "ANY";
  action: "ALLOW" | "DENY";
  enabled: boolean;
}

interface FirewallRulesProps {
  className?: string;
}

const initialRules: FirewallRule[] = [
  {
    id: "1",
    name: "HTTP Access",
    source: "ANY",
    destination: "192.168.1.10",
    port: "80",
    protocol: "TCP",
    action: "ALLOW",
    enabled: true
  },
  {
    id: "2",
    name: "HTTPS Access",
    source: "ANY",
    destination: "192.168.1.10",
    port: "443",
    protocol: "TCP",
    action: "ALLOW",
    enabled: true
  },
  {
    id: "3",
    name: "Block Telnet",
    source: "ANY",
    destination: "ANY",
    port: "23",
    protocol: "TCP",
    action: "DENY",
    enabled: true
  },
  {
    id: "4",
    name: "SSH Access",
    source: "192.168.1.5",
    destination: "192.168.1.10",
    port: "22",
    protocol: "TCP",
    action: "ALLOW",
    enabled: true
  },
  {
    id: "5",
    name: "Block External SMB",
    source: "EXTERNAL",
    destination: "ANY",
    port: "445",
    protocol: "TCP",
    action: "DENY",
    enabled: true
  }
];

const FirewallRules: React.FC<FirewallRulesProps> = ({ className }) => {
  const [rules, setRules] = useState<FirewallRule[]>(initialRules);
  
  const handleToggleRule = (id: string) => {
    setRules(
      rules.map(rule => 
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };
  
  return (
    <div className={cn("glass h-full flex flex-col", className)}>
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <h3 className="text-sm font-semibold text-white/90 flex items-center">
          <Shield className="h-4 w-4 mr-2" />
          Firewall Rules
        </h3>
        <Button 
          size="sm" 
          className="h-7 px-2 py-0 text-xs bg-primary/20 hover:bg-primary/30 text-primary"
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          Add Rule
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto p-2">
        <Table>
          <TableHeader className="bg-background/50">
            <TableRow>
              <TableHead className="text-xs">Status</TableHead>
              <TableHead className="text-xs">Name</TableHead>
              <TableHead className="text-xs">Source</TableHead>
              <TableHead className="text-xs">Destination</TableHead>
              <TableHead className="text-xs">Port</TableHead>
              <TableHead className="text-xs">Protocol</TableHead>
              <TableHead className="text-xs">Action</TableHead>
              <TableHead className="text-xs text-right">Options</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map(rule => (
              <TableRow 
                key={rule.id}
                className={cn(
                  "transition-opacity",
                  !rule.enabled && "opacity-50"
                )}
              >
                <TableCell className="py-2">
                  <Switch 
                    checked={rule.enabled}
                    onCheckedChange={() => handleToggleRule(rule.id)}
                    className="data-[state=checked]:bg-primary"
                  />
                </TableCell>
                <TableCell className="py-2 text-xs font-medium">
                  {rule.name}
                </TableCell>
                <TableCell className="py-2 text-xs">
                  {rule.source}
                </TableCell>
                <TableCell className="py-2 text-xs">
                  {rule.destination}
                </TableCell>
                <TableCell className="py-2 text-xs">
                  {rule.port}
                </TableCell>
                <TableCell className="py-2 text-xs">
                  {rule.protocol}
                </TableCell>
                <TableCell className="py-2 text-xs">
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs",
                    rule.action === "ALLOW" 
                      ? "bg-green-500/20 text-green-400" 
                      : "bg-red-500/20 text-red-400"
                  )}>
                    {rule.action === "ALLOW" 
                      ? <CheckCircle className="h-3 w-3 inline mr-1" /> 
                      : <XCircle className="h-3 w-3 inline mr-1" />}
                    {rule.action}
                  </span>
                </TableCell>
                <TableCell className="py-2 text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-white/60 hover:text-white hover:bg-white/10">
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-red-400/60 hover:text-red-400 hover:bg-red-500/10">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FirewallRules;
