module.exports = {
  migrationsDir: 'migrations',
  mongodb: {
    url: 'your-mongodb-connection-string',
    databaseName: 'your-database-name',
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
  },
};