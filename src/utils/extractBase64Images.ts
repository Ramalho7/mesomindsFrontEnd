function extractBase64Images(htmlContent: string): { images: string[], cleanedContent: string } {
    const images = document.querySelectorAll('img')
    const promises: Promise<string>[] = []

    images.forEach((image) => {
        const src = image.getAttribute('src')
        if (src && src.startsWith('data:image')) {
            promises.push(Promise.resolve(src))
        } else if (src) {
            const promise = fetch(src)
                .then((res) => res.blob())
                .then((blob) => {
                    return new Promise<string>((resolve) => {
                        const reader = new FileReader()
                        reader.onloadend = () => resolve(reader.result as string)
                        reader.readAsDataURL(blob)
                    })
                })
            promises.push(promise)
        }
        return Promise.all(promises);
    })

    return {
        images: [],
        cleanedContent: htmlContent,
    }
}