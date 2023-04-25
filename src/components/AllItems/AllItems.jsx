import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card'
import { useHistory } from 'react-router-dom';
import AddItemToMasterList from '../AddItem/AddItem';
import './AllItems.css'
import { Button, TextField, Autocomplete } from '@mui/material';


function AllItems(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.user.user_type)

    useEffect(() => {
        dispatch({ type: "FETCH_ALL_ITEMS" })

    }, []);

    const allItemsFromStore = useSelector((store) => store.allItems);
    const stockItems = useSelector((store => store.myStock))

    const clickMyStock = () => { history.push('/mystock') }

    const clickItemDetail = (id, stockItems) => {
        let inStock = false
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

    // search functionality
    const [searchParam, setSearchParam] = useState('')
    const searchables = allItemsFromStore.map(item => { return item.part_name })


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
            <h1>All Items</h1>
            <TextField
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
                {listView ? <Button onClick={toggleListView}>See Box View</Button> : <Button onClick={toggleListView}>See List View</Button>}
                <Button onClick={clickMyStock}>See My Stock</Button>
            </div>
            <div>
                {user === 1 ? <AddItemToMasterList /> : null}
            </div>
            <div>
                {listView === false ? (
                    <div className="stockContainer">
                        {dataFiltered.map((d, i) => (
                            <div key={i} >
                                {allItemsFromStore.map((item => {
                                    if (item.part_name === d) {
                                        return (
                                            <div  key={item.id}>
                                                <Card className='itemCard' sx={{ minWidth: 275 }} id={item.id} onClick={() => clickItemDetail(item.id, stockItems)} >
                                                    <h3>Name: {item.part_name}</h3>
                                                    <h3>Part# {item.part_number}</h3>
                                                    {/* <h4>Item Lead Time: {item.lead_time_weeks} weeks</h4>
                                                    <h4>Mean Time To Failure: {item.mttf_months} months</h4> */}
                                                    {/* <h4>Object type: {item.object_type}</h4> */}
                                                </Card>
                                            </div>
                                        )
                                    }
                                }))}
                            </div>
                        ))}
                    </div>
                ) : (
                    // else if list view === true
                    <ul>
                        {dataFiltered.map((d, i) => (
                            <div className="text" key={i} >
                                {allItemsFromStore.map((item => {
                                    if (item.part_name === d) {
                                        return (
                                            <li className='listItem' key={item.id} sx={{ minWidth: 300 }} id={item.id} onClick={() => clickItemDetail(item.id, stockItems)} >
                                                Item Name: {item.part_name} / Part # {item.part_number}
                                            </li>
                                        )
                                    }
                                }))}
                            </div>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default AllItems;
