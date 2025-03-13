
import React, { useState, useEffect } from "react";
import AresSidebar from "@/components/AresSidebar";
import Terminal from "@/components/Terminal";
import VisualizationPanel from "@/components/VisualizationPanel";
import EventFeed from "@/components/EventFeed";
import FirewallRules from "@/components/FirewallRules";
import LogAnalysis from "@/components/LogAnalysis";
import ActionPanel from "@/components/ActionPanel";
import PerformanceDashboard from "@/components/PerformanceDashboard";
import Reconnaissance from "@/components/Reconnaissance";
import Exploitation from "@/components/Exploitation";
import PostExploitation from "@/components/PostExploitation";
import DefenseSimulation from "@/components/DefenseSimulation";

const Dashboard = () => {
  const [mode, setMode] = useState<"red" | "blue">("red");
  const [activeSection, setActiveSection] = useState<string>(
    mode === "red" ? "reconnaissance" : "event-feed"
  );

  // Update active section when mode changes
  useEffect(() => {
    if (mode === "red") {
      setActiveSection("reconnaissance");
    } else {
      setActiveSection("event-feed");
    }
  }, [mode]);

  // Render different content based on the mode and active section
  const renderContent = () => {
    if (mode === "red") {
      switch (activeSection) {
        case "reconnaissance":
          return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
              <div className="lg:col-span-2 h-full">
                <Reconnaissance />
              </div>
              <div className="h-full">
                <Terminal />
              </div>
            </div>
          );
        case "exploitation":
          return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
              <div className="lg:col-span-2 h-full">
                <Exploitation />
              </div>
              <div className="h-full">
                <Terminal />
              </div>
            </div>
          );
        case "post-exploitation":
          return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
              <div className="lg:col-span-2 h-full">
                <PostExploitation />
              </div>
              <div className="h-full">
                <VisualizationPanel type={mode} />
              </div>
            </div>
          );
        default:
          return <div>Select a red team section</div>;
      }
    } else {
      switch (activeSection) {
        case "event-feed":
          return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
              <div className="lg:col-span-2 h-full">
                <EventFeed />
              </div>
              <div className="h-full">
                <VisualizationPanel type={mode} />
              </div>
            </div>
          );
        case "firewall-rules":
          return <FirewallRules className="h-full" />;
        case "log-analysis":
          return <LogAnalysis className="h-full" />;
        case "actions":
          return <ActionPanel className="h-full" />;
        case "dashboard":
          return <PerformanceDashboard className="h-full" />;
        case "defense-simulation":
          return <DefenseSimulation className="h-full" />;
        default:
          return <div>Select a blue team section</div>;
      }
    }
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <AresSidebar 
        mode={mode} 
        setMode={setMode} 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="flex-1 overflow-auto p-4 w-full">
        <div className="h-[calc(100vh-2rem)]">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
