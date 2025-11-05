import { Navbar } from "@/components/Navbar";
import { LogTable } from "@/components/LogTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Shield } from "lucide-react";
import { toast } from "sonner";

export default function Admin() {
  const handleRefresh = () => {
    // TODO: Connect to Firebase to fetch latest logs
    toast.info("Refreshing audit logs...", {
      description: "In production, this would fetch the latest logs from Firebase",
    });
  };

  const handleExport = () => {
    // TODO: Export logs from Firebase
    toast.success("Exporting audit logs...", {
      description: "In production, this would export logs to CSV/PDF",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 p-6 bg-background">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              </div>
              <p className="text-muted-foreground">
                Monitor system activity and security audit logs
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleRefresh} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button onClick={handleExport} variant="gradient">
                <Download className="mr-2 h-4 w-4" />
                Export Logs
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Events</CardDescription>
                <CardTitle className="text-3xl">1,234</CardTitle>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Success Rate</CardDescription>
                <CardTitle className="text-3xl text-success">98.5%</CardTitle>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Active Users</CardDescription>
                <CardTitle className="text-3xl">42</CardTitle>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Security Alerts</CardDescription>
                <CardTitle className="text-3xl text-destructive">3</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Audit Log Table */}
          <Card>
            <CardHeader>
              <CardTitle>Audit Logs</CardTitle>
              <CardDescription>
                Comprehensive security and activity audit trail
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LogTable />
            </CardContent>
          </Card>

          <div className="rounded-lg bg-muted/50 border border-border p-4 text-sm">
            <p className="font-medium mb-2">📝 Note: Demo Data</p>
            <p className="text-muted-foreground">
              This admin panel is displaying dummy audit log data. In production, this would be connected to Firebase Firestore 
              to display real-time security events, user actions, and system activities.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
