import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useSettingsViewModel } from '@/viewmodels/useSettingsViewModel';

export function SettingsScreen() {
  const {
    studioName,
    setStudioName,
    currency,
    setCurrency,
    timeFormat,
    setTimeFormat,
    notificationsEnabled,
    setNotificationsEnabled,
    emailNotifications,
    setEmailNotifications,
    inAppNotifications,
    setInAppNotifications,
    handleSaveSettings,
  } = useSettingsViewModel();

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Settings</h3>
        <p className="text-sm text-muted-foreground">Manage your application preferences</p>
      </div>

      {/* General Settings */}
      <Card className="border border-border bg-card shadow-none">
        <CardHeader>
          <CardTitle className="text-card-foreground">General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="studio-name" className="text-card-foreground">
              Studio Name
            </Label>
            <Input
              id="studio-name"
              value={studioName}
              onChange={(e) => setStudioName(e.target.value)}
              className="bg-background text-foreground"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="currency" className="text-card-foreground">
              Currency
            </Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="bg-background text-foreground">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground">
                <SelectItem value="USD" className="text-popover-foreground">
                  USD ($)
                </SelectItem>
                <SelectItem value="EUR" className="text-popover-foreground">
                  EUR (€)
                </SelectItem>
                <SelectItem value="GBP" className="text-popover-foreground">
                  GBP (£)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="time-format" className="text-card-foreground">
              Time Format
            </Label>
            <Select value={timeFormat} onValueChange={setTimeFormat}>
              <SelectTrigger className="bg-background text-foreground">
                <SelectValue placeholder="Select time format" />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground">
                <SelectItem value="24h" className="text-popover-foreground">
                  24-hour (e.g., 14:00)
                </SelectItem>
                <SelectItem value="12h" className="text-popover-foreground">
                  12-hour (e.g., 2:00 PM)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="border border-border bg-card shadow-none">
        <CardHeader>
          <CardTitle className="text-card-foreground">Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-notifications" className="text-card-foreground">
              Enable All Notifications
            </Label>
            <Switch
              id="enable-notifications"
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications" className="text-card-foreground">
              Email Notifications
            </Label>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
              disabled={!notificationsEnabled}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="in-app-notifications" className="text-card-foreground">
              In-App Notifications
            </Label>
            <Switch
              id="in-app-notifications"
              checked={inAppNotifications}
              onCheckedChange={setInAppNotifications}
              disabled={!notificationsEnabled}
            />
          </div>
        </CardContent>
      </Card>

      {/* Billing (Placeholder) */}
      <Card className="border border-border bg-card shadow-none">
        <CardHeader>
          <CardTitle className="text-card-foreground">Billing</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Manage your subscription and payment methods.</p>
          <Button variant="outline" className="mt-4 bg-background text-foreground hover:bg-secondary">
            Go to Billing Portal
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="bg-primary text-primary-foreground hover:bg-primary/90">
          Save Settings
        </Button>
      </div>
    </div>
  );
}
