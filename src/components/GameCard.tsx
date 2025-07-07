import type { Game } from "../data/games";

interface GameCardProps {
  game: Game;
  onClick?: () => void;
}

export default function GameCard({ game, onClick }: GameCardProps) {
  return (
    <div 
      className="bg-gunmetal-gray rounded-xl shadow-lg overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition transform duration-300 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={game.image}
        alt={game.title}
        className="w-full h-40 object-cover bg-forge-black"
      />
      <div className="p-5 space-y-3">
        <h3 className="text-xl font-semibold text-molten-orange">{game.title}</h3>
        <p className="text-sm text-steel-blue">{game.description}</p>
        <div className="flex flex-wrap gap-2">
          {game.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-forge-black text-cool-cyan text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4 mt-3">
          {game.github && (
            <a
              href={game.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-chrome-silver hover:text-molten-orange"
            >
              🔗 GitHub
            </a>
          )}
          {game.demo && (
            <a
              href={game.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-chrome-silver hover:text-cool-cyan"
            >
              ▶️ Play
            </a>
          )}
        </div>
      </div>
    </div>
  );
} 