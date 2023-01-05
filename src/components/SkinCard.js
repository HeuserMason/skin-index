import { Card } from 'antd';
const { Meta } = Card;

function SkinCard({ name }) {

    return (
        <div>
            <Card hoverable style={{ width: 340 }} cover={<img alt={name} src={"https://picsum.photos/seed/" + Math.floor(Math.random() * 500) + "/500"} />}>
                <Meta title={name} description="975 RP"/>
            </Card>
        </div>
    );
}

export default SkinCard;