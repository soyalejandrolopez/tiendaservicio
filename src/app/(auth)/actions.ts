"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
    const supabase = await createClient();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        // Redirect to login page with error message
        redirect(`/login?error=${encodeURIComponent(error.message)}`);
    }

    revalidatePath("/", "layout");
    redirect("/dashboard");
}

export async function signup(formData: FormData) {
    const supabase = await createClient();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const returnUrl = formData.get("returnUrl") as string;

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL || 'http://localhost:3000'}/auth/callback`,
        },
    });

    if (error) {
        // Redirect to register page with error message and preserve returnUrl
        const redirectUrl = new URL("/register", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000");
        redirectUrl.searchParams.set("error", error.message);
        if (returnUrl) {
            redirectUrl.searchParams.set("returnUrl", returnUrl);
        }
        redirect(redirectUrl.toString());
    }

    revalidatePath("/", "layout");

    if (returnUrl) {
        redirect(returnUrl);
    }

    redirect("/dashboard");
}
