import { Avatar, Button, List, Popover, Typography } from "antd";

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const { Paragraph } = Typography;
export default function IndustryListItem({ item, setEditItem }) {
  const [confirmVisible, setconfirmVisible] = useState(false);

  const deleteCategory = () => {
    alert("comming soon");
    setconfirmVisible(false);
  };
  return (
    <List.Item
      actions={[
        <a key="list-category-edit" onClick={() => setEditItem(item)}>
          edit
        </a>,
        <Popover
          visible={confirmVisible}
          placement="topLeft"
          title="Delete industry? Action cannot be revsersed"
          content={
            <div className="text-right">
              <Button
                type="primary"
                className="mr-2"
                onClick={deleteCategory}
                danger
              >
                OK
              </Button>
              <Button title="Cancel" onClick={(_) => setconfirmVisible(false)}>
                Cancel
              </Button>
            </div>
          }
          trigger="click"
        >
          <a
            key="list-category-delete"
            onClick={(_) => setconfirmVisible(true)}
          >
            delete
          </a>
        </Popover>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={item.images[0]} />}
        title={item.name}
        description={
          <Paragraph ellipsis={{ rows: 1, expandable: true, symbol: "more" }}>
            Đá phong thuỷ có thể hiểu là những loại đá trải qua quá trình tôi
            luyện hàng ngàn năm dưới sự vận động của địa chất, do đó, chúng chứa
            đựng những tinh hoa của đất trời, có khả năng mang đến nhiều năng
            lượng tốt, thay đổi vận mệnh của con người.
          </Paragraph>
        }
      />
    </List.Item>
  );
}
