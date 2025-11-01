export function extractBase64Images(htmlContent: string): { images: string[], cleanedContent: string } {
    const images: string[] = []
    
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = htmlContent
    
    tempDiv.querySelectorAll('img').forEach((img) => {
        const src = img.getAttribute('src')
        if (src && src.startsWith('data:image')) {
            images.push(src)
            img.remove()
        }
    })
    
    return {
        images,
        cleanedContent: tempDiv.innerHTML, 
    } // como o html no editor não é um dom, é preciso parsear para um html temp para poder acessar as informações
}