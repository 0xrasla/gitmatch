import { ContributionHeatmap } from "@/components/contribution-heatmap";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GitHubProfile } from "@/lib/github";
import { GitFork, Star, UserPlus, Users } from "lucide-react";

export function ProfileCard({ profile }: { profile: GitHubProfile }) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pb-2">
        <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
          <AvatarImage src={profile.avatar} alt={profile.name} />
          <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-left">
          <CardTitle className="text-3xl">{profile.name}</CardTitle>
          <p className="text-lg text-muted-foreground">@{profile.username}</p>
          <p className="text-muted-foreground mt-2">{profile.bio}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <Stat
            icon={<GitFork className="h-4 w-4" />}
            label="Repositories"
            value={profile.repositories}
          />
          <Stat
            icon={<Star className="h-4 w-4" />}
            label="Stars"
            value={profile.stars}
          />
          <Stat
            icon={<Users className="h-4 w-4" />}
            label="Followers"
            value={profile.followers}
          />
          <Stat
            icon={<UserPlus className="h-4 w-4" />}
            label="Following"
            value={profile.following}
          />
        </div>
        <ContributionHeatmap username={profile.username} />
      </CardContent>
    </Card>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center space-x-2 text-muted-foreground mb-1">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-2xl font-bold">
        {label === "Stars" ? "~ " : ""}
        {value?.toLocaleString()}
      </span>
    </div>
  );
}
