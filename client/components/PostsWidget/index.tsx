import { useQuery } from "@apollo/client";
import React from "react";
import { GET_POSTS, GET_USER_POSTS } from "@/lib/query";
import { IPost } from "@/lib/types";
import Loading from "../Loading";
import PostWidget from "../PostWidget";

const PostsWidget = ({
  userId,
  isProfile = false,
}: {
  userId: string;
  isProfile: boolean;
}) => {
  if (isProfile) {
    const { loading, error, data } = useQuery(GET_USER_POSTS, {
      variables: { userId },
    });

    if (loading) return <Loading />;
    return (
      <>
        {data.userPosts.map(
          ({
            id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }: IPost) => (
            <React.Fragment key={id}>
              <PostWidget
                postId={id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                description={description}
                location={location}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
              />
            </React.Fragment>
          )
        )}
      </>
    );
  }

  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <Loading />;

  return (
    <>
      {data.posts.map(
        ({
          id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }: IPost) => (
          <React.Fragment key={id}>
            <PostWidget
              postId={id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          </React.Fragment>
        )
      )}
    </>
  );
};

export default PostsWidget;
