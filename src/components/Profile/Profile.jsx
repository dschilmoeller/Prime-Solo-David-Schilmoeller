import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EditProfile from '../EditProfile/EditProfile';
import { Button } from '@mui/material';

function Profile() {
    const dispatch = useDispatch();

    const profile = useSelector(state => state.user)
    const allUsers = useSelector(state => state.allusers)
    const userTypes = useSelector(state => state.usertypes)

    useEffect(() => {
        dispatch({ type: "FETCH_PROFILE" })
        if (profile.user_type === 1) {
            dispatch({ type: 'FETCH_ALL_USERS' })
            dispatch({ type: 'FETCH_USER_TYPES' })
        }
    }, []);

    let mailToProfile = `mailto: ${profile.user_email}`
    let mailToCompany = `mailto: ${profile.supplier_email}`

    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            var intlCode = (match[1] ? '+1 ' : '');
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
        }
        return null;
    }

    const handleTypeChange = (e) => {
        dispatch({ type: 'EDIT_USER_TYPE', payload: { type: e.target.value, target: e.target.id } })
    }

    return (
        <div>
            <div className='general-container'>
            <h2>Profile Details</h2>
            < EditProfile />
            </div>
            <ul>
                <li>Full Name: {profile.first_name} {profile.last_name}</li>
                <li>Email: <a href={mailToProfile}>{profile.user_email}</a></li>
                {profile.user_type === 1 ? <li>Admin Status: Administrator</li> : <li>Admin Status: Not Administrator</li>}
                <li>Username: {profile.username}</li>
                {profile.supplier_company_name ? (
                    <div>

                        {profile.user_type === 1 ? <li>Account Type: Master Administrator</li> : null }
                        {profile.user_type === 2 ? <li>Account Type: Supplier Administrator</li> : null }
                        {profile.user_type === 3 ? <li>Account Type: Supplier</li> : null }
                        {profile.user_type === 4 ? <li>Account Type: Dealer</li> : null }

                        <li>Supplier Corporate Name: {profile.supplier_company_name}</li>
                        <li>Supplier Address: {profile.supplier_company_address}</li>
                        <li>Supplier Phone: {formatPhoneNumber(profile.supplier_company_phone)}</li>
                        <li>Supplier URL: {profile.supplier_company_url}</li>
                        <li>Supplier Email: <a href={mailToCompany}>{profile.supplier_email}</a></li>
                    </div>
                ) : null}
            </ul>

            {profile.user_type === 1 ? (
                <div>
                   {allUsers ? ( 
                    <ul>
                        <h2>User Administration Area:</h2>
                        {allUsers.map(item => {
                            if (item.username != profile.username) {
                                return (
                                    <div key={item.id}>
                                        <li>Username: {item.username}</li>
                                        <li> <a href={item.user_email}>{item.user_email}</a></li>
                                        <li>
                                            <label htmlFor='user_types'>User Type: </label>
                                            <select name='user_type' defaultValue={item.user_type_name} id={item.id} onChange={handleTypeChange}>
                                                {userTypes.map(type => {
                                                    return (
                                                        <option key={type.id} value={type.user_type_name}>{type.user_type_name}</option>
                                                    )
                                                })}
                                            </select>
                                        </li>
                                        <br />
                                    </div>)
                            }
                        })}
                    </ul>
) : null }
                </div>
            ) : null}

        </div>



    )
}

export default Profile;