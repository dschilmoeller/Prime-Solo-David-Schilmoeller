import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function AllItems(props) {
    const store = useSelector((store) => store);
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
        dispatch({ type: "FETCH_ALL_ITEMS"})
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

        </div>
    );
}

export default AllItems;
