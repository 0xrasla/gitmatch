import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitFork, Star, UserPlus, Users } from "lucide-react";

export function ComparisonGrid() {
  const profiles = [
    {
      username: "octocat",
      name: "The Octocat",
      avatar: "https://github.com/octocat.png",
      repositories: 42,
      stars: 9001,
      followers: 1000000,
      following: 1,
    },
    {
      username: "github",
      name: "GitHub",
      avatar: "https://github.com/github.png",
      repositories: 500,
      stars: 50000,
      followers: 5000000,
      following: 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {profiles.map((profile) => (
        <Card key={profile.username}>
          <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{profile.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                @{profile.username}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
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
          </CardContent>
        </Card>
      ))}
    </div>
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
    <div className="flex items-center space-x-2">
      {icon}
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value.toLocaleString()}</p>
      </div>
    </div>
  );
}
