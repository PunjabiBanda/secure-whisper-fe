import { useState } from "react";
import { Upload, Download, File, Lock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useChat } from "@/contexts/ChatContext";
import { encryptFile, decryptFile } from "@/utils/encryption";
import { toast } from "sonner";

export function FileUploadCard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const { encryptionKey } = useChat();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast.success(`Selected: ${file.name}`);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !encryptionKey) {
      toast.error("No file selected or encryption key unavailable");
      return;
    }

    // TODO: Connect to Firebase Storage
    setIsEncrypting(true);
    
    try {
      // Encrypt the file
      const encrypted = await encryptFile(selectedFile, encryptionKey);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Encrypted file ready for upload:", {
        name: encrypted.name,
        type: encrypted.type,
        size: encrypted.encrypted.byteLength,
      });
      
      toast.success("File encrypted and ready to upload!", {
        description: "In production, this would be uploaded to Firebase Storage",
      });
    } catch (error) {
      console.error("Encryption failed:", error);
      toast.error("Failed to encrypt file");
    } finally {
      setIsEncrypting(false);
    }
  };

  const handleDownload = async () => {
    // TODO: Download from Firebase Storage and decrypt
    toast.info("Download feature", {
      description: "In production, this would download and decrypt files from Firebase Storage",
    });
  };

  const clearFile = () => {
    setSelectedFile(null);
  };

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Encrypted File Transfer</h3>
        </div>

        <div className="space-y-4">
          {!selectedFile ? (
            <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-smooth">
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Click to select file</p>
              <p className="text-xs text-muted-foreground">Files are encrypted before upload</p>
              <input
                type="file"
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>
          ) : (
            <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
              <File className="h-8 w-8 text-primary" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={clearFile}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isEncrypting}
              className="flex-1"
              variant="gradient"
            >
              <Upload className="mr-2 h-4 w-4" />
              {isEncrypting ? "Encrypting..." : "Encrypt & Upload"}
            </Button>

            <Button
              onClick={handleDownload}
              variant="outline"
              className="flex-1"
            >
              <Download className="mr-2 h-4 w-4" />
              Download File
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            All files are encrypted with AES-256-GCM before transmission
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
