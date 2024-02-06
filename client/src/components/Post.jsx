const Post = () => {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://hololive.hololivepro.com/wp-content/uploads/2024/01/000top.jpg"
          alt="game characters promotional art"
        />
      </div>
      <div className="texts">
        <h2>
          “Gurarium in Sendai Umino-Mori Aquarium” Collaboration with hololive
          English VTuber Gawr Gura Until February 29th!{" "}
        </h2>
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
