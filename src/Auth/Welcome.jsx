const Welcome = ({ user }) => {
  return (
    <div>
      <h1>Welcome to The Library</h1>

      {user.id ? (
        <div>
          <h2>Welcome back {user.username}</h2>
        </div>
      ) : null}
    </div>
  );
};

export default Welcome;
