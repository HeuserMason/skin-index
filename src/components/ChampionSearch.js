import { useContext } from "react";
import { Input } from "antd";
const { Search } = Input;

function ChampionSearch({ currChampionSearchTerm, SetCurrChampionSearchTerm }) {
    
    //const [currChampionSearchTerm, SetCurrChampionSearchTerm] = useState("");
    //const { currChampionSearchTerm, SetCurrChampionSearchTerm } = useContext(ChampionsContext);

    const handleSearchTermChange = (event) => {

        SetCurrChampionSearchTerm(event.target.value);
    };

    return (
        <Search style={{ paddingLeft: 6, paddingRight: 6 }} placeholder="Search" value={currChampionSearchTerm} onChange={handleSearchTermChange} />
    );
}

export default ChampionSearch;