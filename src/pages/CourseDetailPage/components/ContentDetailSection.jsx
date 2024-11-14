import React from "react";
import { formatCurrency, formatDate } from "../../../utitls/format";
import Accordion from "../../../components/Accordion";

const ContentDetailSection = (props) => {
  const { description, startDate, schedule, content, teams } = props || {};
  const [day, time] = schedule?.time?.split("từ");
  const modifiedContent = content?.map((item) => {
    return {
      id: item.id || new Date().getTime(),
      title: item.title,
      content: item.description,
    };
  });

  return (
    <section className="contentdetail">
      <div className="content">
        <div className="container">
          <div className="contentrow ctintro">
            <h3 className="contentrow__title title --t3">Giới thiệu</h3>
            <div
              className="contenteditor"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
            {/* <div className="contenteditor">
              <h2
                style={{
                  fontSize: "inherit",
                  margin: "inherit",
                  fontFamily: "inherit",
                  lineHeight: "inherit",
                }}
              >
                Khoá học LẬP TRÌNH FRONT-END MASTER này phù hợp với những bạn
                đang là sinh viên ngành IT hoặc trái ngành muốn trở thành Lập
                Trình Viên Front-end Chuyên Nghiệp để đi làm tại các công ty
                nhưng không thể tự học hoặc tự học nhưng chưa thể ứng dụng và
                hoàn thiện dự án thực tế một cách tốt nhất. Khoá học FRONT-END
                MASTER chính là lựa chọn phù hợp nhất với bạn. Đội ngũ CFD
                Circle sẽ giúp bạn có đầy đủ kiến thức, kinh nghiệm kỷ năng cần
                thiết bằng việc giảng dạy giúp bạn hoàn thành được ít nhất 5-6
                dự án thực tế. Ngoài những kiến thức thì bạn sẽ tích luỹ được
                rất nhiều kinh nghiệm thực tế trong quá trình học và làm dự án
                để dễ dàng ứng tuyển thành công.
              </h2>
              <h3>
                <strong>
                  Khoá học FRONTEND MASTER được chia làm 3 giai đoạn chính:
                </strong>
              </h3>
              <p>
                - <strong>FRONTEND NEWBIE</strong>: <strong>Thời lượng</strong>{" "}
                6 tuần (2 buổi/tuần). <strong>Thời gian học</strong> 18h45 -
                21h45 thứ 3, 7
              </p>
              <p>
                - <strong>WEB RESPONSIVE</strong>:<strong>Thời lượng</strong> 5
                tuần (3 buổi/tuần).
                <strong>Thời gian học</strong> 18h45 - 21h45 thứ 2,4,6
              </p>
              <p>
                - <strong>REACTJS MASTER:</strong> <strong>Thời lượng</strong> 6
                tuần (3 buổi/tuần).
                <strong>Thời gian học</strong> 18h45 - 21h45 thứ 2,4,6
              </p>
              <p>
                <strong>HÌNH THỨC HỌC: </strong>OFFLINE HOẶC ONLINE GOOGLE MEET
                CÙNG VỚI LỚP OFFLINE
              </p>
              <p>
                <strong>SỐ LƯỢNG HỌC VIÊN: </strong>15-20 học viên
              </p>
              <p style={{ color: "#00afab" }}>
                KHOÁ HỌC NÀY ĐANG CÓ ƯU ĐÃI{" "}
                <strong style={{ fontSize: 22 }}>GIẢM GIÁ</strong> TỪ
                <strong style={{ fontSize: 22 }}>15.400.000 VND</strong> CHỈ CÒN{" "}
                <strong style={{ fontSize: 22 }}>14.700.000 VND.</strong>
              </p>
              <p style={{ color: "#00afab" }}>
                <strong style={{ fontSize: 22 }}>GIẢM 200K</strong> CHO MỖI HỌC
                VIÊN HỌC THEO{" "}
                <strong style={{ fontSize: 22 }}>NHÓM 2 NGƯỜI.</strong>
              </p>
              <p style={{ color: "#00afab" }}>
                <strong style={{ fontSize: 22 }}>GIẢM 300K</strong> CHO MỖI HỌC
                VIÊN HỌC THEO{" "}
                <strong style={{ fontSize: 22 }}>NHÓM TỪ 3 NGƯỜI</strong> TRỞ
                LÊN.
              </p>
              <div className="videowrap">
                <iframe
                  title="YouTube video player"
                  src="https://www.youtube.com/embed/C7GoVPoamdM?rel=0"
                  width={560}
                  height={315}
                  frameBorder={0}
                  allowFullScreen="allowfullscreen"
                />
              </div>
            </div> */}
          </div>
          <div className="contentrow ctschedule">
            <h3 className="contentrow__title title --t3">Lịch học</h3>
            <div className="ctschedule__box">
              <div className="info">
                <div className="labeltext">
                  <span className="label --blue">Khai giảng</span>
                  <p className="title --t3">{startDate}</p>
                </div>
                <div className="labeltext">
                  <span className="label --blue">Ngày học</span>
                  <p className="title --t3">{day}</p>
                </div>
                <div className="labeltext">
                  <span className="label --blue">Thời gian</span>
                  <p className="title --t3">{time}</p>
                </div>
                <div className="labeltext">
                  <span className="label --blue">Địa điểm</span>
                  <p className="title --t3">{schedule?.address}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="contentrow ctlession">
            <h3 className="contentrow__title title --t3">Nội dung khoá học</h3>
            {modifiedContent && <Accordion data={modifiedContent} />}
          </div>
          <div className="contentrow ctrequest">
            <h3 className="contentrow__title title --t3">Yêu cầu cần có</h3>
            <div className="ctrequest__content">
              <p>Có laptop cá nhân, cài đặt phần mềm Photoshop, VSCode.</p>
              <p>
                Đã tìm hiểu về lộ trình học frontend và biết cơ bản HTML, CSS là
                một lợi thế
              </p>
              <p>Hạn chế tối đa nghỉ học và hoàn thành bài tập được giao.</p>
              <p>
                Thành viên CFD Circle phải có tinh thần trách nhiệm, chủ động
                cao trong việc học, cũng như tự học và làm thêm tại nhà.
              </p>
            </div>
          </div>
          <div className="contentrow ctteacher">
            <h3 className="contentrow__title title --t3">Giảng viên</h3>
            <div className="ctteacher__content">
              {teams?.map((team, index) => {
                return (
                  <div className="itemteacher" key={team.id || index}>
                    <div className="itemteacher__avatar">
                      <img src={team.image} alt="CFD Circle" />
                    </div>
                    <div className="itemteacher__info">
                      <div className="itemteacher__info-name">
                        <p className="title --t3">{team.name}</p>
                        <span className="label badge --teacher">
                          {team?.tags?.[0]}
                        </span>
                      </div>
                      <h5 className="itemteacher__info-pos label">
                        {team.jobTitle}
                      </h5>
                      <p className="itemteacher__info-des">
                        {team.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentDetailSection;
