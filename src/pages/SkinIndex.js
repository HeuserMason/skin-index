import { Layout, Menu, theme } from 'antd';
import SkinCardList from '../components/SkinCardList';
import Sidebar from '../components/Sidebar';

const { Header, Content, Footer } = Layout;

function SkinIndex({ champions, selectedChampionId, SetSelectedChampionId}) {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <>
            <Content style={{ padding: '0 50px',}}>

                {/* <Breadcrumb style={{ margin: '16px 0',}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}

                <Layout style={{ padding: '24px 0', background: colorBgContainer}}>

                    <Sidebar champions={champions} selectedChampionId={selectedChampionId} SetSelectedChampionId={SetSelectedChampionId}/>
                    
                    <Content style={{ padding: '0 24px', overflowY: 'visable', height: '100vh', }}>
                        <SkinCardList champions={champions} selectedChampionId={selectedChampionId} />
                    </Content>

                </Layout>
            </Content>
        </>
    );
}

export default SkinIndex;