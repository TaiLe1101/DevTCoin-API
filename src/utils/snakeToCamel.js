export const snakeToCamelCase = (obj) =>{
    const newObj = {};
    for (const [key, value] of Object.entries(obj)) {
        const camelCaseKey = key
            .toLowerCase()
            .replace(/_([a-z])/g, (g) => g[1].toUpperCase())
            .replace(/_([A-Z])/g, (g) => g[1].toUpperCase());
        newObj[camelCaseKey] = value;
    }
    return newObj;
}