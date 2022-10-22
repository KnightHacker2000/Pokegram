# Pokegram
## Description
Pokegram is a responsive website for people to share pictures and videos. Users can create an account and sign in to create their own posts, as well as leave comments or thumb up on posts. 
## Main Features
- Users may create an account, sign in or sign out with validiction check.
- Once logged in, users may create their own posts with picture or video and update or delete them later on.
- Users may leave comments or thumb up and delete their own operations.
- Users may see the activities.
### Login
![Login](Login.png)
### SignUp
![SignUp](SignUp.png)
### Posts
This is the homepage and there is a menu bar on top, click `Pokegram` to return to home page, click upload to create a new post, click logout to return to login page, click activity to view activity feed, click avatar at the upper-right corner to view my profile page, click avatar of each post to view others' profile page.
![post](post.png)
### Activities
![activities](activities.jpg)
### Upload
![upload](upload.jpg)
We allow click to choose between video and image, you can test by using image and video sources stored in ./pokegram/src/images and ./pokegram/src/videos
## How to Run Locally
- Download the project
- We use `json-server` to mock backend, running `json-server` outside the pokegram (the current directory) with command `json-server --watch db.json --port 8000`
- cd into pokegram directory by using `cd pokegram` and run `npm install` to download dependencies needed (you should have node, npm installed on your local machine). And then run `npm start` to start the frontend view
- We use `jest` for testing and please run `jest --coverage` outside the pokegram folder to see the test result (we also attach the screenshot of our coverage in wiki page).

### running `json-server`
cd ..
json-server --watch db.json --port 8000

### running `jest` (if jest not found)
npm install -g jest-cli


