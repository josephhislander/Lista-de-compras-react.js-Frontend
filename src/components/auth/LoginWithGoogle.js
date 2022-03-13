import React from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { login } from "../../action/auth";


export const LoginWithGoogle = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();

  const failure = () => {
      console.log('Failure')
  }

  function handleCredentialResponse(response) {
    const body = { id_token: response.tokenId };

    fetch( baseUrl+"/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        localStorage.setItem("email", resp.usuario.correo);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('token-init-date', new Date().getTime());
        dispatch(
          login({
            uid: resp.usuario.uid,
            name: resp.usuario.nombre,
          })
        );
      })
      .catch(console.warn);
  }

  return (
    <div className=" mt-5 text-center auth__social-networks ">
      <GoogleLogin
        clientId="153363051251-ns1m9qcf2e3qrm2j0ho9ipcq18ta6eah.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={handleCredentialResponse}
        onFailure={failure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};
