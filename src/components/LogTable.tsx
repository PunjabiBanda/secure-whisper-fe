import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";

export interface AuditLog {
  id: string;
  timestamp: Date;
  user: string;
  action: string;
  status: "success" | "warning" | "error";
  details: string;
  ipAddress: string;
}

// Demo audit logs
const DEMO_LOGS: AuditLog[] = [
  {
    id: "log1",
    timestamp: new Date(Date.now() - 300000),
    user: "alice@secure.com",
    action: "Message Sent",
    status: "success",
    details: "Encrypted message to bob@secure.com",
    ipAddress: "192.168.1.100",
  },
  {
    id: "log2",
    timestamp: new Date(Date.now() - 600000),
    user: "bob@secure.com",
    action: "File Upload",
    status: "success",
    details: "Uploaded document.pdf (encrypted)",
    ipAddress: "192.168.1.101",
  },
  {
    id: "log3",
    timestamp: new Date(Date.now() - 900000),
    user: "carol@secure.com",
    action: "Login Attempt",
    status: "warning",
    details: "Failed login attempt - wrong password",
    ipAddress: "192.168.1.102",
  },
  {
    id: "log4",
    timestamp: new Date(Date.now() - 1200000),
    user: "david@secure.com",
    action: "Key Rotation",
    status: "success",
    details: "Encryption key rotated successfully",
    ipAddress: "192.168.1.103",
  },
  {
    id: "log5",
    timestamp: new Date(Date.now() - 1500000),
    user: "system",
    action: "Security Scan",
    status: "success",
    details: "Automated security scan completed",
    ipAddress: "127.0.0.1",
  },
  {
    id: "log6",
    timestamp: new Date(Date.now() - 1800000),
    user: "alice@secure.com",
    action: "Access Denied",
    status: "error",
    details: "Attempted to access restricted area",
    ipAddress: "192.168.1.100",
  },
];

export function LogTable() {
  // TODO: Connect to Firebase to fetch real audit logs
  const logs = DEMO_LOGS;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <Shield className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "destructive" | "outline"> = {
      success: "default",
      warning: "outline",
      error: "destructive",
    };
    return variants[status] || "default";
  };

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>IP Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getStatusIcon(log.status)}
                  <Badge variant={getStatusBadge(log.status)} className="capitalize">
                    {log.status}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="font-mono text-xs">
                {log.timestamp.toLocaleString()}
              </TableCell>
              <TableCell className="font-medium">{log.user}</TableCell>
              <TableCell>{log.action}</TableCell>
              <TableCell className="text-muted-foreground">{log.details}</TableCell>
              <TableCell className="font-mono text-xs">{log.ipAddress}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
