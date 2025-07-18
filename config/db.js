import mongoose from "mongoose";

export const configureDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB Atlas Successfully");
  } catch (err) {
    console.log("Error to connect with the database", err);
  }
};

// chatterjeebiswarup61
// VQ26uXKc6xhb5pGf

// mongodb+srv://chatterjeebiswarup61:<db_password>@cluster0.rlevjry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0