import { useRecoilValue } from "recoil";
import { userEmailState } from "../store/selectors/userEmail";

function Document() {

  const userEmail = useRecoilValue(userEmailState);
  console.log(userEmail);
  
    return (
      <div>
        <h1>ok</h1>
    </div>
    )
  }

  export default Document;