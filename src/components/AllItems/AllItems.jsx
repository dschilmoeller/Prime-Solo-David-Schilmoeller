import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card'
import { useHistory } from 'react-router-dom';

import './AllItems.css'

function AllItems(props) {
    const allItemsFromStore = useSelector((store) => store.allItems);
    const [allItemsState, setAllItemsState] = useState([]);

    const searchFunction = (searchParam) => {
        console.log(`In search`);
    }

    

    const dispatch = useDispatch();
    const history = useHistory();

    // dispatch - fetchAllItems. -> Move to local state (searchability) -> re-render
    // run dispatch on page load. Not important atm due to localized speed.
    // figure out search through local state and render depending on whether search is used?
    // spike Search bars/applicable methods e.g. Filter.

    // switch to list view -> look up T/F assignment with simple switch.
    // Each has to move to individual details page - look up movie assigment for that bit.

    const clickItemDetail = (id) => {
        dispatch({ type: 'GET_ITEM_DETAIL', payload: id })
        history.push(`/itemDetail/${id}`)
        // TODO : create condition to loop through my objects and compare before sending to appropriate item detail page.
    }

    useEffect(() => {
        dispatch({ type: "FETCH_ALL_ITEMS" })
    }, []);

    const manualPull = () => {
        // console.log(`Dispatching`);
        dispatch({ type: "FETCH_ALL_ITEMS" })
        // console.log(`store.allItems:`, allItemsFromStore);
        setAllItemsState(allItemsFromStore)
        // Figure out how to make this work.
        // console.log(`all items from state:`, allItemsState);
    }

    return (
        <div>
            {/* Dump this into a modal or something and get to edge of page */}
            <form>Add an Item
                <input defaultValue={'part name'} />
                <input defaultValue={'part number'} />
                {/* Option drop down with fetched state of all part types */}
                <input defaultValue={'Item Lead Time'} />
                <input defaultValue={'Mean time to item failures in months'} />
                <input defaultValue={'Item description'} />
                <button className='btn'>Submit</button>
            </form>

            <h3>Search Item Name<input></input></h3>
            <button onClick={searchFunction}>Search</button>
            <h2>Import some data?</h2>

            <button onClick={manualPull}>Manual Data Pull</button>

            <div className='itemContainer'>
                {allItemsFromStore.length &&
                    allItemsFromStore.map((item) => {
                        return (
                            <div className='itemCard' key={item.id}>
                                <Card sx={{ minWidth: 400 }} id={item.id} onClick={() => clickItemDetail(item.id)} >
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
