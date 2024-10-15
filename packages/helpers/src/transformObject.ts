function snakeToCamel(snakeStr: string): string {
    const components = snakeStr.split('_');
    return components[0] + components.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

export function transformToCamelCase<T=unknown>(data: T | Record<string, T> | Record<string, T>[]): T | Record<string, T> | T[] {
    if (Array.isArray(data)) {
        // If it's an array, recursively apply the conversion to each element
        return data.map(item => transformToCamelCase(item)) as T[];
    } else if (typeof data === 'object' && data !== null) {
        // If it's an object, convert its keys recursively
        const newObj: Record<string, T> = {};
        Object.keys(data).forEach(key => {
            const newKey = snakeToCamel(key);
						// @ts-ignore
            newObj[newKey] = transformToCamelCase(data[key]);
        });
        return newObj;
    } else {
        // If it's a primitive type (string, number, etc.), return the value as is
        return data;
    }
}