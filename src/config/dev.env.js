
module.exports = {
  username: process.env.NEO4J_USERNAME || 'neo4j',
  password: process.env.NEO4J_PASSWORD || 'qwerty123',
  url: process.env.NEO4J_HOST || 'bolt://localhost'
} 