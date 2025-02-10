import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Button from "../../components/button/Button";

const API_URL = import .meta.env.VITE_APP_BASE_URL || "http://localhost:5000";


const History = ({ setUser }) => {
  const [historyData, setHistoryData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${API_URL}/history`, {
          method: "GET",
          credentials: "include",
        });

        // console.log("Response status:", response.status)

        if (!response.ok) {
          throw new Error("Failed to fetch History");
        }
        const data = await response.json();
        // console.log("Fetch data", data)

        setHistoryData(data.HistorySensorJarak);

        //simpan ke localStorage sebagai cache
        localStorage.setItem(
          "historyData",
          JSON.stringify(data.HistorySensorJarak)
        );
      } catch (error) {
        setError(error.message);
        console.log("Error fetching data:", error.message);

        //get cache jika ada
        const cacheData = JSON.parse(localStorage.getItem("historyData")) || [];
        setHistoryData(cacheData);
      }
    };

    fetchHistory();
  }, []);

  //Update History jika localStorage berubah
  useEffect(() => {
    const handleStorageChange = () => {
      const updateHistory =
        JSON.parse(localStorage.getItem("historyData")) || [];
      setHistoryData(updateHistory);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <>
      <Navbar setUser={setUser} />
      <div className="p-6 mt-20">
        <h1 className="text-2xl font-semibold mb-4">History Monitoring</h1>

        {error && (
          <div className="text-red-500 mb-4">Error Handling: {error}</div>
        )}

        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="border p-3">No.</th>
                <th className="border p-3">Timestamp</th>
                <th className="border p-3">Site</th>
                <th className="border p-3">Rssi</th>
                <th className="border p-3">Jarak (cm)</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {historyData.length > 0 ? (
                historyData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border p-3">{index + 1}</td>
                    <td className="border p-3">
                      {new Date(item.timestamp).toLocaleString()}
                    </td>
                    <td className="border p-3">{item.site}</td>
                    <td className="border p-3">{item.Rssi}</td>
                    <td
                      className={`border p-3 font-bold ${
                        item.jarak > 400 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {item.jarak}{" "}
                    </td>
                    <td className="border p-3">
                      {item.jarak > 400 ? "Batas Ambang" : "Normal"}{" "}
                    </td>
                    <td className="border p-3">
                      <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                        Detail
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="border p-3 text-gray-500">
                    No History Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default History;
