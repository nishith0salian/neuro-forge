import { MapPin, Plus, Brain, Layers } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

interface Room {
  id: string;
  name: string;
  color: string;
  cardCount: number;
  position: { x: number; y: number };
}

const MemoryPalace = () => {
  const [rooms] = useState<Room[]>([
    { id: "1", name: "Algorithm Hall", color: "bg-primary", cardCount: 15, position: { x: 1, y: 1 } },
    { id: "2", name: "Syntax Garden", color: "bg-accent", cardCount: 23, position: { x: 2, y: 1 } },
    { id: "3", name: "Framework Tower", color: "bg-success", cardCount: 18, position: { x: 1, y: 2 } },
    { id: "4", name: "Pattern Library", color: "bg-warning", cardCount: 12, position: { x: 2, y: 2 } },
  ]);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Memory Palace</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Visualize your knowledge spatially. Place cards in different rooms for better recall.
          </p>
        </div>

        {/* Info Card */}
        <Card className="mb-8 border-2 border-primary/20 p-6 shadow-card">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Lightbulb className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2 font-semibold">How Memory Palaces Work</h3>
              <p className="text-sm text-muted-foreground">
                The Method of Loci (Memory Palace) uses spatial memory to enhance recall. By
                associating information with specific locations, you create strong mental anchors
                that make retrieval easier and more reliable.
              </p>
            </div>
          </div>
        </Card>

        {/* Palace Grid */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Your Palace</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Room
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room, index) => (
              <Card
                key={room.id}
                className="group relative overflow-hidden border-2 p-6 shadow-card transition-smooth hover:border-primary/50 hover:shadow-glow cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 opacity-5 ${room.color}`} />
                
                <div className="relative">
                  <div className="mb-4 flex items-start justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${room.color} bg-opacity-20 text-current transition-smooth group-hover:scale-110`}>
                      <MapPin className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {room.cardCount} cards
                    </Badge>
                  </div>

                  <h3 className="mb-2 text-xl font-semibold">{room.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Position: Row {room.position.y}, Col {room.position.x}
                  </p>

                  <Button className="mt-4 w-full" variant="outline" size="sm">
                    <Layers className="mr-2 h-4 w-4" />
                    View Cards
                  </Button>
                </div>
              </Card>
            ))}

            {/* Add Room Card */}
            <Card className="flex items-center justify-center border-2 border-dashed p-6 text-center transition-smooth hover:border-primary/50 cursor-pointer">
              <div>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <Plus className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium">Add New Room</p>
                <p className="text-xs text-muted-foreground">Expand your palace</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Map View */}
        <Card className="border-2 p-8 shadow-card">
          <h3 className="mb-6 text-xl font-semibold">Palace Map</h3>
          
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 12 }).map((_, index) => {
              const room = rooms.find(
                (r) =>
                  r.position.x === (index % 4) + 1 &&
                  r.position.y === Math.floor(index / 4) + 1
              );

              return (
                <div
                  key={index}
                  className={`aspect-square rounded-xl border-2 ${
                    room
                      ? `${room.color} bg-opacity-10 border-current cursor-pointer transition-smooth hover:bg-opacity-20`
                      : "border-dashed border-muted bg-muted/5"
                  } flex flex-col items-center justify-center p-4`}
                >
                  {room ? (
                    <>
                      <MapPin className="mb-2 h-6 w-6" />
                      <p className="text-center text-xs font-medium">{room.name}</p>
                      <p className="text-xs text-muted-foreground">{room.cardCount} cards</p>
                    </>
                  ) : (
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

// Import Lightbulb from lucide-react at the top
import { Lightbulb } from "lucide-react";

export default MemoryPalace;
