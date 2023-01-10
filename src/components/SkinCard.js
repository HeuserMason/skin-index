import { Card } from 'antd';
const { Meta } = Card;

function SkinCard({ name, img, skinId, handleCardClick }) {

    return (
        <>
            <Card onClick={(event) => { handleCardClick(event, skinId) }} hoverable style={{ width: 340, }} cover={<img alt={name} src={img} />}>
                <Meta title={name} description="975 RP"/>
            </Card>
        </>
    );
}

export default SkinCard;