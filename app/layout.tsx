// app/layout.tsx
"use client";
import { useState } from "react";
import "./globals.css";
import Header from "@/components/Header";
import LoginModal from "@/components/LoginModal";
import SignupModal from "@/components/SignupModal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  return (
    <html lang="en">
      <body className="text-gray-900">
        <Header 
          onLoginClick={() => setIsLoginModalOpen(true)}
          onSignupClick={() => setIsSignupModalOpen(true)}
        />
        <main className="container mx-auto p-6">{children}</main>
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        <SignupModal isOpen={isSignupModalOpen} onClose={() => setIsSignupModalOpen(false)} />
      </body>
    </html>
  );
}