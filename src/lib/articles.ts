export type Article = {
    num: string
    title: string
    blurb: string
    category: 'culture' | 'spirituality' | 'theory' | 'history' | 'science' | 'japan'
    categoryLabel: string
    slug: string
}

export const articles: Article[] = [
    // CULTURE & SOCIETY
    { num: '01', title: 'Floodplain vs Fractured-Sea Cultures: Why Geography Is Destiny', blurb: 'Why whole civilisations think differently — and why the answer lies in the shape of the land.', category: 'culture', categoryLabel: 'Culture & Society', slug: 'floodplain-vs-fractured-sea' },
    { num: '02', title: 'Why Dating Apps Structurally Fail Men — And How to Fix Them', blurb: 'The architecture of modern dating apps creates a structural mismatch that no better photo can fix.', category: 'culture', categoryLabel: 'Culture & Society', slug: 'dating-apps-fail-men' },
    { num: '03', title: 'Debate Cultures vs Scolding Cultures', blurb: 'Two fundamentally different ways of handling disagreement — and what they reveal about a society.', category: 'culture', categoryLabel: 'Culture & Society', slug: 'debate-vs-scolding-cultures' },
    { num: '04', title: 'Nordic Social Scripts: What Scandinavia Gets Right About Social Pressure', blurb: 'The hidden rules governing Scandinavian social life — and why they might be the most sophisticated system in the world.', category: 'culture', categoryLabel: 'Culture & Society', slug: 'nordic-social-scripts' },
    { num: '05', title: 'Was Edo Japan Happier Than Modern Japan?', blurb: 'A pre-industrial society with no growth economy, near-zero crime, and high life satisfaction. What can it teach us?', category: 'culture', categoryLabel: 'Culture & Society', slug: 'edo-japan-happiness' },
    { num: '06', title: 'How Cultures Misread Each Other in Australia', blurb: 'Australia as a collision point for incompatible social software — and what happens when nobody notices.', category: 'culture', categoryLabel: 'Culture & Society', slug: 'cultures-misread-australia' },
    { num: '07', title: 'East vs West: Different Kinds of Tough', blurb: 'Resilience looks different depending on where you were forged. Neither is stronger — they\'re built for different storms.', category: 'culture', categoryLabel: 'Culture & Society', slug: 'east-vs-west-tough' },
    { num: '08', title: 'Relational Morality vs Principled Morality: Two Ways of Being Good', blurb: 'Is morality about universal rules or about the people in front of you? The answer divides civilisations.', category: 'culture', categoryLabel: 'Culture & Society', slug: 'relational-vs-principled-morality' },

    // SPIRITUALITY & RELIGION
    { num: '09', title: 'Gnosticism and the Demiurge: The Hidden Creation Story', blurb: 'What if the God who made the world isn\'t the highest God? The ancient heresy that still makes uncomfortable sense.', category: 'spirituality', categoryLabel: 'Spirituality & Religion', slug: 'gnosticism-and-the-demiurge' },
    { num: '10', title: 'The Gospel of Judas: Was He the Real Hero?', blurb: 'The suppressed gospel that rewrites the most famous betrayal in history.', category: 'spirituality', categoryLabel: 'Spirituality & Religion', slug: 'gospel-of-judas' },
    { num: '11', title: 'The Book of Enoch: What the Bible Left Out', blurb: 'Angels who fell for human women, giants who walked the earth, and a cosmology the early church buried.', category: 'spirituality', categoryLabel: 'Spirituality & Religion', slug: 'book-of-enoch' },
    { num: '12', title: 'Is Christianity True? What the Evidence Actually Says', blurb: 'A fair, serious look at the historical and philosophical evidence — without assuming the answer in advance.', category: 'spirituality', categoryLabel: 'Spirituality & Religion', slug: 'is-christianity-true' },
    { num: '13', title: 'Sophia: The Forgotten Feminine Divine', blurb: 'The goddess hidden inside Western monotheism — erased, suppressed, and still there if you know where to look.', category: 'spirituality', categoryLabel: 'Spirituality & Religion', slug: 'sophia-feminine-divine' },
    { num: '14', title: 'Kensho vs Satori: Two Kinds of Awakening, Two Kinds of History', blurb: 'Zen distinguishes between a glimpse and full realisation. The difference maps onto how entire cultures understand transformation.', category: 'spirituality', categoryLabel: 'Spirituality & Religion', slug: 'kensho-vs-satori' },

    // ORIGINAL THEORIES
    { num: '15', title: 'Yin-Yang as a Fractal Map of the World', blurb: 'The ancient symbol isn\'t just about balance. It\'s a recursive model of how everything contains its opposite.', category: 'theory', categoryLabel: 'Original Theory', slug: 'yin-yang-fractal-map' },
    { num: '16', title: 'D-Fusion: A Theory of How Civilisations Evolve', blurb: 'An original framework for understanding how cultures absorb, resist, and transform under contact with each other.', category: 'theory', categoryLabel: 'Original Theory', slug: 'd-fusion-theory' },
    { num: '17', title: 'Uncertainty as Power: Why Not Knowing Is a Strategic Strength', blurb: 'The world rewards those who pretend to certainty. But the deepest strategic advantage may lie in the opposite direction.', category: 'theory', categoryLabel: 'Original Theory', slug: 'uncertainty-as-power' },
    { num: '18', title: "Humanity as the Galaxy's Ungovernable Wild Card", blurb: "Why Earth's chaos, contradiction, and refusal to optimise might be our most important trait in a cosmic context.", category: 'theory', categoryLabel: 'Original Theory', slug: 'humanity-wild-card' },
    { num: '19', title: 'How the Sage Digests the World: A Model of Meaning-Making', blurb: 'A framework for how wisdom traditions absorb experience — and why most people skip the most important step.', category: 'theory', categoryLabel: 'Original Theory', slug: 'sage-digests-the-world' },

    // HISTORY & MYTHOLOGY
    { num: '20', title: 'Queen Himiko and the Mystery of Yamatai', blurb: "Japan's first ruler was a shaman queen who vanished from the historical record. What really happened?", category: 'history', categoryLabel: 'History & Mythology', slug: 'queen-himiko-yamatai' },
    { num: '21', title: "Amaterasu and Susanoo: Japan's Creation Myths Decoded", blurb: "The sun goddess and the storm god aren't just myths — they encode Japan's deepest tensions about order and chaos.", category: 'history', categoryLabel: 'History & Mythology', slug: 'amaterasu-and-susanoo' },
    { num: '22', title: 'Did a Chinese Immortality-Seeker Found Japan?', blurb: 'The strange legend of Xu Fu — the man who sailed east looking for eternal life and may never have returned.', category: 'history', categoryLabel: 'History & Mythology', slug: 'xu-fu-founded-japan' },
    { num: '23', title: 'Fukuzawa Yukichi: The Warning Japan Put on a Banknote and Then Ignored', blurb: "Japan's greatest moderniser spent his career warning that changing uniforms without changing minds would destroy everything. He was right.", category: 'history', categoryLabel: 'History & Mythology', slug: 'fukuzawa-yukichi' },

    // SCIENCE & MIND
    { num: '24', title: 'Yamanaka Factors: Can We Reverse Ageing?', blurb: 'The Nobel Prize-winning discovery that cells can be reprogrammed — and what it might mean for the human lifespan.', category: 'science', categoryLabel: 'Science & Mind', slug: 'yamanaka-factors-ageing' },
    { num: '25', title: 'The Simulation Hypothesis: How Seriously Should We Take It?', blurb: "Nick Bostrom's argument is logically airtight. That doesn't mean the conclusion isn't disturbing.", category: 'science', categoryLabel: 'Science & Mind', slug: 'simulation-hypothesis' },

    // JAPAN & CULTURE
    { num: '26', title: 'The Harmony Paradox: How Cultures That Suppress Small Conflicts Produce Catastrophic Ones', blurb: 'A culture of harmony sounds safer. The historical record suggests the opposite.', category: 'japan', categoryLabel: 'Japan & Culture', slug: 'harmony-paradox' },
    { num: '27', title: 'The Emergency That Never Ended: How Temporary Crises Become Permanent Cultures', blurb: "Japan's Meiji leaders said the emergency measures were temporary. They weren't. The pattern is everywhere.", category: 'japan', categoryLabel: 'Japan & Culture', slug: 'emergency-that-never-ended' },
]

export const categories = [
    { key: 'all', label: 'All' },
    { key: 'culture', label: 'Culture & Society' },
    { key: 'spirituality', label: 'Spirituality' },
    { key: 'theory', label: 'Original Theory' },
    { key: 'history', label: 'History & Myth' },
    { key: 'science', label: 'Science & Mind' },
    { key: 'japan', label: 'Japan & Culture' },
]

export const categoryGroups = [
    { key: 'culture', label: 'Culture & Society' },
    { key: 'spirituality', label: 'Spirituality & Religion' },
    { key: 'theory', label: 'Original Theories' },
    { key: 'history', label: 'History & Mythology' },
    { key: 'science', label: 'Science & Mind' },
    { key: 'japan', label: 'Japan & Culture' },
]