import SkinCard from './SkinCard';
import { Layout, Row, Col } from 'antd';

function SkinCardList({ champions, selectedChampionId}) {

    //Get champion object from selectChampionId in Context
    const championObject = champions.find((element) => {

        return element.id == selectedChampionId;
    });

    if (!championObject) {

        return (
            <div>Loading...</div>
        );
    }

    const mappedSkins = championObject.skins.filter((element, index) => {

        //Again skip over 0 because there is a Default of their base skin within the skin array, assumed irrelevant
        if (index === 0) {
            return false;
        }
        return true;

    }).map((element, index) => {
        
        return (
            <Col key={element.id} span={5} style={{ margin: 12 }}>
                <SkinCard name={element.name} />
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