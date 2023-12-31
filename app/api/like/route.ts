import { connectMongo } from '@/app/utils/database'
import { Favorite } from '@/models/favorite'
import { NextRequest, NextResponse } from 'next/server'
import { LikeType } from '@/app/interfaces/interface'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(req: NextRequest) {
  const postingId = req.nextUrl.searchParams.get('postingId')
  const session = await getServerSession(authOptions)

  try {
    await connectMongo()
    const isLike = await Favorite.findOne<LikeType>({
      postingId,
      userId: session?.user.id,
    })
    if (isLike !== null) {
      return NextResponse.json({ isLiked: true }, { status: 201 })
    } else {
      return NextResponse.json({ isLiked: false }, { status: 201 })
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function POST(req: NextRequest) {
  const { postingId, userId } = await req.json()

  try {
    await connectMongo()
    await Favorite.updateOne(
      {
        postingId,
      },
      { $push: { userId }, $inc: { count: 1 } },
    )

    return NextResponse.json({ status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function DELETE(req: NextRequest) {
  const { postingId, userId } = await req.json()

  try {
    await connectMongo()
    await Favorite.updateOne(
      {
        postingId,
      },
      { $pull: { userId }, $inc: { count: -1 } },
    )

    return NextResponse.json({ status: 204 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
