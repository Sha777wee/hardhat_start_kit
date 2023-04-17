import { Layout } from "antd";
import React from "react";
import "./App.scss";
import Home from "./pages/home";
import ERC20 from "./pages/ERC20";
import ERC721 from "./pages/ERC721";
import { Routes, Route } from "react-router-dom";

import HeaderBlock from "./component/header";
import SiderbarBlock from "./component/siderbar";
import ERC20Log from "./pages/ERC20Log";

const { Header, Content, Footer, Sider } = Layout;
function App() {
  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <SiderbarBlock />
      </Sider>
      <Layout>
        <Header className="header">
          <HeaderBlock />
        </Header>
        <Content>
          <div className="content-block">
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/home" element={<Home></Home>}></Route>
              <Route path="/erc20" element={<ERC20></ERC20>}></Route>
              <Route path="/erc20-log" element={<ERC20Log></ERC20Log>}></Route>
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
