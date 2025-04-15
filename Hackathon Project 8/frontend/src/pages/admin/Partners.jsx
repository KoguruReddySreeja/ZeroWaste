import React, { useEffect, useState } from "react";
import axios from "../../utils/axios.js";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Table, TableHead, TableRow, TableCell, TableBody } from "../../components/ui/table";
import { Filter, Trash2 } from "lucide-react";

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [search, setSearch] = useState("");

  const fetchPartners = async () => {
    try {
      const res = await axios.get("/admin/partners");
      setPartners(res.data);
    } catch (err) {
      console.error("Error fetching partners", err);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this partner?")) return;

    try {
      await axios.delete(`/admin/partners/${id}`);
      setPartners((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting partner:", error);
    }
  };

  const filteredPartners = partners.filter((partner) =>
    partner.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">NGO & Volunteer Management</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-4">
          <Input
            placeholder="Search NGOs or Volunteers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />

          <div className="overflow-x-auto">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Donations</TableCell>
                  <TableCell>Feedback</TableCell>
                  <TableCell className="text-right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPartners.map((p) => (
                  <TableRow key={p._id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{p.role}</Badge>
                    </TableCell>
                    <TableCell>
                      {p.location?.coordinates
                        ? `Lng: ${p.location.coordinates[0]}, Lat: ${p.location.coordinates[1]}`
                        : "N/A"}
                    </TableCell>
                    <TableCell>{p.phone || "N/A"}</TableCell>
                    <TableCell>{p.donationCount}</TableCell>
                    <TableCell>{p.feedback ? `${p.feedback} ⭐` : "No ratings"}</TableCell>
                    <TableCell className="text-right">
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(p._id)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Partners;
