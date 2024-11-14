import React, { useEffect, useState } from "react";
import { CourseService } from "../../services/CourseService";
import HeroSection from "./HeroSection";
import CoursecomingSection from "./CoursecomingSection";
import CourseSection from "./CourseSection";
import FeaturedSection from "./FeaturedSection";
import TeacherSection from "./TeacherSection";
import TestimonialSection from "./TestimonialSection";
import FaqSection from "./FaqSection";
import GallerySection from "./GallerySection";
import CallregisterSection from "./CallregisterSection";
import useQuery from "../../hook/useQuery";
import { teamService } from "../../services/TeamService";
import { questionsService } from "../../services/QuestionService";
import PageLoading from "../../components/PageLoading";
import useDebounce from "../../hook/useDebounce";
const HomePage = () => {
  // courses
  const { data: coursesData, loading: coursesLoading } = useQuery(
    CourseService.getCourse
  );
  const courses = coursesData?.courses || [];
  const courseComing = courses.filter((course) => {
    return course?.startDate && new Date(course?.startDate) < new Date();
  });

  // teams
  const { data: teamsData, loading: teamsLoading } = useQuery(
    teamService.getTeams
  );
  const teams = teamsData?.teams || [];

  // Questions
  const { data: questionsData, loading: questionsLoading } = useQuery(
    questionsService.getQuestions
  );
  const questions = questionsData?.questions || [];
  // console.log("questions", questions);

  const isLoading = coursesLoading || teamsLoading || questionsLoading;
  // console.log("isLoading", isLoading);
  const debounceLoading = useDebounce(isLoading, 1000);
  // console.log("debounceLoading", debounceLoading);
  if (debounceLoading) {
    return <PageLoading />;
  }
  return (
    <main className="mainwrapper">
      <HeroSection />
      <CoursecomingSection courses={courseComing} loading={coursesLoading} />
      <CourseSection courses={courses} loading={coursesLoading} />
      <TeacherSection teachers={teams} loading={teamsLoading} />
      <FeaturedSection />

      {/* --------------------------------Testimonial-------------------------------- */}
      <TestimonialSection />

      {/* --------------------------------faq-------------------------------- */}
      <FaqSection questions={questions} loading={questionsLoading} />
      <GallerySection />
      <CallregisterSection />
    </main>
  );
};

export default HomePage;
