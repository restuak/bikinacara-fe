"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import useAuthStore from "@/store/useAuthStore";
// import { updatePaymentStatus } from "@/features/transaction/api/updateTransactionApi";

type Transaction = {
  id: string;
  totalPrice: number;
  appliedDiscount: number;
  usedPoints: number;
  finalPrice: number;
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  paymentProofUrl?: string;
  event?: { title?: string };
  items?: {
    ticketType?: { name?: string; price?: number };
    quantity?: number;
    subtotal?: number;
  }[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function PaymentPage() {
  const params = useParams();
  const transactionId = params.id as string;
  const { user } = useAuthStore();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  const fetchTransaction = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${API_BASE}/api/transactions/${transactionId}`,
        {
          headers: user?.token
            ? { Authorization: `Bearer ${user.token}` }
            : undefined,
        }
      );
      // normalize: backend mungkin mengembalikan { message, data: transaction }
      const txn = res.data?.data ?? res.data;
      setTransaction(txn);
    } catch (err) {
      console.error("Error fetching transaction", err);
      setTransaction(null);
    } finally {
      setLoading(false);
    }
  }, [transactionId, user?.token]);

  useEffect(() => {
    fetchTransaction();
  }, [fetchTransaction]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const handleUpload = async () => {
    if (!file) return alert("Pilih file terlebih dahulu");

    const formData = new FormData();
    formData.append("paymentProof", file);

    try {
      const res = await axios.patch(
        `${API_BASE}/api/transactions/${transactionId}/payment-proof`,
        formData, 
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // backend mungkin mereturn updated transaction => normalisasi lagi
      const updated = res.data?.data ?? res.data;
      setTransaction(updated);
      alert("Bukti pembayaran berhasil diunggah. Menunggu verifikasi.");
    } catch (err) {
      console.error("Upload failed", err);
      alert("Gagal mengunggah bukti pembayaran");
    }

    // try {
    //   await updatePaymentStatus(transactionId, "PAID");
    //   fetchTransaction();
    // } catch (err) {
    //     console.error("Update failed", err);
    //   alert("Gagal Update status pembayaran" + err);
    // }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!transaction) return <p className="p-6">Transaksi tidak ditemukan</p>;


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-4">Pembayaran </h1>
      <p className="text-lg font-semibold">{transaction.event?.title ?? "-"}</p>
      {/* <p>Transaction ID: {transactionId}</p>; */}
      <div className="mt-4 border rounded p-3">
        {(transaction.items ?? []).map((item, idx) => (
          <div key={idx} className="flex justify-between">
            <span>
              {item.ticketType?.name ?? "Ticket"} x {item.quantity}
            </span>
            <span>Rp {Number(item.subtotal ?? 0).toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 border-t pt-3">
        <p>Total: Rp {Number(transaction.totalPrice ?? 0).toLocaleString()}</p>
        {transaction.appliedDiscount > 0 && (
          <p>Diskon: -Rp {transaction.appliedDiscount.toLocaleString()}</p>
        )}
        {transaction.usedPoints > 0 && (
          <p>Points: -Rp {transaction.usedPoints.toLocaleString()}</p>
        )}
        <p className="font-bold">
          Bayar: Rp {Number(transaction.finalPrice ?? 0).toLocaleString()}
        </p>
      </div>
      <div className="mt-4">
        <span className="font-bold">Status: </span>
        <span
          className={
            transaction.paymentStatus === "PAID"
              ? "text-green-600"
              : transaction.paymentStatus === "FAILED"
              ? "text-red-600"
              : "text-yellow-600"
          }
        >
          {transaction.paymentStatus}
        </span>
      </div>
      {transaction.paymentStatus === "PENDING" && (
        <div className="mt-4">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Upload Bukti
          </button>
        </div>
      )}
      {transaction.paymentProofUrl && (
        <div className="mt-4">
          <p className="font-medium">Bukti pembayaran:</p>
          <img
            src={transaction.paymentProofUrl}
            alt="Bukti pembayaran"
            className="max-h-64 mt-2 rounded"
          />
        </div>
      )}
    </div>
  );
}
