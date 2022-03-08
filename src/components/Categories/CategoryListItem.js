import { Avatar, Button, List, Popover } from "antd";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export function CategoryListItem({ index, item, setEditItem }) {
  const [confirmVisible, setconfirmVisible] = useState(false);

  const { pathname } = useLocation();
  const deleteCategory = () => {
    // TODO: api call to delete category and update the list
  };
  return (
    <List.Item
      key={index}
      actions={[
        <a key="list-category-edit" onClick={() => setEditItem(item)}>
          edit
        </a>,
        <Popover
          visible={confirmVisible}
          placement="topLeft"
          title="Delete category will make all product in this category become 'Uncategoried'"
          content={
            <div className="text-right">
              <Button type="primary" className="mr-2" onClick={deleteCategory}>
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
        avatar={<Avatar src={item.avatar} />}
        title={<a href={`${pathname}/${item.title}`}>{item.title}</a>}
        description={item.description}
      />
    </List.Item>
  );
}
