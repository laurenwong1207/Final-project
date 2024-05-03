# Final-project

## Overview
This project converts birdsongs into visual graphics for users to explore and engage with.
The Node.js server application serves images, MP3 files, and MongoDB data through RESTful APIs. 

## Inspiration
While walking outside, I heard bird songs that inspired me to create a visualization using only bird sounds. I thought it would be fun to identify different types of bird calls for melody, percussion, and bass. The rhythmic and melodic qualities of bird songs have a soothing effect on the mind that reminds me of Mandela. To capture this, I used a p5 sketch to translate the sounds into circular lines. The aim is to convey the softness and subtlety of bird songs through the nuance of each expanding line. My inspiration for this visual representation also stems from the geometric drawings of therapist Emma Kunz. She used a pendulum to create geometric forms, which aided her patients' healing processes by encouraging meditation.

## Features
The user can use a bottom bar to adjust and filter bird sounds based on pitch, tone, and rhythm. Clicking on a bird's photograph will navigate to another page where the sound is visualized. 

## API Reference
GET /images: Returns a list of all images stored in the public/photos directory.

GET /sounds: Returns a list of all MP3 files stored in the public/sound directory.

GET /data/:collectionName: Fetches all documents from the specified MongoDB collection.

## Deployment

https://final-dynamic-web-development.replit.app/
