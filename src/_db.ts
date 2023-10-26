let games = [
  {
    id: "1",
    title: "Tears of the King Dom",
    platform: ["Switch"],
  },
  {
    id: "2",
    title: "Final Fantasy",
    platform: ["PS5", "Xbox"],
  },
];

let authors = [
  { id: "1", name: "mario", verified: true },
  { id: "2", name: "venkatesh", verified: false },
];

let reviews = [
  {
    id: "1",
    rating: "9",
    content: "Lorem ipsum",
    author_id: "1",
    game_id: "2",
  },
  {
    id: "2",
    rating: "10",
    content: "Lorem ipsum",
    author_id: "2",
    game_id: "4",
  },
];

export default { games, authors, reviews };
