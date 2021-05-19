import React, { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
// import ReactTable from "react-table-v6";
// import "react-table-v6/react-table.css";

function DataTable() {
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);

  const data = React.useMemo(
    () => [
      {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false,
      },
      {
        userId: 1,
        id: 2,
        title: "quis ut nam facilis et officia qui",
        completed: false,
      },
      {
        userId: 1,
        id: 3,
        title: "fugiat veniam minus",
        completed: false,
      },
      {
        userId: 1,
        id: 4,
        title: "et porro tempora",
        completed: true,
      },
      {
        userId: 1,
        id: 5,
        title:
          "laboriosam mollitia et enim quasi adipisci quia provident illum",
        completed: false,
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "USERID",
        accessor: "userId",
      },
      {
        Header: "TITLE",
        accessor: "title",
      },
      {
        Header: "COMPLETED",
        accessor: "completed",
      },
    ],
    []
  );

  // const columns = useMemo(() => [
  //   {
  //     Header: "ID",
  //     accessor: "id",
  //   },
  //   {
  //     Header: "USERID",
  //     accessor: "UserId",
  //   },
  //   {
  //     Header: "TITLE",
  //     accessor: "Title",
  //   },
  //   {
  //     Header: "COMPLETED",
  //     accessor: "Completed",
  //   },
  // ]);

  const getUsersData = (e) => {
    const userURI = "https://jsonplaceholder.cypress.io/todos";

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

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      {/* apply table props */}
      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            ></tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default DataTable;
