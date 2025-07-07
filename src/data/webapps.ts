export interface WebApp {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  type: 'Website' | 'App' | 'Tool';
  github?: string;
  demo?: string;
}

const webapps: WebApp[] = [
  {
    id: "ai-summarizer",
    title: "AI Summarizer",
    description: "An OpenAI-powered tool that summarizes articles and blog posts in seconds.",
    image: "/assets/ai-summarizer.svg",
    type: "Tool",
    tags: ["AI", "Open Source", "React", "Vite"],
    github: "https://github.com/yourusername/ai-summarizer",
    demo: "https://ai-summarizer.vercel.app"
  },
  {
    id: "expense-tracker",
    title: "Smart Expense Tracker",
    description: "A PWA that helps users track expenses and budgets, built during a hackathon.",
    image: "/assets/expense-tracker.svg",
    type: "App",
    tags: ["Finance", "PWA", "Hackathon", "MongoDB"],
    github: "https://github.com/yourusername/expense-tracker"
  },
  {
    id: "weather-tool",
    title: "Realtime Weather Tool",
    description: "Weather insights using OpenWeatherMap API with map overlay.",
    image: "/assets/weather-tool.svg",
    type: "Tool",
    tags: ["API", "Open Source", "Leaflet", "React"],
    demo: "https://weather-tools.vercel.app"
  }
];

export default webapps; 