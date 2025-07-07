export interface Hackathon {
  id: string;
  name: string;
  date: string;
  logo: string;
  statement: string;
  role: string;
  tools: string[];
  result?: string;
  link?: string;
  category?: string;
}

const hackathons: Hackathon[] = [
  {
    id: "isro-2025",
    name: "ISRO BAH 2025",
    date: "July 2025",
    logo: "/assets/isro.svg",
    statement: "AI model to detect tropical cloud clusters using satellite IR data.",
    role: "AI Developer",
    tools: ["Python", "Pandas", "Keras", "FastAPI"],
    result: "Shortlisted Finalist",
    link: "https://github.com/yourusername/isro-cloud-detector",
    category: "AI/ML"
  },
  {
    id: "sih",
    name: "Smart India Hackathon",
    date: "Dec 2024",
    logo: "/assets/sih.svg",
    statement: "Real-time rural price alert and mandi prediction tool.",
    role: "Backend Engineer",
    tools: ["Node.js", "MongoDB", "React", "Leaflet"],
    result: "Top 5 National Finalist",
    link: "https://github.com/yourusername/mandi-tracker",
    category: "Web"
  },
  {
    id: "microsoft-imagine",
    name: "Microsoft Imagine Cup",
    date: "January 2025",
    logo: "/assets/microsoft.svg",
    statement: "Created an AR-based educational platform for interactive learning.",
    role: "Frontend Developer",
    tools: ["React Native", "Azure", "AR.js", "Three.js"],
    result: "Regional Finalist",
    link: "https://github.com/yourusername/ar-edu-platform",
    category: "Web"
  },
  {
    id: "google-solution",
    name: "Google Solution Challenge",
    date: "April 2024",
    logo: "/assets/google.svg",
    statement: "Developed a sustainable waste management system using IoT and ML.",
    role: "Backend Developer",
    tools: ["Flutter", "Firebase", "TensorFlow", "Google Cloud"],
    result: "Honorable Mention",
    link: "https://github.com/yourusername/waste-management-iot",
    category: "AI/ML"
  }
];

export default hackathons; 