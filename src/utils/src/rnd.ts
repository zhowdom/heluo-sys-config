export const rnd = (n:number, m:number) => {
  // random number for: [n, m)
  return Math.floor(Math.random() * (m - n) + n)
}