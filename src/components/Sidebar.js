import { useState } from "react";
import { Layout, Menu, Space, theme} from 'antd';
import ChampionSearch from "./ChampionSearch";
import RoleSort from "./RoleSort";

const { Sider } = Layout;

function Sidebar({ champions, selectedChampionId, SetSelectedChampionId }) {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [currRoleSort, SetCurrRoleSort] = useState("");
    const [currChampionSearchTerm, SetCurrChampionSearchTerm] = useState("");
    
    const handleChampionClick = (item, key, keyPath, domEvent) => {

        SetSelectedChampionId(item.key);
    };
        
    const itemsSiderElements = champions.filter((element, index) => {

        //Returned champion from GET request has a NONE entry at index 0, this removes that
        if (index === 0 || !element.key.toLowerCase().includes(currChampionSearchTerm.toLowerCase()) || (currRoleSort !== "" && !element.roles.includes(currRoleSort))) {
            return false;
        }
        return true;
        
    //Alphabeticaly sort
    }).sort((a, b) => a.name.localeCompare(b.name))
    .map((element, index) => {

        return { key: element.id, label: element.name }
    });

    return (

        <Sider style={{ background: colorBgContainer, minHeight: 280, }} width={250}>
                        
            <Space block="true" direction="vertical">
                <ChampionSearch currChampionSearchTerm={currChampionSearchTerm} SetCurrChampionSearchTerm={SetCurrChampionSearchTerm} />
                <RoleSort SetCurrRoleSort={SetCurrRoleSort} />
            </Space>
            <Space />
            <div style={{ overflowX: 'hidden', overflowY: 'visable', height: '100vh', }}>
                <Menu onClick={handleChampionClick} mode="vertical" defaultSelectedKeys={selectedChampionId} defaultOpenKeys={['sub1']} style={{height: '100%',}} items={itemsSiderElements}/>
            </div>
        </Sider>

    );
}

export default Sidebar;