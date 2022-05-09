import { Avatar, Button, List, Popover } from "antd";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function IndustryListItem({ item, setEditItem }) {
  const [confirmVisible, setconfirmVisible] = useState(false);

  const deleteCategory = () => {
    alert("comming soon");
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
        description="Some fancy description necessitatibus recusandae dignissimos ut itaque explicabo soluta."
      />
    </List.Item>
  );
}
