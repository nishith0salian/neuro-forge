import { Trophy, Star, Sparkles, Lock } from "lucide-react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";

interface MasteryTreeProps {
  level: number;
}

const MasteryTree = ({ level }: MasteryTreeProps) => {
  const levels = [
    { id: 1, name: "Beginner", icon: Star, color: "text-blue-500", bgColor: "bg-blue-500/20", borderColor: "border-blue-500/30" },
    { id: 2, name: "Learner", icon: Sparkles, color: "text-purple-500", bgColor: "bg-purple-500/20", borderColor: "border-purple-500/30" },
    { id: 3, name: "Practitioner", icon: Trophy, color: "text-amber-500", bgColor: "bg-amber-500/20", borderColor: "border-amber-500/30" },
    { id: 4, name: "Expert", icon: Trophy, color: "text-orange-500", bgColor: "bg-orange-500/20", borderColor: "border-orange-500/30" },
    { id: 5, name: "Master", icon: Trophy, color: "text-primary", bgColor: "bg-primary/20", borderColor: "border-primary/30" },
  ];

  const currentLevel = levels.find(l => l.id === level) || levels[0];
  const progressToNext = 65; // Mock progress to next level

  return (
    <Card className="p-6 border-2 relative overflow-hidden">
      {/* Background gradient */}
      <div className={`absolute inset-0 ${currentLevel.bgColor} opacity-30 pointer-events-none`} />
      
      <div className="relative">
        <h3 className="mb-4 text-xl font-semibold flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Mastery Level
        </h3>

        {/* Current Level Display */}
        <div className="mb-6 text-center">
          <div className={`inline-flex h-20 w-20 items-center justify-center rounded-full ${currentLevel.bgColor} border-4 ${currentLevel.borderColor} mb-3`}>
            <currentLevel.icon className={`h-10 w-10 ${currentLevel.color}`} />
          </div>
          <h4 className="text-2xl font-bold">{currentLevel.name}</h4>
          <p className="text-sm text-muted-foreground">Level {level}</p>
        </div>

        {/* Progress to Next Level */}
        {level < 5 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress to {levels[level].name}</span>
              <span className="text-sm text-muted-foreground">{progressToNext}%</span>
            </div>
            <Progress value={progressToNext} className="h-2" />
          </div>
        )}

        {/* Level Tree */}
        <div className="space-y-3">
          {levels.map((lvl, index) => {
            const isUnlocked = lvl.id <= level;
            const isCurrent = lvl.id === level;
            
            return (
              <div
                key={lvl.id}
                className={`
                  flex items-center gap-3 p-3 rounded-lg transition-all duration-300
                  ${isCurrent ? `${lvl.bgColor} border-2 ${lvl.borderColor}` : "bg-muted/30"}
                  ${!isUnlocked ? "opacity-50" : ""}
                `}
              >
                <div className={`
                  flex h-10 w-10 items-center justify-center rounded-full shrink-0
                  ${isUnlocked ? `${lvl.bgColor} border-2 ${lvl.borderColor}` : "bg-muted border-2 border-muted"}
                `}>
                  {isUnlocked ? (
                    <lvl.icon className={`h-5 w-5 ${lvl.color}`} />
                  ) : (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isCurrent ? "text-foreground" : ""}`}>
                    {lvl.name}
                  </p>
                  <p className="text-xs text-muted-foreground">Level {lvl.id}</p>
                </div>
                {isCurrent && (
                  <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                )}
              </div>
            );
          })}
        </div>

        {/* Motivation Text */}
        <div className="mt-6 p-3 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-xs text-center text-muted-foreground">
            <strong>Autonomy:</strong> You control your learning pace. <strong>Mastery:</strong> Each session builds expertise. <strong>Purpose:</strong> Knowledge compounds over time.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default MasteryTree;
