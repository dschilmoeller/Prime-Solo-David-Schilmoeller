import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card'

import './AllItems.css'

function AllItems(props) {
    const allItemsFromStore = useSelector((store) => store.allItems);
    const [heading, setHeading] = useState('Functional Component');

    const dispatch = useDispatch();
    // fetch items from server (GET)
    // render array of items as a map.
    // dispatch - fetchAllItems. -> Move to local state (searchability) -> render
    // run dispatch on page load. Set to IF in order to only run if store is empty?

    //   useEffect(() => {
    //     dispatch({ type: "FETCH_ALL_ITEMS" });
    //   }, []);

    const manualPull = () => {
        console.log(`Dispatching`);
        dispatch({ type: "FETCH_ALL_ITEMS" })
        console.log(`store.allItems:`, allItemsFromStore);
    }

    return (
        <div>
            <form>Add an Item
                <input defaultValue={'part name'} />
                <input defaultValue={'part number'} />
                {/* Option drop down with fetched state of all part types */}
                <input defaultValue={'Item Lead Time'} />
                <input defaultValue={'Mean time to item failures in months'} />
                <input defaultValue={'Item description'} />
                <button className='btn'>Submit</button>
            </form>
            <h2>Import some data?</h2>

            <button onClick={manualPull}>Manual Data Pull</button>

<div className='itemContainer'>
            {allItemsFromStore.length &&
                allItemsFromStore.map((item) => {
                    console.log(`Item data:`, item);
                    return (
                        <>
                            <Card sx={{ minWidth: 400 }}>
                                <div key={item.id} className='itemCard'>
                                    <h3>item name: {item.part_name}</h3>
                                    <h3>part# {item.part_number}</h3>
                                    <h4>item lead time: {item.lead_time_weeks}</h4>
                                    <h4>mean time to failure: {item.mttf_months}</h4>
                                    <h4>Object type: {item.object_type}</h4>
                                </div>
                            </Card>
                        </>
                    )
                })}
</div>
        </div>
    );
}

export default AllItems;
