# Pokegram
## Description
Pokegram is a responsive website for people to share pictures and videos. Users can create an account and sign in to create their own posts, as well as leave comments or thumb up on posts. 
## Main Features
- Users may create an account, sign in or sign out with validation check.
- Once logged in, users may create their own posts with picture or video.
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
### like & unliking posts
![like](like.png)
Users can like or unlike one or more posts by clicking like (love shaped) button in each post at home page. 
When user like a post, The button will change from grey to red.
When user unlike a post, The button will change from red to grey.
### Comment on posts
![comments](comments.jpg)
Users can make, edit and delete comments on posts, after making/ editing comments, type enter to go back.
### Editing/Deleting posts and comments
![editPost](editPost.jpg)
User can edit posts by clicking the second button from left on the bottom of post.
User can delete posts by clicking the rightmost button on the bottom of post.
User can edit or delete comments by clicking the button in the middle on the bottom of post.
### Follower suggestions
![followersuggestions](followersuggestions.jpg)
Users can see their follower suggestions by clicking follows, the follower suggestions is on the top.
### Tagging photos and  @mentions in comments
![taggingphotos](taggingphotos.jpg)
![mentionincomments](mentionincomments.jpg)
Users can tag people on photos, and tagged people can be reviewed on the rightmost button on the bottom of post on home page.
Users can also mention people on the comment by starting typing @.







## How to Run Locally
- Download the project
- We use `json-server` to mock backend, running `json-server` outside the pokegram (the current directory) with command `json-server --watch db.json --port 8000`
- cd into pokegram directory by using `cd pokegram` and run `npm install` to download dependencies needed (you should have node, npm installed on your local machine). And then run `npm start` to start the frontend view
- We use `jest` for testing and please run `jest --coverage` inside the pokegram folder to see the test result (we also attach the screenshot of our coverage in wiki page).

### running `json-server`
cd ..
json-server --watch db.json --port 8000

### running `jest` (if jest not found)
npm install -g jest-cli


