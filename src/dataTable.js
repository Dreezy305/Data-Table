import React, { useState, useEffect } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

function DataTable() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Name",
      accessor: "name",
    },

    {
      Header: "Username",
      accessor: "username",
    },
    {
      Header: "Phone",
      accessor: "phone",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Website",
      accessor: "website",
    },
  ];

  const getUsersData = (e) => {
    const userURI = "https://jsonplaceholder.typicode.com/users";

    fetch(userURI, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(!loading);
        setUsers(data);
        console.log("succes", data);
      })
      .catch((err) => {
        setLoading(false);
        console.log("error fetching data", err);
      });
  };

  useEffect(async () => {
    await getUsersData();
  }, []);

  return <ReactTable data={users} columns={columns} />;
}

export default DataTable;
