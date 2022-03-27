import Breadcrumb from "components/shared/Breadcrumb";
import React, { useState } from "react";
import { DEFAULT_ROUTE } from "routes/route.config";
import menIcon from "asset/men.png";
import { Avatar, Card, Col, Divider, List, Row, Statistic, DatePicker, Radio, Input } from "antd";
import { Meta } from "antd/lib/list/Item";
import moment from 'moment';
import ColumnSale from "components/statistic/ColumnSale";
import DonutSaleCategory from "components/statistic/DonutSaleCategory";

export default function Dashboard() {
  const [fromDate, setFromDate] = useState(moment());
  const [toDate, setToDate] = useState(moment());
  const { RangePicker } = DatePicker;


  const handleClickThisYear = () => {
    setFromDate(moment().startOf('year'));
    setToDate(moment().endOf('year'));
  }
  const handleClickThisMonth = () => {
    setFromDate(moment().startOf('month'));
    setToDate(moment().endOf('month'));
  }
  const handleClickThisWeek = () => {
    setFromDate(moment().startOf('week'));
    setToDate(moment().endOf('week'));
  }
  const handleClickToday = () => {
    setFromDate(moment());
    setToDate(moment());
  }

  const handleOnChangeOptionDate = e => {
    let value = e.target.value;
    switch (value) {
      case 'Today':
        handleClickToday();
        break;
      case 'This week':
        handleClickThisWeek();
        break;
      case 'This month':
        handleClickThisMonth();
        break;
      case 'This year':
        handleClickThisYear();
        break;
    }
  }

  return (
    <>
      <Row gutter={16} className="mb-4">
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
      <Row className="mb-4">
        <Col span={24}>
          <Card bordered={false}
            title="Sales"
            extra={
              <Row gutter={16}>
                <Radio.Group defaultValue={"Today"} onChange={handleOnChangeOptionDate}>
                  <Radio.Button value="Today">Today</Radio.Button>
                  <Radio.Button value="This week">This week</Radio.Button>
                  <Radio.Button value="This month">This month</Radio.Button>
                  <Radio.Button value="This year">This year</Radio.Button>
                </Radio.Group>
                <Col>
                  <RangePicker defaultValue={[]} value={[fromDate, toDate]} format={'DD/MM/YYYY'} />
                </Col>
              </Row>
            }
          >
            <ColumnSale />
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col span={24}>
          <Card bordered={false}
            title="Sales category share"
          >
            <DonutSaleCategory/>
          </Card>
        </Col>
      </Row>

    </>
  );
}
