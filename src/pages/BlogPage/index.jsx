import BlogList from "./components/BlogList";
import BlogMenu from "./components/BlogMenu";

const BlogPage = () => {
  return (
    <main className="mainwrapper blog --ptop">
      <div className="container">
        <div className="textbox">
          <div className="container">
            <h2 className="title --t2">Blog</h2>
          </div>
        </div>
        <BlogMenu />
        <BlogList />

        {/* <ul className="paging">
          <li>
            <a href="#">
              <i>
                <img src="img/iconprev.svg" alt />
              </i>
            </a>
          </li>
          <li>
            <a href="#" className="active">
              1
            </a>
          </li>
          <li>
            <a href="#">2</a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
          <li>
            <a href="#">4</a>
          </li>
          <li>
            <a href="#">
              <i>
                <img src="img/iconprev.svg" alt />
              </i>
            </a>
          </li>
        </ul> */}
      </div>
    </main>
  );
};

export default BlogPage;
