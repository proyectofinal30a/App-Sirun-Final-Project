

export default function cloudinaryOrUrl(string: string, switchForm: 'client' | "server") {
    if (switchForm === 'client') {
        const [firstElem, secondElem] = string.split('<=>')
        return secondElem ? secondElem : string
    }

    if (switchForm === 'server') {
        const [firstElem, secondElem] = string.split('<=>')
        return secondElem ? firstElem : false
    }
}