import { useContext } from 'react';
import SkinCard from './SkinCard';
import { Layout, Row, Col } from 'antd';
import NavigationContext from '../context/navigation';

function SkinCardList({ champions, selectedChampionId, SetSelectedSkinId}) {

    const { navigate } = useContext(NavigationContext);

    //Get champion object from selectChampionId in Context
    const championObject = champions.find((element) => {

        return element.id == selectedChampionId;
    });

    if (!championObject) {

        return (
            <div>Loading...</div>
        );
    }

    const handleCardClick = (event, skinId) => {

        SetSelectedSkinId(skinId);
        navigate("/skininfo");
    };

    const mappedSkins = championObject.skins.filter((element, index) => {

        //Again skip over 0 because there is a Default of their base skin within the skin array, assumed irrelevant
        if (index === 0) {
            return false;
        }
        return true;

    }).map((element, index) => {
        
        const img = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championObject.key}_${element.id}.jpg`;

        return (

            <Col key={element.id} span={6} style={{ margin: 12 }}>
                <SkinCard skinId={element.id} name={element.name} img={img} handleCardClick={handleCardClick} />
            </Col>
        );
    });

    return (

        <Layout>
            <Row>{mappedSkins}</Row>
        </Layout>
    );
}

export default SkinCardList;