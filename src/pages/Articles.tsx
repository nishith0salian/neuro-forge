import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/seperator";
import { Brain, Clock, TrendingUp, Lightbulb, Heart, Zap, ArrowLeft, BookOpen } from "lucide-react";


const Articles = () => {
  const articles = [
    {
      id: 1,
      title: "Why Your Brain Loves Spaced Repetition (And Your Cramming Habit Doesn't)",
      description: "Ever wonder why you can remember your childhood phone number but not what you studied last week? The secret's in the spacing.",
      icon: Clock,
      readTime: "5 min read",
      image: "http://test.com/article-mnemonics.jpg",
      content: "Spaced repetition is like watering a plant - a little bit regularly beats drowning it once. Your brain literally rewires itself stronger each time you recall something right before you're about to forget it. It's basically neuroscience's version of 'no pain, no gain,' except the pain is just... mild inconvenience.",
      fullContent: [
        "Imagine trying to remember someone's name at a party. You hear it once, nod politely, and by the time you're grabbing a drink, it's gone. Now imagine hearing that name again tomorrow, then a week later, then a month later. Each time, it gets easier to recall—and eventually, it sticks permanently.",
        "This is the magic of spaced repetition, and it's not just a study hack—it's how your brain naturally prefers to learn. When you review information at increasing intervals, you're forcing your brain to work harder to retrieve it. That struggle? That's where the learning happens.",
        "The science behind it is elegant: every time you successfully recall a memory, you strengthen the neural pathways associated with it. But here's the twist—recall is most effective right before you're about to forget. Too soon, and it's too easy (no strengthening). Too late, and you've lost it completely.",
        "Hermann Ebbinghaus discovered this in the 1880s with his famous 'forgetting curve.' Without reinforcement, we forget about 50% of new information within an hour, and up to 90% within a week. But with strategic review at optimal intervals—say, 1 day, then 3 days, then a week, then a month—retention skyrockets.",
        "Modern apps like Anki and MindForge use algorithms to automate these intervals, but the principle remains beautifully simple: review less, remember more. It's the antithesis of cramming, which floods your short-term memory but leaves your long-term storage empty.",
        "The best part? Spaced repetition works for everything—languages, medical school, professional certifications, even remembering birthdays. If you can turn it into a flashcard, you can space it. Your brain will thank you, and so will your future self during exam season."
      ],
      citations: [
        "Ebbinghaus, H. (1885). Memory: A Contribution to Experimental Psychology. Teachers College, Columbia University.",
        "Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006). Distributed practice in verbal recall tasks: A review and quantitative synthesis. Psychological Bulletin, 132(3), 354-380.",
        "Karpicke, J. D., & Roediger, H. L. (2008). The critical importance of retrieval for learning. Science, 319(5865), 966-968.",
        "Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J., & Willingham, D. T. (2013). Improving students' learning with effective learning techniques. Psychological Science in the Public Interest, 14(1), 4-58."
      ]
    },
    {
      id: 2,
      title: "The Memory Palace: Your Brain's Secret Superpower",
      description: "Ancient Romans used this technique to memorize entire speeches. You can use it to remember where you put your keys.",
      icon: Brain,
      readTime: "7 min read",
      image: "http://test.com/article-mnemonics.jpg",
      content: "Imagine your brain as a mansion with infinite rooms. Each room can store memories attached to vivid mental images. Sherlock Holmes called it his 'mind palace,' but you can call it 'that weird trick that actually works.' The more ridiculous the mental image, the better it sticks. Science is fun like that.",
      fullContent: [
        "Close your eyes and picture your childhood home. You can probably walk through it room by room in your mind—the creaky third step on the stairs, the smell of the kitchen, where the couch used to be. This spatial memory is incredibly powerful, and the Method of Loci (memory palace) hijacks it brilliantly.",
        "The technique dates back to ancient Greece and Rome, where orators would memorize hour-long speeches by mentally placing key points along a familiar route. Cicero was famous for it. Eight-time World Memory Champion Dominic O'Brien still uses it today to memorize entire decks of cards in minutes.",
        "Here's how it works: Choose a location you know intimately—your home, your daily commute, your favorite coffee shop. Then, mentally place the items you want to remember at specific locations along a route through that space. The weirder and more vivid the mental image, the better.",
        "Need to remember a shopping list? Imagine a giant egg smashing through your front door, a gallon of milk flooding your hallway, a loaf of bread sunbathing on your couch. Walk through your route during recall, and the items practically announce themselves.",
        "The science behind it combines two of your brain's strengths: spatial memory (which evolved to help us navigate) and visual processing (our dominant sense). When you anchor abstract information to physical locations, you transform it into something your brain naturally excels at remembering.",
        "Modern applications are endless: students use it for exam prep, professionals for presentations without notes, and anyone can use it for daily tasks. The memory palace isn't just a party trick—it's a fundamental rewiring of how you approach learning, turning your spatial intelligence into a superpower."
      ],
      citations: [
        "Yates, F. A. (1966). The Art of Memory. University of Chicago Press.",
        "Maguire, E. A., Valentine, E. R., Wilding, J. M., & Kapur, N. (2003). Routes to remembering: The brains behind superior memory. Nature Neuroscience, 6(1), 90-95.",
        "Legge, E. L., Madan, C. R., Ng, E. T., & Caplan, J. B. (2012). Building a memory palace in minutes: Equivalent memory performance using virtual versus conventional environments. Acta Psychologica, 141(3), 380-390.",
        "Dresler, M., Shirer, W. R., Konrad, B. N., Müller, N. C., Wagner, I. C., Fernández, G., ... & Greicius, M. D. (2017). Mnemonic training reshapes brain networks to support superior memory. Neuron, 93(5), 1227-1235."
      ]
    },
    {
      id: 3,
      title: "Interleaving: Why Mixing It Up Makes You Smarter",
      description: "Stop studying one thing at a time like it's 1995. Your brain craves variety, and science backs it up.",
      icon: TrendingUp,
      readTime: "6 min read",
      image: "http://test.com/article-mnemonics.jpg",
      content: "Think of your brain as a DJ - it gets bored playing the same track on repeat. Interleaving is like creating the perfect study playlist. Mix math with history, throw in some language learning, and watch your retention soar. Your brain loves the challenge of switching contexts. It's basically cognitive cross-training.",
      fullContent: [
        "Traditional study advice tells you to block your practice: do all your math problems, then all your history reading, then all your language flashcards. Makes sense, right? Wrong. Research shows this 'blocked practice' is actually one of the least effective ways to learn.",
        "Interleaving flips the script. Instead of studying one topic until exhaustion, you mix related topics within the same session. Study math for 20 minutes, switch to history, then language, then back to math. It feels harder—and that's exactly why it works better.",
        "The magic happens in the switching. When you interleave, your brain has to constantly recall which strategy or concept to apply. This effortful retrieval strengthens connections and improves your ability to discriminate between similar concepts—a crucial skill for exams and real-world application.",
        "A famous study had students practice three different baseball pitch types. One group did blocked practice (100 fastballs, then 100 curveballs, then 100 sliders). The other interleaved all three types randomly. In immediate testing, the blocked group performed better. But a week later? The interleaved group dominated.",
        "This pattern repeats across domains: math problem types, art styles, bird species identification, even surgical techniques. Interleaving produces slower initial progress but dramatically better long-term retention and transfer. You're training your brain to be flexible, not just familiar.",
        "The key is to interleave related but distinct concepts—not completely random topics. Your brain needs enough similarity to make connections but enough difference to force discrimination. Think of it as controlled chaos that sharpens your cognitive toolkit."
      ],
      citations: [
        "Rohrer, D., & Taylor, K. (2007). The shuffling of mathematics problems improves learning. Instructional Science, 35(6), 481-498.",
        "Kornell, N., & Bjork, R. A. (2008). Learning concepts and categories: Is spacing the 'enemy of induction'? Psychological Science, 19(6), 585-592.",
        "Taylor, K., & Rohrer, D. (2010). The effects of interleaved practice. Applied Cognitive Psychology, 24(6), 837-848.",
        "Birnbaum, M. S., Kornell, N., Bjork, E. L., & Bjork, R. A. (2013). Why interleaving enhances inductive learning: The roles of discrimination and retrieval. Memory & Cognition, 41(3), 392-402."
      ]
    },
    {
      id: 4,
      title: "Mnemonics: The Art of Never Forgetting Anything Ever Again",
      description: "Turn boring facts into unforgettable stories. Your brain will thank you (and so will your grades).",
      icon: Lightbulb,
      readTime: "5 min read",
      image: "http://test.com/article-mnemonics.jpg",
      content: "ROY G. BIV never forgot the colors of the rainbow, and neither will you. Mnemonics transform dry information into sticky, memorable chunks. The weirder and more personal, the better. Create acronyms, songs, or stories - whatever makes you smile (or cringe) will help you remember.",
      fullContent: [
        "Your brain is terrible at remembering abstract facts but incredible at remembering stories, emotions, and sensory experiences. Mnemonics bridge this gap by transforming boring information into something your brain actually wants to remember.",
        "The techniques are diverse: acronyms (ROY G. BIV for rainbow colors), acrostics (Every Good Boy Does Fine for musical notes), rhymes (Thirty days hath September...), and elaborate story-based systems. The best mnemonic is the one that resonates with you personally.",
        "Medical students are mnemonic masters by necessity. 'Never Lower Tillie's Pants; Mother Might Come Home' helps thousands remember the carpal bones (Navicular, Lunate, Triquetrum, Pisiform, Multangular, Multangular, Capitate, Hamate). Crude? Yes. Effective? Absolutely.",
        "The science behind mnemonics involves dual coding—storing information in both verbal and visual (or emotional) form. The more sensory dimensions you add, the more retrieval routes your brain has. It's like saving a file in multiple formats; one path will always work.",
        "Creating your own mnemonics is often more powerful than using pre-made ones because the act of creation itself is a form of deep processing. When you turn 'Every Good Boy Does Fine' into your own absurd story about a boy named Eugene who saves lives with musical notes, it becomes yours—and unforgettable.",
        "Modern applications go beyond education. Memory athletes use elaborate mnemonic systems to memorize shuffled decks of cards in under a minute. You can use them for anything: passwords, names at networking events, cooking recipes, language vocabulary—any information that refuses to stick."
      ],
      citations: [
        "Atkinson, R. C. (1975). Mnemotechnics in second-language learning. American Psychologist, 30(8), 821-828.",
        "Bellezza, F. S. (1981). Mnemonic devices: Classification, characteristics, and criteria. Review of Educational Research, 51(2), 247-275.",
        "Worthen, J. B., & Hunt, R. R. (2011). Mnemonology: Mnemonics for the 21st Century. Psychology Press.",
        "Carney, R. N., & Levin, J. R. (2003). Promoting higher-order learning benefits by building lower-order mnemonic connections. Applied Cognitive Psychology, 17(5), 563-575."
      ]
    },
    {
      id: 5,
      title: "Self-Explanation: Talk to Yourself (It's Not Weird, It's Science)",
      description: "Explaining concepts out loud isn't crazy - it's one of the most powerful learning techniques you can use.",
      icon: Heart,
      readTime: "4 min read",
      image: "http://test.com/article-mnemonics.jpg",
      content: "The Feynman Technique sounds fancy, but it's just teaching concepts to yourself like you're explaining them to a curious five-year-old. If you can't explain it simply, you don't understand it well enough. Plus, talking to yourself makes you look mysterious and intelligent. Win-win.",
      fullContent: [
        "Richard Feynman, Nobel Prize-winning physicist, was famous for making complex quantum mechanics understandable to anyone. His secret? He forced himself to explain concepts as if teaching a child. If he couldn't simplify it, he knew his understanding had gaps.",
        "Self-explanation works because it exposes the holes in your knowledge with brutal honesty. When you passively read or listen, your brain nods along, convinced it understands. But when you try to explain it out loud—to yourself, a rubber duck, or an imaginary student—the illusion shatters. Suddenly, you can't remember that crucial detail or connect two concepts.",
        "Research shows that students who explain concepts to themselves while learning score significantly higher on comprehension tests than those who simply review material. The act of explanation forces you to actively organize information, identify relationships, and fill gaps—all forms of deep processing.",
        "The technique works best when you do it without looking at your notes. Try explaining a concept from memory, then check your source material to see what you missed or got wrong. Repeat until your explanation is clear, accurate, and simple. This isn't just practice—it's diagnostic learning.",
        "Beyond academics, self-explanation is powerful for professional skills, creative pursuits, and even personal growth. Trying to explain why you made a decision, how a piece of code works, or what a painting makes you feel deepens your understanding and reveals assumptions you didn't know you had.",
        "The beauty of this technique is its honesty. You can't fake understanding when you're both teacher and student. Your gaps are obvious, your confusion is clarifying, and your eventual mastery is genuine. Plus, yes, talking to yourself does make you look like a deep thinker. Science says so."
      ],
      citations: [
        "Chi, M. T., De Leeuw, N., Chiu, M. H., & LaVancher, C. (1994). Eliciting self-explanations improves understanding. Cognitive Science, 18(3), 439-477.",
        "Aleven, V. A., & Koedinger, K. R. (2002). An effective metacognitive strategy: Learning by doing and explaining with a computer-based Cognitive Tutor. Cognitive Science, 26(2), 147-179.",
        "Feynman, R. P. (1985). Surely You're Joking, Mr. Feynman! W. W. Norton & Company.",
        "Rittle-Johnson, B. (2006). Promoting transfer: Effects of self-explanation and direct instruction. Child Development, 77(1), 1-15."
      ]
    },
    {
      id: 6,
      title: "Chunking: How to Download Information Into Your Brain",
      description: "Your brain has limited RAM. Here's how to compress files like a pro.",
      icon: Zap,
      readTime: "6 min read",
      image: "http://test.com/article-mnemonics.jpg",
      content: "Phone numbers are chunked (555-123-4567) because your working memory can only handle 7±2 items at once. Break complex information into bite-sized pieces, and suddenly the impossible becomes merely difficult. It's like meal prep for your brain - portion control is everything.",
      fullContent: [
        "In 1956, psychologist George Miller published a groundbreaking paper titled 'The Magical Number Seven, Plus or Minus Two.' His finding? Human working memory can hold about 7 items at once. Try to remember a 15-digit number as individual digits, and you'll fail. But chunk it into groups (555-123-4567-890), and suddenly it's manageable.",
        "Chunking is your brain's compression algorithm. By grouping related information into meaningful units, you dramatically expand what you can hold in mind. A chess grandmaster doesn't see 32 individual pieces—they see patterns, formations, and strategies. That's chunking in action.",
        "The technique works because chunks free up working memory slots. Instead of remembering FBICIANSA as 8 letters, you chunk them into 3 acronyms (FBI, CIA, NSA) and now occupy just 3 slots. You've tripled your effective capacity without adding any memory.",
        "Learning itself is largely about building bigger, more sophisticated chunks. When you first learn to drive, you consciously think about every action—mirror, signal, clutch, gear. Eventually, these chunk into 'changing lanes,' which itself chunks into 'driving,' which becomes automatic. Expertise is chunking all the way down.",
        "The key is to chunk meaningfully. Random groupings don't help—your brain needs the chunks to make sense. Use acronyms, categories, hierarchies, or narratives to bundle information. Medical students chunk symptoms into syndromes. Programmers chunk lines into functions. Find the natural boundaries in your material.",
        "Modern applications are everywhere. Break large projects into phases. Organize notes by themes. Learn languages by phrase, not individual words. Turn overwhelming to-do lists into categorized priorities. Chunking doesn't just help you remember—it helps you think clearly in complex situations."
      ],
      citations: [
        "Miller, G. A. (1956). The magical number seven, plus or minus two: Some limits on our capacity for processing information. Psychological Review, 63(2), 81-97.",
        "Chase, W. G., & Simon, H. A. (1973). Perception in chess. Cognitive Psychology, 4(1), 55-81.",
        "Cowan, N. (2001). The magical number 4 in short-term memory: A reconsideration of mental storage capacity. Behavioral and Brain Sciences, 24(1), 87-114.",
        "Gobet, F., Lane, P. C., Croker, S., Cheng, P. C., Jones, G., Oliver, I., & Pine, J. M. (2001). Chunking mechanisms in human learning. Trends in Cognitive Sciences, 5(6), 236-243."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-neural">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Learning Lab
          </h1>
          <p className="text-xl text-muted-foreground">
            Light-hearted wisdom on evidence-based learning techniques
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => {
            const Icon = article.icon;
            return (
              <Dialog key={article.id}>
                <DialogTrigger asChild>
                  <Card className="shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <Icon className="h-10 w-10 text-primary animate-pulse-slow" />
                        <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                          {article.readTime}
                        </span>
                      </div>
                      <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                      <CardDescription>{article.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {article.content}
                      </p>
                      <Button variant="secondary" className="w-full">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                  <ScrollArea className="h-full max-h-[90vh]">
                    <div className="relative">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-64 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-medium">{article.readTime}</span>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <DialogHeader className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Icon className="h-8 w-8 text-primary" />
                          <DialogTitle className="text-3xl">{article.title}</DialogTitle>
                        </div>
                        <DialogDescription className="text-base">
                          {article.description}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                        {article.fullContent.map((paragraph, index) => (
                          <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      <Separator className="my-8" />

                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-primary" />
                          References & Citations
                        </h3>
                        <div className="space-y-3 bg-secondary/30 p-6 rounded-lg">
                          {article.citations.map((citation, index) => (
                            <p key={index} className="text-sm text-muted-foreground pl-4 border-l-2 border-primary/50">
                              {citation}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                        <p className="text-sm text-center text-muted-foreground mb-4">
                          Ready to put these techniques into practice?
                        </p>
                        <div className="flex gap-4 justify-center">
                          <Link to="/decks">
                            <Button>Browse Decks</Button>
                          </Link>
                          <Link to="/study">
                            <Button variant="secondary">Start Studying</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Card className="shadow-glow">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Put This Into Practice?</CardTitle>
              <CardDescription>
                Start applying these techniques with our interactive learning tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/decks">
                  <Button size="lg">Browse Decks</Button>
                </Link>
                <Link to="/study">
                  <Button size="lg" variant="secondary">Start Studying</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Articles;
