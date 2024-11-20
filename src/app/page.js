"use client"
import Frontpage from "@/components/Frontpage";
import Navbar from "@/components/Navbar";
import { isUserLoggedIn } from "@/utils/appwriteAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Home() 
{
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const status = await isUserLoggedIn();
      if (!status.success) {
        toast.error("You need to be logged in first to use the app")
        router.push("/signin"); // Redirect to login page if not logged in
      }
    };

    checkUser();
  },[router])
  return (
    <>
        <Navbar></Navbar>
        <Frontpage></Frontpage>
    </>
  );
}
