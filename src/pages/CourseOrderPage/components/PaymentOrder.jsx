import React from "react";

const payments = [
  {
    id: "atm",
    image: "/img/icon-payment-method-atm.svg",
    label: "Thành toán bằng chuyển khoản",
    description: ` Sau khi bấm đăng ký, mã khoá học &amp; thông tin tài khoản ngân hàng
            sẽ được gửi đến email của bạn, bạn vui lòng chuyển khoản với nội
            dung: mã khoá học, họ và tên, số điện thoại, CFD Circle sẽ liên hệ
            bạn để xác nhận và kích hoạt khoá học của bạn sau khi giao dịch
            thành công.`,
  },
  {
    id: "momo",
    image: "/img/icon-payment-method-mo-mo.svg",
    label: "Thanh toán bằng ví Momo",
    description: `Sau khi bấm đăng ký, mã khoá học &amp; thông tin tài khoản MoMo sẽ
            được gửi đến email của bạn, bạn vui lòng chuyển khoản với nội dung:
            mã khoá học, họ và tên, số điện thoại, CFD Circle sẽ liên hệ bạn để
            xác nhận và kích hoạt khoá học của bạn sau khi giao dịch thành công.`,
  },
  {
    id: "cash",
    image: "/img/icon-payment-method-cod.svg",
    label: "Thanh toán bằng tiền mặt",
    description: `Sau khi bấm đăng ký, thông tin khoá học sẽ được gửi đến email của
            bạn, bạn vui lòng đến văn phòng CFD Circle vào ngày khai giảng để
            đóng học phí tại số 11b, Phan Kế Bính, quận 1, TP Hồ Chí Minh.`,
  },
];

const PaymentOrder = ({
  paymetMethod,
  handlePaymentMethodChange,
  disabled,
}) => {
  const _onChange = (e) => {
    handlePaymentMethodChange(e?.target?.value);
  };
  // console.log("paymetMethod", paymetMethod);
  return (
    <div className="itemorder paymentorder">
      <h3 className="title --t3">Hình thức thanh toán</h3>
      <div className="boxorder">
        {payments.map((payment) => {
          const { id, image, label, description } = payment || {};
          return (
            <div className="boxorder__pay" key={id}>
              <label className="radiocontainer">
                <img src={image} alt />
                {label}
                <input
                  type="radio"
                  name="radio"
                  disabled={disabled}
                  value={id}
                  checked={paymetMethod === id}
                  onChange={_onChange}
                />
                <span className="checkmark" />
              </label>
              <div
                className="boxorder__pay-tooltip"
                style={{ display: paymetMethod === id ? "block" : "" }}
              >
                {description}
              </div>
            </div>
          );
        })}

        {/* Khoá học video và video mentor thì không có thanh toán tiền mặt */}
      </div>
    </div>
  );
};

export default PaymentOrder;
