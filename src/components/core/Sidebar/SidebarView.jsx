import React from 'react'
import { Layout, Menu } from 'antd';

import './styles.css';
import views from '../../../constants/privateViews';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

const SidebarView = () => {
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
      </Menu>
    </Sider>
  )
}

export default SidebarView
