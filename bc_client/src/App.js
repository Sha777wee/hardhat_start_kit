import { Layout, Menu } from "antd";
import React from "react";
import "./App.scss";
import Home from "./pages/home";
import ERC20 from "./pages/ERC20";
import ERC721 from "./pages/ERC721";
import { Routes, Route, useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
function App() {
  const items = [
    { key: "home", label: "首页" },
    { key: "erc20", label: "ERC20" },
    { key: "erc721", label: "ERC721" },
  ];
  const navigate = useNavigate();
  const clickHandler = (e) => {
    navigate(`/${e.key}`);
  };
  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["0"]}
          items={items}
          onClick={clickHandler}
        />
      </Sider>
      <Layout>
        <Header className="header" />
        <Content>
          <div className="content-block">
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/home" element={<Home></Home>}></Route>
              <Route path="/erc20" element={<ERC20></ERC20>}></Route>
              <Route path="/erc721" element={<ERC721></ERC721>}></Route>
            </Routes>
          </div>
        </Content>
        <Footer className="footer">©2023 Created by Shawee</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
