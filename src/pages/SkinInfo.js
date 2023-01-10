import { Layout, Image, Row, Col, Typography } from 'antd';
import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import NavigationContext from '../context/navigation';

const { Content } = Layout;

const { Title, Text } = Typography;

function SkinInfo({ champions, selectedChampionId, selectedSkinId }) {

    const { navigate } = useContext(NavigationContext);

    if (selectedSkinId === '') {
        navigate('/');
    }

    //Get champion object from selectChampionId in Context
    const championObject = champions.find((element) => {

        return element.id == selectedChampionId;
    });

    const skinObject = championObject.skins.find((element) => {

        return element.id === selectedSkinId;
    });

    //console.log(skinObject);

    const [ detailedChampionObject, SetDetailedChampionObject ] = useState({});

    const fetchDetailedChampionData = async () => {

        const response = await axios.get(`http://ddragon.leagueoflegends.com/cdn/12.12.1/data/en_US/champion/${championObject.key}.json`);

        for (var key in response.data.data) {

            //Get first champion object through iterated json object and re-SET champion object, as we don't need the old data
            SetDetailedChampionObject(response.data.data[key]);
        }
    };

    useEffect(() => {

        fetchDetailedChampionData();
    }, []);

    return(

        <Content style={{ padding: '0 50px',}}>
            <Row style={{ padding: '82px' }}>
                <Col span={12} style={{ paddingRight: 68 }}>
                    <Title strong >
                        {skinObject.name}
                    </Title>
                    <hr />
                    <Text>
                        {detailedChampionObject.lore}
                    </Text>
                </Col>
                <Col span={12}>
                    <Image alt='Champion Picture' src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championObject.key}_${selectedSkinId}.jpg`} />
                </Col>
            </Row>
        </Content>
    );
}

export default SkinInfo;