const en = {
  nav: {
    layer: 'The Hidden Layers',
    maps: 'Hidden Maps',
    about: 'About',
    // Subsections
    fukurou: 'Fukurou',
    history: 'History',
    philosophy: 'Philosophy',
    christianity: 'Christianity',
    theory: 'Theory',
    articles: 'Articles',
    projects: 'Projects',
  },
  hero: {
    tagline: 'Observing the hidden.',
    subtitle: 'Essays on history, culture, civilisation, and the ideas that shape the world.',
    cta_articles: 'Read the Essays',
    cta_maps: 'Explore the Maps',
  },
  articles: {
    heading: 'The Hidden Layers',
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
    heading: 'Hidden Maps',
    subheading: 'Interactive Tools',
    live: 'Live',
    dev: 'In Development',
    explore: 'Explore →',
  },
  about: {
    heading: 'About The Hidden Owl',
    body: 'The Hidden Owl is a personal project exploring the patterns beneath history, culture, and civilisation — through essays, interactive maps, and AI-assisted research.',
  },
  footer: {
    tagline: 'Observing the hidden.',
    copyright: `© ${new Date().getFullYear()} The Hidden Owl`,
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
