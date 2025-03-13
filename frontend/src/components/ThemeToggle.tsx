
import React from "react";
import { Button } from "@/components/ui/button";
import { Shield, Crosshair } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  mode: "red" | "blue";
  setMode: (mode: "red" | "blue") => void;
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ mode, setMode, className }) => {
  return (
    <div className={cn("flex items-center gap-2 bg-secondary/30 rounded-full p-1", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setMode("red")}
        className={cn(
          "rounded-full transition-all duration-300 flex items-center gap-2",
          mode === "red" 
            ? "bg-destructive/20 text-destructive border-destructive/20 hover:bg-destructive/30" 
            : "hover:bg-background/20"
        )}
      >
        <Crosshair className="h-4 w-4" />
        <span className="font-medium">Red Team</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setMode("blue")}
        className={cn(
          "rounded-full transition-all duration-300 flex items-center gap-2",
          mode === "blue" 
            ? "bg-primary/20 text-primary border-primary/20 hover:bg-primary/30" 
            : "hover:bg-background/20"
        )}
      >
        <Shield className="h-4 w-4" />
        <span className="font-medium">Blue Team</span>
      </Button>
    </div>
  );
};

export default ThemeToggle;
