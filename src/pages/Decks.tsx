import { useState } from "react";
import { Plus, BookOpen, Clock, TrendingUp, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

interface Deck {
  id: string;
  name: string;
  subject: string;
  description: string;
  cardCount: number;
  dueCount: number;
  masteredCount: number;
  lastStudied?: Date;
}

const Decks = () => {
  const [decks, setDecks] = useState<Deck[]>([
    {
      id: "1",
      name: "JavaScript Fundamentals",
      subject: "Software Engineering",
      description: "Core concepts and syntax of JavaScript",
      cardCount: 45,
      dueCount: 12,
      masteredCount: 28,
      lastStudied: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: "2",
      name: "Cell Biology",
      subject: "Biology",
      description: "Cellular structures and processes",
      cardCount: 67,
      dueCount: 8,
      masteredCount: 45,
      lastStudied: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newDeck, setNewDeck] = useState({
    name: "",
    subject: "",
    description: "",
  });

  const handleCreateDeck = () => {
    if (!newDeck.name || !newDeck.subject) return;

    const deck: Deck = {
      id: Date.now().toString(),
      ...newDeck,
      cardCount: 0,
      dueCount: 0,
      masteredCount: 0,
    };

    setDecks([...decks, deck]);
    setNewDeck({ name: "", subject: "", description: "" });
    setIsCreateOpen(false);
  };

  const getProgressPercentage = (deck: Deck) => {
    return deck.cardCount > 0 ? (deck.masteredCount / deck.cardCount) * 100 : 0;
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold">My Decks</h1>
            <p className="text-muted-foreground">
              Manage your learning decks and track progress
            </p>
          </div>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="shadow-glow">
                <Plus className="mr-2 h-5 w-5" />
                Create Deck
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Deck</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="name">Deck Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Spanish Vocabulary"
                    value={newDeck.name}
                    onChange={(e) => setNewDeck({ ...newDeck, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="e.g., Languages"
                    value={newDeck.subject}
                    onChange={(e) => setNewDeck({ ...newDeck, subject: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="What will you learn with this deck?"
                    value={newDeck.description}
                    onChange={(e) => setNewDeck({ ...newDeck, description: e.target.value })}
                  />
                </div>
                <Button onClick={handleCreateDeck} className="w-full">
                  Create Deck
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Decks</p>
                <p className="text-2xl font-bold">{decks.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Due Today</p>
                <p className="text-2xl font-bold">
                  {decks.reduce((sum, deck) => sum + deck.dueCount, 0)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 text-success">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mastered</p>
                <p className="text-2xl font-bold">
                  {decks.reduce((sum, deck) => sum + deck.masteredCount, 0)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10 text-warning">
                <Settings className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Cards</p>
                <p className="text-2xl font-bold">
                  {decks.reduce((sum, deck) => sum + deck.cardCount, 0)}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Decks Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {decks.map((deck) => (
            <Card
              key={deck.id}
              className="group overflow-hidden border-2 transition-smooth hover:border-primary/50 hover:shadow-glow"
            >
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="mb-1 text-xl font-semibold">{deck.name}</h3>
                    <p className="text-sm text-muted-foreground">{deck.subject}</p>
                  </div>
                  {deck.dueCount > 0 && (
                    <div className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                      {deck.dueCount} due
                    </div>
                  )}
                </div>

                {deck.description && (
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                    {deck.description}
                  </p>
                )}

                <div className="mb-4">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">
                      {deck.masteredCount}/{deck.cardCount} mastered
                    </span>
                  </div>
                  <Progress value={getProgressPercentage(deck)} className="h-2" />
                </div>

                <div className="flex gap-2">
                  <Button asChild className="flex-1" size="sm">
                    <Link to={`/study/${deck.id}`}>Study Now</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/deck/${deck.id}`}>
                      <Settings className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {decks.length === 0 && (
          <Card className="border-2 border-dashed p-12 text-center">
            <BookOpen className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-semibold">No decks yet</h3>
            <p className="mb-4 text-muted-foreground">
              Create your first deck to start learning
            </p>
            <Button onClick={() => setIsCreateOpen(true)}>
              <Plus className="mr-2 h-5 w-5" />
              Create Your First Deck
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Decks;
