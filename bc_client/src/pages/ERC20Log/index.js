import { Table } from "antd";
import "./index.scss";
import { observer } from "mobx-react-lite";
function ERC20Log() {
  const columns = [
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
    },
    {
      title: "发起地址（from）",
      dataIndex: "from",
      key: "from",
      responsive: ["sm"],
    },
    {
      title: "目的地址（to）",
      dataIndex: "to",
      key: "to",
      responsive: ["md"],
    },
    {
      title: "金额",
      dataIndex: "amount",
      key: "amount",
      responsive: ["md"],
    },
    {
      title: "时间",
      dataIndex: "time",
      key: "time",
      responsive: ["lg"],
    },
  ];
  const data = [
    {
      key: "1",
      operation: "转账",
      from: "0x4a9c0bb32b497b7889892f93766e917b357c94ba",
      to: "0xe52ADa302B0947F3AEc65229331390292335c3ab",
      amount: "100",
      time: "2023-4-16 12:00:00",
    },
    {
      key: "1",
      operation: "授权",
      from: "0x4a9c0bb32b497b7889892f93766e917b357c94ba",
      to: "0xe52ADa302B0947F3AEc65229331390292335c3ab",
      amount: "100",
      time: "2023-4-16 12:00:00",
    },
    {
      key: "1",
      operation: "提取",
      from: "0x4a9c0bb32b497b7889892f93766e917b357c94ba",
      to: "0xe52ADa302B0947F3AEc65229331390292335c3ab",
      amount: "100",
      time: "2023-4-16 12:00:00",
    },
    {
      key: "1",
      operation: "转账",
      from: "0x4a9c0bb32b497b7889892f93766e917b357c94ba",
      to: "0xe52ADa302B0947F3AEc65229331390292335c3ab",
      amount: "100",
      time: "2023-4-16 12:00:00",
    },
    {
      key: "1",
      operation: "授权",
      from: "0x4a9c0bb32b497b7889892f93766e917b357c94ba",
      to: "0xe52ADa302B0947F3AEc65229331390292335c3ab",
      amount: "100",
      time: "2023-4-16 12:00:00",
    },
    {
      key: "1",
      operation: "提取",
      from: "0x4a9c0bb32b497b7889892f93766e917b357c94ba",
      to: "0xe52ADa302B0947F3AEc65229331390292335c3ab",
      amount: "100",
      time: "2023-4-16 12:00:00",
    },
    {
      key: "1",
      operation: "转账",
      from: "0x4a9c0bb32b497b7889892f93766e917b357c94ba",
      to: "0xe52ADa302B0947F3AEc65229331390292335c3ab",
      amount: "100",
      time: "2023-4-16 12:00:00",
    },
    {
      key: "1",
      operation: "授权",
      from: "0x4a9c0bb32b497b7889892f93766e917b357c94ba",
      to: "0xe52ADa302B0947F3AEc65229331390292335c3ab",
      amount: "100",
      time: "2023-4-16 12:00:00",
    },
    {
      key: "1",
      operation: "提取",
      from: "0x4a9c0bb32b497b7889892f93766e917b357c94ba",
      to: "0xe52ADa302B0947F3AEc65229331390292335c3ab",
      amount: "100",
      time: "2023-4-16 12:00:00",
    },
    {
      key: "1",
      operation: "转账",
      from: "0x4a9c0bb32b497b7889892f93766e917b357c94ba",
      to: "0xe52ADa302B0947F3AEc65229331390292335c3ab",
      amount: "100",
      time: "2023-4-16 12:00:00",
    },
    {
      key: "1",
      operation: "授权",
      from: "0x4a9c0bb32b497b7889892f93766e917b357c94ba",
      to: "0xe52ADa302B0947F3AEc65229331390292335c3ab",
      amount: "100",
      time: "2023-4-16 12:00:00",
    },
    {
      key: "1",
      operation: "提取",
      from: "0x4a9c0bb32b497b7889892f93766e917b357c94ba",
      to: "0xe52ADa302B0947F3AEc65229331390292335c3ab",
      amount: "100",
      time: "2023-4-16 12:00:00",
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default observer(ERC20Log);
