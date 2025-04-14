import React, { useEffect, useState } from "react";
import StatsCard from "../../components/admin/StatsCard";
import DashboardChart from "../../components/admin/DashboardCharts";
import AlertsCard from "../../components/admin/AlertsCard";
import ShortcutsPanel from "../../components/admin/ShortcutsPanel";
import axios from "../../utils/axios.js";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalFoodSavedKg: 0,
    peopleServed: 0,
    co2PreventedKg: 0
  });

  const [chartsData, setChartsData] = useState({
    donations: [],
    users: []
  });

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin/dashboard");

        const { stats: statsData, charts, alerts: recentAlerts } = res.data;

        // Stats
        if (statsData) {
          const {
            totalFoodSavedKg = 0,
            peopleServed = 0,
            co2PreventedKg = 0
          } = statsData;
          setStats({ totalFoodSavedKg, peopleServed, co2PreventedKg });
        }

        // Charts
        if (charts) {
          const donations = charts.donations?.map((item) => ({
            name: item._id || "Unknown",
            value: item.count || 0
          })) || [];

          const users = charts.users?.map((item) => ({
            name: item._id || "Unknown",
            value: item.count || 0
          })) || [];

          setChartsData({ donations, users });
        }

        // Alerts
        if (Array.isArray(recentAlerts)) {
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
