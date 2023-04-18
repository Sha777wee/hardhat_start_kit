import { Table } from "antd";
import "./index.scss";
import { observer } from "mobx-react-lite";
import { http } from "@/utils";
import { useState } from "react";
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
      dataIndex: "value",
      key: "value",
      responsive: ["md"],
    },
  ];
  let [data, setData] = useState([]);
  http.get("/erc20/log").then((res) => {
    setData(res.data);
  });
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default observer(ERC20Log);
