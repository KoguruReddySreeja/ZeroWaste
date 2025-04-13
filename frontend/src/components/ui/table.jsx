import React from "react";

export const Table = ({ children }) => (
  <table className="w-full text-sm text-left border">{children}</table>
);

export const TableHead = ({ children }) => (
  <thead className="bg-gray-100">{children}</thead>
);

export const TableBody = ({ children }) => (
  <tbody className="divide-y">{children}</tbody>
);

export const TableRow = ({ children }) => (
  <tr className="hover:bg-gray-50">{children}</tr>
);

export const TableCell = ({ children, className = "" }) => (
  <td className={`px-4 py-2 ${className}`}>{children}</td>
);
