import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, List, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import useDebounce from "./util/hooks/useDebouce";
import Breadcrumb from "../shared/Breadcrumb";
import { AddCategoryModal } from "./add-category-modal";
import { CategoryListItem } from "./CategoryListItem";
import { EditCategoryModal } from "./EditCategoryModal";

export default function Categories() {
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
        <Tabs tabPosition="left">
          {[...Array(5)]
            .map((_) => ({
              name: "Interial" + Math.round(Math.random() * 10),
              childs: Array(Math.round(Math.random() * 10)).fill({
                avatar: "https://joeschmoe.io/api/v1/random",
                title: "Xuan Ha collection",
                description:
                  "Ant Design, a design language for background applications, is refined by Ant UED Team",
                id: Math.random(),
              }),
            }))
            .map(({ name, childs }, index) => (
              <Tabs.TabPane tab={name} key={index}>
                <List
                  itemLayout="horizontal"
                  footer={
                    <CategoryListFooter
                      handlePress={(_) => setcreateVisible(true)}
                    />
                  }
                  dataSource={[...childs]}
                  // TODO: change key to id
                  renderItem={(item, index) => (
                    <CategoryListItem
                      key={index}
                      item={item}
                      setEditItem={setEditingCategory}
                    />
                  )}
                />
              </Tabs.TabPane>
            ))}
        </Tabs>
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
