import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, List, Tabs, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import useDebounce from "hooks/useDebouce";
import Breadcrumb from "../shared/Breadcrumb";
import { AddCategoryModal } from "./AddCategoryModal";
import { CategoryListItem } from "./CategoryListItem";
import { EditCategoryModal } from "./EditCategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, selectAllCategories } from "redux/slices/category";
import { useMergeAxios } from "hooks/useMergeAxios";
export default function Categories() {
  const [createVisible, setcreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const [editingCategory, setEditingCategory] = useState();
  const { data, loading } = useMergeAxios({ method: "GET" });
  console.log(data);
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

      <div className="bg-white p-9 pl-6 pt-4 mt-4 m-auto w-1/2">
        {data && data.length > 0 && (
          <Tabs tabPosition="left">
            {data.map(({ name, id, categories }) => (
              <Tabs.TabPane tab={name} key={id}>
                <List
                  itemLayout="horizontal"
                  footer={
                    <CategoryListFooter
                      handlePress={(_) => setcreateVisible(true)}
                    />
                  }
                  dataSource={[...categories]}
                  renderItem={(item, index) => (
                    <CategoryListItem
                      key={index}
                      item={item}
                      setEditItem={setEditingCategory}
                    />
                  )}
                ></List>
              </Tabs.TabPane>
            ))}
          </Tabs>
        )}
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
    <Tooltip placement="topLeft" title="Can't add category at this time">
      <Button type="dashed" disabled className="w-full" onClick={handlePress}>
        <PlusOutlined />
        add to list
      </Button>
    </Tooltip>
  );
}
