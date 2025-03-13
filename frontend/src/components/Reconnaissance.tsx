
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Search, Network, Globe, FileText, Server, Target } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";

interface ReconnaissanceProps {
  className?: string;
}

const Reconnaissance: React.FC<ReconnaissanceProps> = ({ className }) => {
  const [targetType, setTargetType] = useState<string>("domain");
  const [targetValue, setTargetValue] = useState<string>("");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResults, setScanResults] = useState<string[]>([]);

  const handleScan = () => {
    if (!targetValue.trim()) return;
    
    setIsScanning(true);
    setScanResults([]);
    
    // Simulate scanning process
    setTimeout(() => {
      let results: string[] = [];
      
      if (targetType === "domain") {
        results = [
          "Domain: " + targetValue,
          "Registrar: ExampleRegistrar Inc.",
          "Name Servers: ns1.example.com, ns2.example.com",
          "IP Addresses: 192.168.1.1, 192.168.1.2",
          "Web Technologies: Apache, PHP, WordPress"
        ];
      } else if (targetType === "ip") {
        results = [
          "IP: " + targetValue,
          "Hostname: server.example.com",
          "Open Ports: 22 (SSH), 80 (HTTP), 443 (HTTPS)",
          "OS: Linux Ubuntu 20.04",
          "Location: US East (Virginia)"
        ];
      } else if (targetType === "network") {
        results = [
          "Network: " + targetValue,
          "Active Hosts: 12",
          "Gateways: 192.168.1.1",
          "Common Services: HTTP, SSH, SMB",
          "Vulnerabilities: 3 High, 5 Medium, 8 Low"
        ];
      }
      
      setScanResults(results);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className={cn("glass h-full flex flex-col", className)}>
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <h3 className="text-sm font-semibold text-white/90 flex items-center">
          <Search className="h-4 w-4 mr-2" />
          Reconnaissance Module
        </h3>
      </div>
      
      <div className="p-4 border-b border-white/10">
        <h4 className="text-sm font-medium mb-3 flex items-center">
          <Target className="h-4 w-4 mr-2 text-blue-400" />
          Target Selection
        </h4>
        
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
          <Select value={targetType} onValueChange={setTargetType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Target Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="domain">Domain Name</SelectItem>
              <SelectItem value="ip">IP Address</SelectItem>
              <SelectItem value="network">Network Range</SelectItem>
              <SelectItem value="url">URL/Endpoint</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex-1 flex space-x-2">
            <Input
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
              placeholder={
                targetType === "domain" ? "example.com" :
                targetType === "ip" ? "192.168.1.1" :
                targetType === "network" ? "192.168.1.0/24" :
                "https://example.com/login"
              }
              className="flex-1"
            />
            <Button 
              onClick={handleScan} 
              disabled={isScanning || !targetValue.trim()}
              className="min-w-20"
            >
              {isScanning ? "Scanning..." : "Scan"}
            </Button>
          </div>
        </div>
        
        {scanResults.length > 0 && (
          <div className="mt-4 p-3 glass rounded-md">
            <h5 className="text-xs font-medium mb-2">Scan Results:</h5>
            <div className="text-xs space-y-1">
              {scanResults.map((result, idx) => (
                <div key={idx} className="text-white/80">{result}</div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass p-4 rounded-md">
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Network className="h-4 w-4 mr-2 text-blue-400" />
              Network Discovery
            </h4>
            <p className="text-xs text-white/70 mb-3">
              Map the target network and identify active hosts
            </p>
            <div className="terminal h-40">
              <span className="text-green-400">scan</span>
              <span className="text-white"> --range=10.0.0.0/24 --type=ping</span>
              <div className="mt-2">
                <div className="text-white">10.0.0.1 - Gateway [UP]</div>
                <div className="text-white">10.0.0.5 - Linux Server [UP]</div>
                <div className="text-white">10.0.0.8 - Windows Host [UP]</div>
              </div>
            </div>
          </div>
          
          <div className="glass p-4 rounded-md">
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Server className="h-4 w-4 mr-2 text-purple-400" />
              Service Enumeration
            </h4>
            <p className="text-xs text-white/70 mb-3">
              Identify running services and their versions
            </p>
            <div className="terminal h-40">
              <span className="text-green-400">enum</span>
              <span className="text-white"> --target=10.0.0.5 --ports=1-1000</span>
              <div className="mt-2">
                <div className="text-white">PORT 22: SSH (OpenSSH 7.4)</div>
                <div className="text-white">PORT 80: HTTP (Apache 2.4.6)</div>
                <div className="text-white">PORT 443: HTTPS (Apache 2.4.6)</div>
              </div>
            </div>
          </div>
          
          <div className="glass p-4 rounded-md">
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Globe className="h-4 w-4 mr-2 text-green-400" />
              Web Reconnaissance
            </h4>
            <p className="text-xs text-white/70 mb-3">
              Analyze web applications for potential vulnerabilities
            </p>
            <div className="terminal h-40">
              <span className="text-green-400">webscan</span>
              <span className="text-white"> --url=http://10.0.0.5/app</span>
              <div className="mt-2">
                <div className="text-yellow-400">[!] Potential SQL injection at /login.php</div>
                <div className="text-yellow-400">[!] Outdated jQuery v1.8.3 detected</div>
                <div className="text-yellow-400">[!] Directory listing enabled</div>
              </div>
            </div>
          </div>
          
          <div className="glass p-4 rounded-md">
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <FileText className="h-4 w-4 mr-2 text-yellow-400" />
              OSINT Collection
            </h4>
            <p className="text-xs text-white/70 mb-3">
              Gather publicly available information about the target
            </p>
            <div className="glass p-2 rounded-md h-40 overflow-auto">
              <div className="mb-2">
                <div className="text-xs font-medium mb-1">Domain Information</div>
                <div className="text-xs text-white/70">example.com</div>
                <div className="text-xs text-white/70">Registered: 2022-01-15</div>
                <div className="text-xs text-white/70">Registrar: ExampleRegistrar Inc.</div>
              </div>
              <div className="mb-2">
                <div className="text-xs font-medium mb-1">Email Addresses</div>
                <div className="text-xs text-white/70">admin@example.com</div>
                <div className="text-xs text-white/70">support@example.com</div>
              </div>
              <div>
                <div className="text-xs font-medium mb-1">Technologies</div>
                <div className="text-xs text-white/70">Apache, PHP, MySQL</div>
                <div className="text-xs text-white/70">WordPress 5.8.2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reconnaissance;
