export function extractBase64Images(htmlContent: string): { images: string[], cleanedContent: string } {
    const images: string[] = []
    
    console.log('htmlContent recebido:', htmlContent)
    console.log('htmlContent vazio?', !htmlContent || htmlContent.trim() === '')
    
    // Se não houver conteúdo, retorna vazio
    if (!htmlContent || htmlContent.trim() === '') {
        console.log('Retornando conteúdo vazio')
        return { images: [], cleanedContent: htmlContent }
    }
    
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = htmlContent
    
    console.log('tempDiv.innerHTML:', tempDiv.innerHTML)
    console.log('Procurando imagens...')
    
    // Extrair as imagens base64 sem removê-las do conteúdo
    tempDiv.querySelectorAll('img').forEach((img) => {
        const src = img.getAttribute('src')
        console.log('Imagem encontrada:', src?.substring(0, 50)) // Mostrar apenas os primeiros 50 caracteres
        if (src && src.startsWith('data:image')) {
            images.push(src)
            console.log('Imagem base64 adicionada ao array')
        }
    })

    console.log('Total de imagens encontradas:', images.length)
    
    // Se não houver conteúdo após parse, retorna o original
    const cleanedContent = tempDiv.innerHTML.trim()
    
    console.log('cleanedContent vazio?', !cleanedContent)
    console.log('cleanedContent:', cleanedContent.substring(0, 100)) // Mostrar apenas os primeiros 100 caracteres
    
    return {
        images,
        cleanedContent: cleanedContent || htmlContent, // Retorna o original se estiver vazio
    }
}