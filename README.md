# Final-project

## Overview
This project converts birdsongs into visual graphics for users to explore and engage with.
The Node.js server application serves images, MP3 files, and MongoDB data through RESTful APIs. 

## Inspiration
While walking outside, I heard bird songs that inspired me to create a visualization using only bird sounds. I thought it would be fun to identify different types of bird calls for melody, percussion, and bass. The rhythmic and melodic qualities of bird songs have a soothing effect on the mind that reminds me of Mandela. To capture this, I used a p5 sketch to translate the sounds into circular lines. The aim is to convey the softness and subtlety of bird songs through the nuance of each expanding line. My inspiration for this visual representation also stems from the geometric drawings of therapist Emma Kunz. She used a pendulum to create geometric forms, which aided her patients' healing processes by encouraging meditation.

## Features
The user can use a bottom bar to adjust and filter bird sounds based on pitch, tone, and rhythm. Clicking on a bird's photograph will navigate to another page where the sound is visualized. 

## Process
![Web structure](https://github.com/laurenwong1207/Final-project/assets/128318910/dc52aba1-5326-440d-949f-00ef17e2e173)
When a user enters the scripts.js page, it sends a request to index.js for all image file paths and all music file paths to display all bird images. Upon selecting an option from the dropdown menu, script.js requests all categories and corresponding image names for the selected classification method from index.js. Subsequently, script.js filters the images to be displayed based on the position of the slider. 
When a user clicks on any image, script.js uses window.location.href to navigate to the view.html page, appending the image and sound names. view.js then reads and displays the image and plays the corresponding music.

In new p5(), the setup method sets up audio spectrum analysis with p.fft, and initializes the amplitude object with p.amp. 
The draw method renders music visualization in real-time by adjusting line length and direction based on volume and spectrum data. Symmetric visual effects are created using rotation and scaling.

## API Reference
GET /images: Returns a list of all images stored in the public/photos directory.

GET /sounds: Returns a list of all MP3 files stored in the public/sound directory.

GET /data/:collectionName: Fetches all documents from the specified MongoDB collection.

## Deployment

https://final-dynamic-web-development.replit.app/
