
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Shield, AlertTriangle, Wifi, Server, Lock, Eye, Target, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";

interface DefenseSimulationProps {
  className?: string;
}

const DefenseSimulation: React.FC<DefenseSimulationProps> = ({ className }) => {
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [attackType, setAttackType] = useState("ddos");
  const [difficulty, setDifficulty] = useState("medium");
  const [simulationTime, setSimulationTime] = useState(120);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [attackProgress, setAttackProgress] = useState(0);
  const [defenseScore, setDefenseScore] = useState(0);
  const [alerts, setAlerts] = useState<{message: string, time: string, type: "info" | "warning" | "danger"}[]>([]);
  const [activeDefenses, setActiveDefenses] = useState<string[]>([]);

  useEffect(() => {
    let intervalId: number | null = null;
    
    if (simulationRunning && timeRemaining > 0) {
      intervalId = window.setInterval(() => {
        setTimeRemaining(prev => prev - 1);
        
        // Random attack progress increases
        if (Math.random() > 0.7) {
          const increase = Math.random() * 5 * (activeDefenses.length ? 0.5 : 1);
          setAttackProgress(prev => Math.min(100, prev + increase));
        }
        
        // Generate random alerts
        if (Math.random() > 0.85) {
          const alertTypes = [
            "Suspicious login attempt detected",
            "Port scan detected from 192.168.1.100",
            "Unusual outbound traffic detected",
            "Multiple authentication failures",
            "Possible data exfiltration attempt"
          ];
          
          const alertType = Math.random() > 0.6 ? "warning" : 
                          Math.random() > 0.8 ? "danger" : "info";
          
          setAlerts(prev => [...prev.slice(-5), {
            message: alertTypes[Math.floor(Math.random() * alertTypes.length)],
            time: new Date().toLocaleTimeString(),
            type: alertType as "info" | "warning" | "danger"
          }]);
        }
        
      }, 1000);
    } else if (timeRemaining <= 0 && simulationRunning) {
      setSimulationRunning(false);
      // Calculate final score
      setDefenseScore(Math.max(0, 100 - attackProgress));
    }
    
    return () => {
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [simulationRunning, timeRemaining, activeDefenses.length, attackProgress]);

  const handleStartSimulation = () => {
    setSimulationRunning(true);
    setTimeRemaining(simulationTime);
    setAttackProgress(0);
    setDefenseScore(0);
    setAlerts([{
      message: `${attackType.toUpperCase()} attack simulation started`,
      time: new Date().toLocaleTimeString(),
      type: "info"
    }]);
    setActiveDefenses([]);
  };

  const toggleDefense = (defense: string) => {
    if (activeDefenses.includes(defense)) {
      setActiveDefenses(prev => prev.filter(d => d !== defense));
    } else {
      setActiveDefenses(prev => [...prev, defense]);
      // Adding a defense reduces attack progress
      setAttackProgress(prev => Math.max(0, prev - 10));
      setAlerts(prev => [...prev, {
        message: `${defense} defense activated`,
        time: new Date().toLocaleTimeString(),
        type: "info"
      }]);
    }
  };

  return (
    <div className={cn("glass h-full flex flex-col", className)}>
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <h3 className="text-sm font-semibold text-white/90 flex items-center">
          <Shield className="h-4 w-4 mr-2" />
          Defense Simulation
        </h3>
      </div>
      
      <div className="p-4 border-b border-white/10">
        <h4 className="text-sm font-medium mb-4 flex items-center">
          <Target className="h-4 w-4 mr-2 text-blue-400" />
          Attack Simulation Configuration
        </h4>
        
        {!simulationRunning ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-white/70">Attack Type</label>
              <Select value={attackType} onValueChange={setAttackType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select attack type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ddos">DDoS Attack</SelectItem>
                  <SelectItem value="ransomware">Ransomware</SelectItem>
                  <SelectItem value="sqlinjection">SQL Injection</SelectItem>
                  <SelectItem value="phishing">Phishing Campaign</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-white/70">Difficulty</label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                  <SelectItem value="nightmare">Nightmare</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-white/70">Simulation Time (seconds)</label>
              <Select 
                value={simulationTime.toString()} 
                onValueChange={(value) => setSimulationTime(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="60">60</SelectItem>
                  <SelectItem value="120">120</SelectItem>
                  <SelectItem value="300">300</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleStartSimulation}
              className="md:col-span-3 mt-2"
            >
              Start Simulation
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs text-white/70">Time Remaining</div>
                <div className="text-lg font-bold">{Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</div>
              </div>
              
              <div>
                <div className="text-xs text-white/70">Defense Score</div>
                <div className="text-lg font-bold">{defenseScore}</div>
              </div>
              
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setSimulationRunning(false)}
              >
                Abort Simulation
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-white/70">Attack Progress</span>
                <span className="text-xs font-bold">{attackProgress.toFixed(1)}%</span>
              </div>
              <Progress value={attackProgress} className="h-2" />
            </div>
          </div>
        )}
      </div>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 p-4 gap-4 overflow-auto">
        <div className="space-y-4">
          <h4 className="text-sm font-medium flex items-center">
            <Lock className="h-4 w-4 mr-2 text-green-400" />
            Active Defenses
          </h4>
          
          <div className="glass p-3 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                {id: "firewall", name: "Firewall Rules", icon: Shield},
                {id: "ids", name: "Intrusion Detection", icon: Eye},
                {id: "av", name: "Antivirus", icon: Shield},
                {id: "waf", name: "Web Application Firewall", icon: Server},
                {id: "dns", name: "DNS Filtering", icon: Wifi},
                {id: "mfa", name: "Multi-Factor Auth", icon: Lock}
              ].map((defense) => (
                <Button
                  key={defense.id}
                  variant={activeDefenses.includes(defense.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleDefense(defense.id)}
                  disabled={!simulationRunning}
                  className="justify-start"
                >
                  <defense.icon className="h-4 w-4 mr-2" />
                  {defense.name}
                </Button>
              ))}
            </div>
          </div>
          
          <h4 className="text-sm font-medium flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2 text-yellow-400" />
            Live Attack Feed
          </h4>
          
          <div className="glass p-3 rounded-md h-60 overflow-y-auto">
            {alerts.length === 0 ? (
              <div className="text-xs text-white/50 h-full flex items-center justify-center">
                No alerts to display
              </div>
            ) : (
              <div className="space-y-2">
                {alerts.map((alert, idx) => (
                  <div 
                    key={idx} 
                    className={cn(
                      "text-xs p-2 rounded border-l-2",
                      alert.type === "info" ? "bg-blue-500/10 border-blue-500" :
                      alert.type === "warning" ? "bg-yellow-500/10 border-yellow-500" :
                      "bg-red-500/10 border-red-500"
                    )}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{alert.message}</span>
                      <span className="text-white/50">{alert.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-sm font-medium flex items-center">
            <Activity className="h-4 w-4 mr-2 text-red-400" />
            Attack Metrics
          </h4>
          
          <div className="glass p-3 rounded-md h-[420px] flex items-center justify-center">
            {!simulationRunning && defenseScore === 0 ? (
              <div className="text-center text-white/50">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
                <p>Start a simulation to see attack metrics</p>
              </div>
            ) : (
              <div className="w-full space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Connection Attempts</span>
                    <span>{Math.floor(Math.random() * 1000) + 500}</span>
                  </div>
                  <Progress value={70} className="h-1.5" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Payload Delivery Attempts</span>
                    <span>{Math.floor(Math.random() * 100) + 50}</span>
                  </div>
                  <Progress value={45} className="h-1.5" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Authentication Bypasses</span>
                    <span>{Math.floor(Math.random() * 20) + 1}</span>
                  </div>
                  <Progress value={20} className="h-1.5" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Data Exfiltration (MB)</span>
                    <span>{(Math.random() * 10).toFixed(2)}</span>
                  </div>
                  <Progress value={15} className="h-1.5" />
                </div>
                
                <div className="mt-8 glass p-3 rounded-md">
                  <h5 className="text-xs font-medium mb-2">MITRE ATT&CK Techniques</h5>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span>T1133 External Remote Services</span>
                      <span className="text-yellow-400">Detected</span>
                    </div>
                    <div className="flex justify-between">
                      <span>T1190 Exploit Public-Facing App</span>
                      <span className="text-green-400">Blocked</span>
                    </div>
                    <div className="flex justify-between">
                      <span>T1552 Unsecured Credentials</span>
                      <span className="text-red-400">Compromised</span>
                    </div>
                    <div className="flex justify-between">
                      <span>T1078 Valid Accounts</span>
                      <span className="text-yellow-400">Detected</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefenseSimulation;
