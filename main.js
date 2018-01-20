let xStep = true;
let xPos = [];
let oPos = [];

const items = document.getElementsByClassName("field-item");
const line = document.getElementsByClassName("line");

function step() {
  this.children[0].innerHTML = xStep ? "X" : "O";

  const markPos = this.id.split("_");

  const mark = xStep ? "x" : "o";

  const currentPos = xStep ? xPos : oPos;

  currentPos.push(markPos);
  if (xPos.length + oPos.length < 9) {
    if (currentPos.length > 2) {
      const win = isWinner(currentPos, line[0]);
      if (win) {
        setTimeout(function() {
          alert(mark.toUpperCase() + " you are winner!");
          location.reload();
        }, 1000);
      }
    }
    xStep = !xStep;
  } else {
    setTimeout(function() {
      alert("Draw");
      location.reload();
    }, 0);
  }
}

function isWinner(positions, lineEl) {
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

    if (firstCol === 3) {
      lineEl.classList.add("col1");
      lineEl.classList.remove("invisible");
    } else if (secondCol === 3) {
      lineEl.classList.add("col2");
      lineEl.classList.remove("invisible");
    } else if (thirdCol === 3) {
      lineEl.classList.add("col3");
      lineEl.classList.remove("invisible");
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

    if (firstRow === 3) {
      lineEl.classList.add("row1");
      lineEl.classList.remove("invisible");
    } else if (secondRow === 3) {
      lineEl.classList.add("row2");
      lineEl.classList.remove("invisible");
    } else if (thirdRow === 3) {
      lineEl.classList.add("row3");
      lineEl.classList.remove("invisible");
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

    if (counter === 3) {
      lineEl.classList.add("diag1");
      lineEl.classList.remove("invisible");
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

    if (counter === 3) {
      lineEl.classList.add("diag2");
      lineEl.classList.remove("invisible");
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
