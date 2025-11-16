import { useState } from "react";
import { CreditCard, Smartphone, Wallet, CheckCircle } from "lucide-react";

interface PaymentMethodProps {
  amount: number;
  onPaymentSelect: (method: string) => void;
  onComplete: (method: string, details: any) => void;
}

type PaymentMethodType = "mpesa" | "card" | "bank" | null;

export default function PaymentMethod({ amount, onPaymentSelect, onComplete }: PaymentMethodProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>(null);
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: "mpesa" as const,
      name: "M-Pesa",
      description: "Pay via M-Pesa mobile money",
      icon: Smartphone,
      color: "from-green-500 to-emerald-600",
      popular: true
    },
    {
      id: "card" as const,
      name: "Credit/Debit Card",
      description: "Visa, Mastercard, or other cards",
      icon: CreditCard,
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: "bank" as const,
      name: "Bank Transfer",
      description: "Direct bank transfer",
      icon: Wallet,
      color: "from-purple-500 to-pink-600"
    }
  ];

  const handleMethodSelect = (method: PaymentMethodType) => {
    setSelectedMethod(method);
    onPaymentSelect(method || "");
  };

  const handleMpesaPayment = async () => {
    if (!mpesaPhone || mpesaPhone.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete("mpesa", { phone: mpesaPhone, amount });
    }, 2000);
  };

  const handleCardPayment = async () => {
    if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
      alert("Please fill in all card details");
      return;
    }
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete("card", { ...cardDetails, amount });
    }, 2000);
  };

  const handleBankTransfer = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete("bank", { amount });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Total Amount</span>
          <span className="text-3xl font-bold text-blue-600">KES {amount.toLocaleString()}</span>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Select Payment Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;
            return (
              <button
                key={method.id}
                onClick={() => handleMethodSelect(method.id)}
                className={`card p-6 text-left transition-all ${
                  isSelected
                    ? "ring-2 ring-blue-500 bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${method.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {method.popular && (
                    <span className="text-xs bg-accent-400 text-blue-900 px-2 py-1 rounded-full font-semibold">
                      Popular
                    </span>
                  )}
                  {isSelected && (
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  )}
                </div>
                <h4 className="font-bold text-gray-800 mb-1">{method.name}</h4>
                <p className="text-sm text-gray-600">{method.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* M-Pesa Form */}
      {selectedMethod === "mpesa" && (
        <div className="card p-6 animate-slide-up">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-green-600" />
            M-Pesa Payment
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={mpesaPhone}
                onChange={(e) => setMpesaPhone(e.target.value)}
                placeholder="07XX XXX XXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter your M-Pesa registered phone number
              </p>
            </div>
            <button
              onClick={handleMpesaPayment}
              disabled={isProcessing}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Processing..." : `Pay KES ${amount.toLocaleString()} via M-Pesa`}
            </button>
          </div>
        </div>
      )}

      {/* Card Form */}
      {selectedMethod === "card" && (
        <div className="card p-6 animate-slide-up">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            Card Payment
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  placeholder="123"
                  maxLength={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleCardPayment}
              disabled={isProcessing}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Processing..." : `Pay KES ${amount.toLocaleString()}`}
            </button>
          </div>
        </div>
      )}

      {/* Bank Transfer */}
      {selectedMethod === "bank" && (
        <div className="card p-6 animate-slide-up">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-purple-600" />
            Bank Transfer
          </h4>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Transfer to:</p>
              <p className="font-semibold text-gray-800">MyWakili Legal Services</p>
              <p className="text-sm text-gray-600">Account: 1234567890</p>
              <p className="text-sm text-gray-600">Bank: Equity Bank</p>
              <p className="text-sm text-gray-600">Branch: Nairobi</p>
            </div>
            <p className="text-sm text-gray-600">
              Please include your booking reference in the transfer description. 
              Your booking will be confirmed once payment is received.
            </p>
            <button
              onClick={handleBankTransfer}
              disabled={isProcessing}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Processing..." : "I've Made the Transfer"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

