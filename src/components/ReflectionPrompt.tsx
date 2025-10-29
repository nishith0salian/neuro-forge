import { MessageSquare, Send, Sparkles } from "lucide-react";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";

const ReflectionPrompt = () => {
  const [reflection, setReflection] = useState("");
  const [saved, setSaved] = useState(false);

  // Rotating reflection prompts
  const prompts = [
    "What concept clicked for you today?",
    "How will you apply what you learned?",
    "What connection did you make between topics?",
    "What strategy worked best for you today?",
    "What would you like to explore deeper?",
  ];

  const todayPrompt = prompts[new Date().getDay() % prompts.length];

  const handleSave = () => {
    if (reflection.trim()) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      // In real app: save to database
      setReflection("");
    }
  };

  return (
    <Card className="p-6 border-2 relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent pointer-events-none" />
      
      <div className="relative">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Daily Reflection</h3>
            <p className="text-xs text-muted-foreground">Growth through self-awareness</p>
          </div>
        </div>

        {/* Prompt Card */}
        <div className="mb-4 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
          <div className="flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-primary shrink-0 mt-1" />
            <p className="text-sm font-medium">{todayPrompt}</p>
          </div>
        </div>

        {/* Reflection Input */}
        <Textarea
          placeholder="Write your thoughts here... This helps deepen understanding and track your learning journey."
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          rows={4}
          className="mb-3 resize-none"
        />

        <Button
          onClick={handleSave}
          className="w-full"
          disabled={!reflection.trim() || saved}
        >
          {saved ? (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Saved!
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Save Reflection
            </>
          )}
        </Button>

        {/* Info Text */}
        <div className="mt-4 p-3 rounded-lg bg-muted/30">
          <p className="text-xs text-muted-foreground text-center">
            Self-explanation strengthens understanding and reveals knowledge gaps. Reflect regularly to maximize retention.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ReflectionPrompt;
