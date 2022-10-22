# Pokegram

### running `json-server`
cd ..
json-server --watch db.json --port 8000

### running `jest`
npm install -g jest-cli

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
![post](post.png)
### Activities
![activities](activities.jpg)
## How to Run Locally

- Download the project, cd into its directory by using `cd pokegram` and run `npm install` to download dependencies needed (you should have node, npm installed on your local machine).
- We use `json-server` to mock backend, running `json-server` ourside the pokegram.
- We use `jest` for testing, running `json-server` ourside of the pokegram directory.


