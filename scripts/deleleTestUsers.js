import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../api/models/user.js'; // Adjust the path as necessary

dotenv.config();

const deleteTestUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Delete test users with emails starting with 'test_' and ending with '@example.com'
    const result = await User.deleteMany({ email: /^test_.*@example\.com$/ }); // Adjusted regex
    console.log(`Deleted ${result.deletedCount} test user(s).`);

  } catch (error) {
    console.error('Error deleting test users:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
  }
};

// Run the script
deleteTestUsers();
