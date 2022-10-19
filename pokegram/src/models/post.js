class Posts {
  id;

  username;

  timestamp;

  content_url;

  numLike;

  description;

  commentRefs;

  users;

  constructor(id, user, time, url, likes, desc, comment, tag) {
    this.id = id;
    this.username = user;
    this.timestamp = time;
    this.content_url = url;
    this.numLike = likes;
    this.description = desc;
    this.commentRefs = comment;
    this.users = tag;
  }
}

export default Posts;
