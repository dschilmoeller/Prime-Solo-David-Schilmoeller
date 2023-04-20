import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card } from '@mui/material';
import './MyStock.css'
import { Button } from '@mui/material';

function MyStock() {
    const myStock = useSelector((store) => store.myStock);
    const dispatch = useDispatch();
    const history = useHistory();

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

    return (
        <div>
            <h2>DS</h2>
            {/* TO DO */}
            {listView ? <Button onClick={toggleListView}>See Box View</Button> : <Button onClick={toggleListView}>See List View</Button>}
            <Button onClick={clickAllItems}>See All Items</Button>

            {/* TO DO */}
            <div>
                <input></input><button>Search</button>
            </div>

            {/* Set up to click on a card and go to item details page. */}
            
                {(listView === false && myStock.length) ? (
                    <div className='stockContainer'>
                    {myStock.map((stockItem) => {
                        return (
                            <div className='itemCard' key={stockItem.mot_id}>
                                <Card sx={{ minWidth: 400 }} id={stockItem.mot_id} onClick={() => clickItemDetail(stockItem.mot_id)} >
                                    <h3>Item name: {stockItem.part_name}</h3>
                                    <h3>part# {stockItem.part_number}</h3>
                                    {stockItem.lead_time_weeks > 4 ? <h4>item lead time: {stockItem.lead_time_weeks / 4} months</h4> : <h4>item lead time: {stockItem.lead_time_weeks} weeks</h4>}
                                    {stockItem.mttf_months > 11 ? <h4>mean time to failure: {stockItem.mttf_months / 12} years</h4> : <h4>mean time to failure: {stockItem.mttf_months} months</h4>}
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
                        <li sx={{ minWidth: 400 }} id={stockItem.mot_id} onClick={() => clickItemDetail(stockItem.mot_id)} >
                            <h3>Item name: {stockItem.part_name}</h3>
                            <h4>part# {stockItem.part_number}</h4>
                        </li>
                        
                    </div>
                    )
                    })} 
                    </ul>)
                } </div> ) }
            
                


export default MyStock;
