


export default function formatDate(string: string) {
    const splitYear = string.split('T')[0].split('-').reverse().join(' ')
    const splitDay = string.split('T')[1].split('.')[0]
    const [hour, minute] = splitDay.split(':')
    const dateFormat = `${hour}:${minute}`
    const myRef = Number(splitDay.split('-')[0])
    const dataDay = myRef > 12 ? ` ${dateFormat} pm` : `${dateFormat} am`;
    return `${splitYear} at ${dataDay}`
}