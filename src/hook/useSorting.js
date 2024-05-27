import { useState } from "react";

const useSorting = (initialSortDirection = "desc") => {
  const [sortDirection, setSortDirection] = useState(initialSortDirection);

  const handleSort = (key) => {
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );

    return (a, b) => {
      if (sortDirection === "asc") {
        return new Date(a[key]) - new Date(b[key]);
      } else {
        return new Date(b[key]) - new Date(a[key]);
      }
    };
  };

  return {
    sortDirection,
    handleSort,
  };
};

export default useSorting;
