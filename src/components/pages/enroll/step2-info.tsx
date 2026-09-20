import { useTranslations } from "next-intl";
import { inputCls, type FormData } from "./types";

export function Step2({
  data,
  onChange,
  t,
}: {
  data: FormData;
  onChange: <K extends keyof FormData>(key: K, val: FormData[K]) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">{t("name")}</label>
          <input
            type="text"
            required
            value={data.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            className={inputCls}
            placeholder={t("name")}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">{t("email")}</label>
          <input
            type="email"
            required
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={inputCls}
            placeholder={t("email")}
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">{t("phone")}</label>
          <input
            type="tel"
            required
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={inputCls}
            placeholder="+355 ..."
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">{t("dob")}</label>
          <input
            type="date"
            required
            value={data.dob}
            onChange={(e) => onChange("dob", e.target.value)}
            className={inputCls}
          />
        </div>
      </div>
    </div>
  );
}
