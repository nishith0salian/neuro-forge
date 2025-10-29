import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ForceGraph2D from "react-force-graph-2d";
import { Brain, Zap, Plus, Sparkles, Lock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { Navigation } from "../components/Navigation";

interface GraphNode {
    id: string;
    name: string;
    val: number;
    color: string;
    content: string;
    x?: number;
    y?: number;
    quiz?: {
        question: string;
        answer: string;
    };
}

interface GraphLink {
    source: string;
    target: string;
    label: string;
}

interface GraphData {
    nodes: GraphNode[];
    links: GraphLink[];
}

const KnowledgeNetwork = () => {
    const navigate = useNavigate();
    const fgRef = useRef<any>();
    const [topic, setTopic] = useState("");
    const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
    const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showUpgrade, setShowUpgrade] = useState(false);
    const [isPro] = useState(false); // This should come from auth context in real app

    // Sample data for demo
    const sampleData: GraphData = {
        nodes: [
            { id: "1", name: "React", val: 20, color: "#61dafb", content: "A JavaScript library for building user interfaces with component-based architecture.", quiz: { question: "What is React primarily used for?", answer: "Building user interfaces with reusable components" } },
            { id: "2", name: "JSX", val: 15, color: "#f7df1e", content: "A syntax extension for JavaScript that allows writing HTML-like code in React.", quiz: { question: "What does JSX stand for?", answer: "JavaScript XML" } },
            { id: "3", name: "Components", val: 18, color: "#646cff", content: "Reusable pieces of UI that can accept props and manage their own state.", quiz: { question: "What are the two types of React components?", answer: "Function components and Class components" } },
            { id: "4", name: "State", val: 16, color: "#ff6b6b", content: "Data that changes over time and triggers re-renders when updated.", quiz: { question: "What hook is used to manage state in function components?", answer: "useState" } },
            { id: "5", name: "Props", val: 14, color: "#51cf66", content: "Properties passed from parent to child components to customize behavior.", quiz: { question: "Are props mutable or immutable?", answer: "Immutable - they should not be modified by child components" } },
            { id: "6", name: "Hooks", val: 17, color: "#ff8787", content: "Functions that let you use state and other React features in function components.", quiz: { question: "Name three common React hooks", answer: "useState, useEffect, useContext" } },
            { id: "7", name: "Virtual DOM", val: 15, color: "#ffd43b", content: "A lightweight copy of the real DOM that React uses for efficient updates.", quiz: { question: "Why is the Virtual DOM faster?", answer: "It minimizes direct DOM manipulations by batching updates" } },
            { id: "8", name: "useEffect", val: 14, color: "#fd79a8", content: "A hook for handling side effects like data fetching and subscriptions.", quiz: { question: "What does the dependency array in useEffect do?", answer: "Controls when the effect runs based on value changes" } },
        ],
        links: [
            { source: "1", target: "2", label: "uses" },
            { source: "1", target: "3", label: "built with" },
            { source: "3", target: "4", label: "manages" },
            { source: "3", target: "5", label: "receives" },
            { source: "1", target: "6", label: "features" },
            { source: "6", target: "4", label: "handles" },
            { source: "6", target: "8", label: "includes" },
            { source: "1", target: "7", label: "uses" },
        ],
    };

    useEffect(() => {
        // Set sample data on mount
        setGraphData(sampleData);
    }, []);

    const handleGenerate = async () => {
        if (!topic.trim()) {
            toast.error("Please enter a topic");
            return;
        }

        // Check if user is pro for AI generation
        if (!isPro) {
            setShowUpgrade(true);
            return;
        }

        setIsGenerating(true);
        try {
            // TODO: Integrate with Lovable AI to generate knowledge graph
            toast.success("AI generation coming soon!");
            // For now, show sample data
            setGraphData(sampleData);
        } catch (error) {
            toast.error("Failed to generate knowledge graph");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleNodeClick = useCallback((node: GraphNode) => {
        setSelectedNode(node);

        // Center the graph on clicked node
        if (fgRef.current) {
            fgRef.current.centerAt(node.x, node.y, 1000);
            fgRef.current.zoom(2, 1000);
        }
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="container mx-auto px-4 pt-24 pb-12">
                {/* Header */}
                <header className="mb-8 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-2 text-sm font-medium text-primary animate-fade-in">
                        <Brain className="h-4 w-4" />
                        Knowledge Network
                        {!isPro && <Badge variant="secondary" className="ml-2">Pro Feature</Badge>}
                    </div>

                    <h1 className="mb-4 text-4xl font-bold md:text-5xl animate-fade-in">
                        Visualize Your Learning Journey
                    </h1>

                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "0.1s" }}>
                        Discover connections between concepts with AI-powered knowledge graphs.
                        Click on nodes to quiz yourself and reveal deeper insights.
                    </p>
                </header>

                {/* Input Section */}
                <Card className="mb-8 p-6 shadow-glow animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <div className="flex flex-col gap-4 md:flex-row">
                        <Input
                            placeholder="Enter a topic (e.g., 'React Hooks', 'Machine Learning', 'Spanish verbs')"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                            className="flex-1"
                        />
                        <Button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="gap-2"
                            size="lg"
                        >
                            {isGenerating ? (
                                <>
                                    <Sparkles className="h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Zap className="h-4 w-4" />
                                    Generate Network
                                </>
                            )}
                        </Button>
                    </div>

                    {!isPro && (
                        <p className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            AI-powered generation requires Pro plan. Currently showing sample data.
                        </p>
                    )}
                </Card>

                {/* Graph Visualization */}
                {graphData.nodes.length > 0 && (
                    <Card className="overflow-hidden shadow-glow animate-scale-in">
                        <div className="h-[600px] bg-background/50">
                            <ForceGraph2D
                                ref={fgRef}
                                graphData={graphData}
                                nodeLabel="name"
                                nodeAutoColorBy="color"
                                nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
                                    const label = node.name;
                                    const fontSize = 12 / globalScale;
                                    ctx.font = `${fontSize}px Sans-Serif`;
                                    const textWidth = ctx.measureText(label).width;
                                    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.4);

                                    // Draw node circle
                                    ctx.fillStyle = node.color;
                                    ctx.beginPath();
                                    ctx.arc(node.x, node.y, node.val / 2, 0, 2 * Math.PI);
                                    ctx.fill();

                                    // Draw label background
                                    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                                    ctx.fillRect(
                                        node.x - bckgDimensions[0] / 2,
                                        node.y - node.val / 2 - bckgDimensions[1],
                                        bckgDimensions[0],
                                        bckgDimensions[1]
                                    );

                                    // Draw label text
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillStyle = '#fff';
                                    ctx.fillText(label, node.x, node.y - node.val / 2 - fontSize / 2);
                                }}
                                onNodeClick={handleNodeClick}
                                linkLabel="label"
                                linkDirectionalArrowLength={3.5}
                                linkDirectionalArrowRelPos={1}
                                linkCurvature={0.25}
                                backgroundColor="transparent"
                                linkColor={() =>
                                    window.matchMedia("(prefers-color-scheme: dark)").matches
                                        ? "#ffffff" // white for dark mode
                                        : "#333333" // dark gray for light mode
                                }
                            />
                        </div>
                    </Card>
                )}

                {/* Instructions */}
                {graphData.nodes.length === 0 && (
                    <Card className="border-dashed p-12 text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
                        <Brain className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                        <h3 className="mb-2 text-xl font-semibold">Start Building Your Knowledge Network</h3>
                        <p className="text-muted-foreground">
                            Enter a topic above to generate an AI-powered concept map
                        </p>
                    </Card>
                )}
            </main>

            {/* Node Detail Dialog */}
            <Dialog open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-2xl">
                            <span
                                className="h-4 w-4 rounded-full"
                                style={{ backgroundColor: selectedNode?.color }}
                            />
                            {selectedNode?.name}
                        </DialogTitle>
                        <DialogDescription className="text-base">
                            {selectedNode?.content}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedNode?.quiz && (
                        <Card className="mt-4 border-2 border-primary/20 p-6">
                            <div className="mb-4 flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-primary" />
                                <span className="font-semibold">Quiz Yourself</span>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Question</Label>
                                    <p className="mt-1 text-lg">{selectedNode.quiz.question}</p>
                                </div>

                                <details className="group">
                                    <summary className="cursor-pointer text-sm font-medium text-primary hover:underline">
                                        Show Answer
                                    </summary>
                                    <p className="mt-2 rounded-lg bg-primary/5 p-4 text-base animate-fade-in">
                                        {selectedNode.quiz.answer}
                                    </p>
                                </details>
                            </div>
                        </Card>
                    )}

                    <div className="mt-6 flex gap-3">
                        <Button onClick={() => setSelectedNode(null)} className="flex-1">
                            Got it!
                        </Button>
                        {!isPro && (
                            <Button variant="outline" onClick={() => setShowUpgrade(true)} className="flex-1">
                                <Plus className="mr-2 h-4 w-4" />
                                Add to Study Deck
                            </Button>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Upgrade Dialog */}
            <Dialog open={showUpgrade} onOpenChange={setShowUpgrade}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-2xl">
                            <Sparkles className="h-6 w-6 text-primary" />
                            Upgrade to Pro
                        </DialogTitle>
                        <DialogDescription>
                            Unlock AI-powered knowledge graphs, unlimited networks, and advanced learning features
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <Zap className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium">AI-Generated Networks</p>
                                <p className="text-sm text-muted-foreground">
                                    Create unlimited knowledge graphs from any topic
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <Brain className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium">Smart Quizzes</p>
                                <p className="text-sm text-muted-foreground">
                                    Interactive questions for every concept node
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <Plus className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium">Deck Integration</p>
                                <p className="text-sm text-muted-foreground">
                                    Convert network nodes into study cards automatically
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => setShowUpgrade(false)} className="flex-1">
                            Maybe Later
                        </Button>
                        <Button onClick={() => navigate("/pricing")} className="flex-1">
                            View Plans
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default KnowledgeNetwork;
