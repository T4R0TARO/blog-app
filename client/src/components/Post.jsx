import { format } from "date-fns";

const Post = ({ title, summary, cover, createdAt, author }) => {
  return (
    <div className="post">
      <div className="image">
        <img src={"http://localhost:3000/" + cover} alt="" />
      </div>
      <div className="texts">
        <h2>{title}</h2>
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
