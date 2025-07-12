import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const profileData = {
  name: "John Doe",
  handle: "@johndoe",
  bio: "Full-stack developer passionate about React, TypeScript, and modern web technologies. Building the future, one component at a time.",
  location: "San Francisco, CA",
  website: "johndoe.dev",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
};

export default function EditProfile() {
  const navigate = useNavigate();
  const [bio, setBio] = useState(profileData.bio);

  const handleSave = () => {
    // Here you would save the changes
    console.log("Saving bio:", bio);
    navigate("/profile");
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancel}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Edit profile</h1>
          </div>
          <Button onClick={handleSave} size="sm">
            Save
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="p-4 space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center gap-4">
          <img
            src={profileData.avatar}
            alt={profileData.name}
            className="w-16 h-16 rounded-full"
          />
          <Button variant="ghost" size="sm">
            Change photo
          </Button>
        </div>

        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={profileData.name}
            readOnly
            className="bg-muted text-muted-foreground cursor-not-allowed"
          />
        </div>

        {/* Username Field (greyed out) */}
        <div className="space-y-2">
          <Label htmlFor="username" className="text-muted-foreground">
            Username
          </Label>
          <Input
            id="username"
            value={profileData.handle}
            readOnly
            disabled
            className="bg-muted text-muted-foreground cursor-not-allowed"
          />
          <p className="text-xs text-muted-foreground">
            Username cannot be changed
          </p>
        </div>

        {/* Bio Field */}
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about yourself..."
            className="min-h-[100px] resize-none"
            maxLength={160}
          />
          <p className="text-xs text-muted-foreground text-right">
            {bio.length}/160
          </p>
        </div>

        {/* Location Field */}
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            defaultValue={profileData.location}
            placeholder="Add your location"
          />
        </div>

        {/* Website Field */}
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            defaultValue={profileData.website}
            placeholder="Add your website"
          />
        </div>
      </div>
    </div>
  );
}