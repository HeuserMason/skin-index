import { useContext } from 'react';
import { HolderOutlined} from '@ant-design/icons';
import { Menu } from "antd";
import ChampionsContext from '../context/champions';

function getItem(label, key, icon, children, type) {

    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

function RoleSort() {

    const { SetCurrRoleSort } = useContext(ChampionsContext);

    const items = [

        getItem('Sort By Role', 'sub1', <HolderOutlined />, [
            getItem('Any', ''),
            getItem('Mage', 'mage'),
            getItem('Fighter', 'fighter'),
            getItem('Tank', 'tank'),
            getItem('Assassin', 'assassin'),
            getItem('Marksman', 'marksman'),
            getItem('Support', 'support'),
        ])
    ];

    const handleRoleSortClicked = ({ item, key, keyPath, domEvent }) => {

        SetCurrRoleSort(key);
    };

    return (

        <Menu mode="inline" style={{ width: 256 }} items={items} defaultSelectedKeys={['']} onClick={handleRoleSortClicked} />
    );
}

export default RoleSort;