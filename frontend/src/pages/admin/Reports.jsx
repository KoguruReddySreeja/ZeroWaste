import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Table, TableHead, TableRow, TableCell, TableBody } from "../../components/ui/table";
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

const Reports = () => {
  const [foodSavedData, setFoodSavedData] = useState([]);
  const [topDonors, setTopDonors] = useState([]);
  const [emissions, setEmissions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
    fetchTopDonors();
    loadDummyFoodSavedData();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/reports/stats");
      const data = await res.json();
      setEmissions(data.co2PreventedKg || 0);
    } catch (err) {
      setError("Failed to load CO₂ stats.");
    }
  };

  const fetchTopDonors = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/reports/top-donors");
      const data = await res.json();
      setTopDonors(data);
    } catch (err) {
      setError("Failed to load top donors.");
    }
  };

  const loadDummyFoodSavedData = () => {
    const dummy = [
      { date: "Mon", amount: 120 },
      { date: "Tue", amount: 300 },
      { date: "Wed", amount: 250 },
      { date: "Thu", amount: 400 },
      { date: "Fri", amount: 200 },
      { date: "Sat", amount: 500 },
      { date: "Sun", amount: 350 },
    ];
    setFoodSavedData(dummy);
    setLoading(false);
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
          <Button variant="outline" disabled>
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
              <p className="text-sm text-muted-foreground">Based on recent donations</p>
            </div>
            <CalendarDays className="w-10 h-10 text-green-600" />
          </div>
        </CardContent>
      </Card>

      {/* Food Saved Chart */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">🍱 Food Saved (This Week)</h3>
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
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Donors */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">Top Donors/NGOs</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Total Donations</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topDonors.map((donor) => (
                <TableRow key={donor.name}>
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
