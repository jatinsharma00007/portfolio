import React from 'react';

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/yourusername",
    icon: "fa-brands fa-github"
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    icon: "fa-brands fa-linkedin"
  },
  {
    name: "Email",
    href: "mailto:your@email.com",
    icon: "fa-solid fa-envelope"
  },
  {
    name: "Devpost",
    href: "https://devpost.com/yourusername",
    icon: "fa-brands fa-dev"
  },
  {
    name: "Resume",
    href: "/assets/resume.pdf",
    icon: "fa-solid fa-file-arrow-down"
  }
];

export default function SocialLinks() {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-molten-orange">
        Let's Build Something Awesome Together!
      </h2>
      <p className="text-steel-blue text-md max-w-xl mx-auto">
        I'm open to freelance work, collaborations, or cool hackathons. Feel free to reach out on any platform below.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {socials.map(({ name, href, icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-full border border-cool-cyan text-cool-cyan hover:bg-molten-orange hover:text-forge-black hover:border-molten-orange transition duration-200"
          >
            <i className={`${icon} text-lg`}></i>
            <span className="text-sm font-medium">{name}</span>
          </a>
        ))}
      </div>
    </div>
  );
} 