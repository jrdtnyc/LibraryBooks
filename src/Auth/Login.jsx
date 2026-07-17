import axios from "axios";
import { useNavigate } from "react-router";

const Login = ({ setToken, authenticate, setError, error }) => {
  const navigate = useNavigate();

  const login = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    const user = {
      email,
      password,
    };

    try {
      if (!token) throw Error("No token found.");

      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(loginData),
        },
      );

      //console.log(data);
      window.localStorage.setItem("token", response.token);
      setToken(response.token);
      authenticate();
      setError("");
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.status);
    }
  };

  return (
    <div>
      <h4>Please log in!</h4>
      <form action={login}>
        <label>
          EMAIL
          <input type="text" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Login</button>
      </form>

      <div>{error === 401 ? <p>Incorrect Credentials</p> : null}</div>
    </div>
  );
};

export default Login;
