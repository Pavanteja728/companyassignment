import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const onSuccess = () => {
    localStorage.setItem('isLoggedIn', true);
    navigate('/', { replace: true });
  };

  const onFailure = (errorMsg) => {
    setShowError(true);
    setError(errorMsg);
  };

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };
    const url = 'https://apis.ccbp.in/login';
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(url, options);
  const data = await response.json();
  console.log(response);
  console.log(data);
  if (response.ok === true) {
    onSuccess();
  } else {
    onFailure(data.error_msg);
  }
};

  return (
    <div className="loginSec">
      <img
        src="https://img.freepik.com/free-vector/appointment-booking_23-2148570756.jpg?t=st=1721361500~exp=1721365100~hmac=deeac3ff576b9648d744ef6dc91adda67a5167d70e67d23a380003c12832975e&w=740"
        alt="website login"
        className="websiteLogin"
      />
      <div className="loginBox">
        <img
          src="https://img.freepik.com/free-vector/vector-notebook-silhouette-design_779267-1820.jpg?t=st=1721361685~exp=1721365285~hmac=fa37861ddb1fd62f29c1d25b37bbf10b43d51b679e7b3fe8049b1df19324ecfd&w=740"
          alt="website logo"
          className="webLogin"
        />
        <form className="form-container" onSubmit={submitForm}>
          <label htmlFor="username" className="label">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="input"
            onChange={onUsernameChange}
            placeholder="Username"
          />
          <label htmlFor="password" className="label">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="input"
            onChange={onPasswordChange}
            placeholder="Password"
          />
          <button type="submit" className="loginButton">
            Login
          </button>
          {showError && <p className="errorPara">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;