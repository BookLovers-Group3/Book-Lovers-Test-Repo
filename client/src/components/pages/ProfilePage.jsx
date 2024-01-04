import { useQuery } from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";
import { QUERY_SINGLE_PROFILE } from "../../utils/queries";
import Auth from "../../utils/auth";

export default function ProfilePage() {
  const { profileId } = useParams();
  // query the profile info based on the profileId
  const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: { profileId: profileId },
  });
  console.log(data);

  const profile = data?.profile;
  const favoriteBooks = profile?.favoriteBooks;
  const booksToLend = profile?.booksToLend;
  const favBookList = favoriteBooks?.map((book) => {
    return (
      <div key={book._id}>
        <div>{book.title}</div>
      </div>
    );
  });

  const booksToLendList = booksToLend?.map((book) => {
    return (
      <div key={book._id}>
        <div>{book.title}</div>
      </div>
    );
  });
  // check if you are frends
  const friends = profile?.friends;
  if (friends) {
    const isFriend = friends.includes(Auth.getProfile().data._id)
      ? true
      : false;
    console.log(isFriend);
  }

  // Use React Router's `<Navigate />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?._id) {
    return <h4>No such profile exist</h4>;
  }

  return (
    <div>
      ProfilePage
      <div>This is {profile?.name}'s Page</div>
      <div>This user's favorite books are {favBookList}</div>
      <div>This user's lending books are {booksToLendList}</div>
    </div>
  );
}
