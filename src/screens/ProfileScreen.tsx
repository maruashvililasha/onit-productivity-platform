import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useProfileViewModel } from '@/viewmodels/useProfileViewModel';
import { CameraIcon } from 'lucide-react';

export function ProfileScreen() {
  const {
    name,
    setName,
    email,
    setEmail,
    role,
    setRole,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    passwordChangeError,
    passwordChangeSuccess,
    handleUpdateProfile,
    handleChangePassword,
  } = useProfileViewModel();

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Profile</h3>
        <p className="text-sm text-muted-foreground">Manage your personal information and security settings</p>
      </div>

      {/* Profile Information */}
      <Card className="border border-border bg-card shadow-none">
        <CardHeader>
          <CardTitle className="text-card-foreground">Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative h-24 w-24">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {name.split(' ').map((n) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="secondary"
                size="icon"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full border border-border bg-background text-foreground hover:bg-secondary"
                aria-label="Change avatar"
              >
                <CameraIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid flex-1 gap-2">
              <Label htmlFor="profile-name" className="text-card-foreground">
                Full Name
              </Label>
              <Input
                id="profile-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background text-foreground"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="profile-email" className="text-card-foreground">
              Email
            </Label>
            <Input
              id="profile-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background text-foreground"
              disabled
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="profile-role" className="text-card-foreground">
              Role
            </Label>
            <Input
              id="profile-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-background text-foreground"
              disabled
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleUpdateProfile} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Update Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card className="border border-border bg-card shadow-none">
        <CardHeader>
          <CardTitle className="text-card-foreground">Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="current-password" className="text-card-foreground">
              Current Password
            </Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="bg-background text-foreground"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-password" className="text-card-foreground">
              New Password
            </Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-background text-foreground"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-new-password" className="text-card-foreground">
              Confirm New Password
            </Label>
            <Input
              id="confirm-new-password"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="bg-background text-foreground"
            />
          </div>
          {passwordChangeError && (
            <p className="text-sm text-destructive">{passwordChangeError}</p>
          )}
          {passwordChangeSuccess && (
            <p className="text-sm text-success">{passwordChangeSuccess}</p>
          )}
          <div className="flex justify-end">
            <Button onClick={handleChangePassword} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
