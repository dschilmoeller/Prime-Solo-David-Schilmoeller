import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EditProfile from '../EditProfile/EditProfile';

function Profile() {
    const profile = useSelector(state => state.user)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "FETCH_PROFILE" })
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

    return (
        <div>
            <h2>Profile Details</h2>
            < EditProfile />
            <ul>
            <li>Full Name: {profile.first_name} {profile.last_name}</li>
            <li>Email: <a href={mailToProfile}>{profile.user_email}</a></li>
            {profile.user_type === "1" ? <li>Admin Status: Administrator</li> : <li>Admin Status: Not Administrator</li>}
            <li>Username: {profile.username}</li>
            {profile.supplier_company_name ? ( 
                <div>
            <h2>Supplier Status: Supplier</h2>
            <li>Supplier Corporate Name: {profile.supplier_company_name}</li>
            <li>Supplier Address: {profile.supplier_company_address}</li>
            <li>Supplier Phone: {formatPhoneNumber(profile.supplier_company_phone)}</li>
            <li>Supplier URL: {profile.supplier_company_url}</li>
            <li>Supplier Email: <a href={mailToCompany}>{profile.supplier_email}</a></li>
            </div>
            ) : null}
            </ul>
        </div>

    )
}

export default Profile;