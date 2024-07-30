import axios from "axios";
import { useState, useEffect } from "react";
import { formatDate } from "../../components/formatDate";

export default function AdminPage() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");

  let usersToken = localStorage.getItem("acctkn");
  usersToken = usersToken ? JSON.parse(usersToken) : null;

  const fetchBorrowedBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8000/books/borrowed-book", {
        headers: {
          accesstoken: usersToken,
        },
      });
      setBorrowedBooks(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredBooks = filterStatus
    ? borrowedBooks.filter((item) => item.status === filterStatus)
    : borrowedBooks;

  useEffect(() => {
    console.log(filterStatus);
    fetchBorrowedBooks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-center font-semibold text-xl">
        Welcome, Admin
      </div>
      <div className="overflow-x-auto pt-3">
        <div className="flex justify-end mb-3 pr-3">
          <select
            className="select select-bordered"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Returned">Returned</option>
            <option value="Past_Date">Past Date</option>
            <option value="Borrowed">Borrowed</option>
          </select>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Book Title</th>
              <th>User</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length >= 1 ? (
              filteredBooks.map((item, index) => {
                return (
                  <tr key={index}>
                    <th>{item.id}</th>
                    <td>{item.book_title}</td>
                    <td>{item.user}</td>
                    <td>{formatDate(item.start_date)}</td>
                    <td>{formatDate(item.end_date)}</td>
                    <td
                      className={`font-semibold ${
                        item.status === "Returned"
                          ? "text text-emerald-600"
                          : item.status === "Borrowed"
                          ? "text-black"
                          : "text-red-400"
                      }`}
                    >
                      {item.status === "Past_Date" ? "Past Date" : item.status}
                    </td>
                  </tr>
                );
              })
            ) : (
              <div className="text-zinc-400 font-semibold flex items-center pl-2">
                No Books Found!
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
