import React from "react";
import useQuery from "../../hook/useQuery";
import { CourseService } from "../../services/CourseService";
import useDebounce from "../../hook/useDebounce";
import PageLoading from "../../components/PageLoading";
import CourseItem from "../../components/CourseItem";
import { Empty, Skeleton } from "antd";

const CoursePage = () => {
  const { data: coursesData, loading: coursesLoading } = useQuery(
    CourseService.getCourse
  );
  const debounceLoading = useDebounce(coursesLoading, 1000);

  return (
    <main className="mainwrapper courses --ptop">
      <div className="container">
        <div className="textbox">
          <div className="container">
            <h2 className="title --t2">Tất cả khoá học</h2>
          </div>
        </div>
        <div className="courses__list">
          {!debounceLoading && !coursesData?.courses && (
            <Empty
              description="Không tìm thấy thông tin khóa học nào!"
              style={{ margin: "0 auto" }}
            />
          )}
          {!debounceLoading &&
            coursesData?.courses?.map((course) => {
              return <CourseItem key={course.id} {...course} />;
            })}
          {debounceLoading &&
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
    </main>
  );
};

export default CoursePage;
