const quicksort = (arr, left, right) => {
  if (left < right) {
    const pi = partition(arr, left, right);
    quicksort(arr, left, pi - 1);
    quicksort(arr, pi + 1, right);
  }

  arr.forEach((movie, index) => {
    movie.ranking = index + 1;
  });
}

function partition(arr, left, right) {
  const pivot = arr[right];

  let i = left - 1;
  for (let j = left; j < right; j++) {
    if (arr[j].rating >= pivot.rating) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
    }
  }

  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]]; // Swap
  return i + 1;
}

export default quicksort;