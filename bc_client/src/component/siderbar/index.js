import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import MenuItem from "@/common/menu-item";
import "./index.scss";
function SiderbarBlock() {
  const navigate = useNavigate();
  const clickHandler = (e) => {
    navigate(`/${e.key}`);
  };
  return (
    <div className="sider-block">
      <div className="sider-title">Solidity Demo</div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={MenuItem[0].key}
        items={MenuItem}
        onClick={clickHandler}
      />
    </div>
  );
}
export default SiderbarBlock;
