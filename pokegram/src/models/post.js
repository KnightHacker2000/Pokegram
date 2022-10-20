class Posts {
  id;

  username;

  timestamp;

  type;

  content_url;

  numLike;

  description;

  commentRefs;

  users;

  constructor(id, user, time, type, url, likes, desc, comment, tag) {
    this.id = id;
    this.username = user;
    this.timestamp = time;
    this.type = type;
    this.content_url = url;
    this.numLike = likes;
    this.description = desc;
    this.commentRefs = comment;
    this.users = tag;
  }
}

export default Posts;
