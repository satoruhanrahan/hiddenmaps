const en = {
  nav: {
    articles: 'Articles',
    projects: 'Projects',
    about: 'About',
  },
  hero: {
    tagline: 'Charting what lies beneath.',
    subtitle: 'Essays on history, culture, civilisation, and the ideas that shape the world.',
    cta_articles: 'Read the Essays',
    cta_projects: 'Explore the Maps',
  },
  articles: {
    heading: 'The Hidden Layer',
    subheading: 'Ideas & Essays',
    all_articles: (n: number) => `All ${n} Articles →`,
    record_no: 'Record No.',
    read_more: 'Read →',
    ai_notice: 'Articles on this site are AI-assisted — written in collaboration with Claude.',
    filter_all: 'All',
  },
  article: {
    back: '← All Articles',
    historical_notes: 'Historical notes:',
    related: 'Related Articles',
    prev: '← Previous',
    next: 'Next →',
  },
  projects: {
    heading: 'Interactive Maps',
    subheading: 'The Hidden Projects',
    live: 'Live',
    dev: 'In Development',
    explore: 'Explore →',
  },
  about: {
    heading: 'About Hidden Maps',
    body: 'Hidden Maps is a personal project exploring the patterns beneath history, culture, and civilisation — through essays, interactive maps, and AI-assisted research.',
  },
  footer: {
    tagline: 'Charting what lies beneath.',
    copyright: `© ${new Date().getFullYear()} Hidden Maps`,
  },
  categories: {
    all: 'All',
    culture: 'Culture & Society',
    spirituality: 'Spirituality',
    theory: 'Original Theory',
    history: 'History & Myth',
    science: 'Science & Mind',
    japan: 'Japan & Culture',
  },
}

export default en
export type Translations = typeof en
