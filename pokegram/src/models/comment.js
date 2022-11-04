class Comments {
  id;

  postid;

  timestamp;

  content;

  referredUser;

  commentorid;

  constructor(id, postid, timestamp, content, referredUser, commentorid) {
    this.id = id;
    this.postid = postid;
    this.timestamp = timestamp;
    this.content = content;
    this.referredUser = referredUser;
    this.commentorid = commentorid;
  }
}

export default Comments;
