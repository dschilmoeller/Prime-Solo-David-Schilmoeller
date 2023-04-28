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
            <h1>Profile Details</h1>
            < EditProfile />
            </div>
            <ul className='general-container'>
                <div className='header-item'>Full Name: {profile.first_name} {profile.last_name}</div>
                <div className='part-number'>Email: <a href={mailToProfile}>{profile.user_email}</a></div>
                {profile.user_type === 1 ? <div className='description'>Admin Status: Administrator</div> : <div className='description'>Admin Status: Not Administrator</div>}
                <div className='description'>Username: {profile.username}</div>
                {profile.supplier_company_name ? (
                    <div>

                        {profile.user_type === 1 ? <div className='description'>Account Type: Master Administrator</div> : null }
                        {profile.user_type === 2 ? <div className='description'>Account Type: Supplier Administrator</div> : null }
                        {profile.user_type === 3 ? <div className='description'>Account Type: Supplier</div> : null }
                        {profile.user_type === 4 ? <div className='description'>Account Type: Dealer</div> : null }

                        <div>Supplier Corporate Name: {profile.supplier_company_name}</div>
                        <div>Supplier Address: {profile.supplier_company_address}</div>
                        <div>Supplier Phone: {formatPhoneNumber(profile.supplier_company_phone)}</div>
                        <div>Supplier URL: {profile.supplier_company_url}</div>
                        <div>Supplier Email: <a href={mailToCompany}>{profile.supplier_email}</a></div>
                    </div>
                ) : null}
            </ul>

            {profile.user_type === 1 ? (

                <div className="user-admin-container">
                   {allUsers.length > 0 && userTypes.length > 0 ? ( 
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