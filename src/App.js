import { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.scss";
import Home from "./component/Home";
import Msg from "./component/Msg";
import Room from "./component/Room";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rooms, setRooms] = useState([]);
  const token = process.env.REACT_APP_API_TOKEN;

  useEffect(() => {
    fetch("https://challenge.thef2e.com/api/thef2e2019/stage6/rooms", {
      headers: new Headers({
        Authorization: token,
      }),
    })
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setRooms(result["items"]);
        },
        error => {
          setIsLoaded(true);
          setError(error);
        }
      ); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (error) {
    return <Msg msg={error.message} />;
  } else if (!isLoaded) {
    return <Msg msg="Loading..." />;
  } else {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Home rooms={rooms} />
          </Route>
          <Route path="/room/:id" exact>
            <Room />
          </Route>
          <Redirect from="/*" to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
