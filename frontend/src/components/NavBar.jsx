import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash"; // Import lodash for debouncing

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  // API call to fetch search results
  const fetchSearchResults = async (query) => {
    if (query) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/customers/search?query=${query}`
        );
        const data = await response.json();
        console.log(data);
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setResults([]); // Clear results if query is empty
    }
  };

  // Debounced version of fetchSearchResults
  const debouncedSearch = _.debounce(fetchSearchResults, 500);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query); // Call the debounced search
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className="w-full bg-green-600 p-4 shadow-md flex justify-between items-center">
      <div
        className="text-white text-2xl font-bold"
        onClick={() => navigate("/")}
      >
        My Business
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search customers or orders..."
          className="p-2 pl-4 w-80 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          type="submit"
          className="bg-gray-800 text-white px-4 py-2 rounded-r-md hover:bg-gray-900"
        >
          Search
        </button>

        {/* Search Suggestions */}
        {results.length > 0 && (
          <div className="absolute left-0 mt-1 w-80 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {results.map((result) => (
              <div
                key={result._id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate(`/customer/${result._id}`)}
              >
                {result.name} {result.phone}
              </div>
            ))}
          </div>
        )}
      </form>
    </nav>
  );
};

export default NavBar;
