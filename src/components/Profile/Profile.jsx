import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Profile() {
    const profile = useSelector(state => state.profile)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "FETCH_PROFILE" })
    }, []);



    return (
        <>
            <div>Profile Details</div>
            {profile.length &&
                profile.map((profileitem) => {
                    return (
                        <>
                        <h3>{profileitem.first_name} {profileitem.last_name}</h3>
                        <h3>{profileitem.user_email}</h3>
                        <h3>{profileitem.user_type}</h3>
                        </>
                    )
                })}
        </>
    )
}

export default Profile;