import React, { useEffect, useState } from "react";
import StatsCard from "../../components/admin/StatsCard";
import DashboardChart from "../../components/admin/DashboardCharts";
import AlertsCard from "../../components/admin/AlertsCard";
import ShortcutsPanel from "../../components/admin/ShortcutsPanel";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalFoodSavedKg: 0,
    peopleServed: 0,
    co2PreventedKg: 0
  });

  const [chartsData, setChartsData] = useState({
    donations: [], // Fill this later with backend data
    users: []      // Fill this later with backend data
  });

  const [alerts, setAlerts] = useState([]); // Optional, for alert panel

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin/dashboard");

        // Ensure stats and charts exist in the response
        const { stats, charts, alerts: recentAlerts } = res.data;

        if (stats) {
          const { totalFoodSavedKg, peopleServed, co2PreventedKg } = stats;
          setStats({
            totalFoodSavedKg: totalFoodSavedKg || 0,
            peopleServed: peopleServed || 0,
            co2PreventedKg: co2PreventedKg || 0
          });
        }

        if (charts) {
          setChartsData({
            donations: charts.donations.map(item => ({
              name: item._id || "Unknown", // Handle null _id
              value: item.count
            })),
            users: charts.users.map(item => ({
              name: item._id || "Unknown", // Handle missing _id
              value: item.count
            }))
          });
        }

        // Set alerts data
        if (recentAlerts) {
          setAlerts(recentAlerts);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-6 sm:p-8 flex flex-col gap-6 overflow-y-auto h-full bg-gray-50">
      <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          label="Total Food Saved"
          value={`${stats.totalFoodSavedKg} kg`}
          icon="🥫"
          color="green"
        />
        <StatsCard
          label="People Served"
          value={`${stats.peopleServed}+`}
          icon="👥"
          color="blue"
        />
        <StatsCard
          label="CO₂ Prevented"
          value={`${stats.co2PreventedKg} kg`}
          icon="🌱"
          color="emerald"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardChart type="donations" data={chartsData.donations} />
        <DashboardChart type="users" data={chartsData.users} />
      </div>

      {/* Alerts + Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertsCard alerts={alerts} />
        <ShortcutsPanel />
      </div>
    </div>
  );
};

export default Dashboard;

