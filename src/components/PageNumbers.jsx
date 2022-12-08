export default function PageNumbers({
  totalPageCount, handlePageClick,
}) {
  const pages = Array(totalPageCount).fill(0)
    .map((element, index) => index + 1);

  return (
    <ul>
      {pages.map((page) => (
        <li key={page}>
          <button
            type="button"
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        </li>
      ))}
    </ul>
  );
}
