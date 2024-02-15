const mongoose = require('mongoose');

async function renameOnboarderToOnboarded() {
  await mongoose.connect('your-mongodb-connection-string', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const User = mongoose.model('User');
  const userCollection = mongoose.connection.db.collection('users');

  await userCollection.updateMany(
    {},
    {
      $rename: {
        onboarder: 'onboarded',
      },
    }
  );

  console.log('Field renamed successfully');
  process.exit();
}

renameOnboarderToOnboarded().catch((error) => {
  console.error('Failed to rename field:', error);
  process.exit(1);
});