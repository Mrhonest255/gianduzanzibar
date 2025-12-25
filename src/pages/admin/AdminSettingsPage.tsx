import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Shield, 
  Building2, 
  Phone, 
  Share2,
  Save,
  Loader2,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SiteSetting {
  id: string;
  key: string;
  value: string;
  label: string;
  description: string;
  category: string;
}

export default function AdminSettingsPage() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editedSettings, setEditedSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .order("category", { ascending: true });

      if (error) throw error;
      
      setSettings(data || []);
      const initialValues: Record<string, string> = {};
      data?.forEach((s: SiteSetting) => {
        initialValues[s.key] = s.value;
      });
      setEditedSettings(initialValues);
    } catch (err) {
      console.error("Error fetching settings:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load settings",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setEditedSettings((prev) => ({ ...prev, [key]: value }));
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      const updates = Object.entries(editedSettings).map(([key, value]) => ({
        key,
        value,
        updated_at: new Date().toISOString(),
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from("site_settings")
          .update({ value: update.value, updated_at: update.updated_at })
          .eq("key", update.key);

        if (error) throw error;
      }

      toast({
        title: "Settings Saved!",
        description: "Website settings have been updated successfully.",
      });
    } catch (err) {
      console.error("Error saving settings:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save settings. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getSettingsByCategory = (category: string) => {
    return settings.filter((s) => s.category === category);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "company":
        return <Building2 className="h-5 w-5" />;
      case "contact":
        return <Phone className="h-5 w-5" />;
      case "social":
        return <Share2 className="h-5 w-5" />;
      default:
        return <Building2 className="h-5 w-5" />;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case "company":
        return "Company Information";
      case "contact":
        return "Contact Details";
      case "social":
        return "Social Media Links";
      default:
        return category;
    }
  };

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case "company":
        return "Basic company information displayed on the website";
      case "contact":
        return "Contact information for customers to reach you";
      case "social":
        return "Links to your social media profiles";
      default:
        return "";
    }
  };

  const categories = [...new Set(settings.map((s) => s.category))];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage website settings and your account</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchSettings} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button onClick={saveSettings} disabled={isSaving || isLoading}>
            {isSaving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save All
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Website Settings by Category */}
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getCategoryIcon(category)}
                    {getCategoryTitle(category)}
                  </CardTitle>
                  <CardDescription>{getCategoryDescription(category)}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {getSettingsByCategory(category).map((setting) => (
                    <div key={setting.key} className="space-y-2">
                      <Label htmlFor={setting.key}>{setting.label}</Label>
                      {setting.key === "company_address" ? (
                        <Textarea
                          id={setting.key}
                          value={editedSettings[setting.key] || ""}
                          onChange={(e) => handleInputChange(setting.key, e.target.value)}
                          placeholder={setting.description}
                          rows={2}
                        />
                      ) : (
                        <Input
                          id={setting.key}
                          value={editedSettings[setting.key] || ""}
                          onChange={(e) => handleInputChange(setting.key, e.target.value)}
                          placeholder={setting.description}
                        />
                      )}
                      <p className="text-xs text-muted-foreground">{setting.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Account */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categories.length * 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account
                </CardTitle>
                <CardDescription>Your admin account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="text-foreground font-medium">{user?.email}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">User ID</Label>
                  <p className="text-foreground font-mono text-sm">{user?.id}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Role</Label>
                  <p className="text-foreground font-medium">Administrator</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (categories.length + 1) * 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security
                </CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="font-medium text-foreground">Sign Out</p>
                    <p className="text-sm text-muted-foreground">
                      Sign out of your admin account
                    </p>
                  </div>
                  <Button variant="outline" onClick={signOut}>
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </div>
  );
}
