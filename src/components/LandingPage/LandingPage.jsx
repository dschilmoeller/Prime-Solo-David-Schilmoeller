import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import { Button } from '@mui/material';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>O Fortuna, Velut luna, Statu variabilis, Semper crescis, Aut decrescis;
            Vita detestabilis, Nunc obdurat, Et tunc curat, Ludo mentis aciem, Egestatem, Potestatem, Dissolvit ut glaciem.
            Sors immanis, Et inanis, Rota tu volubilis, Status malus, Vana salus, Semper dissolubilis, Obumbrata, Et velata, Michi quoque niteris;
            Nunc per ludum, Dorsum nudum, Fero tui sceleris.
            Sors salutis, Et virtutis, Michi nunc contraria, est affectus, et defectus, semper in angaria.
            Hac in hora, Sine mora, Corde pulsum tangite;
            Quod per sortem, Sternit fortem, Mecum omnes plangite!
          </p>

        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <Button variant="contained" className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </Button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
