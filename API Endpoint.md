# Endpoints Overview
# List All Images
    Description: Retrieves a list of all image filenames in the "public/photos" directory.
    URL: /images
    Method: GET
    Query Parameters: None
    Request Body: None
    Success Response:
    Code: 200 OK
    Content Example:
    [
        "image1.jpg",
        "image2.png",
        "image3.gif"
    ]
# List All MP3 Files
    Description: Retrieves a list of all MP3 filenames in the "public/sound" directory.
    URL: /sounds
    Method: GET
    Query Parameters: None
    Request Body: None
    Success Response:
    Code: 200 OK
    Content Example:
    [
        "sound1.mp3",
        "sound2.mp3"
    ]
# Fetch Data from a Specific Collection
    Description: Retrieves all documents from a specified collection in the MongoDB database.
    URL: /data/:collectionName
    Method: GET
    Query Parameters: None
    URL Parameters:
    collectionName: The name of the MongoDB collection from which to fetch documents.
    Request Body: None
    Success Response:
    Code: 200 OK
    Content Example:
    [
        {"_id": "5f2b3c2d9d1a2e456d83f790", "name": "Ruby-throated Hummingbird", "images": ["img1.jpg", "img2.jpg"]},
        {"_id": "5f2b3c2d9d1a2e456d83f791", "name": "American Goldfinch", "images": ["img3.jpg", "img4.jpg"]}
    ]
    Error Response:
    Code: 400 Bad Request
    Content: "Collection name is required" (if the collectionName is not provided)
# Server Start Listening
    Description: Logs a message indicating that the server is running and listening for requests.
    Implementation: Not an API endpoint but part of server setup.
    Logs: "Server running on http://localhost:3000"