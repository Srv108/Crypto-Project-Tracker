import ReactSearchBox from "react-search-box"; 
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import store from "../../zustand/state";
import { fetchCoinsList } from "../../services/fetchCoinsList";
import SearchBoxDesign from "./SeachBoxDesign";



function SearchBox() {
    const { displayedValue, setDisplayedValue } = store();
    const [filteredData,setFilteredData] = useState([]);

    const { data } = useQuery(["coins"], () => fetchCoinsList(), {
        retry: 1,
        cacheTime: 1000 * 60 * 2,
        staleTime: 1000 * 60 * 2,
    });

    
    

    useEffect(() => {
        const getData = setTimeout(() => {
            console.log(displayedValue);
            if(data) {
                const coinNames = data.map((coin) => ({
                    key: coin.id,
                    value: coin.name,
                }));
                const filteresArray = coinNames.filter((coin) => (coin.value.toUpperCase().startsWith(displayedValue.toUpperCase())));
                setFilteredData(filteresArray);
                // console.log(coinNames);
                console.log(filteredData);
            }
        }, 2000);
        return () => clearTimeout(getData);
    },[displayedValue]);
    
    return (
        <>
            <div>

            </div>
                <div className=" mt-2 border border-gray-300 rounded shadow-lg max-h-80 overflow-y-auto w-72">
                    <ReactSearchBox
                        placeholder="Search for a coin"
                        data={filteredData.length ? filteredData : []}
                        onChange={(value) => 
                            setDisplayedValue(value)
                        }
                        onSelect={(record) => (console.log(record))}
                        clearOnSelect = {true}
                    />
                </div>
                
        </>
    );
}

export default SearchBox;
