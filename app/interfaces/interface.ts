export interface PostingType {
  _id: string
  category: string
  title: string
  description: string
  thumbnailURL: string
  content: string
  views: number
  createdAt: Date
  updatedAt: Date
}

export type OmittedPostingType = Omit<
  PostingType,
  '_id' | 'createdAt' | 'updatedAt' | 'views'
>

export interface CommentUserType {
  commentId: string
  userImage: string
  userId: string
  userName: string
  createdAt: Date
  text: string
}

export interface CommentType {
  _doc?: any
  _id: string
  postingId: string
  title: string
  user: CommentUserType[]
  createdAt: Date
  updatedAt: Date
}

export interface LikeType {
  createdAt: string
  postingId: string
  title: string
  updatedAt: string
  userId: string[]
  count: number
  _id: string
}

export interface GetListingType {
  listing: PostingType[]
  listingCount: number
}

export interface ImagesType {
  imagePath: string
  imageURL: string
}

export interface CheckListType {
  date: string
  list: CheckListItemType[]
}

export interface CheckListItemType {
  listId: string
  text: string
  status: boolean
}

export interface myCommentType {
  title: string
  postingId: string
  commentId: string
  userImage: string
  userId: string
  userName: string
  createdAt: Date
  text: string
}

export interface GPTChat {
  id: number
  content: string
  sender: string
}
