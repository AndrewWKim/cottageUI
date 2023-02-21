export class StorageUtils {

    static setItem(key: string, data: any): any {
        const storageJson = JSON.stringify(data, null, 2);
        localStorage.setItem(key, storageJson);
    }

    static getItem(key: string): any {
        const itemString = localStorage.getItem(key);

        if (itemString === null || typeof itemString === 'undefined' || itemString === '') {
            return null;
        }

        return JSON.parse(itemString);
    }
}