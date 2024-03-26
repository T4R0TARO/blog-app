import { format } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({ _id, title, summary, cover, createdAt, author }) => {
  // TODO: Update URL to Custom Domain name
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          {/* <img src={"http://localhost:3000/" + cover} alt="" /> */}
          <img
            src={"https://blog-app-client-production.up.railway.app/" + cover}
            alt=""
          />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a href="" className="author">
            {author.username}
          </a>
          <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
