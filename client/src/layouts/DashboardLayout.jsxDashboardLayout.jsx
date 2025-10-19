import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  FileTextOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Avatar, Dropdown, Drawer } from "antd";
import { useNavigate, useLocation, Outlet } from "react-router";

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        My Profile
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const menuItems = [
    { key: "/dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "/reports", icon: <FileTextOutlined />, label: "My Reports" },
    { key: "/upload-reports", icon: <UploadOutlined />, label: "Upload Report" },
    { key: "/vitals", icon: <HeartOutlined />, label: "Track Vitals" },
    { key: "/profile", icon: <UserOutlined />, label: "Profile" },
    { key: "/profile", icon: <UserOutlined />, label: "Profile" },
  ];

  const handleToggle = () => {
    if (isMobile) setMobileVisible(true);
    else setCollapsed(!collapsed);
  };

  const handleMenuClick = ({ key }) => {
    navigate(key);
    if (isMobile) setMobileVisible(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar (Desktop) */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        collapsedWidth={80}
        width={230}
        trigger={null}
        theme="light"
        className="bg-white hidden lg:block"
      >
        <div className="flex items-center justify-center h-16 mx-4 my-4 font-bold uppercase">
          {!collapsed ? "HealthMate" : "HM"}
        </div>

        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ paddingLeft: 10, paddingRight: 10 }}
        />
      </Sider>

      {/* Mobile Drawer */}
      <Drawer
        placement="left"
        closable={false}
        onClose={() => setMobileVisible(false)}
        open={mobileVisible}
        width={230}
      >
        <div className="flex items-center justify-center h-16 mx-4 my-4 font-bold uppercase">
          HealthMate
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Drawer>

      {/* Main Layout */}
      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={handleToggle}
              style={{ fontSize: "16px" }}
            />
            <h3 style={{ marginLeft: 16 }}>Admin Dashboard</h3>
          </div>

          <Dropdown menu={userMenu} placement="bottomRight" arrow>
            <div className="cursor-pointer flex items-center">
              <Avatar icon={<UserOutlined />} size="large" />
              <span className="ml-2">Admin</span>
            </div>
          </Dropdown>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#fff",
            borderRadius: 8,
          }}
        >
          {/* 👇 React Router will inject page content here */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;