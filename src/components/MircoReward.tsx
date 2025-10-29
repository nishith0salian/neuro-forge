import { Sparkles, Star, Trophy, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface MicroRewardProps {
  type: "streak" | "mastery" | "session" | "milestone";
  message: string;
  onComplete?: () => void;
}

const MicroReward = ({ type, message, onComplete }: MicroRewardProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const icons = {
    streak: { Icon: Sparkles, color: "text-orange-500", bg: "bg-orange-500/20" },
    mastery: { Icon: Star, color: "text-amber-500", bg: "bg-amber-500/20" },
    session: { Icon: Zap, color: "text-primary", bg: "bg-primary/20" },
    milestone: { Icon: Trophy, color: "text-success", bg: "bg-success/20" },
  };

  const { Icon, color, bg } = icons[type];

  if (!visible) return null;

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-in-right">
      <div className={`
        flex items-center gap-3 p-4 rounded-lg shadow-glow border-2
        bg-background/95 backdrop-blur-sm
        ${bg} border-current
        animate-fade-in
      `}>
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${bg}`}>
          <Icon className={`h-6 w-6 ${color} animate-pulse`} />
        </div>
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
};

export default MicroReward;
