import { useNavigate } from "react-router-dom";
import { ShieldAlert, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Error() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="max-w-md w-full border-destructive/50">
        <CardContent className="pt-6 text-center">
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-destructive/10 p-4">
                <ShieldAlert className="h-16 w-16 text-destructive" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
            <p className="text-muted-foreground">
              You don't have permission to access this resource.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => navigate("/chat")}
              className="w-full"
              variant="gradient"
            >
              <Home className="mr-2 h-4 w-4" />
              Go to Chat
            </Button>
            
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="w-full"
            >
              Go Back
            </Button>
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg text-xs text-left">
            <p className="font-medium mb-2">Common reasons for this error:</p>
            <ul className="text-muted-foreground space-y-1 list-disc list-inside">
              <li>You don't have the required role (admin/agent)</li>
              <li>Your session has expired</li>
              <li>The resource has been moved or deleted</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
