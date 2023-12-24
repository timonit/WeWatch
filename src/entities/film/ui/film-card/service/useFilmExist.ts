const filmIsExist = ref(false);
export const updateExist = () => {
  const filmExist = db.data.list.find((itemFilm) => itemFilm.id === props.filmID);
  filmIsExist.value = !!filmExist;
}
