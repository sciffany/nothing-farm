// function to produce weighted random result
export function weightedRandom(object: { value: any; weight: number }[]): any {
  const weights = object.map((obj) => obj.weight);
  const values = object.map((obj) => obj.value);
  const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
  const random = Math.random() * totalWeight;
  let weightSum = 0;

  for (let i = 0; i < weights.length; i++) {
    weightSum += weights[i];
    weightSum = +weightSum.toFixed(2);

    if (random < weightSum) {
      return values[i];
    }
  }
}
