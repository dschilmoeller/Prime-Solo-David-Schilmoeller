import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card'
import { useHistory } from 'react-router-dom';
import AddItemToMasterList from '../AddItem/AddItem';
import './AllItems.css'
import { Button } from '@mui/material';


function AllItems(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.user.id)

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

    const clickMyStock = () => {
        history.push('/mystock')
    }

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
    
    const [listView, setListView] = useState(false)
    const toggleListView = () => { setListView(!listView) }

    // const manualPull = () => {
    //     dispatch({ type: "FETCH_ALL_ITEMS" })
    // }

    return (
        <div>
            {/* Dump this into a modal or something and get to edge of page */}


            <h3>Search All Items By Name<input></input><button onClick={searchFunction}>Search</button></h3>
            {listView ? <Button onClick={toggleListView}>See Box View</Button> : <Button onClick={toggleListView}>See List View</Button>}
            <Button onClick={clickMyStock}>See My Stock</Button>
            
            {user === 2 ? <AddItemToMasterList /> : null}

            {/* <h2>Import some data?</h2>
            <button onClick={manualPull}>Manual Data Pull</button> */}

            
                {listView === false ? (
                    <div className='stockContainer'>
                    {allItemsFromStore.map((item) => {
                        return (
                            <div className='itemCard' key={item.id}>
                                <Card sx={{ minWidth: 400 }} id={item.id} onClick={() => clickItemDetail(item.id, stockItems)} >
                                    <h3>Item name: {item.part_name}</h3>
                                    <h3>Part# {item.part_number}</h3>
                                    <h4>Item Lead Time: {item.lead_time_weeks}</h4>
                                    <h4>Mean Time To Failure: {item.mttf_months}</h4>
                                    <h4>Object type: {item.object_type}</h4>
                                </Card>
                            </div>
                        )
                    })} 
                   </div> )
                   : (
                        <ul>
                    {allItemsFromStore.map((item) => {
                        return (
                            <div className='listItem' key={item.id}>
                                <li id={item.id} 
                                onClick={() => clickItemDetail(item.id, stockItems)} >
                                    Item Name: {item.part_name} / Part # {item.part_number}
                                    
                                </li>
                            </div>
                        )
                    })} 
                 </ul> ) }
                {/* end Map */}
            </div>
        
    );
}

export default AllItems;
