import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card } from '@mui/material';
import './MyStock.css'
import { Button } from '@mui/material';

function MyStock() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.user.id)
    
    const myStock = useSelector((store) => store.myStock);

    const [listView, setListView] = useState(false)

    // Make this into a reducer so it's persistent b/w reloads.
    const toggleListView = () => { setListView(!listView) }

    useEffect(() => {
        dispatch({ type: "FETCH_MY_STOCK" })
    }, []);

    const clickItemDetail = (id) => {
        history.push(`/stockItemDetail/${id}`)
    }

    const clickAllItems = () => {
        history.push('/allitems')
    }

    const searchFunction = (searchParam) => {
        console.log(`In search`);
    }

    return (
        <div>
            <h3>Search Item Name<input></input><button onClick={searchFunction}>Search</button></h3>
            {listView ? <Button onClick={toggleListView}>See Box View</Button> : <Button onClick={toggleListView}>See List View</Button>}
            <Button onClick={clickAllItems}>See All Items</Button>

            {/* Set up to click on a card and go to item details page. */}
            
                {(listView === false && myStock.length) ? (
                    <div className='stockContainer'>
                    {myStock.map((stockItem) => {
                        return (
                            <div className='itemCard' key={stockItem.mot_id}>
                                <Card sx={{ minWidth: 400 }} id={stockItem.mot_id} onClick={() => clickItemDetail(stockItem.mot_id)} >
                                    <h3>Item name: {stockItem.part_name}</h3>
                                    <h3>Part# {stockItem.part_number}</h3>
                                    {stockItem.lead_time_weeks > 4 ? <h4>Item Lead Time: {stockItem.lead_time_weeks / 4} months</h4> : <h4>Item Lead Time: {stockItem.lead_time_weeks} weeks</h4>}
                                    {stockItem.mttf_months > 11 ? <h4>Mean Time To Failure: {stockItem.mttf_months / 12} years</h4> : <h4>Mean Time To Failure: {stockItem.mttf_months} months</h4>}
                                    <h4>Object type: {stockItem.object_type}</h4>
                                </Card>
                            </div>
                        )
                    })}
                    </div>) 
                    : (<ul>
                            {myStock.map((stockItem) => {
                        return (
                        <div className='listItem' key={stockItem.mot_id}>
                        <li id={stockItem.mot_id} onClick={() => clickItemDetail(stockItem.mot_id)} >
                            <li>Item name: {stockItem.part_name}</li>
                            <li>Part# {stockItem.part_number}</li>
                        </li>
                        
                    </div>
                    )
                    })} 
                    </ul>)
                } </div> ) }
            
                


export default MyStock;
