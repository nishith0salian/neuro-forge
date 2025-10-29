import { useState } from "react";
import { Brain, Flame, Target, TrendingUp, BookOpen, Calendar, Sparkles, Award, Clock, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import StreakTracker from "../components/StreakTracker";
import MasteryTree from "../components/MasteryTree";
import DailyGoals from "../components/DailyGoal";
import ReflectionPrompt from "../components/ReflectionPrompt";
import ProgressInsights from "../components/ProgressInsights";

const Dashboard = () => {
  const [showReflection, setShowReflection] = useState(false);

  // Mock user progress data
  const userData = {
    currentStreak: 10,
    longestStreak: 14,
    totalStudySessions: 42,
    cardsReviewed: 328,
    masteryLevel: 3,
    weeklyGoal: 5,
    completedToday: 2,
    todayMinutes: 45,
    averageAccuracy: 87,
  };

  const recentActivity = [
    { id: "1", deck: "JavaScript Fundamentals", cards: 12, accuracy: 92, time: "2 hours ago" },
    { id: "2", deck: "Cell Biology", cards: 8, accuracy: 85, time: "Yesterday" },
    { id: "3", deck: "Algorithm Patterns", cards: 15, accuracy: 88, time: "2 days ago" },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="mb-2 text-4xl font-bold flex items-center gap-3">
            <Brain className="h-10 w-10 text-primary" />
            Your Learning Journey
          </h1>
          <p className="text-lg text-muted-foreground">
            Progress with purpose, one step at a time
          </p>
        </div>

        {/* Top Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <Card className="p-6 border-2 hover:border-primary/50 transition-smooth group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 group-hover:scale-110 transition-smooth">
                <Flame className="h-6 w-6 text-orange-500" />
              </div>
              <span className="text-3xl font-bold">{userData.currentStreak}</span>
            </div>
            <p className="text-sm font-medium mb-1">Day Streak</p>
            <p className="text-xs text-muted-foreground">
              Best: {userData.longestStreak} days
            </p>
          </Card>

          <Card className="p-6 border-2 hover:border-primary/50 transition-smooth group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 group-hover:scale-110 transition-smooth">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <span className="text-3xl font-bold">
                {userData.completedToday}/{userData.weeklyGoal}
              </span>
            </div>
            <p className="text-sm font-medium mb-1">Today's Sessions</p>
            <Progress value={(userData.completedToday / userData.weeklyGoal) * 100} className="h-1.5" />
          </Card>

          <Card className="p-6 border-2 hover:border-primary/50 transition-smooth group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-success/20 to-accent/20 group-hover:scale-110 transition-smooth">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <span className="text-3xl font-bold">{userData.averageAccuracy}%</span>
            </div>
            <p className="text-sm font-medium mb-1">Accuracy</p>
            <p className="text-xs text-muted-foreground">
              Last 7 days
            </p>
          </Card>

          <Card className="p-6 border-2 hover:border-primary/50 transition-smooth group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 group-hover:scale-110 transition-smooth">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <span className="text-3xl font-bold">{userData.todayMinutes}</span>
            </div>
            <p className="text-sm font-medium mb-1">Minutes Today</p>
            <p className="text-xs text-muted-foreground">
              Keep the momentum
            </p>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Streak Tracker */}
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <StreakTracker currentStreak={userData.currentStreak} longestStreak={userData.longestStreak} />
            </div>

            {/* Daily Goals */}
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <DailyGoals />
            </div>

            {/* Progress Insights */}
            <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <ProgressInsights />
            </div>

            {/* Recent Activity */}
            <Card className="p-6 border-2 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <h3 className="mb-4 text-xl font-semibold flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Recent Sessions
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth"
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  >
                    <div className="flex-1">
                      <p className="font-medium mb-1">{activity.deck}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.cards} cards • {activity.accuracy}% accuracy
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <CheckCircle2 className="h-3 w-3 text-success" />
                        <span className="text-xs font-medium text-success">Complete</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/decks">View All Decks</Link>
              </Button>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Reflection Prompt */}
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <ReflectionPrompt />
            </div>

            {/* Mastery Tree */}
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <MasteryTree level={userData.masteryLevel} />
            </div>

            {/* Quick Actions */}
            <Card className="p-6 border-2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Quick Start
              </h3>
              <div className="space-y-3">
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link to="/study">
                    <Brain className="mr-2 h-4 w-4" />
                    Continue Studying
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link to="/memory-palace">
                    <Target className="mr-2 h-4 w-4" />
                    Memory Palace
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link to="/interleaved">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Interleaved Practice
                  </Link>
                </Button>
              </div>
            </Card>

            {/* Milestone Card */}
            <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 shrink-0">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Next Milestone</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    10 day streak achievement
                  </p>
                  <Progress value={70} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">3 more days to go!</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
