import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";
import { useParams } from "react-router-dom";

const DATA_API_URL = "https://stg.dhunjam.in/account/admin";
const Dashboard = () => {
  const [restoData, setRestoData] = useState(null);

  const [selectedOption, setSelectedOption] = useState();
  const [caterogySix, setCaterogySix] = useState("");
  const [caterogySeven, setCaterogySeven] = useState("");
  const [caterogyEight, setCaterogyEight] = useState("");
  const [caterogyNine, setCaterogyNine] = useState("");
  const [caterogyTen, setCaterogyTen] = useState("");
  const [isReadOnly, setIsReadOnly] = useState();
  const [isDisabled, setIsDisabled] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${DATA_API_URL}/${id}`);
        const result = await response.json();
        console.log(result);
        setRestoData(result);
        setSelectedOption(result.data.charge_customers);
        setCaterogySix(result.data.amount.category_6);
        setCaterogySeven(result.data.amount.category_7);
        setCaterogyEight(result.data.amount.category_8);
        setCaterogyNine(result.data.amount.category_9);
        setCaterogyTen(result.data.amount.category_10);
        setIsReadOnly(result?.data?.charge_customers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const setInputData = (event, setter) => {
    const input = event.target.value;

    const sanitizedInput = input.replace(/[^0-9]/g, "");
    console.log(sanitizedInput);

    setter(sanitizedInput);
  };
  useEffect(() => {
    if (isReadOnly == false) {
      setIsDisabled(true);
    } else if (
      caterogySix > 98 &&
      caterogySeven > 78 &&
      caterogyEight > 58 &&
      caterogyNine > 38 &&
      caterogyTen > 18
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [setInputData, id, isReadOnly]);

  const amountDataUpdate = async () => {
    try {
      const response = await fetch(`${DATA_API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: {
            category_6: caterogySix,
            category_7: caterogySeven,
            category_8: caterogyEight,
            category_9: caterogyNine,
            category_10: caterogyTen,
          },
        }),
      });

      if (response.ok) {
        console.log("Amount updated successfully.");
      } else {
        console.error("Failed to update amount.");
      }
    } catch (error) {
      console.error("Error updating amount:", error);
    }
  };
  const chartData = [
    caterogySix,
    caterogySeven,
    caterogyEight,
    caterogyNine,
    caterogyTen,
  ];

  return (
    <div className="login-page max-w-2xl m-auto h-full bg-black">
      <div className="flex flex-col text-white justify-center items-center">
        <h1 className="heading  my-8">
          {restoData?.data?.name}, {restoData?.data?.location} on Dhun Jam
        </h1>
        <div>
          <div className="flex my-3">
            <p className="flex flex-1 text-base">
              do you want to charge your customers for requesting songs?
            </p>
            <div className="flex flex-1 items-center justify-center">
              <label className="mx-2 text-base">
                <input
                  type="radio"
                  value="true"
                  className={`${
                    !isReadOnly
                      ? "disable-color mx-2"
                      : "mx-2 selected-radio-btn-color"
                  }`}
                  checked={selectedOption === true}
                  readOnly
                />
                Yes
              </label>{" "}
              <label className="mx-2 text-base">
                <input
                  type="radio"
                  value="false"
                  className={`${!isReadOnly ? "disable-color mx-2" : "mx-2"}`}
                  checked={selectedOption === false}
                  readOnly
                />
                No
              </label>
            </div>
          </div>
          <div className="flex my-8 ">
            <p className="flex flex-1 text-base items-center">
              Custom song request amount -
            </p>
            <div className="flex flex-1 items-center justify-center w-11/12">
              <input
                type="text"
                id="caterogySix"
                name="caterogySix"
                value={caterogySix}
                className={`${
                  !isReadOnly
                    ? "disable-color txt-box mr-4 text-center"
                    : "txt-box mr-4 text-center"
                }`}
                onChange={(e) => setInputData(e, setCaterogySix)}
                readOnly={!isReadOnly}
                required
              />
            </div>
          </div>
          <div className="flex my-8 ">
            <p className="flex flex-1 text-base items-center">
              Regular song request amounts,
              <br /> from high to low -
            </p>
            <div className="flex flex-1 items-center justify-center w-11/12">
              <input
                type="text"
                id="caterogySeven"
                name="caterogySeven"
                value={caterogySeven}
                className={`${
                  !isReadOnly ? "disable-color txt-box mr-4" : "txt-box mr-4"
                }`}
                onChange={(e) => setInputData(e, setCaterogySeven)}
                readOnly={!isReadOnly}
                required
              />
              <input
                type="text"
                id="categoryEight"
                name="categoryEight"
                value={caterogyEight}
                className={`${
                  !isReadOnly ? "disable-color txt-box mr-4" : "txt-box mr-4"
                }`}
                onChange={(e) => setInputData(e, setCaterogyEight)}
                readOnly={!isReadOnly}
                required
              />
              <input
                type="text"
                id="categoryNine"
                name="categoryNine"
                value={caterogyNine}
                onChange={(e) => setInputData(e, setCaterogyNine)}
                readOnly={!isReadOnly}
                className={`${
                  !isReadOnly ? "disable-color txt-box mr-4" : "txt-box mr-4"
                }`}
                required
              />
              <input
                type="text"
                id="categoryTen"
                name="categoryTen"
                value={caterogyTen}
                readOnly={!isReadOnly}
                onChange={(e) => setInputData(e, setCaterogyTen)}
                className={`${
                  !isReadOnly ? "disable-color txt-box mr-4" : "txt-box mr-4"
                }`}
                required
              />
            </div>
          </div>
        </div>
        {selectedOption && (
          <div className="w-full h-full flex flex-row ">
            <h1 className="mt-5 mx-2 text-xl ">₹</h1>
            <div className="w-full">
              <BarChart className="w-full" chartData={chartData} />
            </div>
          </div>
        )}
        <button
          type="button"
          className={`${
            !isReadOnly
              ? "disable-color btn py-2 rounded-xl"
              : "btn py-2 rounded-xl"
          }`}
          disabled={isDisabled}
          onClick={amountDataUpdate}
        >
          Save
        </button>
      </div>
    </div>
  );
};
export default Dashboard;
