import { Metadata } from "next";
import PrivacyPolicyClient from "@/components/policies/PrivacyPolicyClient";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
