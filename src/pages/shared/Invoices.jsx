import React from "react";
import { FileText } from "lucide-react";

const Invoices = ({ invoices }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
        <FileText className="h-5 w-5" />
        <span>Invoices</span>
      </h2>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Invoice #</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoices?.map((inv) => (
              <tr key={inv.id}>
                <td className="px-6 py-4">{inv.number}</td>
                <td className="px-6 py-4">${inv.amount}</td>
                <td className="px-6 py-4 capitalize">{inv.status}</td>
                <td className="px-6 py-4">{new Date(inv.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoices;
