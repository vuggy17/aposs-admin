import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, List } from "antd";
import { AddCategoryModal } from "components/categories/AddCategoryModal";
import { CategoryListItem } from "components/categories/CategoryListItem";
import { EditCategoryModal } from "components/categories/EditCategoryModal";
import React, { useEffect, useState } from "react";
import useDebounce from "util/hooks/useDebouce";
import Breadcrumb from "../shared/Breadcrumb";

export default function Industries() {
  const [createVisible, setcreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const [editingCategory, setEditingCategory] = useState();

  const onSearch = (e) => {
    const searchTerm = e.target.value;
    // TODO: api call and filter items
    console.log("searching", searchTerm);
  };
  useEffect(() => {
    if (editingCategory) {
      setEditVisible(true);
    }
  }, [editingCategory]);

  return (
    <>
      <div className="bg-white p-9 pl-6 pt-4">
        <Breadcrumb />
        <div className="pt-4">
          <h2>Industry</h2>
        </div>
      </div>

      <div className=" mt-6 m-auto w-1/2">
        <Input.Search
          onChange={useDebounce(onSearch)}
          placeholder="Industry name"
          enterButton="Search"
          size="large"
        ></Input.Search>
      </div>

      <div className="bg-white p-9 pl-6 pt-4 mt-4 m-auto w-1/2">
        <List
          itemLayout="horizontal"
          footer={
            <CategoryListFooter handlePress={(_) => setcreateVisible(true)} />
          }
          dataSource={[
            ...Array(6).fill({
              avatar: "https://joeschmoe.io/api/v1/random",
              title: "Interial" + Math.round(Math.random() * 29),
              description:
                "Ant Design, a design language for background applications, is refined by Ant UED Team",
              id: Math.random(),
            }),
          ]}
          // TODO: change key to id
          renderItem={(item, index) => (
            <CategoryListItem
              key={index}
              item={item}
              setEditItem={setEditingCategory}
            />
          )}
        />
      </div>

      <AddCategoryModal
        key={Math.random()} // random key to  refresh modal
        visible={createVisible}
        handleClose={() => setcreateVisible(false)}
      />

      <EditCategoryModal
        key={Math.random()} // random key to  refresh modal
        visible={editVisible}
        handleClose={() => setEditVisible(false)}
        initialValues={editingCategory}
      />
    </>
  );
}

function CategoryListFooter({ handlePress }) {
  return (
    <Button type="dashed" className="w-full" onClick={handlePress}>
      <PlusOutlined />
      add to list
    </Button>
  );
}
