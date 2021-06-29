export default (object) => {
  return (
    <div>
      {object.items.map((e) => (
        <figure className="ais-Hits-item" href={`/product/${e._id}`}>
          <img src={`/api/image/post/${e._id}`} />
          <figcaption>{e.title}</figcaption>
          <span class="price">{e.tags}INR</span>
          <a class="button" href={`/product/${e._id}`}>
            Buy Now
          </a>
        </figure>
      ))}
    </div>
  );
};
