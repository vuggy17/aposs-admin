import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, List } from "antd";

import React, { useEffect, useState } from "react";
import useDebounce from "hooks/useDebouce";
import Breadcrumb from "../shared/Breadcrumb";
import { CategoryListItem } from "components/categories/CategoryListItem";
import { AddCategoryModal } from "components/categories/AddCategoryModal";
import { EditCategoryModal } from "components/categories/EditCategoryModal";
import IndustryListItem from "./Industry.ListItem";
import { useAxios } from "hooks/useAxios";
import { axios } from "lib/axios/Interceptor";
import { ENP_INDUSTRY } from "api/EndPoint";
import { AddIndustry } from "./AddIndustry";
import { EditIndustry } from "./EditIndustry";

export default function Industries() {
  const [createVisible, setcreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const [editingCategory, setEditingCategory] = useState();
  const [industries, setIndustries] = useState([]);
  const onSearch = (e) => {
    const searchTerm = e.target.value;
    // TODO: api call and filter items
    console.log("searching", searchTerm);
  };
  useEffect(() => {
    if (editingCategory) {
      setEditVisible(true);
    }
    axios.get(ENP_INDUSTRY).then((res) => setIndustries(res.data));
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
          footer={<ListFooter handlePress={(_) => setcreateVisible(true)} />}
          dataSource={industries}
          // TODO: cs hange key to id
          renderItem={(item, index) => (
            <IndustryListItem
              key={index}
              item={item}
              setEditItem={setEditingCategory}
            />
          )}
        />
      </div>

      <AddIndustry
        key={Math.random()} // random key to  refresh modal
        visible={createVisible}
        handleClose={() => setcreateVisible(false)}
      />

      <EditIndustry
        key={Math.random()} // random key to  refresh modal
        visible={editVisible}
        handleClose={() => setEditVisible(false)}
        initialValues={editingCategory}
      />
    </>
  );
}

function ListFooter({ handlePress }) {
  return (
    <Button type="dashed" className="w-full" onClick={handlePress}>
      <PlusOutlined />
      add to list
    </Button>
  );
}
