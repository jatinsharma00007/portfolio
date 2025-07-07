// /src/data/games.ts
export interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
}

const games: Game[] = [
  {
    id: "1",
    title: "Pixel Blaster",
    description: "A retro-style 2D shooter made with Unity.",
    image: "/assets/pixel-blaster.svg",
    tags: ["Unity", "2D", "C#", "Android"],
    github: "https://github.com/yourusername/pixel-blaster",
    demo: "https://yourdemo.com/pixel-blaster"
  },
  {
    id: "2",
    title: "Dungeon Rush 3D",
    description: "A dungeon crawler built using Unity 3D engine.",
    image: "/assets/dungeon-rush.svg",
    tags: ["Unity", "3D", "C#", "PC"],
    github: "https://github.com/yourusername/dungeon-rush"
  },
  {
    id: "3",
    title: "WebGL Asteroids",
    description: "A simple asteroids clone running in browser.",
    image: "/assets/webgl-asteroids.svg",
    tags: ["JavaScript", "WebGL", "Canvas", "Browser"],
    demo: "https://yourdemo.com/webgl-asteroids"
  }
];

export default games; 