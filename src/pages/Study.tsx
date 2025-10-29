import { useState } from "react";
import { RotateCcw, Check, X, Lightbulb, MessageSquare, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import NeuronProgress from "../components//NeuronProgress";

interface StudyCard {
  id: string;
  front: string;
  back: string;
  mnemonic?: string;
}

const Study = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [selfExplanation, setSelfExplanation] = useState("");
  const [sessionComplete, setSessionComplete] = useState(false);

  // Sample cards
  const cards: StudyCard[] = [
    {
      id: "1",
      front: "What is closure in JavaScript?",
      back: "A closure is a function that has access to variables in its outer (enclosing) function's scope chain, even after the outer function has returned.",
      mnemonic: "Think: 'CLOSE-ure' - the inner function CLOSES over the outer variables 📦",
    },
    {
      id: "2",
      front: "What is the difference between let and var?",
      back: "let is block-scoped while var is function-scoped. let doesn't allow redeclaration in the same scope, and variables declared with let are not hoisted to the top.",
      mnemonic: "LET = Limited Extent Territory (block-scoped) 🎯",
    },
    {
      id: "3",
      front: "What is the event loop?",
      back: "The event loop is a mechanism that handles asynchronous operations in JavaScript by continuously checking the call stack and callback queue, executing callbacks when the stack is empty.",
      mnemonic: "Picture a LOOP of events going round and round ⭕",
    },
  ];

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRating = (rating: "again" | "hard" | "good" | "easy") => {
    // In a real app, this would update the spaced repetition algorithm
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setShowMnemonic(false);
      setSelfExplanation("");
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
          <h2 className="mb-4 text-3xl font-bold">Session Complete! 🎉</h2>
          <p className="mb-6 text-muted-foreground">
            Great work! You've reviewed {cards.length} cards.
          </p>
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
        {/* Progress Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Study Session</h1>
            <span className="text-muted-foreground">
              Card {currentIndex + 1} of {cards.length}
            </span>
          </div>
        </div>

        {/* Main Card */}
        <Card
          className="mb-6 cursor-pointer overflow-hidden border-2 p-8 shadow-glow transition-smooth hover:border-primary/50"
          onClick={handleFlip}
        >
          <div className="min-h-[300px] flex items-center justify-center text-center">
            <div className="w-full">
              {!isFlipped ? (
                <div className="animate-fade-in">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                    Question
                  </div>
                  <p className="text-2xl font-semibold">{currentCard.front}</p>
                  <p className="mt-6 text-sm text-muted-foreground">
                    Click to reveal answer
                  </p>
                </div>
              ) : (
                <div className="animate-fade-in">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1 text-sm font-medium text-accent">
                    Answer
                  </div>
                  <p className="text-xl leading-relaxed">{currentCard.back}</p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Mnemonic Section */}
        {isFlipped && currentCard.mnemonic && (
          <Card className="mb-6 border-2 border-warning/20 p-6 shadow-card animate-fade-in">
            <button
              onClick={() => setShowMnemonic(!showMnemonic)}
              className="flex w-full items-center justify-between text-left"
            >
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-warning" />
                <span className="font-semibold">Memory Aid</span>
              </div>
              <ChevronRight
                className={`h-5 w-5 transition-transform ${showMnemonic ? "rotate-90" : ""}`}
              />
            </button>
            {showMnemonic && (
              <p className="mt-4 text-muted-foreground animate-fade-in">
                {currentCard.mnemonic}
              </p>
            )}
          </Card>
        )}

        {/* Self-Explanation */}
        {isFlipped && (
          <Card className="mb-6 border-2 p-6 shadow-card animate-fade-in">
            <Label htmlFor="explanation" className="mb-2 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span className="font-semibold">Explain in Your Own Words</span>
            </Label>
            <Textarea
              id="explanation"
              placeholder="Write your understanding here... This helps reinforce learning!"
              value={selfExplanation}
              onChange={(e) => setSelfExplanation(e.target.value)}
              rows={4}
              className="mt-2"
            />
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
              <X className="mr-2 h-4 w-4" />
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

export default Study;
