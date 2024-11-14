import InfoOrder from "./components/InfoOrder";
import FormOrder from "./components/FormOrder";
import PaymentOrder from "./components/PaymentOrder";
import { useNavigate, useParams } from "react-router-dom";
import { CourseService } from "../../services/CourseService";
import useMutation from "../../hook/useMutation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ROLES } from "../../constants/role";
import { formatCurrency } from "../../utitls/format";
import { useAuthContext } from "../../context/AuthContext";
import { REGEX } from "../../constants/regex";
import { OrderService } from "../../services/OrderService";
import PATHS from "../../constants/paths";
import Button from "../../components/Button";
const CourseOrderPage = () => {
  const { courseSlug } = useParams();
  // console.log("courseSlug", courseSlug);

  // Get data
  const { execute: executeOrder, loading: orderLoading } = useMutation(
    OrderService.orderCourse
  );
  const { data: courseOrderData, execute: executeCourseOrder } = useMutation(
    CourseService.getCourseBySlug
  );

  useEffect(() => {
    if (courseSlug) {
      executeCourseOrder(courseSlug);
    }
  }, [courseSlug]);
  // console.log("courseOrderData", courseOrderData);
  // Modified
  const { teams, price, tags } = courseOrderData || {};
  const InfoOrderProps = {
    ...courseOrderData,
    teacherInfo: teams?.find((item) => item?.tags?.includes(ROLES.teacher)),
    price: formatCurrency(price || 0),
  };
  const {
    messageApi,
    handleGetProfileCourse,
    handleGetProfilePayment,
    courseInfo,
  } = useAuthContext();
  // Form Order
  const formOrderRef = useRef(null);
  // Payment
  const navigate = useNavigate();
  const [paymetMethod, setPaymetMethod] = useState("");
  const _handlePaymentMethodChange = (payment) => {
    setPaymetMethod(payment);
  };

  const _onOrder = useCallback(() => {
    const profileData = formOrderRef?.current?.onSubmit();
    // console.log("profileData", profileData);
    if (!profileData) {
      console.log(
        "formOrderRef?.current?.error",
        formOrderRef?.current?.getError()
      );
      return;
    }
    const paymentData = paymetMethod;
    //
    if (paymentData) {
      const payload = {
        name: profileData.name,
        phone: profileData.phone,
        course: courseOrderData?.id,
        type: profileData.type,
        paymentMethod: paymentData,
      };
      // console.log("payload", payload);
      executeOrder(payload, {
        onSuccess: async () => {
          messageApi.success("Đăng ký khóa học thành công!");
          await handleGetProfileCourse();
          await handleGetProfilePayment();
          navigate(PATHS.PROFILE.MY_COURSE);
        },
        onFail: () => {
          messageApi.error("Đăng ký khóa học thất bại!");
        },
      });
    }
  }, [formOrderRef, paymentData]);

  // Detect Already Ordered
  const alreadyOrderInfo = courseInfo?.find(
    (item) => item?.course?.slug === courseSlug
  );
  const isAlreadyOrdered = !!alreadyOrderInfo;

  useEffect(() => {
    if (alreadyOrderInfo?.id) {
      formOrderRef?.current?.setForm((prev) => {
        return {
          ...prev,
          name: alreadyOrderInfo?.name || "",
          phone: alreadyOrderInfo?.phone || "",
          email: alreadyOrderInfo?.customer?.email || "",
          type: alreadyOrderInfo?.type?.toLowerCase() || "",
        };
      });
      setPaymetMethod(alreadyOrderInfo?.paymentMethod);
    }
  }, [alreadyOrderInfo?.id]);

  return (
    <main className="mainwrapper --ptop">
      <section className="sccourseorder">
        <div className="container small">
          <InfoOrder {...InfoOrderProps} />
          <FormOrder
            tags={tags}
            disabled={isAlreadyOrdered}
            ref={formOrderRef}
          />
          <PaymentOrder
            paymetMethod={paymetMethod}
            handlePaymentMethodChange={_handlePaymentMethodChange}
            disabled={isAlreadyOrdered}
          />

          {/* addclass --processing khi bấm đăng ký */}
          <Button
            loading={orderLoading}
            onClick={_onOrder}
            disabled={isAlreadyOrdered}
            style={{ width: "100%" }}
          >
            <span>{isAlreadyOrdered ? "Đã đăng ký" : "Đăng ký khoá học"}</span>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default CourseOrderPage;
