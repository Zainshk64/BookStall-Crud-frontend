import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Home = () => {
  const [bookList, setBookList] = useState([]);

  const [bookData, setBookData] = useState({
    BookName: "",
    BookTitle: "",
    BookAuthor: "",
    BookPrice: "",
    PublishedDate: "",
  });

  // -----------------------------
  // Handle Input Change
  // -----------------------------
  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  // -----------------------------
  // Submit Form to API
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation → Check Empty Fields
    if (
      !bookData.BookName ||
      !bookData.BookTitle ||
      !bookData.BookAuthor ||
      !bookData.BookPrice ||
      !bookData.PublishedDate
    ) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/books/addbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to add book");
        return;
      }

      toast.success("Book added successfully!");

      // Reset Form
      setBookData({
        BookName: "",
        BookTitle: "",
        BookAuthor: "",
        BookPrice: "",
        PublishedDate: "",
      });

      fetchBooks(); // Refresh table
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Server error while adding book");
    }
  };

  // -----------------------------
  // Fetch All Books
  // -----------------------------
  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/books/getbook", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.ok) {
        setBookList(data.books);
      }
    } catch (error) {
      toast.error("Failed to fetch books");
      console.error("Error fetching books:", error);
    }
  };

  const handleDeleteBook = async (Id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/books/deletebook/${Id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("Book deleted successfully!");
        fetchBooks(); // Refresh table
      }
    } catch (error) {
      toast.error("Server error while deleting book");
      console.error("Error deleting book:", error);
    }
  };

  // Load books on page load
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="home flex flex-col items-center py-16 justify-center bg-gradient-to-r from-blue-50 to-purple-50">
        <h2 className="text-4xl font-bold mb-3 text-gray-800">
          Welcome to the Home Page
        </h2>
        <p className="text-lg text-gray-600">
          This is the main content of the home page.
        </p>
      </div>

      {/* Form Section */}
      <div className="flex justify-center py-10 bg-white">
        <form
          onSubmit={handleSubmit}
          className="w-[90%] bg-gray-50 shadow-lg rounded-xl p-8"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Add a New Book
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Book Name */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Book Name</label>
              <input
                type="text"
                name="BookName"
                value={bookData.BookName}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Book Title */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Book Title</label>
              <input
                type="text"
                name="BookTitle"
                value={bookData.BookTitle}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Author */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Author Name</label>
              <input
                type="text"
                name="BookAuthor"
                value={bookData.BookAuthor}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Price</label>
              <input
                type="number"
                name="BookPrice"
                value={bookData.BookPrice}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Published Date */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Published Date</label>
              <input
                type="date"
                name="PublishedDate"
                value={bookData.PublishedDate}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 flex justify-center mx-auto bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Add Book
          </button>
        </form>
      </div>

      {/* Table Section */}
      <div className="w-[90%] mx-auto mb-20">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Books List
        </h3>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 border">#</th>
                <th className="py-3 px-4 border">Book Name</th>
                <th className="py-3 px-4 border">Title</th>
                <th className="py-3 px-4 border">Author</th>
                <th className="py-3 px-4 border">Price</th>
                <th className="py-3 px-4 border">Published Date</th>
                <th className="py-3 px-4 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookList.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-gray-500">
                    No books found
                  </td>
                </tr>
              ) : (
                bookList.map((book, idx) => (
                  <tr
                    key={book._id}
                    className="text-center odd:bg-gray-50 even:bg-white hover:bg-gray-100"
                  >
                    <td className="py-2 px-4 border">{idx + 1}</td>
                    <td className="py-2 px-4 border">{book.BookName}</td>
                    <td className="py-2 px-4 border">{book.BookTitle}</td>
                    <td className="py-2 px-4 border">{book.BookAuthor}</td>
                    <td className="py-2 px-4 border">Rs {book.BookPrice}</td>
                    <td className="py-2 px-4 border">
                      {new Date(book.PublishedDate).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border flex justify-center gap-2">
                      <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteBook(book._id);
                        }}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
