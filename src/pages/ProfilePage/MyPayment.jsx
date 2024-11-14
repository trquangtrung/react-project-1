import { Empty } from "antd";
import { useAuthContext } from "../../context/AuthContext";
import { formatCurrency, formatDate } from "../../utitls/format";

const MyPayment = () => {
  const { paymentInfo } = useAuthContext();
  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      {paymentInfo?.length === 0 ? (
        <Empty description="Chưa có thông tin lịch sử thanh toán nào!" />
      ) : (
        paymentInfo?.map((item) => {
          const { id, course, createdAt, paymentMethod } = item || {};
          return (
            <div className="itemhistory" key={id}>
              <div className="name">{course?.name}</div>
              <div className="payment">
                {["atm", "momo"].includes(paymentMethod)
                  ? "Chuyển khoản"
                  : "Tiền mặt"}
              </div>
              <div className="date">{formatDate(createdAt)}</div>
              <div className="money">{formatCurrency(course?.price)} VND</div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyPayment;
