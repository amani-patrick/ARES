
import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface TerminalProps {
  className?: string;
}

interface TerminalLine {
  content: string;
  isCommand?: boolean;
}

const Terminal: React.FC<TerminalProps> = ({ className }) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { content: 'Ares Command Line Interface v1.0.0', isCommand: false },
    { content: 'Type "help" for a list of commands', isCommand: false },
  ]);
  const [input, setInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);

  const addLine = (content: string, isCommand = false) => {
    setLines(prev => [...prev, { content, isCommand }]);
  };

  const handleCommand = () => {
    if (!input.trim()) return;
    
    addLine(input, true);
    
    // Simple command handling
    setTimeout(() => {
      switch(input.toLowerCase()) {
        case 'help':
          addLine('Available commands: scan, exploit, clear, help');
          break;
        case 'scan':
          addLine('Scanning target network...');
          setTimeout(() => {
            addLine('Discovered hosts:');
            addLine('192.168.1.1 - Gateway (80, 443)');
            addLine('192.168.1.10 - Server (22, 80, 443)');
            addLine('192.168.1.15 - Workstation (445, 3389)');
          }, 1000);
          break;
        case 'exploit':
          addLine('Select a target and vulnerability to exploit');
          break;
        case 'clear':
          setLines([
            { content: 'Ares Command Line Interface v1.0.0', isCommand: false },
            { content: 'Type "help" for a list of commands', isCommand: false },
          ]);
          break;
        default:
          addLine(`Command not found: ${input}`);
      }
    }, 300);
    
    setInput('');
  };

  // Auto-scroll to bottom when new lines are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className={cn('flex flex-col glass rounded-lg overflow-hidden h-full', className)}>
      <div className="flex items-center justify-between px-4 py-2 bg-background/80 border-b border-white/10">
        <h3 className="text-xs font-semibold text-white/80">Terminal</h3>
        <div className="flex space-x-1">
          <div className="h-2 w-2 rounded-full bg-red-500/80"></div>
          <div className="h-2 w-2 rounded-full bg-yellow-500/80"></div>
          <div className="h-2 w-2 rounded-full bg-green-500/80"></div>
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="flex-1 p-4 font-mono text-sm text-green-400 overflow-auto"
      >
        {lines.map((line, index) => (
          <div 
            key={index} 
            className={cn(
              'mb-1 animate-fade-in transition-opacity',
              line.isCommand && 'text-cyan-300'
            )}
          >
            {line.isCommand ? '> ' : ''}{line.content}
          </div>
        ))}
        <div className="flex items-center h-6">
          <span className="text-cyan-300">{'> '}</span>
          <span className="flex-1">{input}</span>
          <span className="h-4 w-0.5 bg-cyan-300 animate-terminal-cursor ml-0.5"></span>
        </div>
      </div>
      
      <div className="px-4 py-2 bg-background/80 border-t border-white/10">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand();
          }}
          className="flex items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-sm font-mono text-green-400"
            placeholder="Enter command..."
          />
          <Button 
            type="submit" 
            size="icon" 
            variant="ghost"
            className="h-7 w-7 text-green-400 hover:text-green-300 hover:bg-white/5"
          >
            <Send className="h-3.5 w-3.5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Terminal;
