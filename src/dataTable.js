import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

function DataTable() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [datas, setDatas] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [perPage, setPerPage] = useState(2);
  // const [currentPage, setcurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getTotalPage = () => {
    if (users.length > 0) {
      setTotalPage(users.length / perPage);
    }
    setEnd(perPage);
  };

  const handlePerPage = (e) => {
    console.log(e.target.value);
    setPerPage(e.target.value);
  };

  const next = () => {
    setStart((prev) => prev + perPage);
    setEnd((prev) => prev + perPage);
  };

  const prev = () => {
    setStart((prev) => Math.abs(prev - perPage));
    setEnd((prev) => Math.abs(prev - perPage));
  };

  console.log(datas, "data");
  console.log(end, "end");
  console.log(start, "start");

  const getUsersData = (e) => {
    const userURI =
      "https://superstore-trans.herokuapp.com/store-sample?limit=35";

    fetch(userURI, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(!loading);
        setUsers(data.data);
        setDatas(data.data.slice(start, end));
        getTotalPage();
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

  useEffect(() => {
    // if (start && end) {
    setDatas(users.slice(start, end));
    // }
  }, [start, end, perPage]);

  return (
    <>
      {/* apply table props */}

      <div
        class="card border border-2 rounded-3"
        style={{ width: "80%", margin: "auto", top: "50px" }}
      >
        <div class="card-body">
          <h5 class="card-title float-start">Latest Transactions</h5>
          <div class="d-inline">
            <div class="d-inline p-2 text-dark float-left">Enteries</div>
            <div class="d-inline p-2  text-dark float-right">
              <input class="form-control" placeholder="Search..." />
            </div>
          </div>
          <table class="table" style={{ marginTop: "30px" }}>
            <thead>
              <tr>
                <th scope="col">ORDER ID</th>
                <th scope="col">ORDER DATE</th>
                <th scope="col">CUSTOMER ID</th>
                <th scope="col">CUSTOMER NAME</th>
                <th scope="col">PRODUCT NAME</th>
                <th scope="col">CITY</th>
                <th scope="col">COUNTRY</th>
                <th scope="col">SALES</th>
              </tr>
            </thead>
            <tbody>
              {datas && datas.length > 0
                ? datas.map((user) => (
                    <tr>
                      <td className=" table-striped">{user.Order_ID}</td>
                      <td className=" table-striped">{user.Order_Date}</td>
                      <td className=" table-striped">{user.Customer_Name}</td>
                      <td className=" table-striped">{user.Product_Name}</td>
                      <td className=" table-striped">{user.City}</td>
                      <td className=" table-striped">{user.Country}</td>
                      <td className=" table-striped">{user.Sales}</td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>

          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-end">
              <li class="page-item">
                <button
                  class="page-link rounded-circle"
                  href="#"
                  aria-label="Previous"
                  onClick={prev}
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              <li class="page-item">
                <button className="page-link rounded-circle" href="#">
                  1
                </button>
              </li>
              <li class="page-item">
                <button className="page-link rounded-circle" href="#">
                  2
                </button>
              </li>
              <li class="page-item">
                <button className="page-link rounded-circle" href="#">
                  3
                </button>
              </li>
              <li class="page-item">
                <button
                  className="page-link rounded-circle"
                  href="#"
                  aria-label="Next"
                  onClick={next}
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* <button onClick={prev}>prev</button>
      <button onClick={next}>next</button>
      <select onchage={handlePerPage}>
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="6">6</option>
      </select> */}
    </>
  );
}

export default DataTable;
