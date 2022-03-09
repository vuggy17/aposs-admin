import Breadcrumb from "./component/shared/Breadcrumb";
import React from "react";
import { DEFAULT_ROUTE } from "routes/route.config";
import menIcon from "asset/men.png";
import { Avatar, Card, Col, Divider, List, Row, Statistic } from "antd";
import { Meta } from "antd/lib/list/Item";

export default function Dashboard() {
  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic title="Total sales" prefix="VND" value={126560} />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic title="Traffic " value={8846} />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic title="The number of payments " value={6560} />
          </Card>
        </Col>
      </Row>
    </>
  );
}
