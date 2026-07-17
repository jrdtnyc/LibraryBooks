function App() {
  return (
    <div>
      <h1>
        <img id="logo-image" src="books.png" />
        Library App
      </h1>

      <p>
        Complete the React components needed to allow users to browse a library catalog, check out
        books, log in to their account,
        <br />
        log out of their account, review their account, and return books that they've finished
        reading.
      </p>

      <p>
        Recall that React really only cares about state. When our state changes our view changes as
        well.
      </p>

      <p>
        To that end, you may need to use some state in this top-level component in other components
        by passing them down as a prop.
      </p>
      <p>OR</p>
      <p>
        Implement context in a way that allows all the components the need to know what's in the
        context to have access to and be able to consume the right context.
      </p>

      <p>
        Don't forget that our URL should dictate our view! Set up React Router to navigate between
        the different views of your single page application!
      </p>
    </div>
  );
}

export default App;
