import { Card } from 'antd';
const { Meta } = Card;

function SkinCard({ name, img }) {

    return (
        <div>
            <Card hoverable style={{ width: 340, }} cover={<img alt={name} src={img} />}>
                <Meta title={name} description="975 RP"/>
            </Card>
        </div>
    );
}

export default SkinCard;