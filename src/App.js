import { useState, useEffect, useCallback, useContext } from 'react';
import { Layout, Menu, theme } from 'antd';
import axios from 'axios';

import NavigationContext from './context/navigation';
import Route from './components/Route';
import SkinIndex from './pages/SkinIndex';
import SkinInfo from './pages/SkinInfo';

const { Header, Footer } = Layout;

const App = () => {

    const { currentPath, navigate } = useContext(NavigationContext);

    const [champions, setChampions] = useState([]);
    const [selectedChampionId, SetSelectedChampionId] = useState('266'); //First element after alphabetically sorting
    const [selectedSkinId, SetSelectedSkinId] = useState('');
    
    const fetchChampions = useCallback(async () => {

        const response = await axios.get('https://cdn.communitydragon.org/latest/champions');
        //const response = await axios.get('http://ddragon.leagueoflegends.com/cdn/12.12.1/data/en_US/champion.json');

        setChampions(response.data);

        //console.log(response.data);
    }, []);

    //Fetch champions once
    useEffect(() => {

        fetchChampions();
    }, [fetchChampions]);

    const itemsHeaderElements = [

        // Key acts as link destination here
        { key: "/", label: "SKINPEDIA"},
        { key: "/skininfo", label: "SKIN INFORMATION"},
    ];

    const handleMenuLinkClick = (item, key, keyPath, domEvent) => {

        navigate(item.key);
    };

    return (

        <Layout>

            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" selectedKeys={currentPath}

                    onClick={handleMenuLinkClick} items={itemsHeaderElements
                        .filter((element, index) => { if (element.key === '/skininfo' && selectedSkinId === '') { return false } return true })
                        .map((element, index) => {

                        return {

                            key: element.key,
                            label: element.label
                        };
                })}/>
            </Header>

            <Route path="/">             
                <SkinIndex 

                    champions={champions} 
                    selectedChampionId={selectedChampionId} 
                    SetSelectedChampionId={SetSelectedChampionId} 
                    SetSelectedSkinId={SetSelectedSkinId}
                />
            </Route>
            <Route path="/skininfo">
                <SkinInfo champions={champions} selectedChampionId={selectedChampionId} selectedSkinId={selectedSkinId} />
            </Route>

            <Footer style={{ textAlign: 'center',}}>
                Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>
    );
};
export default App;