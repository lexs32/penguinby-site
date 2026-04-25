import { Toaster as Sonner } from "sonner";

export function Toaster(props) {
  return (
    <Sonner
      theme="dark"
      className="toaster"
      toastOptions={{
        classNames: {
          toast: "bg-card text-foreground border border-border shadow-lg",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
        },
      }}
      {...props}
    />
  );
}

