const COURSE_PATH = "/course";
const COURSE_ORDER_PATH = "/course-order";
const BLOG_PATH = "/blog";
const PROFILE_PATH = "/profile";

const PATHS = {
  HOME: "/",
  CONTACT: "/contact",
  ABOUT: "/about",
  PRIVACY: "/privacy",
  PAYMENT_METHOD: "/payment-method",
  CHANGE_PASSWORD: "/change-password",

  COURSE: {
    INDEX: COURSE_PATH,
    DETAIL: COURSE_PATH + "/:courseSlug",
    ORDER: COURSE_ORDER_PATH + "/:courseSlug",
  },
  BLOG: {
    INDEX: BLOG_PATH,
    DETAIL: BLOG_PATH + "/:blogSlug",
  },
  PROFILE: {
    INDEX: PROFILE_PATH,
    MY_COURSE: PROFILE_PATH + "/my-course",
    MY_PAYMENT: PROFILE_PATH + "/my-payment",
  },
};

export default PATHS;
