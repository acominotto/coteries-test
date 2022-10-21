export type Developer = {
    id: number,
    name: string,
    description: string,
    picture: string,
    hired: number
}
const URL_TO_FETCH = "https://dev.coteries.com/exercice"

export const fetchDevelopers = async (): Promise<Developer[]> => {
    return fetch(URL_TO_FETCH).then(resp => resp.json())
}

export const saveDeveloper = async (dev: Omit<Developer, "id">): Promise<any> => {
    return fetch(URL_TO_FETCH, {method: "post", body: JSON.stringify(dev)}).then(resp => resp.json())
}