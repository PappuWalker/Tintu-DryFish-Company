import { Metadata } from "next";
import RefundPolicyClient from "@/components/policies/RefundPolicyClient";

export const metadata: Metadata = {
  title: "Refund Policy",
};

export default function RefundPolicyPage() {
  return <RefundPolicyClient />;
}
