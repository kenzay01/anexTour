export async function sendToBitrix24(formData: {
  name: string;
  phone: string;
  email?: string;
  destination?: string;
  wishes?: string;
}) {
  try {
    const queryURL =
      "https://crm-tour.bitrix24.eu/rest/1/zv91nb29z4x1csez/crm.lead.add.json";

    const params = new URLSearchParams();

    // Основні поля
    params.append("FIELDS[TITLE]", "Новий лід з сайта AneX Tour");
    params.append("FIELDS[NAME]", formData.name);
    params.append("FIELDS[LAST_NAME]", formData.destination || "");
    params.append("FIELDS[COMMENTS]", formData.wishes || "");

    // Телефон
    if (formData.phone) {
      params.append("FIELDS[PHONE][0][VALUE]", formData.phone);
      params.append("FIELDS[PHONE][0][VALUE_TYPE]", "MOBILE");
    }

    // Email
    if (formData.email) {
      params.append("FIELDS[EMAIL][0][VALUE]", formData.email);
      params.append("FIELDS[EMAIL][0][VALUE_TYPE]", "WORK");
    }

    // Додатково — реєстрація події
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
  } catch (error: any) {
    console.error("❌ Помилка при відправці до Bitrix24:", error);
    return { success: false, error: error.message || error };
  }
}
