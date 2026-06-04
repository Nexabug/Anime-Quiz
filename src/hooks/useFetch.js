import { useEffect, useState } from "react";

function useFetch() {
  const [d, setD] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    async function getData() {
      setloading(true);

      const res = await fetch(
        "https://683e5df11cd60dca33db418b.mockapi.io/questions-data/Questions",
      );

      const data = await res.json();

      setD(data);
      setloading(false);
    }

    getData();
  }, []);

  return { d, loading, setloading };
}

export default useFetch;
