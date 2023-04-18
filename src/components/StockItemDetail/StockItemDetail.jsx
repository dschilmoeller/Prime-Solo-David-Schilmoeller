// two ways to do this
// 1 - single page w/ lots of conditional rendering
// upside - DRYer code
// downside - would probably have to fetch and loop through my_objects_table 
// before rendering to determine whether given user has an item at all.

// 2 - page for all items vs page for my stock items
// still would have to grab and loop through all items, 
// then redirect on match.

// either way still going through everything in my_object_table
// prior to rendering. 
// 

// also need to deal with refreshing and hitting back button, if possible. Fix
// may be the same for both.

// array.includes()

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function StockItemDetail() {
    const history = useHistory();
    const stockItemDetail = useSelector(store => store.stockItemDetails)

    console.log(`item details:`, stockItemDetail);    // this will be conditional depending on the same criteria 
    // that renders this page differently based on whether the item appears in the user's list of sprockets.

    // this will be from the allitem list.
    // TODO : create dispatch WITHIN this page, not the allItems page - this will ensure data is rendered
    // correctly according to the ID of the page we have gone to.
    const headBack = () => {
        history.push('/mystock')
    }

    if (stockItemDetail) {
        return (
            <div>
                <h1>Words.</h1>
                <h3>{stockItemDetail.id} ??</h3>
                <button onClick={headBack}>Back</button>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Bad Words.</h1>
            </div>
        )
    }
}

export default StockItemDetail