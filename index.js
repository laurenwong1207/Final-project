const express = require('express');  // Import the express library for building web applications
const fs = require('fs');  // File system module for reading and writing files
const chokidar = require('chokidar');  // Module for watching file changes in the filesystem
const path = require('path');  // Module providing utilities for working with file and directory paths
const { MongoClient, ServerApiVersion } = require('mongodb');  // MongoDB client and API version specification
const { ObjectId } = require('mongodb');  // MongoDB ObjectId constructor for creating and manipulating object IDs
const app = express();  // Create an Express application
const PORT = 3000;  // Define the port number on which the server will listen
const photosDir = path.join(__dirname, 'public/photos');  // Path to the photos directory
const soundsDir = path.join(__dirname, 'public/sound');  // Path to the sounds directory

// Middleware to serve static files
app.use(express.static('public'));  // Serve static files located in the 'public' directory

const uri = "mongodb+srv://<username>:<password>@<cluster-address>/?retryWrites=true&w=majority&appName=Cluster0"; // MongoDB connection URI

// Create a MongoClient with options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Endpoint to get list of images
app.get('/images', (req, res) => {
    fs.readdir(photosDir, (err, files) => {
        if (err) {
            res.status(500).send('Error reading the directory');
            return;
        }
        const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        res.json(images);
    });
});

// Fetch all documents from a specified collection
app.get('/data/:collectionName', async (req, res) => {
    try {
        const { collectionName } = req.params;
        if (!collectionName) {
            return res.status(400).send('Collection name is required');
        }
        
        const collection = client.db("birdSound").collection(collectionName);
        const documents = await collection.find({}).toArray();
        res.json(documents);
    } catch (error) {
        console.error(`Failed to fetch data from collection ${req.params.collectionName}:`, error);
        res.status(500).send('Error fetching data');
    }
});

// Endpoint to get list of MP3 files
app.get('/sounds', (req, res) => {
    fs.readdir(soundsDir, (err, files) => {
        if (err) {
            res.status(500).send('Error reading the sounds directory');
            return;
        }
        const mp3Files = files.filter(file => /\.mp3$/i.test(file));
        res.json(mp3Files);
    });
});

// Use chokidar to watch for changes in the photos directory
chokidar.watch(photosDir).on('all', (event, path) => {
    console.log(event, path); // Log all events and paths
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
