import axios from 'axios'
import type { Post } from '@/types/types'

const API_URL = 'https://61e90d89e1f16abe.mokky.dev/posts'

const buildParams = (limit: number, page: number, category: string, sortArray: string[], search: string = ''): any => {
  const params: any = {
    limit: limit,
    page: page
  }

  if (category) {
    params.category = category
  }

  sortArray.forEach((sortField, index) => {
    params[`sortBy`] = sortField
  })

  if (search) {
    params.title = `*${search}`
    params.summary = `*${search}`
    params.content = `*${search}`
  }

  return params
}

export const fetchPosts = async (limit: number, page: number = 1, category: string = '', sortArray: string[] = ['likes']): Promise<{ posts: Post[], totalPosts: number }> => {
  try {
    const params = buildParams(limit, page, category, sortArray)
    const response = await axios.get(API_URL, { params })

    return {
      posts: response.data.items,
      totalPosts: response.data.meta.total_items
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

export const searchPosts = async (search: string, limit: number, page: number, sortArray: string[] = ['likes']): Promise<{ posts: Post[], totalPosts: number }> => {
  try {
    const params = buildParams(limit, page, '', sortArray, search)
    const response = await axios.get(API_URL, { params })

    return {
      posts: response.data.items,
      totalPosts: response.data.meta.total_items
    }
  } catch (error) {
    console.error('Error searching posts:', error)
    throw error
  }
}
