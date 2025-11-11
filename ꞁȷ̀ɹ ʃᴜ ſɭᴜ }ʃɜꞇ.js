document.getElementById('iixakanoi').addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    const table = document.getElementById('kef');
    const rows = table.getElementsByTagName('tr');

    // Handle empty query - show all rows and exit
    if (query === '') {
        for (let i = 0; i < rows.length; i++) {
            rows[i].style.display = '';
        }
        return;
    }

    // Escape regex special characters for safe word boundary matching
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const fullWordRegex = new RegExp(`\\b${escapedQuery}\\b`, 'i');

    // Always keep header row visible (assuming first row is header)
    if (rows.length > 0) {
        rows[0].style.display = '';
    }

    // Process body rows
    const bodyRows = Array.from(rows).slice(1);
    const matches = { fullWord: [], partial: [] };
    const nonMatches = [];

    // Categorize rows
    bodyRows.forEach(row => {
        let hasMatch = false;
        let hasFullWordMatch = false;
        const cells = row.getElementsByTagName('td');

        for (const cell of cells) {
            const text = cell.textContent.toLowerCase();
            
            if (text.includes(query)) {
                hasMatch = true;
                if (fullWordRegex.test(text)) {
                    hasFullWordMatch = true;
                }
            }
        }

        if (hasMatch) {
            if (hasFullWordMatch) matches.fullWord.push(row);
            else matches.partial.push(row);
            row.style.display = '';
        } else {
            nonMatches.push(row);
            row.style.display = 'none';
        }
    });

    // Reorganize table with full-word matches first
    const tbody = table.tBodies[0] || table; // Use tbody if exists
    const fragment = document.createDocumentFragment();
    
    [...matches.fullWord, ...matches.partial].forEach(row => {
        fragment.appendChild(row.cloneNode(true));
    });
    
    tbody.replaceChildren(fragment);
});