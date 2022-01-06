import React from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { login } from "../../action/auth";

export const LoginWithGoogle = () => {
  const dispatch = useDispatch();

  const failure = () => {
      console.log('Failure')
  }

  function handleCredentialResponse(response) {
    const body = { id_token: response.tokenId };

    fetch("http://localhost:8080/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((resp) => {

        dispatch(
          login({
            uid: resp.usuario.uid,
            name: resp.usuario.nombre,
          })
        );
        localStorage.setItem("email", resp.usuario.correo);
      })
      .catch(console.warn);
  }

  return (
    <div className=" mt-5 auth__social-networks ">
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
