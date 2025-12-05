import {useTheme} from "next-themes";
import {Toaster as Sonner} from "sonner";

const Toaster = () => {
  const {theme} = useTheme();

  return (
    <Sonner
      theme={(theme as "light" | "dark" | "system") || "light"}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
    />
  );
};

export {Toaster};
