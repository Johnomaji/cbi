import {
  getEvents,
  getPosts,
  getPrograms,
  getPublications,
  getSiteSettings,
  getTeam,
  type Event,
  type Post,
  type Program,
  type Publication,
  type TeamMember,
} from "./data";

type KnowledgeItem = {
  title: string;
  text: string;
  source: string;
  keywords: string[];
};

const STOPWORDS = new Set([
  "the", "and", "for", "with", "from", "that", "this", "have", "your", "what",
  "when", "where", "about", "into", "they", "their", "them", "are", "you", "how",
  "can", "all", "our", "who", "why", "has", "had", "was", "were", "will", "would",
  "should", "could", "not", "but", "its", "it's", "just", "more", "please",
]);

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

function buildProgramItem(program: Program): KnowledgeItem {
  return {
    title: `Program: ${program.title}`,
    text: `${program.title}. ${program.description}`,
    source: "programs",
    keywords: tokenize(`${program.title} ${program.description}`),
  };
}

function buildEventItem(event: Event): KnowledgeItem {
  return {
    title: `Event: ${event.title}`,
    text: `${event.title} on ${event.date} at ${event.time}, ${event.location}. ${event.description}`,
    source: "events",
    keywords: tokenize(`${event.title} ${event.description} ${event.location} ${event.type}`),
  };
}

function buildPostItem(post: Post): KnowledgeItem {
  return {
    title: `Post: ${post.title}`,
    text: `${post.title}. ${post.excerpt}`,
    source: "blog",
    keywords: tokenize(`${post.title} ${post.excerpt} ${post.category}`),
  };
}

function buildPublicationItem(publication: Publication): KnowledgeItem {
  return {
    title: `Publication: ${publication.title}`,
    text: `${publication.title} (${publication.type}, ${publication.date}). ${publication.description}`,
    source: "publications",
    keywords: tokenize(`${publication.title} ${publication.description} ${publication.type}`),
  };
}

function buildTeamItem(member: TeamMember): KnowledgeItem {
  return {
    title: `Team: ${member.name}`,
    text: `${member.name} is ${member.title}. ${member.bio}`,
    source: "team",
    keywords: tokenize(`${member.name} ${member.title} ${member.bio}`),
  };
}

export async function answerCbiQuestion(question: string): Promise<{ answer: string; sources: string[] }> {
  const [site, programs, events, posts, publications, team] = await Promise.all([
    getSiteSettings(),
    getPrograms(),
    getEvents(),
    getPosts(),
    getPublications(),
    getTeam(),
  ]);

  const knowledge: KnowledgeItem[] = [
    {
      title: "CBI overview",
      text: `Care Best Initiative (CBI) supports vulnerable communities through healthcare, clean water, education, protection, nutrition, and livelihoods. Main contact email is ${site.email}, phone is ${site.phone}, and address is ${site.address}.`,
      source: "siteSettings",
      keywords: tokenize(`CBI care best initiative contact email phone address healthcare water education protection nutrition livelihoods`),
    },
    ...programs.filter((p) => p.published).map(buildProgramItem),
    ...events.filter((e) => e.published).map(buildEventItem),
    ...posts.filter((p) => p.published).map(buildPostItem),
    ...publications.filter((p) => p.published).map(buildPublicationItem),
    ...team.map(buildTeamItem),
  ];

  const queryWords = tokenize(question);
  if (queryWords.length === 0) {
    return {
      answer: "Ask me about CBI programs, events, publications, impact stories, or contact details.",
      sources: ["siteSettings"],
    };
  }

  const ranked = knowledge
    .map((item) => {
      const hits = queryWords.filter((q) => item.keywords.includes(q)).length;
      return { item, score: hits };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (ranked.length === 0) {
    return {
      answer:
        "I could not find that in the current CBI website content. Try asking about programs, recent events, publications, team, or contact information.",
      sources: ["siteSettings"],
    };
  }

  const sourceSet = new Set<string>();
  const snippets = ranked.map(({ item }) => {
    sourceSet.add(item.source);
    return `${item.title}: ${item.text}`;
  });

  return {
    answer: snippets.join("\n\n"),
    sources: [...sourceSet],
  };
}
