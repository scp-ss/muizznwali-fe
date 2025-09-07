//import TestFirebase from "./test-firebaseClient";
import { Metadata } from "next";

export const revalidate = 10; // ISR works here
export const metadata: Metadata = {
  title: "FireBase Test | Muizz N Wali",
  description: "Testing Firebase Integration",
};

export default function Test_FirebasePage() {
return (
  <p> Fire </p>
)

}