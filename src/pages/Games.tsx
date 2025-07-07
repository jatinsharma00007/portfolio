import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import games from "../data/games";
import GameCard from "../components/GameCard";
import type { Game } from '../data/games';

export default function Games() {
  const { t } = useTranslation();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [activeFilter, setFilter] = useState<string>("All");

  // Extract unique tags from all games for filter options
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    tags.add("All");
    games.forEach(game => {
      game.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  // Filter games based on selected tag
  const filteredGames = useMemo(() => {
    if (activeFilter === "All") return games;
    return games.filter(game => game.tags.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section className="bg-forge-black py-20 px-6 md:px-12 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-20 text-chrome-silver">
        {/* Section 1: Hero Header */}
        <div id="games-hero" className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-molten-orange">{t('games.heading')}</h1>
          <p className="mt-4 text-lg md:text-xl text-steel-blue">
            {t('games.description')}
          </p>
        </div>

        {/* Section 4: Filter System */}
        <div id="games-filter" className="flex flex-wrap justify-center gap-3">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 rounded-full border text-sm ${
                activeFilter === tag
                  ? "bg-molten-orange text-forge-black border-molten-orange"
                  : "text-cool-cyan border-cool-cyan"
              } hover:bg-molten-orange hover:text-forge-black hover:border-molten-orange transition`}
            >
              {tag === "All" ? t('games.filter.all') : tag}
            </button>
          ))}
        </div>

        {/* Section 2: Game Grid */}
        <div id="games-grid" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGames.map((game) => (
            <GameCard 
              key={game.id} 
              game={game} 
              onClick={() => setSelectedGame(game)}
            />
          ))}
        </div>

        {/* Section 5: CTA */}
        <div id="games-cta" className="text-center space-y-4">
          <h2 className="text-2xl text-molten-orange font-bold">{t('games.cta.heading')}</h2>
          <p className="text-steel-blue">{t('games.cta.description')}</p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <a 
              href="https://github.com/yourusername" 
              className="px-5 py-3 bg-cool-cyan text-forge-black rounded-full font-semibold hover:bg-molten-orange transition" 
              target="_blank"
              rel="noopener noreferrer"
            >
              💻 {t('games.cta.github')}
            </a>
            <a 
              href="https://your.itch.io/" 
              className="px-5 py-3 bg-cool-cyan text-forge-black rounded-full font-semibold hover:bg-molten-orange transition" 
              target="_blank"
              rel="noopener noreferrer"
            >
              🎮 {t('games.cta.itch')}
            </a>
            <a 
              href="https://play.google.com/store/apps/dev?id=YOURID" 
              className="px-5 py-3 bg-cool-cyan text-forge-black rounded-full font-semibold hover:bg-molten-orange transition" 
              target="_blank"
              rel="noopener noreferrer"
            >
              📱 {t('games.cta.playstore')}
            </a>
          </div>
        </div>
        
        {/* Modal Preview */}
        {selectedGame && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-gunmetal-gray p-6 rounded-xl max-w-xl w-full relative">
              <button 
                onClick={() => setSelectedGame(null)} 
                className="absolute top-3 right-4 text-cool-cyan hover:text-molten-orange text-xl"
                aria-label={t('games.modal.close')}
              >
                ✖️
              </button>
              <h3 className="text-2xl text-molten-orange font-bold mb-2">{selectedGame.title}</h3>
              <p className="text-steel-blue mb-4">{selectedGame.description}</p>
              <img 
                src={selectedGame.image} 
                alt={selectedGame.title} 
                className="w-full rounded-lg mb-4 border border-forge-black" 
              />
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedGame.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-forge-black text-cool-cyan text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-6 justify-center">
                {selectedGame.github && (
                  <a
                    href={selectedGame.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-forge-black text-cool-cyan rounded-md hover:text-molten-orange transition"
                  >
                    🔗 {t('games.modal.viewSource')}
                  </a>
                )}
                {selectedGame.demo && (
                  <a
                    href={selectedGame.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-molten-orange text-forge-black rounded-md hover:bg-cool-cyan transition"
                  >
                    ▶️ {t('games.modal.playGame')}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 