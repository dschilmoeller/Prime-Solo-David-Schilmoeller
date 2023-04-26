import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Card } from '@mui/material';
import './MyStock.css'
import { Button, TextField } from '@mui/material';

function MyStock() {
    const dispatch = useDispatch();
    const history = useHistory();

    // const user = useSelector(store => store.user.user_type)
    const myStock = useSelector((store) => store.myStock);

    // Make this into a reducer so it's persistent b/w reloads.
    const [listView, setListView] = useState(false)
    const toggleListView = () => { setListView(!listView) }

    const param = useParams()

    useEffect(() => {
        dispatch({ type: "FETCH_MY_STOCK" })
    }, []);

    const clickItemDetail = (id) => {
        history.push(`/stockItemDetail/${id}`)
    }

    const clickAllItems = () => {
        history.push('/allitems')
    }

    // Need some way to redirect user to latest item detail page or 
    // if (param.id == 99999) {

    //     let latestMotID = 0
    //     for (let item of myStock) {
    //         if (item.mot_id > latestMotID) {
    //             latestMotID = item.mot_id
    //         }
    //         console.log(`latestMotID:`, latestMotID);
    //     }
    // }


// search functionality
const [searchParam, setSearchParam] = useState('')
const searchables = myStock.map(item => { return item.part_name })



const filterData = (query, data) => {
    if (!query) {
        return data;
    } else {

        return data.filter((d) => d.toLowerCase().includes(query));

    }
};

const dataFiltered = filterData(searchParam, searchables);
// end search functionality


return (
    <div>
        <div className='general-container'>
            <h1>My Stock</h1>
            <TextField
                autoFocus
                id="search-bar"
                className="text"
                onChange={(e) => {
                    setSearchParam(e.target.value);
                }}
                value={searchParam}
                label="Enter Search Term"
                variant="outlined"
                placeholder="Search..."
                size="small"
            />

            <div>
                {listView ? <Button variant='contained' sx={{ m: 1 }} onClick={toggleListView}>See Box View</Button> : <Button variant='contained' sx={{ m: 1 }} onClick={toggleListView}>See List View</Button>}
                <Button variant='outlined' sx={{ m: 1 }} onClick={clickAllItems}>See All Items</Button>
            </div>
            {/* Set up to click on a card and go to item details page. */}
        </div>
        {dataFiltered.length === 0 ? (
            <h1>No Search Results</h1>
        ) : (listView === false) ? (
            <div className='stockContainer'>
                {dataFiltered.map((d, i) => (
                    <div key={i} >
                        {myStock.map((stockItem) => {
                            if (stockItem.part_name === d) {
                                return (
                                    <div key={stockItem.mot_id}>
                                        <Card className='itemCard' sx={{ minWidth: 300 }} id={stockItem.mot_id} onClick={() => clickItemDetail(stockItem.mot_id)} >
                                            <h3>Item name: {stockItem.part_name}</h3>
                                            <h3>Part# {stockItem.part_number}</h3>
                                            <h3>Deployed: {stockItem.quantity_in_field}</h3>
                                            <h3>Reccommended Order Quantity: {stockItem.quantity_to_order}</h3>
                                            {stockItem.lead_time_weeks > 4 ? <h4>Item Lead Time: {stockItem.lead_time_weeks / 4} months</h4> : <h4>Item Lead Time: {stockItem.lead_time_weeks} weeks</h4>}
                                            {/* {stockItem.mttf_months > 11 ? <h4>Mean Time To Failure: {stockItem.mttf_months / 12} years</h4> : <h4>Mean Time To Failure: {stockItem.mttf_months} months</h4>} */}
                                            <h4>Object type: {stockItem.object_type}</h4>
                                        </Card>
                                    </div>
                                )
                            }
                        })}
                        {/* End of mystock.map */}
                    </div>
                ))}
                {/* End of dataFiltered.map */}
            </div>
        )
            : // else if listView === true 
            (<ul>
                {dataFiltered.map((d, i) => (
                    <div key={i}>
                        {myStock.map((stockItem) => {
                            if (stockItem.part_name === d) {
                                return (
                                    <div className='listItem' key={stockItem.mot_id}>
                                        <li id={stockItem.mot_id} onClick={() => clickItemDetail(stockItem.mot_id)} >
                                            Item name: {stockItem.part_name} / Part # {stockItem.part_number}
                                        </li>

                                    </div>
                                )
                            }
                        })}
                    </div>
                ))}
            </ul>)
        }
    </div>
)
}




export default MyStock;
