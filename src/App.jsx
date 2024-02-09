import { useContext, useState } from "react";

import { UserContext } from "./context/userContext/userContext";
import login from "./lib/auth/login";
import setUserToken from "./lib/utils/setUserToken";

import getExpensesById from "./lib/expense/getExpenseById";
import getIncomeById from "./lib/income/getIncomeById";
// import Signup from "./components/signup/Signup";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { currentUser, setCurrentUser } = useContext(UserContext);

  function handelSubmit() {
    const user = login({ username, password });

    user.then((data) => {
      setCurrentUser(data.data.user);
      setUserToken(data.token);
    });
  }

  function handelAllExpense() {
    const data1 = getExpensesById("65c5b28f29d27f32df5646e1");
    const data2 = getIncomeById("65c5cb6db0a29bca190935f4");

    data1.then((data) => console.log(data));
    data2.then((data) => console.log(data));
  }

  return (
    <div className="app">
      <h1>{currentUser && currentUser.username}</h1>
      <button onClick={handelAllExpense}>Get All Expenses</button>
      <button>Get All Incomes</button>

      <form>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <button onClick={handelSubmit}>Login</button>
    </div>
  );
}

export default App;
