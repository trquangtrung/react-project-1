import { Empty } from "antd";
import React, { useState } from "react";

const Accordion = ({ label = "", data = [], defaultActiveId = -1 }) => {
  const [activeId, setActiveId] = useState(defaultActiveId);

  return (
    <div className="accordion">
      {!!label && <h3 className="accordion__title label">{label}</h3>}
      {data?.length > 0 ? (
        data?.map((item, index) => {
          const { id, title, content } = item || [];
          return (
            <div
              className={`accordion__content ${
                activeId === index ? "active" : ""
              }`}
              key={item.id || index}
            >
              <div
                className="accordion__content-title"
                onClick={() => setActiveId(index === activeId ? -1 : index)}
              >
                <h4>
                  <strong>{title || ""}</strong>
                </h4>
              </div>
              <div className="accordion__content-text">{content || ""}</div>
            </div>
          );
        })
      ) : (
        <Empty description="Không tìm thấy thông tin nào!" />
      )}
    </div>
  );
};

export default Accordion;
