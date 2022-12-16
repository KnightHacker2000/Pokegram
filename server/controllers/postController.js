const postSvc = require('../services/postService');
const uploadSvc = require('../services/s3filestorage.js');
const formidable = require('formidable');

const getPostByPostId = async (req, res) => {
  console.log('[Post -- Getting post by post id]');
  try {
    if (req.params.postId === undefined) {
      res.status(404).json({ error: 'post id missing' });
      return;
    }
    const result = await postSvc.getPostById(req.params.postId);
    if (result === undefined || result === null) {
      console.log('[Post -- Getting Post Failed]');
      res.status(404).json({ error: 'bad post id' });
      return;
    }
    console.log('[Post -- Getting Post Success]');
    res.status(200).json({ data: result });
    return;
  } catch (err) {
    console.log('[Post -- Getting Post Failed]');
    res.status(404).json({ error: err.message });
  }
};

const getAllPosts = async (req, res) => {
  console.log('[Post -- Getting all posts]');
  try {
    const result = await postSvc.getAllPosts();
    if (result === undefined || result === null) {
      console.log('[Post -- Getting Post Failed]');
      res.status(404).json({ error: 'getting post Failed' });
      return;
    }
    console.log('[Post -- Getting Post Success]');
    res.status(200).json({ data: result });
    return;
  } catch (err) {
    console.log('[Post -- Getting Post Failed]');
    res.status(404).json({ error: err.message });
  }
};

const getPostByUsername = async (req, res) => {
  console.log('[Post -- Getting post by username]');
  try {
    if (req.params.username === undefined) {
      res.status(404).json({ error: 'username missing' });
      return;
    }
    const result = await postSvc.getPostByUsername(req.params.username);
    if (result === undefined || result === null) {
      console.log('[Post -- Getting Post Failed]');
      res.status(404).json({ error: 'user has no posts' });
      return;
    }
    console.log('[Post -- Getting Post Success]');
    res.status(200).json({ data: result });
    return;
  } catch (err) {
    console.log('[Post -- Getting Post Failed]');
    res.status(404).json({ error: err.message });
  }
};

const createNewPost = async (req, res) => {
  console.log('[Post -- Creating new post]');
  // console.log(req.body);
  if (
    !req.body.username
    || !req.body.timestamp
    || !req.body.type
  ) {
    console.log('[Post -- Creating new post Failed: invalid body -- missing fields]');
    res.status(404).json({ error: 'missing required post field!' });
    return;
  }
  const legalPostType = ['video', 'photo'];
  if (!legalPostType.includes(req.body.type)) {
    console.log('[Post -- Creating new post Failed: invalid body --invalid post type]');
    res.status(400).json({ error: `${req.body.type} is NOT a valid post type!` });
    return;
  }
  const newPost = {
    username: req.body.username,
    timestamp: req.body.timestamp,
    type: req.body.type,
    content_url: req.body.content_url,
    numLike: req.body.numLike,
    description: req.body.description,
    commentRefs: req.body.commentRefs,
    users: req.body.users,
    hide: req.body.hide
  };
  try {
    const result = await postSvc.createPost(newPost);
    console.log('[Post -- Creating new post Success]');
    console.log(`id: ${JSON.stringify(result)}`);
    res.status(201).json({
      post: { id: result, ...newPost },
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
    console.log('[Post -- Creating new post Failed]');
  }
};

const backendUploads3 = async (req, res) => {
  console.log('upload a file');
  const form = new formidable.IncomingForm();
  // configure upload folder
  // const uploadFolder = path.join(__dirname, 'files');
  form.multiples = true;
  form.maxFileSize = 20 * 1024 * 1024; // 2MB
  // form.uploadDir = uploadFolder;
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(404).json({ error: err.message });
      return;
    }

    // we add each file to the DB
    Object.keys(files).forEach(async (key) => {
      const value = files[key];
      try {
        console.log('entered!');
        console.log(value);
        const filename = value.originalFilename;
        const path = value.filepath;
        console.log(filename);
        console.log(path);
        uploadSvc.uploadFile(filename, path);
      } catch (error) {
        console.log(error.message);
      }
    });

    res.status(201).json({ message: 'files uploaded' });
  });
};

const updatePostById = async (req, res) => {
  console.log('[Post -- Updating Post]');
  try {
    const result = await postSvc.updatePostById(req.params.postId, req.body);
    console.log('[Post -- Updating Post Success]');
    console.log(result);
    res.status(201).json({
      Post: result,
    });
    return;
  } catch (err) {
    console.log('[Post -- Updating Post Failed]');
    res.status(404).json({ error: err.message });
  }
};

const deletePostById = async (req, res) => {
  console.log('[Post -- Deleting Post]');
  try {
    await postSvc.deletePostById(req.params.postId);
    console.log('[Post -- Deleting Post Success]');
    res.status(200).json({
      message: 'delete success!',
    });
    return;
  } catch (err) {
    console.log('[Post -- Deleting Post Failed]');
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  getPostByPostId,
  getPostByUsername,
  getAllPosts,
  createNewPost,
  updatePostById,
  deletePostById,
  backendUploads3,
};
