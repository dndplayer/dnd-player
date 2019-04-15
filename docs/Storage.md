# Storage

Design and implementation details around use of storage in this application.

Initially the most crucial data that we need to store is images to display on the map.
Firebase Storage should simplify this for us by keeping things available and synchronised
for everyone.

## Requirements

- File uploader
  - Support single image file uploads to start with
- Ability to add uploaded images to the current map view
  - Right click on Map ?

## Questions

- [QUESTION] If we just point at <CloudURL> as a net resource, I doubt it will just load, I suspect we need to properly load files over the firebase API.
  - Briefly looking at it, you supply a path in the bucket when you upload, you can then get a download URL from that path, so the question is whether we just use the bucket ref and then get the downloadURLs at runtime OR immediately get the downloadURL after upload and then reference that in Maps etc. 
    - Runtime download url retrieval I suspect could be more "valid" as an approach but I'm not certain.
  - This all needs some more investigation to see what is actually returned after uploading and what the getDownloadURL method actually returns