import { useContext, useEffect } from 'react';
import { Layout, Input, Menu, theme, Space} from 'antd';
import ChampionsContext from './context/champions';
import SkinCardList from './components/SkinCardList';
import ChampionSearch from './components/ChampionSearch';
import RoleSort from './components/RoleSort';
const { Header, Content, Footer, Sider } = Layout;

const App = () => {

    const { champions, fetchChampions, currRoleSort, selectedChampionId, setSelectedChampionId, currChampionSearchTerm } = useContext(ChampionsContext);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    //Fetch champions once
    useEffect(() => {

        fetchChampions();
    }, [fetchChampions] );

    const itemsHeaderElements = [

        { label: "SHOP"},
        { label: "HELP"},
        { label: "MMR CHECKER"},
        { label: "SKINPEDIA"},
    ];
    
    const itemsSiderElements = champions.filter((element, index) => {

        //Returned champion from GET request has a NONE entry at index 0, this removes that
        if (index === 0 || !element.name.toLowerCase().includes(currChampionSearchTerm.toLowerCase()) || currRoleSort !== "" && !element.roles.includes(currRoleSort)) {
            return false;
        }
        return true;
        
    //Alphabeticaly sort
    }).sort((a, b) => a.name.localeCompare(b.name))
    .map((element, index) => {

        return { key: element.id, label: element.name }
    });

    const handleChampionClick = (item, key, keyPath, domEvent) => {

        setSelectedChampionId(item.key);
    };

    return (

        <Layout>

            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={itemsHeaderElements.map((element, index) => {

                    const key = index + 1;
                    return {

                        key,
                        label: element.label
                    };
                })}/>
            </Header>

            <Content style={{ padding: '0 50px',}}>

                {/* <Breadcrumb style={{ margin: '16px 0',}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}

                <Layout style={{ padding: '24px 0', background: colorBgContainer}}>

                    <Sider style={{ background: colorBgContainer, minHeight: 280, }} width={250}>
                        
                        <Space block direction="vertical">
                            <ChampionSearch />
                            <RoleSort style={{ }} />
                        </Space>
                        <Space />
                        <div style={{ overflowX: 'hidden', overflowY: 'visable', height: '100vh', }}>
                            <Menu onClick={handleChampionClick} mode="vertical" defaultSelectedKeys={selectedChampionId} defaultOpenKeys={['sub1']} style={{height: '100%',}} items={itemsSiderElements}/>
                        </div>
                    </Sider>
                    
                    <Content style={{ padding: '0 24px', minHeight: 280, }}>
                        <SkinCardList />
                    </Content>

                </Layout>
            </Content>

            <Footer style={{ textAlign: 'center',}}>
                Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>
    );
};
export default App;