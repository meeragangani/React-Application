import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './src/routes/user';
import productRoutes from './src/routes/product';
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection using mongoose


// MongoDB connection using mongodb client
const uri = "mongodb+srv://meeragangani12:Meera123@cluster1.zz2fqdb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

mongoose.connect(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
