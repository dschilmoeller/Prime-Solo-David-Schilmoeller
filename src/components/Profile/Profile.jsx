import {useEffect} from 'react'
import {useDispatch} from 'react-redux'

function Profile() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "FETCH_PROFILE" })
    }, []);


    return (
        <>
        <div>Profile Details</div>
        <div>Words</div>
        </>
    )
}

export default Profile;