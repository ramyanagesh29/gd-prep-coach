require('dotenv').config();
const mongoose = require('mongoose');
const Topic = require('../models/Topic');

const topics = [
  // Current Affairs
  { title: 'Should India adopt Universal Basic Income?', category: 'Current Affairs', description: 'Discuss the feasibility and impact of providing a guaranteed minimum income to all citizens.' },
  { title: 'Is remote work here to stay post-pandemic?', category: 'Current Affairs', description: 'Debate whether remote work will remain the norm or if companies will fully return to office.' },
  { title: 'Should social media platforms be regulated by governments?', category: 'Current Affairs', description: 'Explore the balance between free speech and preventing misinformation on social platforms.' },
  { title: 'Is India ready for a fully digital economy?', category: 'Current Affairs', description: 'Discuss the readiness of infrastructure, security, and public trust for a cashless economy.' },
  { title: 'Should electric vehicles be mandatory by 2030?', category: 'Current Affairs', description: 'Debate government mandates for EV adoption versus market-driven transition.' },
  { title: 'Is the 4-day work week a viable model for India?', category: 'Current Affairs', description: 'Discuss productivity, culture, and economic implications of a shorter work week.' },

  // Abstract
  { title: 'Is failure necessary for success?', category: 'Abstract', description: 'Explore whether setbacks are essential to achieving meaningful success.' },
  { title: 'Does technology make us more isolated or more connected?', category: 'Abstract', description: 'Discuss the paradox of increased digital connectivity alongside rising loneliness.' },
  { title: 'Is it better to be a jack of all trades or a master of one?', category: 'Abstract', description: 'Debate the merits of specialization versus broad, generalist skill sets.' },
  { title: 'Can money buy happiness?', category: 'Abstract', description: 'Explore the relationship between financial security and genuine life satisfaction.' },
  { title: 'Is competition or collaboration more important for growth?', category: 'Abstract', description: 'Discuss which drives better outcomes in teams, education, and society.' },
  { title: 'Should we prioritize freedom or equality?', category: 'Abstract', description: 'Debate the tension between individual liberty and collective fairness.' },

  // Case Study
  { title: 'A startup must choose between rapid growth and profitability. What should it prioritize?', category: 'Case Study', description: 'Analyze a real startup dilemma between burning cash for growth versus sustainable profit.' },
  { title: 'A company discovers a data breach affecting user data. How should it respond?', category: 'Case Study', description: 'Discuss crisis management, transparency, and legal obligations following a security incident.' },
  { title: 'A manufacturing firm must choose between automation and preserving jobs. What should guide the decision?', category: 'Case Study', description: 'Weigh efficiency gains against workforce and social impact.' },
  { title: 'A city faces a water shortage. What policies should the local government implement?', category: 'Case Study', description: 'Propose and debate practical solutions to a public resource crisis.' },
  { title: 'An e-commerce company faces backlash for using dark patterns. How should it respond?', category: 'Case Study', description: 'Discuss ethical business practices versus short-term conversion optimization.' },

  // Social Issues
  { title: 'Should college education be free for everyone?', category: 'Social Issues', description: 'Debate the economic and social implications of free higher education.' },
  { title: 'Is affirmative action still necessary today?', category: 'Social Issues', description: 'Discuss the ongoing relevance of reservation and affirmative action policies.' },
  { title: 'Should there be a legal limit on how many hours a week someone can work?', category: 'Social Issues', description: 'Explore worker rights, burnout, and productivity in the context of legal work-hour caps.' },
  { title: 'Is social media doing more harm than good for teenagers?', category: 'Social Issues', description: 'Discuss the mental health and developmental impact of social media on young people.' },
  { title: 'Should India implement a uniform civil code?', category: 'Social Issues', description: 'Debate the balance between religious personal laws and a common civil code.' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB for seeding');

    const existingCount = await Topic.countDocuments();
    if (existingCount > 0) {
      console.log(`⚠️  ${existingCount} topics already exist. Skipping seed to avoid duplicates.`);
      console.log('   If you want to re-seed, delete existing topics first.');
      process.exit(0);
    }

    await Topic.insertMany(topics);
    console.log(`✅ Successfully seeded ${topics.length} topics`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();