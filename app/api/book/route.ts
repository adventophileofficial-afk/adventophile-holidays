import { bookingSchema } from "@/lib/validation";
import { handleLeadRequest } from "@/lib/leads";

export async function POST(request: Request) {
  return handleLeadRequest(
    request,
    bookingSchema,
    (data) => ({
      source: "booking",
      page: data.page ?? "",
      name: data.name,
      email: data.email,
      phone: data.phone,
      destination: "",
      travelMonth: data.startDate ?? "",
      travellers: String(data.guests),
      budget: "",
      tour: `${data.tourTitle} (${data.tourSlug})`,
      message: data.message ?? "",
    }),
    "api/book"
  );
}
