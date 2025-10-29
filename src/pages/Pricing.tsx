import { Check, Zap, Brain, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Navigation } from "../components/Navigation";
import { Badge } from "../components/ui/badge";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: [
        "Up to 3 decks",
        "Basic spaced repetition",
        "100 cards per deck",
        "Web access",
        "Community support",
      ],
      cta: "Start Free",
      popular: false,
      icon: Brain,
    },
    {
      name: "Pro",
      price: "$12",
      period: "/month",
      description: "For serious learners",
      features: [
        "Unlimited decks",
        "Advanced spaced repetition",
        "Unlimited cards",
        "Memory palace feature",
        "Interleaving mode",
        "Priority support",
        "Advanced analytics",
        "Export & import",
      ],
      cta: "Start Pro Trial",
      popular: true,
      icon: Zap,
    },
    {
      name: "Team",
      price: "$39",
      period: "/month",
      description: "For teams and educators",
      features: [
        "Everything in Pro",
        "Up to 10 team members",
        "Shared decks",
        "Team analytics",
        "Custom branding",
        "Admin dashboard",
        "API access",
        "Dedicated support",
      ],
      cta: "Contact Sales",
      popular: false,
      icon: Sparkles,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-32 pb-20">
        <div className="absolute inset-0 gradient-neural opacity-5" />
        
        <div className="container relative mx-auto max-w-6xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-2 text-sm font-medium text-primary shadow-glow animate-fade-in">
            <Zap className="h-4 w-4" />
            Simple, Transparent Pricing
          </div>
          
          <h1 className="mb-6 bg-gradient-to-r from-primary to-accent-electric bg-clip-text text-5xl font-bold text-transparent md:text-6xl animate-fade-in">
            Choose Your Learning Path
          </h1>
          
          <p className="mb-12 text-xl text-muted-foreground md:text-2xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Start free, upgrade when you need more power
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <Card
                  key={index}
                  className={`relative overflow-hidden p-8 transition-smooth hover:shadow-glow animate-fade-in ${
                    plan.popular
                      ? "border-2 border-primary shadow-glow scale-105"
                      : "border-2 hover:border-primary/50"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 left-0">
                      <div className="mx-auto w-fit rounded-b-lg bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground shadow-glow">
                        MOST POPULAR
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-smooth hover:opacity-100" />

                  <div className="relative">
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-smooth group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                    <p className="mb-6 text-sm text-muted-foreground">
                      {plan.description}
                    </p>

                    <div className="mb-6">
                      <span className="text-5xl font-bold">{plan.price}</span>
                      {plan.period && (
                        <span className="text-muted-foreground">{plan.period}</span>
                      )}
                    </div>

                    <Button
                      className="w-full mb-8 shadow-glow transition-smooth"
                      variant={plan.popular ? "default" : "outline"}
                      size="lg"
                      asChild
                    >
                      <Link to="/auth">{plan.cta}</Link>
                    </Button>

                    <div className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Frequently Asked Questions
          </h2>
          
          <div className="grid gap-6">
            {[
              {
                q: "Can I switch plans anytime?",
                a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                q: "Is there a free trial?",
                a: "The Free plan is available forever. Pro plan comes with a 14-day trial, no credit card required.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and wire transfers for Team plans.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Absolutely. Cancel anytime from your account settings. No questions asked.",
              },
            ].map((faq, index) => (
              <Card
                key={index}
                className="p-6 shadow-card transition-smooth hover:shadow-glow animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <h3 className="mb-2 text-lg font-semibold">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-4xl">
          <Card className="relative overflow-hidden border-2 border-primary/20 p-12 text-center shadow-glow">
            <div className="absolute inset-0 gradient-neural opacity-5" />
            
            <div className="relative">
              <Brain className="mx-auto mb-6 h-16 w-16 text-primary animate-glow-pulse" />
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Ready to Supercharge Your Learning?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Join thousands of learners mastering new skills faster
              </p>
              <Button size="lg" asChild className="shadow-glow">
                <Link to="/auth">Get Started Free</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
