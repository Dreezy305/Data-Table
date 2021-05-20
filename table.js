import React from "react";
import "bootstrap/dist/css/bootstrap.css";

function table() {
  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Avatar</th>
          </tr>
        </thead>
        <tbody>
          {datas && datas.length > 0
            ? datas.map((user) => (
                <tr>
                  <td className=" table-striped">{user.id}</td>
                  <td className=" table-striped">{user.email}</td>
                  <td className=" table-striped">{user.first_name}</td>
                  <td className=" table-striped">{user.last_name}</td>
                  <td className=" table-striped" colspan="2">
                    {user.avatar}
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </div>
  );
}

export default table;
