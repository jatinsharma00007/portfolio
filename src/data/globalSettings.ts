export interface GlobalSettings {
  profile: {
    name: string;
    tagline: string;
    shortBio: string;
  };
  socials: {
    github: string;
    linkedin: string;
    twitter?: string;
    email: string;
    resume: string;
  };
  contact: {
    publicEmail: string;
    whatsapp?: string;
    telegram?: string;
  };
  navigation: {
    show: {
      home: boolean;
      about: boolean;
      games: boolean;
      hackathons: boolean;
      webapps: boolean;
      contact: boolean;
    };
    labels: {
      home: string;
      about: string;
      games: string;
      hackathons: string;
      webapps: string;
      contact: string;
    };
  };
  i18n: {
    supported: string[];
    default: string;
  };
  misc: {
    darkMode: boolean;
    maintenanceMode: boolean;
    footerText: string;
  };
}

export const globalSettings: GlobalSettings = {
  profile: {
    name: "Jatin Sharma",
    tagline: "Game Dev | Hackathon Champ",
    shortBio: "Creative coder passionate about building impactful digital experiences."
  },
  socials: {
    github: "https://github.com/jatin",
    linkedin: "https://linkedin.com/in/jatin",
    twitter: "",
    email: "hello@jatin.dev",
    resume: "/resume.pdf"
  },
  contact: {
    publicEmail: "hello@jatin.dev",
    whatsapp: "+91 9876543210",
    telegram: ""
  },
  navigation: {
    show: {
      home: true,
      about: true,
      games: true,
      hackathons: true,
      webapps: true,
      contact: true
    },
    labels: {
      home: "Home",
      about: "About Me",
      games: "Games",
      hackathons: "Hackathons",
      webapps: "Web & Apps",
      contact: "Contact"
    }
  },
  i18n: {
    supported: ["en", "hi", "ja"],
    default: "en"
  },
  misc: {
    darkMode: true,
    maintenanceMode: false,
    footerText: "Crafted with ❤️ by Jatin Sharma"
  }
}; 