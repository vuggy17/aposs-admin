import { Avatar, Button, List, Popover } from "antd";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
        avatar={<Avatar src={item.image} />}
        title={
          <Link to={`${pathname}/${item.name}`} state={{ id: item.id }}>
            {item.name}
          </Link>
        }
        // description="Some fancy description necessitatibus recusandae dignissimos ut itaque explicabo soluta."
      />
    </List.Item>
  );
}
