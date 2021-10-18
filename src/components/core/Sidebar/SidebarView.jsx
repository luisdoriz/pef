import React, { useContext } from 'react'
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { LogoutOutlined } from "@ant-design/icons"

import views from '../../../constants/privateViews';
import Context from '../../../contexts/mainContext';
import './styles.css';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

const SidebarView = () => {
  const { mainDispatch } = useContext(Context.Consumer)
  const renderMenuItems = () => {
    const items = []
    views.forEach((item, index) => {
      const { showSidebar } = item;
      if (showSidebar) {
        const { text, icon, subMenuItems, path } = item;
        let itemOutput = ""
        if (subMenuItems?.length > 0) {
          itemOutput = (
            <SubMenu key={index} title={text} icon={icon}>
              {subMenuItems.map(({ subItemText, id, route }) => (
                <Item key={`${index}-${id}`}>
                  <Link to={`${route}/${id}`}>
                    {subItemText}
                  </Link>
                </Item>
              ))}
            </SubMenu>
          )
        } else {
          itemOutput = (
            <Item key={index} icon={icon}>
              <Link to={path}>
                {text}
              </Link>
            </Item>
          )
        }
        items.push(itemOutput)
      }
    })
    return items
  }
  return (
    <Sider
      theme="light"
      className="sidebar-container"
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <div className="logo" />
      <Menu defaultSelectedKeys={['1']} mode="inline">
        {renderMenuItems()}
        <Item onClick={() => mainDispatch({ type: "LOGOUT" })} icon={<LogoutOutlined />}>
          Cerrar Sesion
        </Item>
      </Menu>
    </Sider>
  )
}

export default SidebarView
