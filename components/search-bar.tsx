'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  onSearch?: (username: string) => void
  compareMode?: boolean
  disabled?: boolean
  placeholder?: string
}

export function SearchBar({ 
  onSearch, 
  compareMode = false, 
  disabled = false,
  placeholder = "Enter GitHub username..."
}: SearchBarProps) {
  const [username, setUsername] = useState('')
  const router = useRouter()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!disabled && username.trim()) {
      if (onSearch) {
        onSearch(username.trim())
      } else {
        router.push(`/compare?users=${username.trim()}`)
      }
      setUsername('')
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex space-x-2 mb-8">
      <Input
        type="text"
        placeholder={compareMode ? (placeholder || "Add GitHub username to compare...") : placeholder}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="flex-grow"
        disabled={disabled}
      />
      <Button type="submit" disabled={disabled || !username.trim()}>
        <Search className="mr-2 h-4 w-4" /> {compareMode ? 'Add' : 'Search'}
      </Button>
    </form>
  )
}
