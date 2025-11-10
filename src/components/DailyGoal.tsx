import { Target, Check } from "lucide-react";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";

const DailyGoals = () => {
  const [goals, setGoals] = useState([
    { id: "1", text: "Complete 1 study session", completed: true, type: "session" },
    { id: "2", text: "Review 15 cards", completed: true, type: "cards" },
    { id: "3", text: "Practice interleaved study", completed: false, type: "method" },
    { id: "4", text: "Write self-explanation for 3 cards", completed: false, type: "reflection" },
    { id: "5", text: "Visit memory palace", completed: false, type: "spatial" },
  ]);

  const toggleGoal = (id: string) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const completedCount = goals.filter(g => g.completed).length;
  const totalGoals = goals.length;
  const percentage = (completedCount / totalGoals) * 100;

  return (
    <Card className="p-6 border-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Today's Goals
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {completedCount} of {totalGoals} completed
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-primary">{Math.round(percentage)}%</div>
        </div>
      </div>

      {/* Progress Ring Visual */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative h-32 w-32">
          <svg className="transform -rotate-90" width="128" height="128">
            {/* Background circle */}
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted"
              opacity="0.2"
            />
            {/* Progress circle */}
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentage / 100)}`}
              className="text-primary transition-all duration-500"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Check className="h-12 w-12 text-primary" />
          </div>
        </div>
      </div>

      {/* Goal List */}
      <div className="space-y-3">
        {goals.map((goal, index) => (
          <div
            key={goal.id}
            className={`
              flex items-center gap-3 p-3 rounded-lg transition-all duration-300
              ${goal.completed 
                ? "bg-success/10 border-2 border-success/30" 
                : "bg-muted/30 hover:bg-muted/50"
              }
            `}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <Checkbox
              checked={goal.completed}
              onCheckedChange={() => toggleGoal(goal.id)}
              className="shrink-0"
            />
            <p className={`
              text-sm flex-1 transition-all
              ${goal.completed ? "line-through text-muted-foreground" : "text-foreground"}
            `}>
              {goal.text}
            </p>
            {goal.completed && (
              <Check className="h-4 w-4 text-success shrink-0 animate-scale-in" />
            )}
          </div>
        ))}
      </div>

      {/* Encouragement Message */}
      <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
        <p className="text-sm text-center">
          {completedCount === totalGoals ? (
            <span className="font-medium">🎉 All goals completed! You're building strong learning habits.</span>
          ) : completedCount >= totalGoals / 2 ? (
            <span className="font-medium">Great progress! Keep the momentum going.</span>
          ) : (
            <span className="font-medium">Every small step counts. You've got this!</span>
          )}
        </p>
      </div>
    </Card>
  );
};

export default DailyGoals;
