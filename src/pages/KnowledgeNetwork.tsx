// src/pages/KnowledgeNetwork.tsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ForceGraph2D, { type ForceGraphMethods } from "react-force-graph-2d";
import { Brain, Zap, Plus, Sparkles, Lock, Search } from "lucide-react";
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
    level?: number; // 0 center, higher number = farther out
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

const SAMPLE_DATA: GraphData = {
    nodes: [
        // Level 0 - Core
        { id: "1", name: "Japanese Language", val: 28, color: "#ff6f61", level: 0, content: "A rich language with unique writing systems and grammar structures.", quiz: { question: "What are the three writing systems in Japanese?", answer: "Hiragana, Katakana, and Kanji" } },

        // Level 1 - Foundations
        { id: "2", name: "Hiragana", val: 20, color: "#4caf50", level: 1, content: "Phonetic script used for native Japanese words and grammar.", quiz: { question: "What is the purpose of Hiragana?", answer: "Used for native words and grammatical particles." } },
        { id: "3", name: "Katakana", val: 20, color: "#03a9f4", level: 1, content: "Phonetic script for foreign loanwords and emphasis.", quiz: { question: "When is Katakana used?", answer: "For foreign words, onomatopoeia, and emphasis." } },
        { id: "4", name: "Kanji", val: 24, color: "#f44336", level: 1, content: "Logographic characters derived from Chinese used for meaning.", quiz: { question: "What does each Kanji represent?", answer: "A concept or meaning, often with multiple readings." } },
        { id: "5", name: "Pronunciation", val: 18, color: "#ff9800", level: 1, content: "Japanese has simple phonetics with pitch accent.", quiz: { question: "What makes Japanese pronunciation unique?", answer: "Pitch accent instead of stress accent." } },
        { id: "6", name: "Grammar", val: 22, color: "#9c27b0", level: 1, content: "Grammar emphasizes particles, verb endings, and politeness levels.", quiz: { question: "How does Japanese indicate grammatical roles?", answer: "Using particles like は (wa), を (wo), に (ni)." } },

        // Level 2 - Intermediate Concepts
        { id: "7", name: "Vocabulary", val: 20, color: "#8bc34a", level: 2, content: "Collection of words from native, Sino-Japanese, and foreign origins.", quiz: { question: "What are the three types of Japanese vocabulary sources?", answer: "Wago (native), Kango (Chinese-origin), Gairaigo (foreign)." } },
        { id: "8", name: "Particles", val: 18, color: "#009688", level: 2, content: "Markers that show grammatical relations.", quiz: { question: "What does particle 'が' indicate?", answer: "Marks the subject of a sentence." } },
        { id: "9", name: "Verb Conjugation", val: 22, color: "#e91e63", level: 2, content: "Verbs change form to express tense, mood, and politeness.", quiz: { question: "How many main verb groups exist?", answer: "Three: Group 1 (u-verbs), Group 2 (ru-verbs), irregular verbs." } },
        { id: "10", name: "Adjectives", val: 16, color: "#673ab7", level: 2, content: "i-adjectives and na-adjectives describe qualities.", quiz: { question: "How do adjectives conjugate?", answer: "i-adjectives directly, na-adjectives use 'na' or 'desu'." } },
        { id: "11", name: "Politeness Levels", val: 18, color: "#ffc107", level: 2, content: "Speech changes based on social hierarchy.", quiz: { question: "What are the three main speech levels?", answer: "Casual, Polite (ます), and Honorific (敬語 - keigo)." } },
        { id: "12", name: "Listening", val: 20, color: "#00bcd4", level: 2, content: "Train your ear to distinguish similar sounds and accents.", quiz: { question: "What helps improve listening?", answer: "Consistent exposure to native audio." } },
        { id: "13", name: "Speaking", val: 22, color: "#795548", level: 2, content: "Practice pronunciation, rhythm, and conversation.", quiz: { question: "How to improve fluency?", answer: "Shadowing and real conversations." } },
        { id: "14", name: "Reading", val: 21, color: "#607d8b", level: 2, content: "Learn to read kana and kanji efficiently.", quiz: { question: "Best way to memorize kanji?", answer: "Learn with mnemonics and context sentences." } },
        { id: "15", name: "Writing", val: 20, color: "#cddc39", level: 2, content: "Practice stroke order, handwriting, and kana balance.", quiz: { question: "Why is stroke order important?", answer: "It improves readability and recognition." } },

        // Level 3 - Advanced
        { id: "16", name: "Keigo (Honorific Speech)", val: 24, color: "#9e9e9e", level: 3, content: "Formal expressions showing respect and humility.", quiz: { question: "What are the two types of Keigo?", answer: "Sonkeigo (respectful) and Kenjougo (humble)." } },
        { id: "17", name: "Idioms & Expressions", val: 18, color: "#00bfa5", level: 3, content: "Cultural sayings and proverbs that enrich conversation.", quiz: { question: "What does '猿も木から落ちる' mean?", answer: "Even experts make mistakes." } },
        { id: "18", name: "JLPT Preparation", val: 22, color: "#ff7043", level: 3, content: "Study for proficiency tests (N5–N1).", quiz: { question: "What does JLPT test?", answer: "Vocabulary, grammar, reading, and listening." } },
    ],

    links: [
        // Core
        { source: "1", target: "2", label: "includes" },
        { source: "1", target: "3", label: "includes" },
        { source: "1", target: "4", label: "includes" },
        { source: "1", target: "5", label: "involves" },
        { source: "1", target: "6", label: "structured by" },
        { source: "1", target: "18", label: "measured by" },

        // Relationships between writing systems
        { source: "2", target: "15", label: "used in" },
        { source: "3", target: "15", label: "used in" },
        { source: "4", target: "14", label: "essential for" },

        // Grammar and sentence structure
        { source: "6", target: "8", label: "uses" },
        { source: "6", target: "9", label: "controls" },
        { source: "6", target: "10", label: "defines" },
        { source: "6", target: "11", label: "affects" },
        { source: "6", target: "16", label: "extends to" },

        // Skill relationships
        { source: "7", target: "12", label: "improves" },
        { source: "7", target: "13", label: "enables" },
        { source: "7", target: "14", label: "used in" },
        { source: "7", target: "15", label: "reinforces" },

        { source: "12", target: "13", label: "supports" },
        { source: "13", target: "11", label: "influenced by" },
        { source: "14", target: "4", label: "depends on" },
        { source: "15", target: "2", label: "requires" },
        { source: "15", target: "3", label: "requires" },

        // Advanced
        { source: "16", target: "11", label: "formal form of" },
        { source: "17", target: "7", label: "builds on" },
        { source: "18", target: "6", label: "tests" },
        { source: "18", target: "14", label: "tests" },
        { source: "18", target: "12", label: "tests" },
    ],
};


const LOCAL_STORAGE_KEYS = {
    MASTERY: "kn_mastery_v1", // map id -> { correct, attempts }
    DECK: "kn_deck_v1",
};

const KnowledgeNetwork: React.FC = () => {
    const navigate = useNavigate();
    const fgRef = useRef<ForceGraphMethods | null>(null);
    const [isPro] = useState(false);
    const [topic, setTopic] = useState("");
    const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
    const [visibleNodeIds, setVisibleNodeIds] = useState<string[]>(["1", "2"]); // start with core nodes
    const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
    const [showUpgrade, setShowUpgrade] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [studyMode, setStudyMode] = useState(false);
    const [quizNode, setQuizNode] = useState<GraphNode | null>(null);
    const [quizAnswerOpen, setQuizAnswerOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [spreadLevel, setSpreadLevel] = useState(500); // used for charge strength
    const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");

    // load mastery and deck from localStorage
    const [mastery, setMastery] = useState<Record<string, { correct: number; attempts: number }>>(() => {
        try {
            const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.MASTERY);
            return raw ? JSON.parse(raw) : {};
        } catch {
            return {};
        }
    });

    const [deck, setDeck] = useState<any[]>(() => {
        try {
            const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.DECK);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    // Derived filtered graph based on visibleNodeIds and search
    const filteredGraph = useMemo<GraphData>(() => {
        const nodes = SAMPLE_DATA.nodes.filter(n => visibleNodeIds.includes(n.id) && n.name.toLowerCase().includes(search.toLowerCase()));
        const nodeIds = new Set(nodes.map(n => n.id));
        const links = SAMPLE_DATA.links.filter(l => nodeIds.has(String(l.source)) && nodeIds.has(String(l.target)));
        return { nodes, links };
    }, [visibleNodeIds, search]);

    // set full graph data once visible nodes change
    useEffect(() => {
        setGraphData(filteredGraph);
    }, [filteredGraph]);

    // Persist mastery & deck
    useEffect(() => { localStorage.setItem(LOCAL_STORAGE_KEYS.MASTERY, JSON.stringify(mastery)); }, [mastery]);
    useEffect(() => { localStorage.setItem(LOCAL_STORAGE_KEYS.DECK, JSON.stringify(deck)); }, [deck]);

    // Physics tuning when graphData or spreadLevel changes
    // Physics tuning when graphData or spreadLevel changes
    useEffect(() => {
        if (!fgRef.current) return;
        const fg = fgRef.current;

        // Keep charge constant — no change on node click
        const chargeStrength = -spreadLevel;
        fg.d3Force("charge")?.strength(chargeStrength);

        // Keep link distances as before (based on node levels)
        fg.d3Force("link")?.distance((link: any) => {
            const s = (link.source as GraphNode).level ?? 1;
            const t = (link.target as GraphNode).level ?? 1;
            return 80 + Math.max(s, t) * 60;
        });

        // Reheat simulation if spreadLevel changes only
        fg.d3ReheatSimulation?.();
    }, [graphData, spreadLevel]);

    // Helper: reveal neighbors of a node (unlock)
    const revealNeighbors = useCallback((nodeId: string) => {
        const neighborIds = new Set<string>([nodeId]);
        SAMPLE_DATA.links.forEach(l => {
            if (String(l.source) === nodeId) neighborIds.add(String(l.target));
            if (String(l.target) === nodeId) neighborIds.add(String(l.source));
        });
        setVisibleNodeIds(prev => Array.from(new Set([...prev, ...Array.from(neighborIds)])));
        toast && toast.success("Revealed related topics");
    }, []);

    // Click behavior: highlight and open detail
    const handleNodeClick = useCallback((node: GraphNode) => {
        setSelectedNode(node);

        if (fgRef.current && typeof node.x === "number" && typeof node.y === "number") {
            const fg = fgRef.current;
            fg.pauseAnimation();

            fg.centerAt(node.x, node.y, 600);
            fg.zoom(1.8, 600);

            setTimeout(() => fg.resumeAnimation(), 700);
        }
    }, []);

    // Hover cursor
    const handleNodeHover = useCallback((node: GraphNode | null) => {
        if (typeof document !== "undefined") document.body.style.cursor = node ? "pointer" : "default";
    }, []);

    useEffect(() => {
  if (!fgRef.current) return;

  if (!selectedNode) return; // ← don't reset graphData to a new object

  const relatedIds = new Set<string>([selectedNode.id]);
  SAMPLE_DATA.links.forEach(l => {
    if (String(l.source) === selectedNode.id) relatedIds.add(String(l.target));
    if (String(l.target) === selectedNode.id) relatedIds.add(String(l.source));
  });

}, [selectedNode]);

    // Study mode: pick a random quiz node from visible nodes that has quiz
    useEffect(() => {
        if (!studyMode) {
            setQuizNode(null);
            setQuizAnswerOpen(false);
            return;
        }
        const candidates = graphData.nodes.filter(n => n.quiz);
        if (candidates.length === 0) {
            setQuizNode(null);
            return;
        }
        const pick = candidates[Math.floor(Math.random() * candidates.length)];
        setQuizNode(pick);
        setQuizAnswerOpen(false);
    }, [studyMode, graphData]);

    // Mark quiz result (update mastery)
    const markQuiz = (nodeId: string, correct: boolean) => {
        setMastery(prev => {
            const old = prev[nodeId] || { correct: 0, attempts: 0 };
            const updated = { ...prev, [nodeId]: { correct: old.correct + (correct ? 1 : 0), attempts: old.attempts + 1 } };
            return updated;
        });
        // if correct, automatically reveal neighbors as reward
        if (correct) revealNeighbors(nodeId);
        // next quiz
        const candidates = graphData.nodes.filter(n => n.quiz && n.id !== nodeId);
        if (candidates.length === 0) {
            setQuizNode(null);
        } else {
            setQuizNode(candidates[Math.floor(Math.random() * candidates.length)]);
            setQuizAnswerOpen(false);
        }
    };

    // Add to deck
    const addToDeck = (node: GraphNode) => {
        const card = { id: node.id, front: node.name, back: node.content };
        setDeck(d => {
            if (d.some((c: any) => c.id === node.id)) {
                toast && toast("Already in deck");
                return d;
            }
            toast && toast.success("Added to study deck");
            return [...d, card];
        });
    };

    const exportDeck = () => {
        const blob = new Blob([JSON.stringify(deck, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "knowledge-deck.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    // Quick actions: zoom to fit by centering on average
    const zoomToFit = () => {
        if (!fgRef.current || graphData.nodes.length === 0) return;
        // compute center
        const xs = graphData.nodes.map(n => n.x ?? 0);
        const ys = graphData.nodes.map(n => n.y ?? 0);
        const cx = xs.reduce((a, b) => a + b, 0) / xs.length;
        const cy = ys.reduce((a, b) => a + b, 0) / ys.length;
        fgRef.current.centerAt(cx, cy, 400);
        fgRef.current.zoom(1, 400);
    };

    // small UI stats
    const masteredCount = Object.keys(mastery).filter(k => mastery[k].attempts > 0 && mastery[k].correct / mastery[k].attempts >= 0.8).length;

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="container mx-auto px-4 pt-24 pb-12">
                <header className="mb-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                                <Brain className="h-4 w-4" /> Knowledge Network
                            </div>
                            <div className="text-sm text-muted-foreground">Explore & learn with an interactive concept map</div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="text-sm text-muted-foreground mr-4">Progress: <span className="font-semibold">{masteredCount}</span> mastered</div>

                            <Input
                                placeholder="Search visible nodes..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-64"
                                rightElement={<Search className="h-4 w-4 text-muted-foreground mr-2" />}
                            />

                            <Button size="sm" onClick={() => zoomToFit()}>Zoom Fit</Button>
                            <Button size="sm" onClick={() => setSpreadLevel(prev => Math.min(prev + 200, 1500))}>Spread</Button>
                            <Button size="sm" onClick={() => setSpreadLevel(prev => Math.max(prev - 200, 100))}>Relax</Button>
                            <Button size="sm" onClick={() => setStudyMode(s => !s)}>{studyMode ? "Stop Study" : "Study Mode"}</Button>
                            <Button size="sm" onClick={() => exportDeck()}>Export Deck</Button>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* left: controls / legend */}
                    <aside className="md:col-span-1 space-y-4">
                        <Card className="p-4">
                            <h3 className="font-semibold mb-2">Controls</h3>
                            <div className="space-y-2">
                                <div>
                                    <Label className="text-sm">Visible nodes</Label>
                                    <div className="mt-2 text-sm text-muted-foreground">{visibleNodeIds.length} visible</div>
                                </div>

                                <div>
                                    <Label className="text-sm">Spread level</Label>
                                    <input type="range" min={100} max={1500} value={spreadLevel} onChange={(e) => setSpreadLevel(Number(e.target.value))} className="w-full" />
                                </div>

                                <div className="flex gap-2 mt-2">
                                    <Button size="sm" onClick={() => { setVisibleNodeIds(["1", "2"]); toast && toast("Reset view"); }}>Reset View</Button>
                                    <Button size="sm" onClick={() => { setVisibleNodeIds(SAMPLE_DATA.nodes.map(n => n.id)); toast && toast("Revealed all nodes"); }}>Reveal All</Button>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-4">
                            <h3 className="font-semibold mb-2">Legend</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded bg-[#00bcd4]" /> Core concept</div>
                                <div className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded bg-[#2196f3]" /> Subtopic</div>
                                <div className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded bg-[#ff7043]" /> Advanced</div>
                                <div className="text-xs text-muted-foreground mt-2">Node border indicates mastery (green = mastered)</div>
                            </div>
                        </Card>

                        <Card className="p-4">
                            <h3 className="font-semibold mb-2">Study Deck</h3>
                            <div className="text-sm text-muted-foreground mb-3">{deck.length} cards</div>
                            <div className="flex gap-2">
                                <Button size="sm" onClick={() => { navigator.clipboard?.writeText(JSON.stringify(deck, null, 2)); toast && toast.success("Deck copied to clipboard"); }}>Copy</Button>
                                <Button size="sm" variant="outline" onClick={() => exportDeck()}>Download</Button>
                            </div>
                        </Card>
                    </aside>

                    {/* main: graph */}
                    <section className="md:col-span-3">
                        <Card className="p-0 overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-3 border-b">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-lg font-semibold">Knowledge Graph</h2>
                                    <div className="text-sm text-muted-foreground">Visible: <span className="font-medium">{graphData.nodes.length}</span></div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button size="sm" onClick={() => {
                                        // reveal neighbors for all currently visible nodes (expand out)
                                        const newVisible = new Set(visibleNodeIds);
                                        SAMPLE_DATA.links.forEach(l => {
                                            if (newVisible.has(String(l.source))) newVisible.add(String(l.target));
                                            if (newVisible.has(String(l.target))) newVisible.add(String(l.source));
                                        });
                                        setVisibleNodeIds(Array.from(newVisible));
                                        toast && toast.success("Expanded neighbors");
                                    }}>Expand One Level</Button>

                                    <Button size="sm" onClick={() => {
                                        // try to reveal a node by search match
                                        const found = SAMPLE_DATA.nodes.find(n => n.name.toLowerCase().includes(search.toLowerCase()));
                                        if (found) {
                                            setVisibleNodeIds(prev => Array.from(new Set([...prev, found.id])));
                                            toast && toast.success(`Revealed: ${found.name}`);
                                        } else {
                                            toast && toast("No match found to reveal");
                                        }
                                    }}>Reveal Match</Button>
                                </div>
                            </div>

                            <div className="h-[640px] bg-background/50">
                                <ForceGraph2D
                                    ref={fgRef}
                                    graphData={graphData}
                                    nodeLabel="name"
                                    linkLabel="label"
                                    linkDirectionalArrowLength={4}
                                    linkDirectionalArrowRelPos={1}
                                    linkCurvature={0.25}
                                    backgroundColor="transparent"
                                    linkColor={() => (isDark ? "#ffffff" : "#333333")}
                                    onNodeClick={(node: any) => handleNodeClick(node)}
                                    onNodeHover={(node: any) => handleNodeHover(node)}
                                    nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
                                        const label = node.name || "";
                                        const fontSize = Math.max(10, (12 / globalScale));
                                        ctx.font = `${fontSize}px Sans-Serif`;
                                        const textWidth = ctx.measureText(label).width;
                                        const padding = fontSize * 0.4;
                                        const bckgW = textWidth + padding * 2;
                                        const bckgH = fontSize + padding;

                                        // Draw node circle
                                        const radius = (node.val ?? 8) / (globalScale < 1 ? 1 : 1);
                                        ctx.beginPath();
                                        ctx.fillStyle = node.color || "#888";
                                        ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
                                        ctx.fill();

                                        // Draw border for mastery (green if mastered)
                                        const ms = mastery[node.id];
                                        const masteryRatio = ms && ms.attempts > 0 ? (ms.correct / ms.attempts) : 0;
                                        if (masteryRatio >= 0.8) {
                                            ctx.strokeStyle = "#22c55e";
                                            ctx.lineWidth = Math.max(2, radius * 0.35);
                                            ctx.beginPath();
                                            ctx.arc(node.x, node.y, radius + 3, 0, 2 * Math.PI);
                                            ctx.stroke();
                                        }

                                        // Label background (slightly translucent)
                                        ctx.fillStyle = "rgba(0,0,0,0.6)";
                                        ctx.fillRect(node.x - bckgW / 2, node.y - radius - bckgH - 6, bckgW, bckgH);

                                        // Label text
                                        ctx.fillStyle = "#fff";
                                        ctx.textAlign = "center";
                                        ctx.textBaseline = "middle";
                                        ctx.fillText(label, node.x, node.y - radius - bckgH / 2 - 6);

                                        // faded effect if node.__faded set
                                        if (node.__faded) {
                                            ctx.fillStyle = "rgba(255,255,255,0.15)";
                                            ctx.beginPath();
                                            ctx.arc(node.x, node.y, radius + 6, 0, 2 * Math.PI);
                                            ctx.fill();
                                        }
                                    }}
                                    // custom node pointer area
                                    nodePointerAreaPaint={(node: any, color, ctx) => {
                                        ctx.fillStyle = color;
                                        ctx.beginPath();
                                        ctx.arc(node.x, node.y, (node.val ?? 8) + 8, 0, 2 * Math.PI);
                                        ctx.fill();
                                    }}
                                />
                            </div>
                        </Card>

                        {/* Node detail dialog */}
                        <Dialog open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-3">
                                        <span className="inline-block w-4 h-4 rounded-full" style={{ background: selectedNode?.color }} />
                                        {selectedNode?.name}
                                        {selectedNode && (
                                            <Badge className="ml-2" variant="secondary">{selectedNode.level === 0 ? "Core" : selectedNode.level === 1 ? "Topic" : "Advanced"}</Badge>
                                        )}
                                    </DialogTitle>
                                    <DialogDescription>{selectedNode?.content}</DialogDescription>
                                </DialogHeader>

                                {/* related nodes */}
                                <div className="mt-4">
                                    <h4 className="font-semibold">Related</h4>
                                    <div className="flex gap-2 mt-2 flex-wrap">
                                        {selectedNode && SAMPLE_DATA.links
                                            .filter(l => String(l.source) === selectedNode.id || String(l.target) === selectedNode.id)
                                            .map(l => {
                                                const otherId = String(l.source) === selectedNode.id ? String(l.target) : String(l.source);
                                                const other = SAMPLE_DATA.nodes.find(n => n.id === otherId);
                                                if (!other) return null;
                                                return (
                                                    <button key={other.id} className="px-3 py-1 rounded bg-muted/10 text-sm" onClick={() => {
                                                        // reveal and focus
                                                        setVisibleNodeIds(prev => Array.from(new Set([...prev, other.id])));
                                                        setTimeout(() => {
                                                            const node = graphData.nodes.find(n => n.id === other.id);
                                                            if (node && typeof node.x === "number" && typeof node.y === "number" && fgRef.current) {
                                                                fgRef.current.centerAt(node.x, node.y, 600);
                                                                fgRef.current.zoom(1.8, 600);
                                                            }
                                                        }, 200);
                                                    }}>{other.name}</button>
                                                );
                                            })}
                                    </div>
                                </div>

                                {/* quiz card */}
                                {selectedNode?.quiz && (
                                    <Card className="mt-4 p-4 border-primary/20">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-semibold">Quiz</div>
                                                <div className="text-sm text-muted-foreground mt-1">{selectedNode.quiz.question}</div>
                                            </div>

                                            <div className="flex gap-2">
                                                <Button size="sm" onClick={() => setQuizAnswerOpen(s => !s)}>{quizAnswerOpen ? "Hide" : "Show Answer"}</Button>
                                                <Button size="sm" variant="outline" onClick={() => addToDeck(selectedNode)}>Add to Deck</Button>
                                                <Button size="sm" onClick={() => { revealNeighbors(selectedNode.id); }}>Reveal</Button>
                                            </div>
                                        </div>

                                        {quizAnswerOpen && (
                                            <div className="mt-3 rounded bg-primary/5 p-3">
                                                <div className="font-medium">Answer</div>
                                                <div className="mt-1">{selectedNode.quiz.answer}</div>
                                            </div>
                                        )}
                                    </Card>
                                )}

                                <div className="mt-6 flex gap-3">
                                    <Button onClick={() => setSelectedNode(null)} className="flex-1">Close</Button>
                                    <Button variant="outline" onClick={() => selectedNode && addToDeck(selectedNode)} className="flex-1">
                                        <Plus className="mr-2 h-4 w-4" /> Add to Study Deck
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>

                        {/* Study quiz floating area */}
                        {studyMode && quizNode && (
                            <div className="fixed right-8 bottom-8 w-96 z-50">
                                <Card className="p-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="text-sm text-muted-foreground">Study Mode</div>
                                            <div className="font-semibold">{quizNode.name}</div>
                                        </div>
                                        <div className="text-xs text-muted-foreground">Attempts: {mastery[quizNode.id]?.attempts ?? 0}</div>
                                    </div>

                                    <div className="mt-3">
                                        <div className="text-sm">{quizNode.quiz!.question}</div>

                                        <div className="mt-3 flex gap-2">
                                            <Button onClick={() => { setQuizAnswerOpen(true); markQuiz(quizNode.id, true); }}>I know it</Button>
                                            <Button variant="outline" onClick={() => { setQuizAnswerOpen(true); markQuiz(quizNode.id, false); }}>I don't</Button>
                                        </div>

                                        {quizAnswerOpen && (
                                            <div className="mt-3 rounded bg-primary/5 p-3">
                                                <div className="font-medium">Answer</div>
                                                <div className="mt-1">{quizNode.quiz!.answer}</div>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            </div>
                        )}
                    </section>
                </div>

            </main>
        </div>
    );
};

export default KnowledgeNetwork;
