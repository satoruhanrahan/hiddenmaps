import type { Translations } from './en'

const ja: Translations = {
  nav: {
    layer: '隠れた層',
    maps: 'ヒドゥンマップス',
    about: '概要',
    fukurou: '不苦労',
    history: '歴史',
    philosophy: '哲学',
    christianity: 'キリスト教',
    theory: '独自理論',
    articles: '記事',
    projects: 'プロジェクト',
  },
  hero: {
    tagline: '隠れたものを観る。',
    subtitle: '歴史・文化・文明、そして世界を形づくるアイデアについてのエッセイ。',
    cta_articles: 'エッセイを読む',
    cta_maps: '地図を探る',
  },
  articles: {
    heading: '隠れた層',
    subheading: 'アイデアとエッセイ',
    all_articles: (n: number) => `全${n}記事 →`,
    record_no: '記録番号',
    read_more: '読む →',
    ai_notice: 'このサイトの記事はAIとの共同執筆です。',
    filter_all: 'すべて',
  },
  article: {
    back: '← 記事一覧',
    historical_notes: '歴史的注記：',
    related: '関連記事',
    prev: '← 前の記事',
    next: '次の記事 →',
  },
  projects: {
    heading: 'ヒドゥンマップス',
    subheading: 'インタラクティブツール',
    live: '公開中',
    dev: '開発中',
    explore: '探る →',
  },
  about: {
    heading: 'ザ・ヒドゥンアウルについて',
    body: 'The Hidden Owlは、歴史・文化・文明の深層にあるパターンを、エッセイ・インタラクティブ地図・AIリサーチを通じて探る個人プロジェクトです。',
  },
  footer: {
    tagline: '隠れたものを観る。',
    copyright: `© ${new Date().getFullYear()} The Hidden Owl`,
  },
  categories: {
    all: 'すべて',
    culture: '文化・社会',
    spirituality: '精神・宗教',
    theory: '独自理論',
    history: '歴史・神話',
    science: '科学・思想',
    japan: '日本・文化',
  },
}

export default ja
