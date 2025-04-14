import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "../../components/ui/table";
import { CalendarDays, FileText, Download } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "../../utils/axios.js";

const Reports = () => {
  const [foodSavedData, setFoodSavedData] = useState([]);
  const [topDonors, setTopDonors] = useState([]);
  const [emissions, setEmissions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const statsRes = await axios.get("/admin/reports/stats");
      setEmissions(statsRes.data.co2PreventedKg || 0);
      setFoodSavedData(statsRes.data.weeklyFoodSaved || []);

      const donorsRes = await axios.get("/admin/reports/top-donors");
      setTopDonors(donorsRes.data || []);
      setLoading(false);
    } catch (err) {
      setError("Failed to load data.");
      setLoading(false);
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("ZeroWaste Weekly Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`CO₂ Prevented: ${emissions} kg`, 20, 35);

    autoTable(doc, {
      head: [["Top Donor/NGO", "Total Donations"]],
      body: topDonors.map((d) => [d.name, d.total]),
      startY: 45,
    });

    doc.save("ZeroWaste_Report.pdf");
  };

  const exportCSV = () => {
    const headers = ["Donor,Total Donations"];
    const rows = topDonors.map((donor) => `${donor.name},${donor.total}`);
    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "ZeroWaste_Report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">📊 Reports & Analytics</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportPDF}>
            <Download className="w-4 h-4 mr-2" /> Export PDF
          </Button>
          <Button variant="outline" onClick={exportCSV}>
            <FileText className="w-4 h-4 mr-2" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Emissions Card */}
      <Card className="bg-green-50 border-green-400 border">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">♻️ Emissions Prevented</h3>
              <p className="text-3xl font-bold mt-2">{emissions} kgCO₂e</p>
              <p className="text-sm text-muted-foreground">
                Based on recent donations
              </p>
            </div>
            <CalendarDays className="w-10 h-10 text-green-600" />
          </div>
        </CardContent>
      </Card>

      {/* Food Saved Chart */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">
            🍱 Food Saved (This Week)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={foodSavedData}>
              <defs>
                <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#34d399"
                fillOpacity={1}
                fill="url(#colorAmt)"
              />
              <CartesianGrid strokeDasharray="3 3" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Donors Table */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">🏅 Top Donors</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Donor</TableCell>
                <TableCell>Total Donations</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topDonors.map((donor, i) => (
                <TableRow key={i}>
                  <TableCell>{donor.name}</TableCell>
                  <TableCell>{donor.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
