'use client'

interface CategoryFilterProps {
  categories: string[]
  value: string
  onChange: (value: string) => void
}

// Client component for category filter dropdown
export default function CategoryFilter({ categories, value, onChange }: CategoryFilterProps) {
  return (
    <div>
      <label htmlFor="category" className="sr-only">
        Filter by category
      </label>
      <select
        id="category"
        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}
