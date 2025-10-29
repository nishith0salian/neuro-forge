import { Brain, Sparkles, Zap, Target, Layers, MapPin, MessageSquare, CheckCircle2, TrendingUp, Users, Award, ArrowRight, Network } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Navigation } from "../components/Navigation";
import { SEOHead } from "../components/SEOHead";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MindForge",
    "applicationCategory": "EducationalApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    }
  };

  const features = [
    {
      icon: Brain,
      title: "Spaced Repetition",
      description: "Science-backed scheduling that optimizes long-term retention",
    },
    {
      icon: Sparkles,
      title: "Mnemonics",
      description: "Attach vivid memory cues to make concepts unforgettable",
    },
    {
      icon: Target,
      title: "Interleaving",
      description: "Mix topics strategically to improve recall and transfer",
    },
    {
      icon: Layers,
      title: "Chunking",
      description: "Group related concepts to reduce cognitive load",
    },
    {
      icon: MapPin,
      title: "Memory Palace",
      description: "Visualize cards spatially for enhanced memory",
    },
    {
      icon: MessageSquare,
      title: "Self-Explanation",
      description: "Reinforce understanding by explaining in your own words",
    },
    {
      icon: Network,
      title: "Knowledge Networks",
      description: "AI-powered concept graphs to visualize learning connections",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title="MindForge - Science-Backed Learning with Memory Techniques"
        description="Transform your learning with spaced repetition, memory palaces, and knowledge networks. Join 50,000+ learners mastering skills faster with cognitive science."
        keywords="spaced repetition, memory palace, knowledge graph, learning app, study tool, flashcards, cognitive science, AI learning"
        canonical="https://mindforge.app"
        structuredData={structuredData}
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="absolute inset-0 gradient-neural opacity-10" />
        
        <div className="container relative mx-auto max-w-6xl">
          <div className="text-center animate-fade-in">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-2 text-sm font-medium text-primary shadow-glow">
              <Sparkles className="h-4 w-4" />
              Science-Backed Learning
            </div>
            
            <h1 className="mb-6 bg-gradient-to-r from-primary to-accent-electric bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
              MindForge
            </h1>
            
            <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
              Not just flashcards — forge long-term understanding with
              <br />
              <span className="font-semibold text-foreground">science-backed memory tools</span>
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="shadow-glow transition-smooth hover:shadow-glow animate-scale-in">
                <Link to="/auth">
                  <Brain className="mr-2 h-5 w-5" />
                  Get Started Free
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="transition-smooth hover:shadow-glow animate-scale-in" style={{ animationDelay: "0.1s" }}>
                <Link to="/pricing">
                  <Target className="mr-2 h-5 w-5" />
                  View Pricing
                </Link>
              </Button>
            </div>
            
            <p className="mt-6 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
              No credit card required • Start learning in seconds
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16 bg-primary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { icon: Users, label: "Active Learners", value: "50,000+" },
              { icon: TrendingUp, label: "Retention Rate", value: "94%" },
              { icon: Award, label: "Success Stories", value: "12,000+" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className="h-10 w-10 mx-auto mb-4 text-primary" />
                  <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            Master Any Subject in Three Simple Steps
          </h2>
          <p className="mb-12 text-center text-lg text-muted-foreground">
            Science-backed learning made effortless
          </p>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Create Your Deck",
                description: "Upload notes or create flashcards on any topic. Our AI helps structure your learning material.",
              },
              {
                step: "2",
                title: "Smart Practice",
                description: "Study with spaced repetition, mnemonics, and interleaving automatically applied to optimize retention.",
              },
              {
                step: "3",
                title: "Track Progress",
                description: "Watch your neural pathways strengthen with real-time progress tracking and personalized insights.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-2xl font-bold shadow-glow">
                  {step.step}
                </div>
                <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < 2 && (
                  <ArrowRight className="hidden md:block absolute -right-4 top-8 h-8 w-8 text-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-20 bg-primary/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Seven Cognitive Techniques in One App
          </h2>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-2 p-6 shadow-card transition-smooth hover:border-primary/50 hover:shadow-glow animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-smooth group-hover:opacity-100" />
                  
                  <div className="relative">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-smooth group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    
                    <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            Why MindForge Works Better
          </h2>
          <p className="mb-12 text-center text-lg text-muted-foreground">
            Traditional flashcards vs. science-backed learning
          </p>
          
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="p-8 border-2 border-muted-foreground/20">
              <h3 className="mb-6 text-xl font-semibold text-muted-foreground">Traditional Flashcards</h3>
              <ul className="space-y-4">
                {[
                  "Random review timing",
                  "No memory techniques",
                  "Single study method",
                  "No progress insights",
                  "Cramming encouraged",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-1 h-5 w-5 rounded-full bg-muted-foreground/20 flex items-center justify-center text-xs">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            
            <Card className="p-8 border-2 border-primary shadow-glow animate-scale-in">
              <h3 className="mb-6 text-xl font-semibold text-primary">MindForge</h3>
              <ul className="space-y-4">
                {[
                  "Optimized spaced repetition",
                  "Built-in mnemonics & visualization",
                  "Six cognitive techniques combined",
                  "Real-time neural progress tracking",
                  "Long-term retention focused",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-20 bg-primary/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Loved by Learners Worldwide
          </h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Sarah Chen",
                role: "Medical Student",
                content: "I memorized 2,000+ anatomy terms in 3 months. The memory palace feature is incredible!",
                rating: 5,
              },
              {
                name: "Marcus Rodriguez",
                role: "Language Learner",
                content: "Finally fluent in Japanese after years of struggle. The spaced repetition actually works.",
                rating: 5,
              },
              {
                name: "Emily Thompson",
                role: "Law Student",
                content: "Passed the bar exam thanks to MindForge. The chunking technique saved my sanity.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 shadow-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Sparkles key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mb-4 text-muted-foreground italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-4xl">
          <Card className="relative overflow-hidden border-2 border-primary/20 p-12 text-center shadow-glow">
            <div className="absolute inset-0 gradient-neural opacity-5" />
            
            <div className="relative">
              <Brain className="mx-auto mb-6 h-16 w-16 text-primary animate-glow-pulse" />
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Ready to Transform Your Learning?
              </h2>
              <p className="mb-4 text-lg text-muted-foreground">
                Join 50,000+ learners using evidence-based techniques to master any subject
              </p>
              <div className="mb-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Free to start
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  No credit card
                </span>
                <span className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  94% retention rate
                </span>
              </div>
              <Button size="lg" asChild className="shadow-glow">
                <Link to="/auth">
                  <Brain className="mr-2 h-5 w-5" />
                  Start Learning Now
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
