import { useParams } from "react-router-dom";
import HeaderTop from "./components/HeaderTop";
import HeroSection from "./components/HeroSection";
import ContentDetailSection from "./components/ContentDetailSection";
import FeaturedSection from "./components/FeaturedSection";
import FaqSection from "./components/FaqSection";
import CoursesSection from "./components/CoursesSection";
import useMutation from "../../hook/useMutation";
import { CourseService } from "../../services/CourseService";
import { useEffect, useMemo, useRef } from "react";
import useQuery from "../../hook/useQuery";
import { questionsService } from "../../services/QuestionService";
import useDebounce from "../../hook/useDebounce";
import PageLoading from "../../components/PageLoading";
import { ROLES } from "../../constants/role";
import { formatCurrency, formatDate } from "../../utitls/format";
import { useAuthContext } from "../../context/AuthContext";
import { Button } from "antd";

const CourseDetailPage = () => {
  const { courseInfo } = useAuthContext();
  // Get course detail
  const { courseSlug } = useParams();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [courseSlug]);
  const {
    execute,
    data: courseData,
    loading: courseLoading,
  } = useMutation(CourseService.getCourseBySlug, [courseSlug]);
  useEffect(() => {
    if (courseSlug) {
      execute(courseSlug);
    }
  }, [courseSlug]);

  // Get question
  const { data: questionsData, loading: questionsLoading } = useQuery(
    questionsService.getQuestions
  );
  const questions = questionsData?.questions || [];

  // Get related course
  const { data: coursesData, loading: coursesLoading } = useQuery(
    CourseService.getCourse
  );
  const relatedCourses = coursesData?.courses?.filter((course) => {
    return course?.slug !== courseSlug;
  });
  // Props
  const { teams, price, startDate } = courseData || {};
  // const modifiedProps = {
  //   ...courseData,
  //   teacherInfor: teams?.find((item) => item.tags.includes(ROLES.teacher)),
  //   price: formatCurrency(price || 0),
  //   startDate: formatDate(startDate || 0),
  //   test: console.log("test"),
  // };

  const modifiedProps = useMemo(() => {
    return {
      ...courseData,
      teacherInfor: teams?.find((item) => item.tags.includes(ROLES.teacher)),
      price: formatCurrency(price || 0),
      startDate: formatDate(startDate || 0),
      // test: console.log("test"),
    };
  }, [courseData, teams, price, startDate]);
  // console.log("first1");

  // check course
  const alreadyOrderInfo = courseInfo?.find(
    (item) => item?.course?.slug === courseSlug
  );
  const isAlreadyOrdered = !!alreadyOrderInfo;
  // Ref
  const myRef = useRef(1);
  // console.log("myRef", myRef.current);
  const _scrollToTop = () => {
    myRef?.current?.scrollIntoView({ behavior: "smooth" });
  };
  const inputRef = useRef();
  // console.log("inputRef", inputRef?.current);
  // Loading
  const isLoading = courseLoading || questionsLoading || coursesLoading;
  const debounceLoading = useDebounce(isLoading, 500);
  if (debounceLoading) {
    return <PageLoading />;
  }

  return (
    <>
      <HeaderTop {...modifiedProps} />
      <main className="mainwrapper coursedetailpage" ref={myRef}>
        <HeroSection {...modifiedProps} disabled={isAlreadyOrdered} />
        {/* <input name="myInput" ref={inputRef} />
        <Button
          onClick={() => {
            console.log("inputRef?.current?.name", inputRef?.current?.focus());
          }}
        >
          Click
        </Button> */}
        <ContentDetailSection {...modifiedProps} teams={teams} />
        <FeaturedSection />
        <FaqSection />
        <CoursesSection courses={relatedCourses} />
      </main>
      <Button onClick={_scrollToTop}>Click here</Button>
    </>
  );
};

export default CourseDetailPage;
