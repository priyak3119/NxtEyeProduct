import React from "react";
import { X, CreditCard, Building2 } from "lucide-react";

const PaymentModal = ({ selectedPlan, paymentMethod, setPaymentMethod, handlePayment, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Complete Payment</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="h-6 w-6" /></button>
        </div>

        {selectedPlan && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h4 className="font-semibold">{selectedPlan.name} Plan</h4>
            <p className="text-2xl font-bold">${selectedPlan.price}/{selectedPlan.interval}</p>
          </div>
        )}

        <div className="mb-6">
          <h4 className="font-semibold mb-4">Payment Method</h4>
          <div className="grid grid-cols-3 gap-3">
            <button onClick={() => setPaymentMethod("card")} className={`p-3 border rounded-lg text-center ${paymentMethod === "card" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-300 hover:border-gray-400"}`}>
              <CreditCard className="h-6 w-6 mx-auto mb-1" />
              <span className="text-sm font-medium">Card</span>
            </button>
            <button onClick={() => setPaymentMethod("upi")} className={`p-3 border rounded-lg text-center ${paymentMethod === "upi" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-300 hover:border-gray-400"}`}>
              <div className="h-6 w-6 mx-auto mb-1 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">UPI</div>
              <span className="text-sm font-medium">UPI</span>
            </button>
            <button onClick={() => setPaymentMethod("netbanking")} className={`p-3 border rounded-lg text-center ${paymentMethod === "netbanking" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-300 hover:border-gray-400"}`}>
              <Building2 className="h-6 w-6 mx-auto mb-1" />
              <span className="text-sm font-medium">Net Banking</span>
            </button>
          </div>
        </div>

        {/* Payment form */}
        <div className="space-y-4">
          {paymentMethod === "card" && (
            <>
              <div>
                <label className="block text-sm mb-2">Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm mb-2">Cardholder Name</label>
                <input type="text" placeholder="John Doe" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Expiry Date</label>
                  <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm mb-2">CVV</label>
                  <input type="text" placeholder="123" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </>
          )}
          {paymentMethod === "upi" && (
            <div>
              <label className="block text-sm mb-2">UPI ID</label>
              <input type="text" placeholder="yourname@upi" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
          )}
          {paymentMethod === "netbanking" && (
            <div>
              <label className="block text-sm mb-2">Select Bank</label>
              <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Choose your bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
              </select>
            </div>
          )}

          <button onClick={handlePayment} className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-colors">
            Pay ${selectedPlan?.price}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
