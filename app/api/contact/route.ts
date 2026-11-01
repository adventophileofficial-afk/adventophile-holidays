import { contactSchema } from "@/lib/validation";
import { budgetOptions } from "@/lib/budget";
import { handleLeadRequest } from "@/lib/leads";
import { getDestinationName } from "@/lib/data/destinations";

export async function POST(request: Request) {
  return handleLeadRequest(
    request,
    contactSchema,
    (data) => ({
      source: "contact",
      page: data.page ?? "",
      name: data.name,
      email: data.email,
      phone: data.phone,
      destination: data.destination
        ? data.destination === "not-sure"
          ? "Not sure yet"
          : getDestinationName(data.destination)
        : "",
      travelMonth: data.travelMonth ?? "",
      travellers: String(data.travellers),
      budget: budgetOptions.find((option) => option.value === data.budget)?.label ?? "",
      tour: "",
      message: data.message ?? "",
    }),
    "api/contact"
  );
}
