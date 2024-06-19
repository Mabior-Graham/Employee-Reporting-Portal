import mongoose from 'mongoose';
import Department from './models/departmentModel.mjs'; // Replace with your model path
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
    await Department.deleteMany({});


    // Define your user seed data
    const departments = [
      { name: 'Sale' },
      { name: 'Marketing'},
      // Add more Department objects
    ];

    // Insert the seed data into the user collection
    await Department.insertMany(departments);

    console.log('Department seeded successfully');

    process.exit(); // Exit the script after seeding
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1); // Exit with an error code
  }
};

seedData();