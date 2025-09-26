import { Metadata } from "next";
import TermsPolicyClient from "@/components/policies/TermsPolicyClient";

export const metadata: Metadata = {
  title: "Terms and Conditions",
};

export default function TermsAndConditionsPage() {
  return <TermsPolicyClient />;
}
