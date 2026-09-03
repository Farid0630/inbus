"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { products } from "@/lib/products";

export function ContactForm() {
  const t = useTranslations("contact");
  const tProducts = useTranslations("products");
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    product: "",
    message: "",
  });

  function update(field: keyof typeof form) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = `Product Inquiry — ${form.product || "General"} (${form.name})`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Country: ${form.country}`,
      `Product of interest: ${form.product}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink-soft" htmlFor="name">
            {t("formName")}
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={update("name")}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink-soft" htmlFor="email">
            {t("formEmail")}
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink-soft" htmlFor="country">
            {t("formCountry")}
          </label>
          <input
            id="country"
            value={form.country}
            onChange={update("country")}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-ink-soft" htmlFor="product">
          {t("formProduct")}
        </label>
        <select
          id="product"
          value={form.product}
          onChange={update("product")}
          className={inputClass}
        >
          <option value="">{t("formProductPlaceholder")}</option>
          {products.map((product) => (
            <option key={product.slug} value={tProducts(`items.${product.slug}.name`)}>
              {tProducts(`items.${product.slug}.name`)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-ink-soft" htmlFor="message">
          {t("formMessage")}
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder={t("formMessagePlaceholder")}
          value={form.message}
          onChange={update("message")}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-forest-dark"
      >
        {t("formSubmit")}
        <Send className="size-4" aria-hidden />
      </button>
      <p className="text-xs text-muted">{t("formNote")}</p>
    </form>
  );
}
