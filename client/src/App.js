import React, { useState, useEffect } from "react";
 

import "./App.css";

function App() {
  const [link, setLink] = useState("");
  const [email, setEmail] = useState("");

  useEffect(async () => {
    /*     Hacemos una petición a el endpoint datauser para recoger los datos del usuario confirmado
  */

    const peticion = await fetch("/datauser")
      .then((response) => response.json())
      .then((res) => res);

 

    /*  Cogemos de localStorage los datos
     */ let data = JSON.parse(localStorage.getItem("auth"));

    /*  Si localStorage no tiene datos , guardamos el flag status: false
     */ if (!data) {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          status: false,
        })
      );
      /*       Si el fetch nos devuelve tanto el status en true como un email guardamos los datos en localStorage
       */
    } else {
      if (peticion.status == true && peticion.email !== "") {
        localStorage.setItem(
          "auth",
          JSON.stringify({
            status: true,
            email: peticion.email,
          })
        );
      } else {
      }
    }
  }, []);

  const sendEmailConfirmation = async (e) => {
    e.preventDefault();

    let data = JSON.parse(localStorage.getItem("auth"));

    if (data.status == false) {
      let data = {
        email,
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      };

      fetch("/confirmuser", requestOptions)
        .then((response) => response.json())
        .then((res) => setLink(res.link));
    } else if (data.status == true && data.email == email) {
      alert("Ya has confirmado el usuario anteriormente");
    } else if (
      (data.status == true) | (data.status == true) &&
      data.email !== email
    ) {
      let data = {
        email,
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      };

      fetch("/confirmuser", requestOptions)
        .then((response) => response.json())
        .then((res) => setLink(res.link));
    }
  };

  return (
    <div className="App">
      <section className="slide-in-top">
        {/*     Este es el formulario */}
        <h1>LOGIN</h1>
        <form action="">
          <label htmlFor="">Introduzca email</label>
          <br />
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
          <br />
          <button onClick={(e) => sendEmailConfirmation(e)}>Enviar</button>
        </form>
      </section>

      {link ? (
        <p>
          <a href={link}>
            <button className="confirmed-link">Link de confirmación</button>
          </a>
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
