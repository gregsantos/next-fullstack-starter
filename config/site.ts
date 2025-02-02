export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  links: {
    github: string;
    docs: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Your App Name",
  description: "Your app description",
  url: "https://your-domain.com",
  links: {
    github: "https://github.com/your-username/your-repo",
    docs: "https://your-docs.com",
  },
}; 