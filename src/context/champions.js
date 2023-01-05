import { createContext, useState, useCallback } from "react";
import axios from "axios";

const ChampionsContext = createContext();

function Provider({ children }) {

    const [currRoleSort, SetCurrRoleSort] = useState("");
    const [currChampionSearchTerm, SetCurrChampionSearchTerm] = useState("");
    const [selectedChampionId, setSelectedChampionId] = useState('266'); //First element after alphabetically sorting
    const [champions, setChampion] = useState([]);

    const fetchChampions = useCallback(async () => {

        const response = await axios.get('https://cdn.communitydragon.org/latest/champions');

        setChampion(response.data);

        console.log(response.data);
    }, []);

    const handleSetSelectedChampionId = () => {


    };

    const valueToShare = {
        
        champions,
        fetchChampions,
        currRoleSort,
        SetCurrRoleSort,
        selectedChampionId,
        setSelectedChampionId,
        currChampionSearchTerm,
        SetCurrChampionSearchTerm
    };

    return <ChampionsContext.Provider value={valueToShare}>
        {children}
    </ChampionsContext.Provider>
}

export { Provider };
export default ChampionsContext;