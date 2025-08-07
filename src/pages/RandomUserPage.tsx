import { UserCard } from "../components/UserCard";
import { cleanUser } from "../libs/CleanUser";
import axios from "axios";
import { useState, useEffect } from "react";

export default function RandomUserPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genAmount, setGenAmount] = useState(1);

  const generateBtnOnClick = async () => {
    setIsLoading(true);
    const resp = await axios.get(
      `https://randomuser.me/api/?results=${genAmount}`
    );
    setIsLoading(false);
    const users = resp.data.results;
    //Your code here
    const cleanedUsers = users.map((user: any) => cleanUser(user));
    //Process result from api response with map function. Tips use function from /src/libs/CleanUser
    setUsers(cleanedUsers);
    //Then update state with function : setUsers(...)
  };

    useEffect(() => {
    const saved = localStorage.getItem("genAmount");
    if (saved) {
      setGenAmount(Number(saved));
    }
  }, []);

    useEffect(() => {
      localStorage.setItem("genAmount", String(genAmount));
  }, [genAmount]);


  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      <p className="display-4 text-center fst-italic m-4">Users Generator</p>
      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        Number of User(s)
        <input
          className="form-control text-center"
          style={{ maxWidth: "100px" }}
          type="number"
          onChange={(event: any) => setGenAmount(event.target.value)}
          value={genAmount}
        />
        <button className="btn btn-dark" onClick={generateBtnOnClick}>
          Generate
        </button>
      </div>
      {isLoading && (
        <p className="display-6 text-center fst-italic my-4">Loading ...</p>
      )}
      {users && !isLoading && users.map(/*code map rendering UserCard here */
      (users: any) =>
      <UserCard
        key={users.email}
        name={users.name}
        imgUrl={users.imgUrl}
        address={users.address}
        email={users.email}
      />
      )}
    </div>
  );
}
