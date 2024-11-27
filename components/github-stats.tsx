import { Card } from "@/components/ui/card";
import type { GitHubProfile } from "@/lib/github";
import {
  Briefcase,
  Building2,
  Calendar,
  GitBranch,
  GitFork,
  GitPullRequest,
  Link,
  MapPin,
  Star,
  Twitter,
  Users,
} from "lucide-react";

function StatItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center space-x-2 p-2 rounded-lg border bg-card">
      <div className="p-2 rounded-md bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div>
        <p className="text-sm font-medium">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export function GitHubStats({ profile }: { profile: GitHubProfile }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatItem
          icon={GitFork}
          label="Repositories"
          value={profile.repositories}
        />
        <StatItem icon={Star} label="Gists" value={profile.stars} />
        <StatItem icon={Users} label="Followers" value={profile.followers} />
        <StatItem icon={Users} label="Following" value={profile.following} />
      </div>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
        <div className="space-y-3">
          {profile.company && (
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span>{profile.company}</span>
            </div>
          )}
          {profile.location && (
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{profile.location}</span>
            </div>
          )}
          {profile.blog && (
            <div className="flex items-center space-x-2">
              <Link className="h-4 w-4 text-muted-foreground" />
              <a
                href={
                  profile.blog.startsWith("http")
                    ? profile.blog
                    : `https://${profile.blog}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {profile.blog}
              </a>
            </div>
          )}
          {profile.twitterUsername && (
            <div className="flex items-center space-x-2">
              <Twitter className="h-4 w-4 text-muted-foreground" />
              <a
                href={`https://twitter.com/${profile.twitterUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                @{profile.twitterUsername}
              </a>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              Joined{" "}
              {new Date(profile.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          {profile.hireable && (
            <div className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span className="text-green-500">Available for hire</span>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href={`https://github.com/${profile.username}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 p-2 rounded-lg border hover:bg-accent transition-colors"
          >
            <GitBranch className="h-4 w-4" />
            <span>View Repositories</span>
          </a>
          <a
            href={`https://github.com/${profile.username}?tab=pulls`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 p-2 rounded-lg border hover:bg-accent transition-colors"
          >
            <GitPullRequest className="h-4 w-4" />
            <span>View Pull Requests</span>
          </a>
        </div>
      </Card>
    </div>
  );
}
