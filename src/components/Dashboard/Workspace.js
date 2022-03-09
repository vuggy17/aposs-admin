import Breadcrumb from "component/shared/Breadcrumb";
import React from "react";
import { DEFAULT_ROUTE } from "routes/route.config";
import menIcon from "asset/men.png";
import { Avatar, Card, Divider, List, Statistic } from "antd";
import { Meta } from "antd/lib/list/Item";

export default function Workspace() {
  const pages = [
    { url: "#", title: "Home" },
    { url: DEFAULT_ROUTE, title: "Work place" },
  ];
  return (
    <>
      <div className="bg-white p-9 pl-6 pt-4">
        <Breadcrumb />
        <div className="pt-4">
          <h2>Workplace</h2>
          <div className="flex">
            <img
              src={menIcon}
              alt="cc"
              className="rounded-full "
              width={100}
            ></img>
            <div className="flex flex-1 justify-between">
              <div className="w-auto">
                <p className="font-normal text-2xl mb-4">
                  Hi, Duy wish you a happy working day
                </p>
                <p className="opacity-80 text-gray-800 text-base">
                  Bussiness manager
                </p>
              </div>
              <div className="flex gap-7">
                <Statistic title="Numbers of products" value={49} />
                <Divider
                  type="vertical"
                  style={{ height: 50, marginTop: 10 }}
                ></Divider>
                <Statistic title="Numbers of category" value={49} />
                {/* <Divider
                type="vertical"
                style={{ height: 50, marginTop: 10 }}
              ></Divider>
              <Statistic title="Numbers of products" value={49} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-14">
        <Card title="Product on sales" extra={<a href="#">More</a>}>
          {[...Array(6)].map((_, index) => (
            <Card.Grid
              hoverable={true}
              style={{ width: "33.33%" }}
              key={index}
              onClick={() => alert("click cardd")}
              className="cursor-pointer"
            >
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title="Card title"
                description="This is the description"
              />
            </Card.Grid>
          ))}
        </Card>
      </div>

      <div className="pt-12">
        <Card title="Actions">
          <List
            itemLayout="horizontal"
            dataSource={[
              ...Array(5).fill({
                cusName: "Khang Bui",
                title: "Xiao Feng necklace",
                category: "Xuan Ha collection ",
              }),
            ]}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={
                    <span>
                      Customer {item.cusName} added{" "}
                      <a href="https://ant.design">{item.title}</a>
                      &nbsp; belongs to{" "}
                      <a href="https://ant.design"> {item.category} </a>
                      to cart
                    </span>
                  }
                  description="A few minute ago"
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </>
  );
}
