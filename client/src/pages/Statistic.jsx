import StatisticCard from "../components/StatisticCard";
import { useEffect, useState } from "react";
import { getAllStats } from "../api/statsApi";
import Button from "../components/Button";

export default function Statistic() {
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState("day");

  useEffect(() => {
    async function fetchStats() {
          try {
            const res = await getAllStats(activeTab);
            setStats(res.data.data);
            // console.log(res.data.data);
          } catch (err) {
            console.error("Failed to load books:", err);
          }
        }
    
        fetchStats();
  }, [activeTab]);

  console.log(stats);
  

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="statistic">
      <h3 className="statistic__title">Statistic</h3>

      <div className="statistic__tabs">
        <div id="btn" className={activeTab}></div>
        <Button
        text={"Day"}
          className="statistic__tab"
          onClick={() => setActiveTab("day")} />
        <Button
        text={"Week"}
          className="statistic__tab"
          onClick={() => setActiveTab("week")} />
          <Button
        text={"Month"}
          className="statistic__tab"
          onClick={() => setActiveTab("month")} />
          <Button
        text={"Year"}
          className="statistic__tab"
          onClick={() => setActiveTab("year")} />
      </div>

      <div className="statistic__page">
        {activeTab === "day" && <StatisticCard data={stats}/>}
        {activeTab === "week" && <StatisticCard data={stats}/>}
        {activeTab === "month" && <StatisticCard data={stats}/>}
        {activeTab === "year" && <StatisticCard data={stats}/>}
      </div>

      <StatisticCard data={stats}/>
    </div>
  );
}