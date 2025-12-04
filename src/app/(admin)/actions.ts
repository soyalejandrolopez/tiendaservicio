"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function activateOrder(formData: FormData) {
    const orderId = formData.get("orderId") as string;
    const activationUrl = formData.get("activationUrl") as string;
    const serviceCredentials = formData.get("serviceCredentials") as string;

    if (!orderId) {
        return { error: "Order ID is required" };
    }

    const supabase = await createClient();

    const { error } = await supabase
        .from("orders")
        .update({
            activation_url: activationUrl,
            service_credentials: serviceCredentials,
            status: "completed" // Marking as completed/active
        })
        .eq("id", orderId);

    if (error) {
        console.error("Error activating order:", error);
        return { error: "Failed to activate order" };
    }

    revalidatePath(`/admin/orders/${orderId}`);
    revalidatePath("/admin/orders");
    return { success: true };
}
