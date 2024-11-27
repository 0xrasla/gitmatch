"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { fetchGitHubProfile, type GitHubProfile } from "@/lib/github";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProfileCard } from "./profile-card";
import { SearchBar } from "./search-bar";

const MAX_PROFILES = 3;

export function ComparisonView() {
  const [profiles, setProfiles] = useState<GitHubProfile[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const users = searchParams.get("users");
    if (users) {
      setIsLoading(true);
      const usernames = users.split(",").filter(Boolean).slice(0, MAX_PROFILES);
      Promise.all(usernames.map((username) => fetchGitHubProfile(username)))
        .then((newProfiles) => {
          setProfiles(newProfiles);
          setError("");
          if (usernames.length < users.split(",").filter(Boolean).length) {
            router.push(`/compare?users=${usernames.join(",")}`);
          }
        })
        .catch((err) => {
          setError("Failed to fetch some profiles. Please try again.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [searchParams, router]);

  const handleAddProfile = async (username: string) => {
    if (profiles.length >= MAX_PROFILES) {
      setError(`You can only compare up to ${MAX_PROFILES} profiles at a time`);
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const profile = await fetchGitHubProfile(username);
      if (!profiles.some((p) => p.username === profile.username)) {
        const newProfiles = [...profiles, profile];
        setProfiles(newProfiles);
        const newUsers = newProfiles.map((p) => p.username).join(",");
        router.push(`/compare?users=${newUsers}`);
      } else {
        setError("This profile is already being compared");
      }
    } catch (err) {
      setError(
        "Failed to fetch profile. Please check the username and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <SearchBar
        onSearch={handleAddProfile}
        compareMode={true}
        disabled={profiles.length >= MAX_PROFILES}
        placeholder={
          profiles.length >= MAX_PROFILES
            ? `Maximum ${MAX_PROFILES} profiles reached`
            : `Add GitHub username to compare (${profiles.length}/${MAX_PROFILES})...`
        }
      />
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 content-center items-center">
        {isLoading && (
          <>
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          </>
        )}
        {!isLoading &&
          profiles.map((profile) => (
            <ProfileCard key={profile.username} profile={profile} />
          ))}
      </div>
      {!isLoading && profiles.length === 0 && !error && (
        <div className="text-center text-muted-foreground">
          Add GitHub usernames to compare their profiles (max {MAX_PROFILES})
        </div>
      )}
    </div>
  );
}
