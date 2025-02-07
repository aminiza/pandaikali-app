import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import {io} from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
});

const Home = (setUser) => {
  const [data, setData] = React.useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/data")
        const result = await response.json()

        if (Array.isArray(result.sensorJarak)) {
          setData(result.sensorJarak);
        } else {
          console.error("Unexpected data format", result)
          setData([]);
        }
  
      } catch(error) {
        console.log("Error fetching data:", error);
        setData([]);
      }
    };

    fetchData();

    socket.on("sensorUpdate", (newData) => {
      setData(newData);
    });
        return () => {
          socket.off("sensorUpdate");
        }
  }, []);

  return (
    <>
      <Navbar setUser={setUser} />
      <div className="p-4 mt-20">
        <h1 className="text-xl font-semibold mb-4">Monitoring Debit Air</h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">No.</th>
              <th className="border p-2">Timestamp</th>
              <th className="border p-2">Site</th>
              <th className="border p-2">Rssi</th>
              <th className="border p-2">Jarak</th>
              <th className="border p-2">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{new Date(item.timestamp).toLocaleString()}</td>
                  <td className="border p-2">{item.site}</td>
                  <td className="border p-2">{item.Rssi}</td>
                  <td className="border p-2">{item.jarak}</td>
                  <td className="border p-2">
                    {item.jarak > 400 ? "Batas Ambang" : "Normal"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border p-2 text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
