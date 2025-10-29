import { useState } from "react";
import { RotateCcw, Check, Shuffle, Brain, BookOpen, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import NeuronProgress from "../components/NeuronProgress";

interface InterleavedCard {
  id: string;
  front: string;
  back: string;
  subject: string;
  subjectColor: string;
}

const Interleaved = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);

  // Mixed cards from different subjects - interleaved pattern
  const cards: InterleavedCard[] = [
    {
      id: "1",
      front: "What is a closure in JavaScript?",
      back: "A closure is a function that has access to variables in its outer function's scope chain, even after the outer function has returned.",
      subject: "JavaScript",
      subjectColor: "hsl(var(--primary))",
    },
    {
      id: "2",
      front: "What is the Mitochondria?",
      back: "The mitochondria is the powerhouse of the cell, responsible for producing ATP through cellular respiration.",
      subject: "Biology",
      subjectColor: "hsl(var(--accent-electric))",
    },
    {
      id: "3",
      front: "What is the Big O notation for binary search?",
      back: "O(log n) - Binary search has logarithmic time complexity because it divides the search space in half with each iteration.",
      subject: "Algorithms",
      subjectColor: "hsl(var(--warning))",
    },
    {
      id: "4",
      front: "What is the difference between let and var?",
      back: "let is block-scoped while var is function-scoped. let doesn't allow redeclaration in the same scope.",
      subject: "JavaScript",
      subjectColor: "hsl(var(--primary))",
    },
    {
      id: "5",
      front: "What is DNA replication?",
      back: "DNA replication is the process by which DNA makes a copy of itself during cell division, ensuring genetic information is passed to daughter cells.",
      subject: "Biology",
      subjectColor: "hsl(var(--accent-electric))",
    },
    {
      id: "6",
      front: "What is the difference between Stack and Queue?",
      back: "Stack follows LIFO (Last In First Out) principle, while Queue follows FIFO (First In First Out) principle.",
      subject: "Algorithms",
      subjectColor: "hsl(var(--warning))",
    },
  ];

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

  // Get unique subjects for stats
  const subjects = [...new Set(cards.map(c => c.subject))];
  const subjectCounts = subjects.map(subject => ({
    name: subject,
    count: cards.filter(c => c.subject === subject).length,
    color: cards.find(c => c.subject === subject)?.subjectColor || "hsl(var(--primary))",
  }));

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRating = (rating: "again" | "hard" | "good" | "easy") => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      setSessionComplete(true);
    }
  };

  if (sessionComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center shadow-glow">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10 text-success mx-auto">
            <Check className="h-10 w-10" />
          </div>
          <h2 className="mb-4 text-3xl font-bold">Interleaved Session Complete! 🎉</h2>
          <p className="mb-4 text-muted-foreground">
            Excellent work! You've practiced {cards.length} cards across {subjects.length} different subjects.
          </p>
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {subjectCounts.map((subject) => (
              <Badge
                key={subject.name}
                variant="outline"
                className="border-2"
                style={{ borderColor: subject.color, color: subject.color }}
              >
                {subject.name}: {subject.count} cards
              </Badge>
            ))}
          </div>
          <div className="space-y-3">
            <Button onClick={() => navigate("/decks")} className="w-full">
              Return to Decks
            </Button>
            <Button
              onClick={() => {
                setCurrentIndex(0);
                setIsFlipped(false);
                setSessionComplete(false);
              }}
              variant="outline"
              className="w-full"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Study Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Shuffle className="h-8 w-8 text-primary" />
                Interleaved Practice
              </h1>
              <p className="text-muted-foreground mt-1">
                Mixed topics for better long-term retention
              </p>
            </div>
            <Button onClick={() => navigate("/decks")} variant="outline" size="sm">
              Exit
            </Button>
          </div>

          {/* Subject Distribution */}
          <Card className="mb-4 p-4 bg-gradient-neural">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="h-5 w-5 text-primary" />
              <span className="font-semibold">Studying {subjects.length} subjects</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {subjectCounts.map((subject) => (
                <Badge
                  key={subject.name}
                  variant="secondary"
                  className="border"
                  style={{ 
                    borderColor: subject.color,
                    backgroundColor: `${subject.color}15`,
                    color: subject.color 
                  }}
                >
                  {subject.name} ({subject.count})
                </Badge>
              ))}
            </div>
          </Card>

          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Card {currentIndex + 1} of {cards.length}
            </span>
            <Badge
              variant="outline"
              className="border-2"
              style={{
                borderColor: currentCard.subjectColor,
                color: currentCard.subjectColor,
              }}
            >
              <BookOpen className="h-3 w-3 mr-1" />
              {currentCard.subject}
            </Badge>
          </div>
        </div>

        {/* Main Card */}
        <Card
          className="mb-6 cursor-pointer overflow-hidden border-2 p-8 shadow-glow transition-smooth hover:border-primary/50"
          onClick={handleFlip}
          style={{
            borderColor: isFlipped ? currentCard.subjectColor : undefined,
          }}
        >
          <div className="min-h-[300px] flex items-center justify-center text-center">
            <div className="w-full">
              {!isFlipped ? (
                <div className="animate-fade-in">
                  <div
                    className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-medium"
                    style={{
                      backgroundColor: `${currentCard.subjectColor}20`,
                      color: currentCard.subjectColor,
                    }}
                  >
                    Question
                  </div>
                  <p className="text-2xl font-semibold">{currentCard.front}</p>
                  <p className="mt-6 text-sm text-muted-foreground">
                    Click to reveal answer
                  </p>
                </div>
              ) : (
                <div className="animate-fade-in">
                  <div
                    className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-medium"
                    style={{
                      backgroundColor: `${currentCard.subjectColor}20`,
                      color: currentCard.subjectColor,
                    }}
                  >
                    Answer
                  </div>
                  <p className="text-xl leading-relaxed">{currentCard.back}</p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Info Card */}
        {!isFlipped && (
          <Card className="mb-6 border-2 border-primary/20 p-4 bg-gradient-card animate-fade-in">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Why Interleaving Works</h3>
                <p className="text-sm text-muted-foreground">
                  Mixing different topics forces your brain to discriminate between concepts and 
                  strengthens your ability to apply knowledge in varied contexts. This improves 
                  long-term retention compared to blocked practice.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Rating Buttons */}
        {isFlipped && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 animate-slide-up">
            <Button
              onClick={() => handleRating("again")}
              variant="outline"
              className="border-destructive/50 hover:bg-destructive/10"
            >
              Again
            </Button>
            <Button
              onClick={() => handleRating("hard")}
              variant="outline"
              className="border-warning/50 hover:bg-warning/10"
            >
              Hard
            </Button>
            <Button
              onClick={() => handleRating("good")}
              variant="outline"
              className="border-accent/50 hover:bg-accent/10"
            >
              Good
            </Button>
            <Button
              onClick={() => handleRating("easy")}
              className="bg-success hover:bg-success/90"
            >
              <Check className="mr-2 h-4 w-4" />
              Easy
            </Button>
          </div>
        )}

        {!isFlipped && (
          <Button onClick={handleFlip} className="w-full" size="lg">
            Show Answer
          </Button>
        )}
      </div>
    </div>
  );
};

export default Interleaved;
