import React, { useEffect } from "react";
import CourseItem from "../../components/CourseItem";
import { Empty } from "antd";
import { COURSE_ITEM_TYPE } from "../../constants/general";
const CoursecomingSection = ({ courses = [], loading = false }) => {
  useEffect(() => {
    function courseComingList() {
      let courseComingSlider = $("#coursecoming__slider");
      courseComingSlider.flickity({
        cellAlign: "left",
        contain: true,
        prevNextButtons: false,
        pageDots: false,
        dragThreshold: 0,
        wrapAround: true,
      });

      $(".coursecoming .control .control__next").on("click", function (e) {
        e.preventDefault();
        courseComingSlider.flickity("next");
      });
      $(".coursecoming .control .control__prev").on("click", function (e) {
        e.preventDefault();
        courseComingSlider.flickity("previous");
      });
    }
    if (courses?.length > 0) {
      courseComingList();
    }
  }, [courses]);

  return (
    <section className="coursecoming --scpadding">
      <div className="container">
        <div className="heading">
          <h2 className="heading__title title --t2">
            Khoá học <span className="color--primary">sắp khai giảng</span>
          </h2>
          <div className="control">
            <div className="control__prev">
              <img src="/img/icon-btn-control.svg" alt="icon prev" />
            </div>
            <div className="control__next">
              <img src="/img/icon-btn-control.svg" alt="icon next" />
            </div>
          </div>
        </div>
      </div>
      {!loading && courses?.length === 0 ? (
        <Empty description="Không tìm thấy khóa học nào!" />
      ) : (
        <div className="coursecoming__list" id="coursecoming__slider">
          {courses?.map((course, index) => {
            return (
              <CourseItem
                key={course.id || index}
                {...course}
                type={COURSE_ITEM_TYPE.comming}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default CoursecomingSection;
