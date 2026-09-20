import { useTranslations } from "next-intl";
import { inputCls, selectCls, type FormData } from "./types";

export function Step3({
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
          <label className="mb-1.5 block text-sm font-medium">
            {t("experience")}
          </label>
          <select
            value={data.experience}
            onChange={(e) => onChange("experience", e.target.value)}
            className={selectCls}
          >
            <option value="none">{t("experience_none")}</option>
            <option value="basic">{t("experience_basic")}</option>
            <option value="intermediate">{t("experience_intermediate")}</option>
            <option value="advanced">{t("experience_advanced")}</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">
            {t("format_pref")}
          </label>
          <select
            value={data.format}
            onChange={(e) => onChange("format", e.target.value)}
            className={selectCls}
          >
            <option value="hybrid">{t("format_hybrid")}</option>
            <option value="online">{t("format_online")}</option>
            <option value="physical">{t("format_physical")}</option>
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">{t("message")}</label>
        <textarea
          rows={4}
          value={data.message}
          onChange={(e) => onChange("message", e.target.value)}
          className={`${inputCls} resize-none`}
          placeholder={t("message")}
        />
      </div>
    </div>
  );
}
