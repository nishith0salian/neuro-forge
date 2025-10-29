import { Flame, Calendar } from "lucide-react";
import { Card } from "./ui/card";

interface StreakTrackerProps {
  currentStreak: number;
  longestStreak: number;
}

const StreakTracker = ({ currentStreak, longestStreak }: StreakTrackerProps) => {
  // Generate last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
      completed: i < currentStreak, // Mock: last X days completed
      isToday: i === 6,
    };
  });

  return (
    <Card className="p-6 border-2 overflow-hidden relative">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 pointer-events-none" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold flex items-center gap-2 mb-1">
              <Flame className="h-6 w-6 text-orange-500" />
              {currentStreak} Day Streak
            </h3>
            <p className="text-sm text-muted-foreground">
              Keep going! Your longest streak is {longestStreak} days
            </p>
          </div>
        </div>

        {/* Weekly Calendar */}
        <div className="grid grid-cols-7 gap-2">
          {last7Days.map((day, index) => (
            <div
              key={index}
              className={`
                flex flex-col items-center p-3 rounded-lg transition-all duration-300
                ${day.isToday ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}
                ${day.completed 
                  ? "bg-gradient-to-br from-orange-500/20 to-red-500/20 border-2 border-orange-500/30" 
                  : "bg-muted/30 border-2 border-muted"
                }
              `}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <span className="text-xs font-medium text-muted-foreground mb-2">
                {day.day}
              </span>
              <div className={`
                flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold
                ${day.completed 
                  ? "bg-gradient-to-br from-orange-500 to-red-500 text-white" 
                  : "bg-muted text-muted-foreground"
                }
              `}>
                {day.completed ? (
                  <Flame className="h-4 w-4" />
                ) : (
                  day.date
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Streak Tips */}
        <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-muted">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium mb-1">Build Consistency</p>
              <p className="text-xs text-muted-foreground">
                Daily practice, even for just 5 minutes, strengthens neural pathways and improves long-term retention.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StreakTracker;
