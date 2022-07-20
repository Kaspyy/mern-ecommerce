import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = mongoose.connect(`${process.env.MONGO_URI}`);

    console.log(`MongoDB Connected`);
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
