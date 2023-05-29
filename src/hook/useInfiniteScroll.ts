import { useState, useEffect } from "react";
import axios from "axios";

interface Player {
  id: number;
  first_name: string;
  last_name: string;
  height_feet: string;
  height_inches: number;
  position: string;
}

interface APIResponse {
  data: Player[];
}

const useInfiniteScroll = (url: string, perPage: number = 10) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const response = await axios.get<APIResponse>(
        `${url}?page=${page}&per_page=${perPage}`
      );
      const newPlayers = response.data.data;
      setPlayers((prevPlayers) => [...prevPlayers, ...newPlayers]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.log("Error fetching players:", error);
    }
    setLoading(false);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.pageYOffset >=
      document.documentElement.scrollHeight
    ) {
      fetchPlayers();
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { players, loading };
};

export default useInfiniteScroll;
