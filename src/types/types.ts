export interface Post {
  id: Number
  title: String
  summary: String
  content: String
  date: String
  author: String
  category: String
  likes: Number
  image?: String
}

export interface Category {
  name: String
  title: String
}