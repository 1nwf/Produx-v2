import { Post } from '../../../../state/interfaces'
import { Avatar, Link, Tooltip } from '@nextui-org/react'
import moment from 'moment'
import { useRouter } from 'next/router'
export default function PostView({
    data,
    channel,
    color,
    showDivider,
    showProductIcon,
}: {
    data: Post
    channel: string
    color: string
    showDivider: boolean
    showProductIcon: boolean
}) {
    const router = useRouter()
    const { name } = router.query
    const pathToPost = `/products/[name]/[channel]/[postId]`
    return (
        <div
            onClick={() =>
                router.push({
                    pathname: pathToPost,
                    query: {
                        name: data.product.name || (name as string),
                        channel: channel,
                        postId: data.ID,
                    },
                })
            }
            className={`${!showDivider && 'mb-6 w-auto'} cursor-pointer`}
        >
            <div
                className={`bg-white p-5 rounded-3xl ${
                    showDivider && 'mx-4'
                } min-w-[20vw] mb-4 items-center mt-4 md:mt-0`}
            >
                <div className="grid-cols-3 flex align-bottom ">
                    <div className="flex items-center">
                        {showProductIcon
                            ? data.product.images && (
                                  <Link href={`products/${data.product.name}`}>
                                      <a>
                                          <img
                                              src={data.product.images[0]}
                                              className="w-12  rounded-box align-middle"
                                          />
                                      </a>
                                  </Link>
                              )
                            : data.user.pfp && (
                                  <Avatar
                                      className="z-0"
                                      squared
                                      bordered
                                      src={data.user.pfp}
                                      size="lg"
                                  />
                              )}
                        <span className="font-bold pl-2 lg:mr-1 ">
                            {data.title}
                        </span>
                        {showProductIcon && (
                            <span className="text-sm text-truncate ">
                                - {data.product.name}
                            </span>
                        )}
                    </div>
                    <span
                        style={{ backgroundColor: color || 'white' }}
                        className={`text-black  rounded-[10px]  px-2 py-2 text-xs text-center my-auto ml-auto`}
                    >
                        {channel.substring(0, channel.length - 1)}
                    </span>
                </div>
                <div>
                    <div className="mt-3">
                        <span className={'break-all text-gray-600'}>
                            {data.description.length > 400
                                ? data.description.substring(0, 400) + '...'
                                : data.description}
                        </span>
                    </div>
                    {showProductIcon && data.user.pfp && (
                        <div
                            className={
                                'z-0 text-sm flex items-center mt-2 float-right '
                            }
                        >
                            <Avatar
                                size={'sm'}
                                src={data.user.pfp}
                                className={'z-0'}
                                bordered
                                squared
                            />
                            <p className={'ml-1'}>{data.user.name}</p>
                        </div>
                    )}
                    <div
                        className={
                            'text-sm mt-2 text-gray-400 flex items-center'
                        }
                    >
                        <p className="">
                            {moment(new Date(data.CreatedAt)).fromNow()}
                        </p>
                        <p className={'mx-1'}>|</p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                            />
                        </svg>
                        <p className={'ml-1'}>{data.commentsCount} </p>
                        <p className={'mx-1'}>|</p>
                        <Tooltip content={'Like post'}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                />
                            </svg>
                            <p>{data.likes}</p>
                        </Tooltip>
                    </div>
                </div>
                {showProductIcon && <div className={'h-2'} />}
            </div>
            {showDivider && (
                <div className={'flex justify-center mt-[-30px]'}>
                    <div className={'divider w-11/12'} />
                </div>
            )}
        </div>
    )
}
