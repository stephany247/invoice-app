import { useState, useEffect } from "react";
import { fmt, today } from "../utils/utils";
import type { Invoice, Status } from "../types/types";
import BackButton from "./BackButton";
import InputField from "./InputField";
import { ChevronDown } from "lucide-react";

type Item = {
  name: string;
  quantity: number;
  price: number;
};

type FormType = Omit<Invoice, "status" | "id"> & {
  items: Item[];
};

const PAYMENT_TERMS = ["Net 1 Day", "Net 7 Days", "Net 14 Days", "Net 30 Days"];

const blankForm = (): FormType => ({
  fromAddress: "",
  fromCity: "",
  fromPostCode: "",
  fromCountry: "",
  client: "",
  email: "",
  address: "",
  city: "",
  postCode: "",
  country: "",
  createdAt: today(),
  dueDate: today(),
  paymentTerms: "Net 30 Days",
  description: "",
  items: [{ name: "", quantity: 1, price: 0 }],
});

export default function InvoiceForm({
  initial,
  onBack,
  onSave,
  onCancel,
}: {
  initial?: Invoice;
  onBack: () => void;
  onSave: (data: Invoice) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<FormType>(
    initial
      ? {
          ...initial,
          items: initial.items.map((i) => ({
            name: i.name,
            quantity: Number(i.quantity),
            price: Number(i.price),
          })),
        }
      : blankForm(),
  );

  const setField = (key: keyof FormType, value: any) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const setItemField = (i: number, key: keyof Item, value: any) => {
    const items = [...form.items];
    items[i] = { ...items[i], [key]: value };
    setForm({ ...form, items });
  };

  const addItem = () => {
    setForm((f) => ({
      ...f,
      items: [...f.items, { name: "", quantity: 1, price: 0 }],
    }));
  };

  const removeItem = (i: number) => {
    setForm((f) => ({
      ...f,
      items: f.items.filter((_, idx) => idx !== i),
    }));
  };

  const submit = (status: Status) => {
    onSave({
      ...(form as Invoice),
      id: initial?.id || Math.random().toString(36).slice(2, 8).toUpperCase(),
      status,
    });
  };

  return (
    <div className="flex">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />

      {/* drawer */}
      <div className="ml-auto w-full max-w-xl bg-card h-full overflow-y-auto p-6 md:p-8 relative space-y-6">
        <BackButton onClick={onBack} />

        <h2 className="text-xl font-bold">
          {initial ? (
            <>
              <span className="text-text-muted">#</span>
              {initial.id}
            </>
          ) : (
            "New Invoice"
          )}
        </h2>

        {/* Bill From */}
        <fieldset className="space-y-6">
          <legend className="text-primary font-bold">Bill From</legend>

          <div className="flex flex-col gap-4">
            <InputField
              id="fromAddress"
              label="Street Address"
              value={form.fromAddress}
              onChange={(e) => setField("fromAddress", e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                id="fromCity"
                label="City"
                value={form.fromCity}
                onChange={(e) => setField("fromCity", e.target.value)}
              />

              <InputField
                id="fromPostCode"
                label="Post Code"
                value={form.fromPostCode}
                onChange={(e) => setField("fromPostCode", e.target.value)}
              />
            </div>
            <InputField
              id="fromCountry"
              label="Country"
              value={form.fromCountry}
              onChange={(e) => setField("fromCountry", e.target.value)}
            />
          </div>
        </fieldset>

        {/* Bill To */}
        <fieldset className="space-y-6 mb-6">
          <legend className="text-primary font-bold block">Bill To</legend>

          <div className="flex flex-col gap-4">
            <InputField
              id="client"
              label="Client's Name"
              value={form.client}
              onChange={(e) => setField("client", e.target.value)}
            />

            <InputField
              id="email"
              label="Client's Email"
              type="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
            />

            <InputField
              id="address"
              label="Street Address"
              value={form.address}
              onChange={(e) => setField("address", e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                id="city"
                label="City"
                value={form.city}
                onChange={(e) => setField("city", e.target.value)}
              />

              <InputField
                id="postCode"
                label="Post Code"
                value={form.postCode}
                onChange={(e) => setField("postCode", e.target.value)}
              />
            </div>
            <InputField
              id="country"
              label="Country"
              value={form.country}
              onChange={(e) => setField("country", e.target.value)}
            />
          </div>
        </fieldset>

        {/* Dates */}
        <fieldset className="space-y-6 mb-6">
          <InputField
            id="createdAt"
            label="Invoice Date"
            type="date"
            value={form.createdAt}
            onChange={(e) => setField("createdAt", e.target.value)}
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="terms" className="text-sm text-text-muted">
              Payment Terms
            </label>
            <div className="relative">
              <select
                id="terms"
                className="w-full appearance-none bg-input border border-input-border rounded px-4 py-2 text-text focus:outline-none focus:border-primary"
                value={form.paymentTerms}
                onChange={(e) => setField("paymentTerms", e.target.value)}
              >
                {PAYMENT_TERMS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              {/* custom chevron */}
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
                <ChevronDown className="size-4" />
              </span>
            </div>
          </div>

          <InputField
            id="description"
            label="Project Description"
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
          />
        </fieldset>

        <fieldset className="space-y-6 mb-6">
          <legend className="text-text-muted font-bold text-lg block">
            Item List
          </legend>

          {/* Header (desktop only) */}
          <div className="hidden md:grid grid-cols-12 text-text-muted text-sm px-1">
            <span className="col-span-5">Item Name</span>
            <span className="col-span-2 text-center">Qty.</span>
            <span className="col-span-2 text-right">Price</span>
            <span className="col-span-2 text-right">Total</span>
            <span className="col-span-1" />
          </div>

          <div className="flex flex-col gap-4">
            {form.items.map((item, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-center">
                {/* Name */}
                <div className="col-span-12 md:col-span-5">
                  <InputField
                    id={`item-name-${i}`}
                    label="Item Name"
                    value={item.name}
                    onChange={(e) => setItemField(i, "name", e.target.value)}
                  />
                </div>

                {/* Qty */}
                <input
                  type="number"
                  className="input col-span-4 md:col-span-2 text-center"
                  value={item.quantity}
                  onChange={(e) =>
                    setItemField(i, "quantity", Number(e.target.value))
                  }
                  aria-label="Quantity"
                />

                {/* Price */}
                <input
                  type="number"
                  className="input col-span-4 md:col-span-2 text-right"
                  value={item.price}
                  onChange={(e) =>
                    setItemField(i, "price", Number(e.target.value))
                  }
                  aria-label="Price"
                />

                {/* Total */}
                <p className="col-span-3 md:col-span-2 font-bold text-right">
                  {fmt(item.quantity * item.price)}
                </p>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  className="col-span-1 flex justify-center text-text-muted hover:text-danger transition"
                  aria-label={`Remove item ${i + 1}`}
                >
                  🗑
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addItem}
            className="w-full py-3 bg-border text-text font-medium rounded hover:opacity-80 transition"
          >
            + Add New Item
          </button>
        </fieldset>

        {/* Footer */}
        <div className="bg-card border-t border-border p-4 flex items-center">
          {!initial && (
            <button className="px-4 py-2 bg-border rounded" onClick={onCancel}>
              Discard
            </button>
          )}

          <div className="ml-auto flex gap-2">
            <button
              onClick={() => submit("draft")}
              className="px-4 py-2 bg-border rounded"
            >
              Save Draft
            </button>

            <button
              onClick={() => submit("pending")}
              className="px-4 py-2 bg-primary text-white rounded"
            >
              {initial ? "Save Changes" : "Save & Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
