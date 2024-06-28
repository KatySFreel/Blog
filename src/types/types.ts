export interface Post {
  id: number
  title: string
  summary: string
  content: string
  category: string
  likes: number
}

export interface Category {
  name: String
  title: String
}