import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card'
import { useHistory } from 'react-router-dom';
import AddItemToMasterList from '../AddItem/AddItem';
import './AllItems.css'


function AllItems(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: "FETCH_ALL_ITEMS" })
    }, []);

    const allItemsFromStore = useSelector((store) => store.allItems);
    const stockItems = useSelector((store => store.myStock))

    const searchFunction = (searchParam) => {
        console.log(`In search`);
    }
    // dispatch - fetchAllItems. -> Move to local state (searchability) -> re-render
    // run dispatch on page load. Not important atm due to localized speed.
    // figure out search through local state and render depending on whether search is used?
    // spike Search bars/applicable methods e.g. Filter.

    // switch to list view -> just link to a diff page for now.

    const clickItemDetail = (id, stockItems) => {
        console.log(`StockItems:`, stockItems);
        let inStock = false

        // array.includes modification? .some? 
        // are loops still higher speed than native methods?
        for (let item of stockItems) {
            if (item.object_id === id) {
                history.push(`/stockItemDetail/${item.mot_id}`)
                inStock = true
                break;
            }
        }
        if (inStock === false) {
            history.push(`/itemDetail/${id}`)
        }
    }

    const manualPull = () => {
        dispatch({ type: "FETCH_ALL_ITEMS" })
    }

    return (
        <div>
            {/* Dump this into a modal or something and get to edge of page */}


            <h3>Search Item Name<input></input></h3>
            <button onClick={searchFunction}>Search</button>

            <AddItemToMasterList />

            <h2>Import some data?</h2>
            <button onClick={manualPull}>Manual Data Pull</button>

            <div className='itemContainer'>
                {allItemsFromStore.length &&
                    allItemsFromStore.map((item) => {
                        return (
                            <div className='itemCard' key={item.id}>
                                <Card sx={{ minWidth: 400 }} id={item.id} onClick={() => clickItemDetail(item.id, stockItems)} >
                                    <h3>item name: {item.part_name}</h3>
                                    <h3>part# {item.part_number}</h3>
                                    <h4>item lead time: {item.lead_time_weeks}</h4>
                                    <h4>mean time to failure: {item.mttf_months}</h4>
                                    <h4>Object type: {item.object_type}</h4>
                                </Card>
                            </div>
                        )
                    })}
                {/* end Map */}
            </div>
        </div>
    );
}

export default AllItems;
