'use client'

import { SearchBar } from '@/components/search-bar'
import { ProfileCard } from '@/components/profile-card'
import { useState } from 'react'
import { fetchGitHubProfile, type GitHubProfile } from '@/lib/github'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GitCompare } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export default function Home() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null)
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (username: string) => {
    setIsLoading(true)
    setError('')
    try {
      const data = await fetchGitHubProfile(username)
      setProfile(data)
    } catch (err) {
      setError('Failed to fetch profile. Please check the username and try again.')
      setProfile(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">GitHub Profile Viewer</h1>
        <Link href="/compare">
          <Button variant="outline">
            <GitCompare className="mr-2 h-4 w-4" />
            Compare Profiles
          </Button>
        </Link>
      </div>
      <SearchBar onSearch={handleSearch} />
      {error && (
        <div className="text-red-500 text-center mb-8">{error}</div>
      )}
      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      )}
      {!isLoading && profile && <ProfileCard profile={profile} />}
      {!isLoading && !profile && !error && (
        <div className="text-center text-muted-foreground">
          Enter a GitHub username to view their profile
        </div>
      )}
    </div>
  )
}
