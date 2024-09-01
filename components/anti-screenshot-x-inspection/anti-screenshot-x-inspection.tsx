"use client";
import { useDevToolsStatus } from "@/lib/hooks/client/use-devtools-status";
import React, { useEffect, ReactNode, useState } from "react";

interface AntiScreenshotXInspectionProps {
  children: ReactNode;
}

interface CustomWindow extends Window {
  devtools: {
    isOpen: boolean;
  };
}

declare const window: CustomWindow;

const AntiScreenshotXInspection = ({
  children,
}: AntiScreenshotXInspectionProps) => {
  const isDevToolsOpen = useDevToolsStatus();

  useEffect(() => {
    // Disable developer tools
    const disableDevTools = (): void => {
      if (isDevToolsOpen) {
        window.location.href = "about:blank";
      }
    };

    if (process.env.NODE_ENV === "production") {
      disableDevTools();
    }
  }, [isDevToolsOpen]);

  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e: MouseEvent): boolean => {
      e.preventDefault();
      return false;
    };

    document.addEventListener("contextmenu", handleContextMenu);

    // Disable keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent): void => {
      // Disable Ctrl+Shift+I (Chrome DevTools)
      if (e.ctrlKey && e.shiftKey && e.key?.toUpperCase() === "I") {
        e.preventDefault();
      }
      // Disable Ctrl+Shift+C (Chrome DevTools)
      if (e.ctrlKey && e.shiftKey && e.key?.toUpperCase() === "C") {
        e.preventDefault();
      }
      // Disable Ctrl+Shift+J (Chrome DevTools)
      if (e.ctrlKey && e.shiftKey && e.key?.toUpperCase() === "J") {
        e.preventDefault();
      }
      // Disable Ctrl+U (View Source)
      if (e.ctrlKey && e.key?.toUpperCase() === "U") {
        e.preventDefault();
      }
      // Disable Ctrl+ P (View Source)
      if (e.ctrlKey && e.key?.toUpperCase() === "P") {
        e.preventDefault();
      }
      // Disable PrtScn
      if (e.key === "PrintScreen") {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    // window.addEventListener('devtoolschange', disableDevTools);

    // Blur content when window loses focus (potential screenshot attempt)
    const handleVisibilityChange = (): void => {
      if (document.hidden) {
        document.body.style.filter = "blur(20px)";
      } else {
        document.body.style.filter = "none";
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup function
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      // window.removeEventListener('devtoolschange', disableDevTools);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <>{children}</>;
};

export default AntiScreenshotXInspection;
