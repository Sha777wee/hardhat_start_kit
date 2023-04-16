import React from "react";
import {
  DollarCircleOutlined,
  HomeOutlined,
  PictureOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
const MenuItem = [
  { key: "home", label: "首页", icon: React.createElement(HomeOutlined) },
  {
    key: "erc20",
    label: "ERC20",
    icon: React.createElement(DollarCircleOutlined),
  },
  {
    key: "erc721",
    label: "ERC721",
    icon: React.createElement(PictureOutlined),
  },
  {
    key: "dynamic-contract",
    label: "动态创建智能合约",
    icon: React.createElement(SolutionOutlined),
  },
];
export default MenuItem;