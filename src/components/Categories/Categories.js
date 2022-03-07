import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, List } from "antd";
import React, { useEffect, useState } from "react";
import { CATEGORY_MANAGEMENT } from "routes/route.config";
import useDebounce from "util/hooks/useDebouce";
import Breadcrumb from "../shared/Breadcrumb";
import { AddCategoryModal } from "./AddCategoryModal";
import { CategoryItem } from "./CategoryItem";
import { EditCategoryModal } from "./EditCategoryModal";

export default function Categories() {
  const pages = [
    { url: "#", title: "Home" },
    { url: CATEGORY_MANAGEMENT, title: "Categories" },
  ];
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
        <Breadcrumb pages={pages} />
        <div className="pt-4">
          <h2>Categories</h2>
        </div>
      </div>

      <div className=" mt-6 m-auto w-1/2">
        <Input.Search
          onChange={useDebounce(onSearch)}
          placeholder="Category name"
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
              title: "Xuan Ha collection",
              description:
                "Ant Design, a design language for background applications, is refined by Ant UED Team",
              id: Math.random(),
            }),
          ]}
          // TODO: change key to id
          renderItem={(item, index) => (
            <CategoryItem
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
