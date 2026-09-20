const SHEETS_WEBHOOK_URL = process.env.SHEETS_WEBHOOK_URL;

export async function appendToSheet(data: {
  sheet: "enrollments" | "contacts" | "newsletter" | "referrals";
  row: Record<string, string>;
}) {
  if (!SHEETS_WEBHOOK_URL) {
    console.log("[Sheets] No SHEETS_WEBHOOK_URL set, skipping:", data.sheet, data.row);
    return { success: true };
  }

  try {
    const response = await fetch(SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sheet: data.sheet,
        row: data.row,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Sheets API returned ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error("[Sheets] Failed to append:", error);
    return { success: false, error };
  }
}
