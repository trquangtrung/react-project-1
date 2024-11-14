import React from "react";

const BlogItem = () => {
  return (
    <div className="blog__list-item">
      <div className="img">
        <a href="blog-detail.html">
          <img
            src="https://cfdcircle.vn/files/thumbnails/JuQE6Rd3DGuiHJOpgEb3Jg1KoLoa25OlLrl1pDQa.jpg"
            alt="Khóa học CFD"
            className="course__thumbnail"
          />
        </a>
      </div>
      <div className="content">
        <p className="label">Tài nguyên</p>
        <h2 className="title --t3">
          <a href="blog-detail.html">
            Top 5 bản thiết kế landing page figma miễn phí dành cho front-end
            dev và designer
          </a>
        </h2>
        <div className="content__info">
          <div className="user">
            <div className="user__img">
              <img src="img/avatar_nghia.jpg" alt="Avatar teacher" />
            </div>
            <p className="user__name">Trần Nghĩa</p>
          </div>
          <div className="date">10/12/2022</div>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
