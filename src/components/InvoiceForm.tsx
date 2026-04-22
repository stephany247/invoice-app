import { useEffect, useState } from "react";
import { fmt, fmtNumber, today } from "../utils/utils";
import type { Invoice, Item, Status } from "../types/types";
import BackButton from "./BackButton";
import InputField from "./InputField";
import { ChevronDown } from "lucide-react";
import { FaTrash } from "react-icons/fa";

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
  open,
}: {
  initial?: Invoice;
  onBack: () => void;
  onSave: (data: Invoice) => void;
  onCancel: () => void;
  open: boolean;
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

  useEffect(() => {
    if (initial) {
      setForm({
        ...initial,
        items: initial.items.map((i) => ({
          name: i.name,
          quantity: Number(i.quantity),
          price: Number(i.price),
        })),
      });
    } else {
      setForm(blankForm());
    }
  }, [initial]);

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
    <div className="fixed inset-0 z-10 pointer-events-none flex flex-col h-full">
      {/* overlay */}
      <div
        className={`md:absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0"}`}
        onClick={onCancel}
      />
      {/* drawer */}
      <div
        className={`absolute top-18 md:top-20 left-0 bottom-0 bg-card overflow-y-auto w-full md:w-150 transition-transform duration-300 ease-in-out md:rounded-r-md ${open ? "block translate-x-0" : "hidden md:block md:-translate-x-full"} pointer-events-auto
  `}
      >
        <section className="p-6 md:p-12 space-y-8 md:space-y-12">
          <div className="md:hidden">
            <BackButton onClick={onBack} />
          </div>

          <h2 className="text-xl md:text-2xl font-bold md:mb-8">
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

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                <InputField
                  id="fromCountry"
                  label="Country"
                  value={form.fromCountry}
                  onChange={(e) => setField("fromCountry", e.target.value)}
                  className="col-span-2 md:col-span-1"
                />
              </div>
            </div>
          </fieldset>

          {/* Bill To */}
          <fieldset className="space-y-6">
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

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                <InputField
                  id="country"
                  label="Country"
                  value={form.country}
                  onChange={(e) => setField("country", e.target.value)}
                  className="col-span-2 md:col-span-1"
                />
              </div>
            </div>
          </fieldset>

          {/* Dates */}
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
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
              className="md:col-span-2"
            />
          </fieldset>

          <fieldset className="space-y-2 mb-6">
            <legend className="text-[#777F98] font-bold text-lg block mb-4">
              Item List
            </legend>

            {/* Desktop header */}
            <div className="hidden md:grid grid-cols-[4fr_60px_100px_1fr_20px] gap-4 text-text-muted text-sm mb-2">
              <span>Item Name</span>
              <span>Qty.</span>
              <span>Price</span>
              <span>Total</span>
              <span />
            </div>

            {/* Desktop rows */}
            {form.items.map((item, i) => (
              <div
                key={i}
                className="hidden md:grid grid-cols-[4fr_60px_100px_1fr_20px] gap-4 items-center mb-4"
              >
                <InputField
                  id={`item-name-${i}`}
                  label="Item Name"
                  value={item.name}
                  onChange={(e) => setItemField(i, "name", e.target.value)}
                  hideLabel
                />
                <InputField
                  id={`item-qty-${i}`}
                  label="Qty"
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    setItemField(i, "quantity", Number(e.target.value))
                  }
                  hideLabel
                />
                <InputField
                  id={`item-price-${i}`}
                  label="Price"
                  type="number"
                  value={item.price}
                  onChange={(e) =>
                    setItemField(i, "price", Number(e.target.value))
                  }
                  hideLabel
                />
                <p className="font-bold text-text-muted text-sm">
                  {fmtNumber(item.quantity * item.price)}
                </p>
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  className="text-text-muted hover:text-danger transition"
                  aria-label={`Remove item ${i + 1}`}
                >
                  <FaTrash />
                </button>
              </div>
            ))}

            {/* Mobile cards */}
            {form.items.map((item, i) => (
              <div
                key={i}
                className="md:hidden flex flex-col gap-3 bg-input rounded-lg mb-4"
              >
                <InputField
                  id={`item-name-mob-${i}`}
                  label="Item Name"
                  value={item.name}
                  onChange={(e) => setItemField(i, "name", e.target.value)}
                />
                <div className="grid grid-cols-[80px_1fr_1fr_auto] gap-3 items-end">
                  <InputField
                    id={`item-qty-mob-${i}`}
                    label="Qty."
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      setItemField(i, "quantity", Number(e.target.value))
                    }
                  />
                  <InputField
                    id={`item-price-mob-${i}`}
                    label="Price"
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      setItemField(i, "price", Number(e.target.value))
                    }
                  />
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-text-muted font-medium">
                      Total
                    </span>
                    <p className="font-bold py-2 text-sm">
                      {fmtNumber(item.quantity * item.price)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(i)}
                    className="text-text-muted hover:text-danger transition mb-2"
                    aria-label={`Remove item ${i + 1}`}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addItem}
              className="w-full py-3 mt-2 bg-light-btn text-text-muted font-bold rounded-full hover:opacity-80 transition"
            >
              + Add New Item
            </button>
          </fieldset>
        </section>
        {/* Footer */}
        <section className="flex gap-2 md:gap-3 justify-end bg-light-btn p-4 font-bold text-nowrap shadow-2xl">
          <button
            className="px-6 py-3 rounded-full bg-light-btn text-text-muted md:justify-start"
            onClick={onCancel}
          >
            {initial ? "Cancel" : "Discard"}
          </button>
          {!initial && (
            <button
              onClick={() => submit("draft")}
              className="px-4 py-2 bg-[#373B53] text-text-secondary dark:text-text-muted rounded-full"
            >
              Save Draft
            </button>
          )}

          <button
            onClick={() => submit("pending")}
            className="px-4 py-2 bg-primary text-white rounded-full"
          >
            {initial ? "Save Changes" : "Save & Send"}
          </button>
        </section>
      </div>
    </div>
  );
}
