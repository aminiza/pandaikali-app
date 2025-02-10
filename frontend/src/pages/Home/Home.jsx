import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Button from "../../components/button/Button";
import PaginateButton from "../../components/button/PaginateButton";

const Home = ({setUser}) => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 5;

  useEffect(() => {
    fetch("http://localhost:5000/data")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
        } else {
          setData([])
        }
        setData(data.sensorJarak) || [];
      }).catch((error) => {
        console.error("Error fetching data:", error);
        setData([]);
      });

  }, []);

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexFirstItem = indexOfLastItem - itemsPerPage;
  // const currentData = data.slice(indexFirstItem, indexOfLastItem);

  // const totalPage  = Math.ceil(data.length / itemsPerPage);

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber)
  // }

  return (
    <>
      <Navbar setUser={setUser} />
      <div className="p-4 mt-20">
        <h1 className="text-xl font-semibold mb-4 text-center">Monitoring Debit Air</h1>
        <div className="overflow-x-auto flex items-center justify-center">
        <table className="w-3/4 border-collapse border border-gray-300 items-center">
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

        {/* <div className="flex justify-center mt-4">
            <nav>
              <ul className="flex space-x-2">
                {Array.from({length: totalPage}, (_, index) => (
                  <li key={index}>
                    <Button 
                    onClick={() => handlePageChange(index+1)}
                    className={`px-2 py-1.5 border rounded text-xs ${
                      currentPage === index + 1 ? "bg-blue-500 text-white" :
                      "bg-white text-blue-500"
                    }`}
                    >
                      {index + 1}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
        </div>
            <div>
              <PaginateButton />
            </div> */}
      </div>
    </>
  );
};

export default Home;
