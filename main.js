let xStep = true;
let xPos = [];
let oPos = [];

const items = document.getElementsByClassName("field-item");

function step() {
  this.children[0].innerHTML = xStep ? "X" : "O";

  const markPos = this.id.split("_");

  const mark = xStep ? "x" : "o";

  const currentPos = xStep ? xPos : oPos;

  currentPos.push(markPos);
  if (currentPos.length > 2) {
    const win = isWinner(currentPos);
    if (win) {
      setTimeout(function() {
        alert(mark.toUpperCase() + " you are winner!");
        location.reload();
      }, 0);
    }
  }
  xStep = !xStep;
}

function isWinner(positions) {
  function isColumn() {
    let firstCol = 0;
    let secondCol = 0;
    let thirdCol = 0;

    for (i = 0; i < positions.length; i++) {
      switch (positions[i][1]) {
        case "0":
          firstCol++;
          break;
        case "1":
          secondCol++;
          break;
        case "2":
          thirdCol++;
          break;
      }
    }
    return firstCol === 3 || secondCol === 3 || thirdCol === 3;
  }

  function isRow() {
    let firstRow = 0;
    let secondRow = 0;
    let thirdRow = 0;

    for (i = 0; i < positions.length; i++) {
      switch (positions[i][0]) {
        case "0":
          firstRow++;
          break;
        case "1":
          secondRow++;
          break;
        case "2":
          thirdRow++;
          break;
      }
    }
    return firstRow === 3 || secondRow === 3 || thirdRow === 3;
  }

  function isDiagonal() {
    let counter = 0;
    for (i = 0; i < positions.length; i++) {
      if (positions[i][0] === positions[i][1]) {
        counter++;
      }
    }
    return counter === 3;
  }

  function isReverseDiagonal() {
    let counter = 0;
    for (i = 0; i < positions.length; i++) {
      if (
        (positions[i][0] === "1" && positions[i][1] === "1") ||
        Math.abs(+positions[i][0] - +positions[i][1]) === 2
      ) {
        counter++;
      }
    }
    return counter === 3;
  }
  return isColumn() || isRow() || isDiagonal() || isReverseDiagonal();
}

for (let i = 0; i < items.length; i++) {
  items[i].addEventListener("click", step, {
    once: true
  });
}
