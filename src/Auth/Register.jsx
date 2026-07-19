import { useNavigate } from "react-router";
const Register = () => {
  const navigate = useNavigate();
  const register = async (formData) => {
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const password = formData.get("password");
    const user = {
      firstname,
      lastname,
      email,
      password,
    };
    try {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        },
      );
      const result = await response.json();
      console.log(result.token);
      window.localStorage.setItem("token", result.token);
      navigate("/login");
    } catch (e) {
      console.error(e);
      window.alert(e);
    }
  };
  return (
    <div>
      <h4>Sign Up!</h4>
      <form action={register}>
        <label>
          First Name
          <input name="firstname" />
        </label>
        <label>
          Last Name
          <input name="lastname" />
        </label>
        <label>
          EMAIL
          <input name="email" />
        </label>
        <label>
          Password
          <input name="password" />
        </label>
        <button>Register</button>
      </form>
    </div>
  );
};
export default Register;
