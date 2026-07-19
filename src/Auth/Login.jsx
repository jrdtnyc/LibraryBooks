import { useNavigate } from "react-router";
const Login = ({ authenticate }) => {
  const navigate = useNavigate();
  const login = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    const user = {
      email,
      password,
    };
    console.log(JSON.stringify(user));
    const storedToken = window.localStorage.getItem("token");
    try {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify(user),
        },
      );
      if (!response.ok) throw Error("Authentication failed.");
      const loginResponse = await response.json();
      window.localStorage.setItem("token", loginResponse.token);
      authenticate();
      navigate("/");
    } catch (e) {
      console.error(e);
      window.alert(e);
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
    </div>
  );
};

export default Login;
