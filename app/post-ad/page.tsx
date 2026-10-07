import { Header } from "@/components/global/Header";
import { Footer } from "@/components/global/Footer";
import { PostAdClient } from "@/components/tutors/PostAdClient";

export const metadata = {
  title: "Post an Advertisement | EduRide",
  description: "Post a learning requirement as a student/parent or register as a tutor on EduRide.",
};

export default function PostAdPage() {
  return (
    <main className="min-h-screen bg-white text-[#0f172a] font-sans selection:bg-[#2563eb] selection:text-white">
      <Header />
      <PostAdClient />
      <Footer />
    </main>
  );
}
