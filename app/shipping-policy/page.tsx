import { Metadata } from "next";
import ShippingPolicyClient from "@/components/policies/ShippingPolicyClient";

export const metadata: Metadata = {
  title: "Shipping Policy",
};

export default function ShippingPolicyPage() {
  return <ShippingPolicyClient />;
}
