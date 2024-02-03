import React, { useContext, useEffect, useState } from "react";
import { FormContext } from "../context/FormContext";

export default function Home() {
  const formContext = useContext(FormContext);
  const [resultData, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    formContext.setFormData({
      ...formContext.formData,
      [e.target.name]: e.target.value,
    });
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (
  //       !formContext.formData.location ||
  //       !formContext.formData.days ||
  //       !formContext.formData.style
  //     ) {
  //       return; // Skip fetching if data is not complete
  //     }

  //     try {
  //       setLoading(true);
  //       const res = await fetch("https://api.getknit.ai/v1/router/run", {
  //         method: "POST",
  //         headers: {
  //           "x-auth-token":
  //             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMTAwMDQxNTg4NDYzNjc1NTY1NDM2In0sImlhdCI6MTcwNjgwMjg4MCwiZXhwIjoxNzA3ODgyODgwfQ.0lkSgR2fWQK94n1NnGNSB29kP9xWQGpheek_ileo80M",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           messages: [
  //             {
  //               role: "user",
  //               content: `I am planning to have a ${formContext.formData.days}-day trip to ${formContext.formData.location}. We like to visit popular locations as well as offbeat hidden gems. We prefer medium-paced travel and are interested in visiting cultural places, seeing historic monuments, relaxing on beaches, interacting with wildlife, shopping for souvenirs, and enjoying nightlife.
  //           Please plan a day-wise itinerary for the trip along with places to visit. Provide the output in the following format closely look the format, add <break> as shown following:
  //           Day (e.g., Day 1)<break>
  //           Primary city for the day<break>
  //           Up to 4 locations to be covered day-wise in the following format:<break>
  //           - Location title<break>
  //           - Opening hours<break>
  //           - Distance from the previous location<break>`,
  //             },
  //           ],
  //           model: {
  //             name: "openai/gpt-4",
  //           },
  //           variables: [],
  //         }),
  //       });
  //       setLoading(false);
  //       const data = await res.json();
  //       setData(data.responseText.split("<break>"));
  //       console.log(data);
  //     } catch (error) {
  //       setLoading(false);
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, [formContext.formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formContext.formData),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const organizeData = resultData.map((element, index) => {
    if (element.includes("Day")) {
      return (
        <div key={index}>
          <br />
          <h1 className="font-semibold text-2xl">{element}</h1>
          <br />
        </div>
      );
    } else if (element.startsWith("\n-")) {
      return (
        <h2 key={index} className="font-semibold py-3">
          {element.slice(1).trim()}
        </h2>
      );
    } else if (element.includes("Reason:")) {
      return (
        <p key={index} className="p-3">
          {element.slice(8).trim()}
        </p>
      );
    } else {
      return <p key={index}>{element.trim()}</p>;
    }
  });

  console.log(formContext.formData);
  console.log(resultData);

  return (
    <>
      <div className="h-screen">
        <div className="relative text-center">
          <img src="../../public/back.png" alt="Background" />
          <h1 className="font-bold text-6xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Trip Planner 🧳
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex gap-4 p-20 mx-auto justify-center border-neutral-300 flex-wrap flex-col md:flex-row max-w-4xl rounded-xl border rounded-xl shadow-xl"
        >
          <input
            type="text"
            placeholder="Enter a location"
            name="location"
            id="location"
            className="border border-neutral-300 rounded-lg p-3 outline-none"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="No of days"
            name="days"
            className="border border-neutral-300 rounded-lg p-3 outline-none"
            id="days"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="travel style"
            name="style"
            id="style"
            className="border border-neutral-300 rounded-lg p-3 outline-none"
            onChange={handleChange}
          />

          <button className="p-3 my-3 bg-purple-500 rounded-lg text-white font-semibold mx-auto">
            Plan your trip
          </button>
        </form>

        <div className="relative flex justify-center w-full mt-20">
          {loading && <h1>Loading...</h1>}
          {!loading && resultData.length > 0 && (
            <>
              <div className="relative w-full h-[700px] flex">
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-6xl z-10 items-center">
                  Enjoy your trip
                </p>
                <img
                  src="../../public/res.jpg"
                  alt="Plan your trip"
                  className="w-full h-[400px] absolute rounded-xl z-1"
                />
              </div>
              <div className="flex justify-center mt-20 max-w-4xl mx-auto p-3 absolute">
                {resultData && !loading && (
                  <div className="border">
                    <div>
                      <img
                        src="../../public/coco.jpg"
                        className="rounded-xl w-full"
                        alt="Result"
                      />
                    </div>
                    <div className="p-20 rounded-xl bg-white">
                      <p className="text-left">{organizeData}</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
