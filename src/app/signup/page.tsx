import { AuthForm } from "@/components/auth-form";

export const metadata = { title: "Create account — VibePass" };

export default function SignupPage() {
  return <AuthForm mode="signup" />;
}
