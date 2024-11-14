import { Empty } from "antd";
import { useAuthContext } from "../../context/AuthContext";
import { COURSE_ITEM_TYPE } from "../../constants/general";
import CourseItem from "../../components/CourseItem";

const MyCourse = () => {
  const { courseInfo } = useAuthContext();
  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      <div className="courses__list">
        {courseInfo?.length === 0 ? (
          <Empty
            description="Chưa có khóa học đã đăng ký"
            style={{ margin: "0 auto" }}
          />
        ) : (
          courseInfo.map((item, index) => {
            return (
              <CourseItem
                key={item.id || new Date.getTime() + index}
                {...item?.course}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyCourse;
