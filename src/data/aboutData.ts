export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export interface Hobby {
  icon: string;
  label: string;
}

export interface AboutData {
  bio: string;
  tagline: string;
  timeline: TimelineEntry[];
  facts: string[];
  hobbies: Hobby[];
  gallery: string[];
}

export const aboutData: AboutData = {
  bio: "I'm Jatin — a passionate developer on a mission to turn ideas into digital experiences. Whether it's building intuitive web apps, creative games, or powerful tools, I love solving real-world problems with code. I'm always learning, experimenting, and growing — one commit at a time.",
  tagline: "My journey through code, creativity & challenges",
  timeline: [
    {
      year: "2019",
      title: "The Beginning",
      description: "Enrolled in Computer Science (AI) at RTU. Got introduced to Python, web dev basics, and project-based learning."
    },
    {
      year: "2021",
      title: "Built My First Unity Game",
      description: "Learned C#, Unity, and created a mini multiplayer game clone. Realized my passion for building games."
    },
    {
      year: "2022",
      title: "Team Projects & Winning",
      description: "Participated in multiple hackathons. Learned React, Tailwind, Firebase, and project collaboration."
    },
    {
      year: "2024–2025",
      title: "Real-World Impact",
      description: "Built tools, full-stack apps, and advanced game systems. Now working toward meaningful products & problem-solving."
    }
  ],
  facts: [
    "Built a working game engine prototype in vanilla JavaScript.",
    "I code best with lo-fi beats playing in the background.",
    "Gamer by heart — indie games and multiplayer dev fascinate me.",
    "Dreaming of traveling the world with a laptop & passion project.",
    "Built over 15+ tools, apps, and game prototypes during college.",
    "Enjoy working on late-night side projects more than Netflix."
  ],
  hobbies: [
    {
      icon: "🎨",
      label: "Digital Art"
    },
    {
      icon: "🎮",
      label: "Gaming"
    },
    {
      icon: "📚",
      label: "Reading Sci-Fi"
    },
    {
      icon: "🚶‍♂️",
      label: "Night Walks"
    }
  ],
  gallery: [
    "/assets/portfolio.png",
    "/assets/resume-ai.png",
    "/assets/weather-app.png",
    "/assets/snippet-manager.png"
  ]
}; 