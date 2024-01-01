import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import LibraryCard from "../LibraryCard/LibraryCard";

export default function MePage() {
  // query the user information from the token, QUERY_ME will query the user info, as well as user's favorite books, and user's lending books and the user's borrowed books
  const { loading: profileLoading, data: profileData } = useQuery(QUERY_ME);
  console.log(profileData);
  // user info
  const user = profileData?.me;
  // user's favorite books, an array
  const favoriteBooks = profileData?.queryMyFavoriteBooks;
  // user's lending books, an array
  const lendingBooks = profileData?.queryMyLendingBooks;
  // user's borrowed books, an array
  const borrowedBooks = profileData?.queryMyBorrowedBooks;

  const favoriteBookList = favoriteBooks?.map((book) => {
    return <div key={book._id}>{book.title}</div>;
  });
  // const favBooks = userData.;

  if (profileLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>
        MePage
        <div>Welcome back! {user.name}</div>
        <div>Below are your favorite books </div>
        <div>{favoriteBookList}</div>
      </div>
      <LibraryCard user={user}/>
    </>
  );
}
