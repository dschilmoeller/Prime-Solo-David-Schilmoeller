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