import mongoose from 'mongoose';

const dbUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/expenseAI';

export async function connect() {
  try {
    console.log('Connecting to MongoDB... at ', dbUrl);
    await mongoose.connect(dbUrl);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB: ', error);
  }
}