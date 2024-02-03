// import React, { useState } from "react";

// export default function Result() {
//   const [data, setData] = useState([]);
//   const fetchData = async () => {
//     const res = await fetch(
//       "https://api.getknit.ai/v1/chain/b596f511-1752-4aa1-92ef-f6f0f28b4f7c/prompt/e0175c26-28d2-4bd5-82a7-9df62db97c17",
//       {
//         headers: {
//           "x-auth-token":
//             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMTAwMDQxNTg4NDYzNjc1NTY1NDM2In0sImlhdCI6MTcwNjgwMjg4MCwiZXhwIjoxNzA3ODgyODgwfQ.0lkSgR2fWQK94n1NnGNSB29kP9xWQGpheek_ileo80M",
//         },
//       }
//     );
//     const daata = await res.json();
//     console.log(data);
//     setData(daata);
//   };
//   return <div>{data}</div>;
// }
