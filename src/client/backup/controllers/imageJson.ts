



export default function fromJsonToArray(array: any) {
    const myImageArray = array.map((elem: any) => {
        const { ...myCopyImage } = elem
        const myImage: any = JSON.parse(elem.image)
            .map((elemIme: any) => elemIme.image)
        myCopyImage.image = myImage
        return myCopyImage
    })

    return myImageArray
}

