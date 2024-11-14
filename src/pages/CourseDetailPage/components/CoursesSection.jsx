import { Empty, Skeleton } from "antd";
import React from "react";
import CourseItem from "../../../components/CourseItem";

const CoursesSection = ({ courses, loading = false }) => {
  return (
    <section className="courses">
      <div className="container">
        <div className="heading --center --noline">
          <h2 className="heading__title title --t2">Khoá học đề xuất</h2>
        </div>
        <div className="courses__list">
          {!loading && !courses && (
            <Empty
              description="Không tìm thấy thông tin khóa học nào!"
              style={{ margin: "0 auto" }}
            />
          )}
          {!loading &&
            courses?.map((course) => {
              return <CourseItem key={course.id} {...course} />;
            })}
          {loading &&
            Array(4)
              .fill("")
              .map((_, index) => {
                return (
                  <div className="courses__list-item" key={index}>
                    <Skeleton active />
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
