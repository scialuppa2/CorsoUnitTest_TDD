const filterAndSortResults = (items = [], query = "", limit) => {
    if (!Array.isArray(items)) return [];

    const filtered = items
        .filter(item => item.toLowerCase().includes(query.toLowerCase()));

    const sorted = filtered.sort((a, b) => a.localeCompare(b));

    return Number.isInteger(limit) && limit > 0 ? sorted.slice(0, limit) : sorted;
};

export default filterAndSortResults;
