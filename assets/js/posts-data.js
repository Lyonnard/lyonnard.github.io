// Single source of truth for the blog grid (homepage + /blog/).
// Add one entry per post, newest first. `slug` must match the folder
// name under posts/, and the `langs` keys must match that post's
// data-post-langs attribute. See CLAUDE.md for the full authoring guide.
window.POSTS = [
  {
    slug: "2026-07-02-my-first-steps-into-the-sailing-world",
    date: "2026-07-02",
    image: "/images/sailing-1.jpeg",
    langs: {
      en: {
        title: "My first steps into the sailing world",
        excerpt: "Getting a boating license with a newborn, because apparently that's a reasonable plan."
      },
      it: {
        title: "I miei primi passi nel mondo della vela",
        excerpt: "Prendere la patente nautica con un neonato"
      }
    }
  },
  {
    slug: "2026-06-29-why-a-website",
    date: "2026-06-29",
    image: "/images/why-a-website-hero.png",
    langs: {
      en: {
        title: "Why a website? (And why I moved to Substack)",
        excerpt: "Why did I make my own website? The answer to that, plus where the blog lives now."
      }
    }
  },
  {
    slug: "2026-06-29-gliding-an-affordable-way-to-fly",
    date: "2026-06-29",
    image: "/images/gliding-hero.jpeg",
    langs: {
      en: {
        title: "Gliding, an affordable way to fly",
        excerpt: "Would you like to learn flying without breaking the bank? Have a read"
      }
    }
  },
];
