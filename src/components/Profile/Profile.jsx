import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EditProfile from '../EditProfile/EditProfile';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

function Profile() {
    const dispatch = useDispatch();
    const history = useHistory()
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

    const redirectToAbout = () => {
        history.push('/about')
    }

    return (
        <div>
            <div className='general-container'>


            </div>
            <h1 id='my-profile-details' onClick={redirectToAbout}>My Profile Details</h1>
            <div className='buffer-box'>

                <table>
                    <tr>
                        <td><b>Full Name:</b></td>
                        <td>{profile.first_name} {profile.last_name}</td>
                    </tr>
                    <tr>
                        <td><b>Email:</b></td>
                        <td><a href={mailToProfile}>{profile.user_email}</a></td>
                    </tr>
                    <tr>
                        <td><b>Username: </b></td>
                        <td>{profile.username}</td>
                    </tr>
                    <tr>
                        <td><b>Account Type:</b></td>
                        {profile.supplier_company_name ? (
                            <>
                                {profile.user_type === 1 ? <td>Master Administrator</td> : null}
                                {profile.user_type === 2 ? <td>Supplier Administrator</td> : null}
                                {profile.user_type === 3 ? <td>Supplier</td> : null}
                                {profile.user_type === 4 ? <td>Dealer</td> : null}
                            </>
                        ) : null}
                    </tr>
                    {profile.supplier_company_name ? (
                        <>
                            <tr>
                                <td><b>Supplier Corporate Name:</b></td>
                                <td>{profile.supplier_company_name}</td>
                            </tr>
                            <tr>
                                <td><b>Supplier Address:</b></td>
                                <td>{profile.supplier_company_address}</td>
                            </tr>
                            <tr>
                                <td><b>Supplier Phone:</b></td>
                                <td>{formatPhoneNumber(profile.supplier_company_phone)}</td>
                            </tr>
                            <tr>
                                <td><b>Supplier Url:</b></td>
                                <td><a href={profile.supplier_company_url}>{profile.supplier_company_url}</a></td>
                            </tr>
                            <tr>
                                <td><b>Supplier Email</b></td>
                                <td><a href={mailToCompany}>{profile.supplier_email}</a></td>
                            </tr>
                        </>
                    ) : null}

                </table>
                <br />
                < EditProfile />
                <br />

                {profile.user_type === 1 ? (

                    <div className="user-admin-container">
                        {allUsers.length > 0 && userTypes.length > 0 ? (
                            <ul>
                                <h2>User Administration Area:</h2>
                                <br />
                                {allUsers.map(item => {
                                    if (item.username != profile.username) {
                                        return (
                                            <div key={item.id}>
                                                <li>Username: {item.username}</li>
                                                <li>User Email: <a href={item.user_email}>{item.user_email}</a></li>
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
                        ) : null}
                    </div>
                ) : null}

            </div>

        </div>

    )
}

export default Profile;