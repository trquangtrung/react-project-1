import React from "react";
import PATHS from "../../constants/paths";
import { Link } from "react-router-dom";
import { ROLES } from "../../constants/role";
import Button from "../Button";
import { formatCurrency, formatDate } from "../../utitls/format";
import { COURSE_ITEM_TYPE } from "../../constants/general";

const CourseItem = ({
  type = COURSE_ITEM_TYPE.normal,
  image,
  name,
  slug,
  teams,
  startDate,
  tags,
  price,
}) => {
  const courseDetail = PATHS.COURSE.INDEX + `/${slug}`;
  const courseOrder = "/course-order" + `/${slug}`;
  const teacherInfor = teams?.find((item) => item.tags.includes(ROLES.teacher));
  //   console.log("teacherInfor", teacherInfor);

  if (type === COURSE_ITEM_TYPE.normal) {
    return (
      <div className="courses__list-item">
        <div className="img">
          <Link to={courseDetail}>
            <img
              src={image || ""}
              alt="Khóa học CFD"
              className="course__thumbnail"
            />
            <span className="course__img-badge badge">{tags.join(" | ")}</span>
          </Link>
        </div>
        <div className="content">
          <p className="label">Front-End</p>
          <h3 className="title --t3">
            <Link to={courseDetail}>{name || ""}</Link>
          </h3>
          <div className="content__info">
            {teacherInfor && (
              <div className="user">
                <div className="user__img">
                  <img src={teacherInfor?.image} alt="Avatar teacher" />
                </div>
                <p className="user__name">{teacherInfor?.name}</p>
              </div>
            )}
            <div className="price">
              <strong>{formatCurrency(price)}đ</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="coursecoming__item">
      <div className="coursecoming__item-img">
        <Link to={courseDetail}>
          <img src={image || ""} alt="Khóa học sắp ra mắt CFD" />
        </Link>
      </div>
      <div className="coursecoming__item-content">
        <p className="category label">Front-end</p>
        <h2 className="title --t2">
          <Link to={courseDetail}>{name || ""}</Link>
        </h2>
        {teacherInfor && (
          <div className="user">
            <div className="user__img">
              <img src={teacherInfor?.image} alt="Avatar teacher" />
            </div>
            <p className="user__name">{teacherInfor?.name || ""}</p>
          </div>
        )}
        <div className="info">
          <div className="labeltext">
            <span className="label --blue">Ngày khai giảng</span>
            <p className="title --t2">{formatDate(startDate)}</p>
          </div>
          {tags.length > 0 && (
            <div className="labeltext">
              <span className="label --blue">Hình thức học</span>
              <p className="title --t2">{tags.join(" | ")}</p>
            </div>
          )}
        </div>
        <div className="btnwrap">
          <Button link={courseOrder}>Đăng Ký Học</Button>
          <Button link={courseDetail} variant="border">
            Xem chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
