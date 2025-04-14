// components/admin/PartnerCard.jsx
import React from "react";
import { MapPin, Phone, Mail, Star, Trash2 } from "lucide-react";

const PartnerCard = ({ partner, onRemove }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-md hover:shadow-xl transition duration-300">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{partner.name}</h3>
        <button onClick={() => onRemove(partner.id)} className="text-red-500 hover:text-red-700">
          <Trash2 size={18} />
        </button>
      </div>
      <p className="text-sm text-gray-600 flex items-center gap-1">
        <MapPin size={14} /> {partner.location}
      </p>
      <p className="text-sm text-gray-600 flex items-center gap-1">
        <Phone size={14} /> {partner.contact}
      </p>
      <p className="text-sm text-gray-600 flex items-center gap-1">
        <Mail size={14} /> {partner.email}
      </p>
      <div className="flex justify-between items-center mt-3">
        <span className="text-xs text-gray-500">
          Receipts: <strong>{partner.receipts}</strong>
        </span>
        <span className="flex items-center text-yellow-500 text-sm">
          <Star size={14} /> {partner.feedback}
        </span>
      </div>
    </div>
  );
};

export default PartnerCard;
