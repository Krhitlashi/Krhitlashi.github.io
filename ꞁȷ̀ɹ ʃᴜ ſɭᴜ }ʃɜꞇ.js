const filterInput = document.getElementById("iixakanoi");
const table = document.getElementById("kef");
const tbody = table.tBodies[0] || table;
const allRows = Array.from(table.getElementsByTagName("tr"));
const headerRow = allRows[0];
const bodyRows = allRows.slice(1);

const initialOrder = new Map();
bodyRows.forEach((row, index) => {
  initialOrder.set(row, index);
});

filterInput.addEventListener("input", function() {
  const query = this.value.toLowerCase().trim();
  
  if (query === "") {
    bodyRows.sort((a, b) => initialOrder.get(a) - initialOrder.get(b));
    
    const fragment = document.createDocumentFragment();
    bodyRows.forEach(row => fragment.appendChild(row));
    tbody.appendChild(fragment);
    
    allRows.forEach(row => row.style.display = "");
    return;
  }

  const matches = { fullWord: [], partial: [] };
  const nonMatches = [];

  bodyRows.forEach(row => {
    let hasMatch = false;
    let hasFullWordMatch = false;
    const cells = row.getElementsByTagName("td");

    for (const cell of cells) {
      const text = cell.textContent.toLowerCase();
      if (text.includes(query)) {
        hasMatch = true;
        if (query.test(text)) {
          hasFullWordMatch = true;
        }
      }
    }

    if (hasMatch) {
      if (hasFullWordMatch) matches.fullWord.push(row);
      else matches.partial.push(row);
    } else {
      nonMatches.push(row);
    }
  });

  matches.fullWord.sort((a, b) => initialOrder.get(a) - initialOrder.get(b));
  matches.partial.sort((a, b) => initialOrder.get(a) - initialOrder.get(b));
  
  const fragment = document.createDocumentFragment();
  [...matches.fullWord, ...matches.partial, ...nonMatches].forEach(row => {
    fragment.appendChild(row);
  });
  
  tbody.insertBefore(fragment, headerRow.nextSibling);
  
  matches.fullWord.forEach(row => row.style.display = "");
  matches.partial.forEach(row => row.style.display = "");
  nonMatches.forEach(row => row.style.display = "none");
});