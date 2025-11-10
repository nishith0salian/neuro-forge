import { TrendingUp } from "lucide-react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const ProgressInsights = () => {
  // Mock data for visualizations
  const weeklyData = [
    { day: "Mon", cards: 24, minutes: 35, accuracy: 88 },
    { day: "Tue", cards: 18, minutes: 28, accuracy: 92 },
    { day: "Wed", cards: 32, minutes: 45, accuracy: 85 },
    { day: "Thu", cards: 28, minutes: 40, accuracy: 90 },
    { day: "Fri", cards: 20, minutes: 30, accuracy: 87 },
    { day: "Sat", cards: 15, minutes: 22, accuracy: 94 },
    { day: "Sun", cards: 12, minutes: 18, accuracy: 89 },
  ];

  const maxCards = Math.max(...weeklyData.map(d => d.cards));
  const maxMinutes = Math.max(...weeklyData.map(d => d.minutes));

  return (
    <Card className="p-6 border-2">
      <h3 className="mb-6 text-xl font-semibold flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        Progress Insights
      </h3>

      <Tabs defaultValue="cards" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="time">Time</TabsTrigger>
          <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
        </TabsList>

        {/* Cards Chart */}
        <TabsContent value="cards" className="space-y-4">
          <div className="flex items-end justify-between gap-2 h-48">
            {weeklyData.map((day, index) => {
              const height = (day.cards / maxCards) * 100;
              return (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full flex items-end justify-center h-40">
                    <div
                      className="w-full bg-gradient-to-t from-primary to-primary/50 rounded-t-lg transition-all duration-500 hover:from-primary/80 hover:to-primary/30 cursor-pointer group relative"
                      style={{ 
                        height: `${height}%`,
                        animationDelay: `${index * 0.3}s`
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground text-xs py-1 px-2 rounded whitespace-nowrap">
                        {day.cards} cards
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">{day.day}</span>
                </div>
              );
            })}
          </div>
          <div className="p-4 rounded-lg bg-muted/30">
            <p className="text-sm text-muted-foreground">
              <strong>Total this week:</strong> {weeklyData.reduce((sum, d) => sum + d.cards, 0)} cards reviewed
            </p>
          </div>
        </TabsContent>

        {/* Time Chart */}
        <TabsContent value="time" className="space-y-4">
          <div className="flex items-end justify-between gap-2 h-48">
            {weeklyData.map((day, index) => {
              const height = (day.minutes / maxMinutes) * 100;
              return (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full flex items-end justify-center h-40">
                    <div
                      className="w-full bg-gradient-to-t from-accent to-accent/50 rounded-t-lg transition-all duration-500 hover:from-accent/80 hover:to-accent/30 cursor-pointer group relative"
                      style={{ 
                        height: `${height}%`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-accent text-accent-foreground text-xs py-1 px-2 rounded whitespace-nowrap">
                        {day.minutes} min
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">{day.day}</span>
                </div>
              );
            })}
          </div>
          <div className="p-4 rounded-lg bg-muted/30">
            <p className="text-sm text-muted-foreground">
              <strong>Total this week:</strong> {weeklyData.reduce((sum, d) => sum + d.minutes, 0)} minutes of focused learning
            </p>
          </div>
        </TabsContent>

        {/* Accuracy Chart */}
        <TabsContent value="accuracy" className="space-y-4">
          <div className="relative h-48">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[100, 75, 50, 25, 0].map((val) => (
                <div key={val} className="flex items-center">
                  <span className="text-xs text-muted-foreground w-8">{val}%</span>
                  <div className="flex-1 h-px bg-border ml-2" />
                </div>
              ))}
            </div>
            
            {/* Line chart */}
            <svg className="absolute inset-0 w-full h-full pl-10" preserveAspectRatio="none">
              <defs>
                <linearGradient id="accuracyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              
              {/* Area under line */}
              <path
                d={`M 0,${48 * (1 - weeklyData[0].accuracy / 100)} ${weeklyData.map((d, i) => 
                  `L ${(i / (weeklyData.length - 1)) * 100}%,${48 * (1 - d.accuracy / 100) * 4}`
                ).join(" ")} L 100%,192 L 0,192 Z`}
                fill="url(#accuracyGradient)"
              />
              
              {/* Line */}
              <path
                d={`M 0,${48 * (1 - weeklyData[0].accuracy / 100) * 4} ${weeklyData.map((d, i) => 
                  `L ${(i / (weeklyData.length - 1)) * 100}%,${48 * (1 - d.accuracy / 100) * 4}`
                ).join(" ")}`}
                fill="none"
                stroke="hsl(var(--success))"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Points */}
              {weeklyData.map((d, i) => (
                <circle
                  key={i}
                  cx={`${(i / (weeklyData.length - 1)) * 100}%`}
                  cy={48 * (1 - d.accuracy / 100) * 4}
                  r="4"
                  fill="hsl(var(--success))"
                  className="hover:r-6 transition-all cursor-pointer"
                />
              ))}
            </svg>
          </div>
          
          {/* Days labels */}
          <div className="flex justify-between pl-10">
            {weeklyData.map(day => (
              <span key={day.day} className="text-xs text-muted-foreground font-medium">
                {day.day}
              </span>
            ))}
          </div>
          
          <div className="p-4 rounded-lg bg-muted/30">
            <p className="text-sm text-muted-foreground">
              <strong>Average accuracy:</strong> {Math.round(weeklyData.reduce((sum, d) => sum + d.accuracy, 0) / weeklyData.length)}%
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ProgressInsights;
