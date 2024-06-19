
import User from'./models/userModel.mjs'; 
import bcryptjs from "bcryptjs";
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config(); // Load environment variables
const seedData = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connected successfully");
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error' + err);
            process.exit();
       })
   
    // Clear existing data (optional, comment out if not desired)
    await User.deleteMany({});

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash('password', salt)

    // Define your user seed data
    const users = [
      { username: 'John', email: 'admin@example.com', password: hashedPassword, isAdmin: true },
      { username: 'Jane', email: 'jane@example.com', password: hashedPassword },
      // Add more user objects
    ];

    // Insert the seed data into the user collection
    await User.insertMany(users);

    console.log('Users seeded successfully');

    process.exit(); // Exit the script after seeding
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1); // Exit with an error code
  }
};

seedData();