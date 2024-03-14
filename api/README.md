# API

under development

## Controllers

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
