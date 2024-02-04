const Post = () => {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://cdn.animenewsnetwork.com/thumbnails/max600x600/cms/feature/154665/fgo1.jpg"
          alt="game characters promotional art"
        />
      </div>
      <div className="texts">
        <h2>Who Writes Fate/Grand Order? </h2>
        <p className="info">
          <a href="" className="author">
            Gawr Gura
          </a>
          <time>2024-01-06 4:50pm</time>
        </p>
        <p className="summary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
          consequatur. Distinctio necessitatibus debitis cumque accusantium,
          officiis illum accusamus iste, ut atque architecto cupiditate enim. At
          commodi odit consequuntur dolorem ab. Qui, temporibus magni!
        </p>
      </div>
    </div>
  );
};

export default Post;
