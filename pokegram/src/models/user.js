class User {
  id;

  email;

  username;

  avatar;

  numPosts;

  likedPosts;

  follows;

  numFollows;

  subscribers;

  numSubs;

  fullname;

  constructor(
    id,
    email,
    name,
    avatar,
    numPost,
    likedPosts,
    follows,
    numFollows,
    subscribers,
    numSubs,
    fullname
  ) {
    this.id = id;
    this.email = email;
    this.username = name;
    this.avatar = avatar;
    this.numPosts = numPost;
    this.likedPosts = likedPosts;
    this.follows = follows;
    this.numFollows = numFollows;
    this.subscribers = subscribers;
    this.numSubs = numSubs;
    this.fullname = fullname;
  }
}

export default User;
