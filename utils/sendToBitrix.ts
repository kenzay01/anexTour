export async function sendToBitrix24(formData: {
  name: string;
  phone: string;
  email?: string;
  destination?: string;
  wishes?: string;
}) {
  try {
    const queryURL =
      "https://crm-tour.bitrix24.eu/rest/1/aa8n527bdhmdad25/crm.lead.add.json";

    const params = new URLSearchParams();

    const commentParts = [
      formData.destination ? `Напрямок: ${formData.destination}` : "",
      formData.wishes ? `Побажання: ${formData.wishes}` : "",
    ].filter(Boolean);

    params.append("FIELDS[TITLE]", "Новий лід з сайта AneX Tour");
    params.append("FIELDS[NAME]", formData.name);
    if (commentParts.length > 0) {
      params.append("FIELDS[COMMENTS]", commentParts.join("\n"));
    }

    if (formData.phone) {
      params.append("FIELDS[PHONE][0][VALUE]", formData.phone);
      params.append("FIELDS[PHONE][0][VALUE_TYPE]", "WORK");
    }

    if (formData.email) {
      params.append("FIELDS[EMAIL][0][VALUE]", formData.email);
      params.append("FIELDS[EMAIL][0][VALUE_TYPE]", "WORK");
    }

    params.append("FIELDS[REGISTER_SONET_EVENT]", "Y");

    const response = await fetch(queryURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const result = await response.json();

    if (result.error) {
      console.error(
        "Bitrix24 API Error:",
        result.error_description || result.error
      );
      return { success: false, error: result.error };
    }

    console.log("✅ Лід успішно створений у Bitrix24:", result);
    return { success: true, data: result };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("❌ Помилка при відправці до Bitrix24:", error);
    return { success: false, error: message };
  }
}
