import { useEffect, useState } from "react";
import { Brain } from "lucide-react";

interface NeuronProgressProps {
  totalCards: number;
  currentIndex: number;
  className?: string;
}

interface Neuron {
  id: number;
  x: number;
  y: number;
  active: boolean;
}

const NeuronProgress = ({ totalCards, currentIndex, className = "" }: NeuronProgressProps) => {
  const [neurons, setNeurons] = useState<Neuron[]>([]);

  useEffect(() => {
    // Generate neurons in a brain-like pattern
    const newNeurons: Neuron[] = [];
    const cols = Math.min(totalCards, 6); // Max 6 neurons per row
    const rows = Math.ceil(totalCards / cols);
    
    for (let i = 0; i < totalCards; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const offsetX = row % 2 === 1 ? 15 : 0; // Stagger alternate rows
      
      newNeurons.push({
        id: i,
        x: (col * 100 / (cols - 1 || 1)) + offsetX,
        y: (row * 100 / (rows - 1 || 1)),
        active: i <= currentIndex,
      });
    }
    
    setNeurons(newNeurons);
  }, [totalCards, currentIndex]);

  // Get connections between active neurons
  const getConnections = () => {
    const connections: { from: Neuron; to: Neuron }[] = [];
    const activeNeurons = neurons.filter(n => n.active);
    
    // Connect each active neuron to nearby active neurons
    activeNeurons.forEach((neuron, idx) => {
      // Connect to next neuron
      if (idx < activeNeurons.length - 1) {
        connections.push({ from: neuron, to: activeNeurons[idx + 1] });
      }
      
      // Occasionally connect to neurons further ahead for a network effect
      if (idx < activeNeurons.length - 2 && Math.random() > 0.5) {
        connections.push({ from: neuron, to: activeNeurons[idx + 2] });
      }
    });
    
    return connections;
  };

  const connections = getConnections();

  return (
    <div className={`relative w-full ${className}`}>
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <Brain className="h-5 w-5 text-primary animate-glow-pulse" />
        <span className="text-sm font-medium text-muted-foreground">
          Neural Progress: {currentIndex + 1} / {totalCards}
        </span>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full rounded-lg border-2 border-primary/20 bg-gradient-neural p-6 shadow-glow">
        <svg
          className="w-full"
          style={{ height: "150px" }}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Draw connections */}
          <g className="connections">
            {connections.map((conn, idx) => (
              <line
                key={`conn-${idx}`}
                x1={conn.from.x}
                y1={conn.from.y}
                x2={conn.to.x}
                y2={conn.to.y}
                className="animate-fade-in"
                style={{
                  stroke: "hsl(var(--primary-glow))",
                  strokeWidth: "0.5",
                  opacity: 0.6,
                  animationDelay: `${idx * 0.1}s`,
                }}
              />
            ))}
          </g>

          {/* Draw neurons */}
          <g className="neurons">
            {neurons.map((neuron) => (
              <g key={neuron.id}>
                {/* Glow effect for active neurons */}
                {neuron.active && (
                  <circle
                    cx={neuron.x}
                    cy={neuron.y}
                    r="4"
                    className="animate-glow-pulse"
                    style={{
                      fill: "hsl(var(--primary-glow))",
                      opacity: 0.3,
                      animationDelay: `${neuron.id * 0.15}s`,
                    }}
                  />
                )}
                
                {/* Main neuron */}
                <circle
                  cx={neuron.x}
                  cy={neuron.y}
                  r="2.5"
                  className={neuron.active ? "animate-scale-in" : ""}
                  style={{
                    fill: neuron.active
                      ? "hsl(var(--primary))"
                      : "hsl(var(--muted))",
                    stroke: neuron.active
                      ? "hsl(var(--primary-glow))"
                      : "hsl(var(--border))",
                    strokeWidth: "0.5",
                    animationDelay: `${neuron.id * 0.15}s`,
                    transition: "all 0.3s ease",
                  }}
                />

                {/* Pulse ring for recently activated neuron */}
                {neuron.id === currentIndex && (
                  <circle
                    cx={neuron.x}
                    cy={neuron.y}
                    r="2.5"
                    className="animate-glow-pulse"
                    style={{
                      fill: "none",
                      stroke: "hsl(var(--accent-electric))",
                      strokeWidth: "0.8",
                      opacity: 0.8,
                    }}
                  />
                )}
              </g>
            ))}
          </g>
        </svg>

        {/* Progress text */}
        <div className="mt-3 text-center">
          <p className="text-xs text-muted-foreground">
            {currentIndex === totalCards - 1
              ? "🧠 Neural network complete!"
              : "Building connections..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NeuronProgress;
