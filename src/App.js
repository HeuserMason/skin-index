import { useState, useEffect, useCallback, useContext } from 'react';
import { Layout, Menu, theme } from 'antd';
import axios from 'axios';

import NavigationContext from './context/navigation';
import Route from './components/Route';
import SkinIndex from './pages/SkinIndex';

const { Header, Content, Footer } = Layout;

const App = () => {

    const { currentPath, navigate } = useContext(NavigationContext);

    const [champions, setChampions] = useState([]);
    const [selectedChampionId, SetSelectedChampionId] = useState('266'); //First element after alphabetically sorting
    
    const fetchChampions = useCallback(async () => {

        const response = await axios.get('https://cdn.communitydragon.org/latest/champions');

        setChampions(response.data);

        console.log(response.data);
    }, []);

    //Fetch champions once
    useEffect(() => {

        fetchChampions();
    }, [fetchChampions]);

    const itemsHeaderElements = [

        // Key acts as link destination here
        { key: "/", label: "SKINPEDIA"},
        { key: "/championinfo", label: "CHAMPION INFORMATION"},
    ];

    const handleMenuLinkClick = (item, key, keyPath, domEvent) => {

        navigate(item.key);
    };

    return (

        <Layout>

            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" selectedKeys={currentPath}

                    onClick={handleMenuLinkClick} items={itemsHeaderElements.map((element, index) => {

                        return {

                            key: element.key,
                            label: element.label
                        };
                })}/>
            </Header>

            <Route path="/">             
                <SkinIndex champions={champions} selectedChampionId={selectedChampionId} SetSelectedChampionId={SetSelectedChampionId} />
            </Route>
            <Route path="/championinfo">

            </Route>

            <Footer style={{ textAlign: 'center',}}>
                Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>
    );
};
export default App;