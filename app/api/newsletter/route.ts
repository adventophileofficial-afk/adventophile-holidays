import { newsletterSchema } from "@/lib/validation";
import { handleLeadRequest } from "@/lib/leads";

export async function POST(request: Request) {
  return handleLeadRequest(
    request,
    newsletterSchema,
    (data) => ({
      source: "newsletter",
      page: data.page ?? "",
      name: "",
      email: data.email,
      phone: "",
      destination: "",
      travelMonth: "",
      travellers: "",
      budget: "",
      tour: "",
      message: "",
    }),
    "api/newsletter"
  );
}
