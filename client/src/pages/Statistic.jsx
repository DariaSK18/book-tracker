import StatisticCard from "../components/StatisticCard";
import { useEffect, useState } from "react";
import { getAllStats } from "../api/statsApi";

export default function Statistic() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchStats() {
          try {
            const res = await getAllStats();
            setStats(res.data.data);
            // console.log(res.data.data);
          } catch (err) {
            console.error("Failed to load books:", err);
          }
        }
    
        fetchStats();
  }, []);

  // console.log(stats);
  

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="statistic">
      <h3 className="statistic__title">Statistic</h3>

      <StatisticCard data={stats}/>
    </div>
  );
}