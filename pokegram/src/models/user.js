class User {
  id;

  email;

  // username;

  avatar;

  numPosts;

  likedPosts;

  follows;

  numFollows;

  subscribers;

  numSubs;

  fullname;

  blacklists;

  constructor(
    id,
    email,
    avatar,
    numPost,
    likedPosts,
    follows,
    numFollows,
    subscribers,
    numSubs,
    fullname,
    blacklists
  ) {
    this.id = id;
    this.email = email;
    // this.username = name;
    this.avatar = avatar;
    this.numPosts = numPost;
    this.likedPosts = likedPosts;
    this.follows = follows;
    this.numFollows = numFollows;
    this.subscribers = subscribers;
    this.numSubs = numSubs;
    this.fullname = fullname;
    this.blacklists = blacklists;
  }
}

export default User;
