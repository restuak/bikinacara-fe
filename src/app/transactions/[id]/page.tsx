"use client";

import { useEffect, useCallback, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import useAuthStore from "@/store/useAuthStore";
import { createTransaction } from "@/features/transaction/api/transactionApi";
import ForbiddenPage from "@/app/forbidden/page";

export default function TransactionPage() {
  const { id: eventId } = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const [event, setEvent] = useState<any>(null);

  if (!user?.token) {
    return <ForbiddenPage />;
  }

  const fetchEvent = useCallback(async () => {
    if (!eventId) return;
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/events/${eventId}`
      );
      setEvent(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load event");
    }
  }, [eventId]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  if (!event) return <p className="p-6">Loading event...</p>;

  const minPrice = event.tickets?.length
    ? Math.min(...event.tickets.map((t: any) => t.price))
    : null;

  const validationSchema = Yup.object({
    ticketTypeId: Yup.string().required("Please select ticket type"),
    quantity: Yup.number()
      .min(1, "Quantity must be at least 1")
      .required("Quantity is required"),
    usePoints: Yup.boolean(),
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Purchase Tickets</h1>

      <h2 className="text-xl font-semibold">{event.title}</h2>
      <p className="text-gray-600 mb-2">{event.description}</p>

      {minPrice !== null && (
        <p className="text-lg font-medium text-green-600 mb-4">
          From Rp {minPrice.toLocaleString()}
        </p>
      )}

      <Formik
        initialValues={{ ticketTypeId: "", quantity: 1, usePoints: false }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const transaction = await createTransaction({
              eventId: String(eventId),
              ...values,
            });
            alert("Transaction successful!");
            router.push(`/payment/${transaction.id}`);
          } catch (err: any) {
            console.error(err);
            alert(err?.response?.data?.message || "Something went wrong");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Ticket Type */}
            <div>
              <label className="block font-medium">Ticket Type</label>
              <Field
                as="select"
                name="ticketTypeId"
                className="border p-2 rounded w-full"
              >
                <option value="">Select ticket type</option>
                {event.tickets?.map((ticket: any) => (
                  <option key={ticket.id} value={ticket.id}>
                    {ticket.name} - Rp {ticket.price.toLocaleString()}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="ticketTypeId"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block font-medium">Quantity</label>
              <Field
                type="number"
                name="quantity"
                min="1"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage
                name="quantity"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Use Points */}
            <label className="flex items-center gap-2">
              <Field type="checkbox" name="usePoints" />
              Use points
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg shadow-md disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Buy Now"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
