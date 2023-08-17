import "./styles.css";

export default function App() {
  function chooseBestSum(t, k, ls) {
    let arr = [];

    function rec(sum, ar, n) {
      if (n == 0) {
        arr.push(sum);
      } else {
        for (let i = 0; i < ar.length; i++) {
          rec(sum + ar[i], ar.slice(i + 1), n - 1);
        }
      }
    }

    rec(0, ls, k);

    var sol = arr.sort((a, b) => b - a).find((a) => a <= t);
    return typeof sol === "undefined" ? null : sol;
  }

  function chooseBestSum2(t, k, ls) {
    var biggestCount = 0;
    var recurseTowns = function (townsSoFar, lastIndex) {
      townsSoFar = townsSoFar || [];
      //base case
      if (townsSoFar.length === k) {
        var sumDistance = townsSoFar.reduce((a, b) => a + b);
        if (sumDistance <= t && sumDistance > biggestCount) {
          biggestCount = sumDistance;
        }
        return; //EJECT
      }
      //recursive case
      for (var i = lastIndex + 1 || 0; i < ls.length; i++) {
        recurseTowns(townsSoFar.concat(ls[i]), i);
      }
    };
    recurseTowns();

    return biggestCount || null;
  }

  const chooseBestSum33 = (t, k, ls) =>
    ls
      .reduce(
        (pre, val) => [
          ...pre,
          ...pre.filter((val) => val.length < k).map((v) => [...v, val])
        ],
        [[]]
      )
      .filter((val) => val.length === k)
      .map((val) => val.reduce((pre, val) => pre + val))
      .filter((val) => val <= t)
      .sort((a, b) => a - b)
      .pop() || null;

  function chooseBestSum44(t, k, ls) {
    if (ls.length < k) return null;
    const results = [[]];
    for (const value of ls) {
      const copy = [...results];
      for (const prefix of copy) {
        results.push(prefix.concat(value));
      }
    }
    return (
      results
        .filter((a) => a.length && a.length == k)
        .map((item) => item.reduce((a, b) => a + b), 0)
        .filter((item) => item <= t)
        .sort((a, b) => b - a)[0] || null
    );
  }

  const t = 200;
  const k = 5;
  const ls = [12, 102, 22, 52, 33, 98, 85, 41, 36, 32, 16];

  console.log(chooseBestSum44(t, k, ls));
  return (
    <div className="App">
      <input />
    </div>
  );
}
