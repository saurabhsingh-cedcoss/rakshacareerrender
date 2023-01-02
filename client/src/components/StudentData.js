import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
function StudentData(data) {
  const location = useLocation();
  console.log(location);
  const [feesSubmitted, setFeesSubmitted] = useState(0);
  // console.log(data.data,"dataaaa")

  const submitFees = () => {
    axios
      .post("/submitFee", {
        admissionNo: location.state.admissionNo,
        totalFees: location.state.totalFee,
        paidFees: feesSubmitted,
      })
      .then(function (response) {
        console.log(response.data);
      });
  };
  return (
    <>
      <h2>Student Data</h2>
      <table>
        {Object.keys(location.state).map((index) => (
          <tr style={{ fontSize: "15px" }}>
            <td
              style={{
                margin: "10px",
                padding: "10px",
                backgroundColor: "",
                borderRadius: "24px",
                color: "darkmagenta",
              }}
            >
              {index}
            </td>
            <td style={{ margin: "10px", padding: "10px" }}>
              {location.state[index]?.toString()}
            </td>
          </tr>
        ))}
      </table>
      <div>
        Submit Fees
        <input
          type="number"
          onChange={(e) => setFeesSubmitted(e.target.value)}
        />
        <button onClick={submitFees}>submit</button>
      </div>
    </>
  );
}

export default StudentData;
