# API

under development

### Models

Schema: `PostSchema`
Properties:

- author: ObjectID - Reference to the author of the post (linked to the 'User' model).

```js
// api/models/Post.js

const PostSchema = new Schema(
  {
    title: String,
    summary: String,
    content: String,
    cover: String,
    // get `ObjectId` and reference to 'User' model
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);
```

### Controllers

`getAllPost()`
This function is responsible for retrieving all posts
from the database, populating each post with author information,
sorting them by creation date in descending order, and limiting the
number of retrieved posts to 20.

```js
// api/controllers/auth.js

const getAllPost = async (req, res) => {
  res.json(
    await Post.find()
      // only populate author value w/ `username` and leave out sensitive data from the `User.Schema` object
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
};
```

`getSinglePost()`
This function is responsible for retrieving a single post from the database by using the object params id and also inlcude the author value `username` from the `User.Schema` like we did previouslly in the `getAllPost()` function.

```js
const getSinglePost = async (req, res) => {
  const { id } = req.params;
  // only populate author value w/ `username` and leave out sensitive data from the `User.Schema` object
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
};
```

### /Utils

`reformatFileName`
When requesting the file name `req.file` the format for the string is not readable for as an image so we need to reformat the file name to include the ext like '.jpg, .png, etc.'. This function can be used whenever we need to reformat a string that needs to be reformated.

```js
// api/utils/helperFunction.js

/**
 * Helper Function: reformatFileName
 *
 * Description: This helper function is used to reformat the filename of an uploaded * file by appending its file extension to its path and renaming the file accordingly.
 *
 * Parameters:
 * - file: Object- Information about uploaded file.
 *  Properties:
 *      - originalname: String - The original name of the uploaded file
 *      - path: String - The path where the uploaded file is stroed temporarily.
 *
 *  Return Value:
 *      - String: The new path of the file after reformating.
 *  Dependencies:
 *  - fs: The 'fs' module is used to perform file system opertaions, such as renaming *        files
 *
 * Example Usage: const reformatFileName: require("./reformatFileName");
 * const uploadedFile = {
 *  originalname: 'example.jpg',
 *  path: '/uploads/tmp-12345.jpg'
 * };
 * const newPath = reformatFileName(uploadedFile);
 * console.log(newPath); // 'uploads/tmp-12345.jpg'
 */

const fs = require("fs"); // Importing the 'fs' module for file system operations

const reformatFileName = (file) => {
  // Desctructuring properties from the 'file' object
  const { originalname, path } = file;

  // Extrating file extension
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];

  // Generating the new path with the file extension appended
  const newPath = path + "." + ext;

  // Renaming the file with the new path
  fs.renameSync(path, newPath);

  // Returning the new path
  return newPath;
};

module.exports = reformatFileName;
```

### Multers/uploadMiddleware

How can users upload image files when creating a post?

Configure multer to save uploaded files to the 'uploads/' directory using the middleware [Multers](https://www.npmjs.com/package/multer)

```js
// api/routes/auth.js

// Code...(Other Imports)
// For handling file uploads
const multer = require("multer");
// Configure multer to save uploaded files to the 'uploads/' directory
const uploadMiddleware = multer({ dest: "uploads/" });

// Code...(Other routes)
/**
 * Endpoint: PUT /post
 * Description: This end point is used to edit a post, including uploading a file.
 * It exprects a single file with the field name "file" in the request body
 * Middleware:
 * Multer middleware is used to handle file uploads. It save the uploaded file to the 'uploads/' directory with a unique name.
 * Controller Function: editPost
 * The 'editPost' function is responsible for processing the requeest to edit a post
 *     -Example:
 *         function editPost(req, res){
 *            * Access uploaded file using req.file
 *            * Process post edit logic
 *            * Send appropriate response
 *         }
 */
router.put("/post", uploadMiddleware.single("file"), editPost);
```

### Hosting Setup

- When deploying site to Hosting server, be sure to use the proper origin url for the custom domain
- NOTE: You will get CORS errors if you are using the incorrect url for either frontend or backend

Frontend URL when setting up the origin for Backend

```js
// ! DOES NOT WORK
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
//? TESTING
// app.use(cors({ origin: "http://127.0.0.1:5173", credentials: true }));
// app.use(cors());

// * DEPLOY
app.use(
  cors({
    // origin: "https://blog-app-production-82fa.up.railway.app", // ! BACKEND URL
    origin: "https://blog-app-client-production.up.railway.app", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);
```

Backend URL when fetching data from the Frontend

```js
const Home = () => {
  const [posts, setPosts] = useState([]);
  // API: blog-app-production-82fa.up.railway.app
  // TEST URL: http://localhost:3000/api/v1/auth/post
  useEffect(() => {
    fetch(
      "https://blog-app-production-82fa.up.railway.app/api/v1/auth/post"
    ).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}
    </>
  );
};
```
