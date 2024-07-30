import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { formatDate } from "../../components/formatDate";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [myBook, setMyBook] = useState([]);
  const [myBookStatus, setMyBookStatus] = useState("");
  const [endBorrowDate, setEndBorrowDate] = useState("");

  const stateUser = useSelector((state) => state.user);
  let usersToken = localStorage.getItem("acctkn");
  usersToken = usersToken ? JSON.parse(usersToken) : null;

  const onHandleBorrowABook = async (item) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/books/borrow-a-book",
        {
          email: stateUser.email,
          book_title: item.title,
        },
        {
          headers: {
            accesstoken: usersToken,
          },
        }
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const onHandleReturnBorrowedBook = async (myBook) => {
    try {
      const res = await axios.put(
        "http://localhost:8000/books/return-borrowed-book",
        {
          email: stateUser.email,
          book_title: myBook,
        },
        {
          headers: {
            accesstoken: usersToken,
          },
        }
      );
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.reload();
      }, [1000]);
    } catch (error) {
      next(error);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/books");
        setBooks(res.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    const fetchMyBook = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8000/books/my-book",
          {
            email: stateUser.email,
          },
          {
            headers: {
              accesstoken: usersToken,
            },
          }
        );

        setMyBook(res.data.data.book_title);
        setMyBookStatus(res.data.data.status);
        setEndBorrowDate(formatDate(res.data.data.end_date));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyBook();
    fetchBooks();
  }, [books, myBook]);

  return (
    <div className="container mx-auto p-4 flex justify-between">
      <div className="w-1/2">
        <div className="w-full grid grid-cols-3">
          <div className="pl-10">Title</div>
          <div className="pl-9">Author</div>
          <div className="pl-1">Status</div>
        </div>
        <div>
          {books.map((item, index) => {
            const modalId = `modal_${index}`;
            return (
              <div className="w-full flex gap-2 py-2" key={index}>
                <div className="w-full grid grid-cols-3">
                  <div className="flex items-center justify-center">
                    {item.title}
                  </div>
                  <div className="flex items-center justify-center">
                    {item.author}
                  </div>
                  <div className="flex items-center justify-center">
                    {item.status}
                  </div>
                </div>
                <div>
                  <button
                    className="btn"
                    onClick={() => {
                      document.getElementById(modalId).showModal();
                    }}
                    disabled={item.status === "Borrowed" ? true : false}
                  >
                    Borrow
                  </button>
                  <dialog id={modalId} className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Hi!</h3>
                      <p className="py-4">
                        Are you sure want to borrow{" "}
                        <strong>{item.title}</strong> by{" "}
                        <strong>{item.author}</strong>?
                      </p>
                      <div className="modal-action">
                        <form
                          method="dialog"
                          className="w-full flex justify-end gap-2"
                        >
                          <button
                            className="btn pr-4"
                            onClick={() => onHandleBorrowABook(item)}
                          >
                            Yes
                          </button>
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={`w-1/2 pl-10 pt-10 ${
          myBook.length >= 1 ? "block" : "hidden"
        }`}
      >
        <div className="font-bold flex gap-1">
          My Book: <div className="font-normal">{myBook}</div>
        </div>
        <div className="font-bold flex gap-1">
          Status: <div className="font-normal">{myBookStatus}</div>
        </div>
        <div className="font-bold flex gap-1">
          Return Date: <div className="font-normal">{endBorrowDate}</div>
        </div>
        <div className="pt-4">
          <button
            className="btn w-1/2 bg-emerald-700 text-white"
            onClick={() => onHandleReturnBorrowedBook(myBook)}
          >
            Return Book
          </button>
        </div>
      </div>
    </div>
  );
}
