import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import Button from "../../../components/Button";

const HeroSection = (props) => {
  const {
    title,
    name,
    startDate,
    duration,
    tags,
    slug,
    teacherInfor,
    price,
    image,
    disabled,
  } = props || {};
  const { messageApi } = useAuthContext();

  const _onCopyLink = (e) => {
    e?.preventDefault();
    navigator.clipboard.writeText(window.location.href);
    messageApi.success("Copied");
  };
  return (
    <section className="hero herodetail">
      <div className="hero__content">
        <div className="container">
          <h3 className="category label --white">{title}</h3>
          <h2 className="title --white">{name}</h2>
          <div className="infor">
            <div className="infor__item">
              <label className="label --white">Khai giảng</label>
              <p className="title --t3 --white">{startDate}</p>
            </div>
            <div className="infor__item">
              <label className="label --white">Thời lượng</label>
              <p className="title --t3 --white">{duration} buổi</p>
            </div>
            <div className="infor__item">
              <label className="label --white">Hình thức</label>
              <p className="title --t3 --white">{tags.join(" | ")}</p>
            </div>
          </div>
          {/* Chưa đăng ký */}
          <Button
            link={"/course-order" + `/${slug}`}
            disabled={disabled}
            className="btn-regcourse"
          >
            {disabled ? "Đã đăng ký" : "Đăng ký"}
          </Button>
          {/* Đã đăng ký */}
          {/* <div class="btn btn--primary btn-regcourse --disable">Đã đăng ký</div> */}
        </div>
      </div>
      <div className="hero__bottom">
        <div className="container-fluid">
          {teacherInfor && (
            <a href className="user">
              <div className="user__img">
                <img src={teacherInfor?.image} alt="Avatar teacher" />
              </div>
              <p className="user__name --white">{teacherInfor?.name}</p>
            </a>
          )}

          <div className="pricebox">
            <p className="title --t3 --white">{price} VND</p>
          </div>
          {/* <a
            href="https://www.facebook.com/sharer/sharer.php?sdk=joey&u=https://cfdcircle.vn/khoa-hoc/khoa-hoc-lap-trinh-frontend-master-30&display=popup&ref=plugin&src=share_button"
            onclick="return !window.open(this.href, 'Facebook', 'width=640,height=580')"
            className="sharebox s--white"
          >
            Chia sẻ
            <i>
              <img
                src="https://cfdcircle.vn/img/iconshare.svg"
                alt="CFD Circle"
              />
            </i>
          </a> */}
          <a href="#" onClick={_onCopyLink} className="sharebox s--white">
            Chia sẻ
            <i>
              <img
                src="https://cfdcircle.vn/img/iconshare.svg"
                alt="CFD Circle"
              />
            </i>
          </a>
        </div>
      </div>
      <div className="hero__background">
        <img className="hero__background-img" src={image} alt="CFD Circle" />
      </div>
    </section>
  );
};

export default HeroSection;
