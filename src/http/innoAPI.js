import { $host } from '.'

// fetch

export const fetchServices = async () => {
    const { data } = await $host.get('api/service')
    return data
}

export const fetchPrices = async () => {
    const { data } = await $host.get('api/price')
    return data
}

export const fetchIntensives = async () => {
    const { data } = await $host.get('api/intensive')
    return data
}

export const fetchImages = async () => {
    const { data } = await $host.get('api/image')
    return data
}

export const fetchRates = async () => {
    const { data } = await $host.get('api/rate')
    return data
}

// create

export const addService = async (name, text) => {
    const { data } = await $host.post('api/service', { name, text })
    return data
}

export const addPrice = async (category_id, name, text, price) => {
    const { data } = await $host.post('api/price', { category_id, name, text, price })
    return data
}

export const addIntensive = async (name, text, price) => {
    const { data } = await $host.post('api/intensive', { name, text, price })
    return data
}

export const addImage = async (text, image) => {
    const formData = new FormData()
    formData.append('text', text)
    formData.append('img', image)

    const { data } = await $host.post('api/image', formData)
    return data
}

export const addRate = async (date, name, text) => {
    const { data } = await $host.post('api/rate', { date, name, text })
    return data
}

// update

export const updateService = async (id, name, text) => {
    const { data } = await $host.post('api/service/update', { id, name, text })
    return data
}

export const updatePrice = async (id, category_id, name, text, price) => {
    console.log(id, category_id, name, text, price)
    const { data } = await $host.post('api/price/update', { id, category_id, name, text, price })
    return data
}

export const updateIntensive = async (id, name, text, price) => {
    const { data } = await $host.post('api/intensive/update', { id, name, text, price })
    return data
}

export const updateRate = async (id, date, name, text) => {
    const { data } = await $host.post('api/rate/update', { id, date, name, text })
    return data
}

// delete

export const destroyService = async (id) => {
    const { data } = await $host.delete('api/service', { params: { id } })
    return data
}

export const destroyPrice = async (id) => {
    const { data } = await $host.delete('api/price', { params: { id } })
    return data
}

export const destroyIntensive = async (id) => {
    const { data } = await $host.delete('api/intensive', { params: { id } })
    return data
}

export const destroyRate = async (id) => {
    const { data } = await $host.delete('api/rate', { params: { id } })
    return data
}

export const destroyImage = async (id) => {
    const { data } = await $host.delete('api/image', { params: { id } })
    return data
}

// bot

export const sendToBot = async (name, phone, message) => {
    const { data } = await $host.post('api/bot', { name, phone, message })
    return data
}

// news

export const addNews = async (text, images) => {
    const cleanedText = text.replace(/<img\b[^>]*>/g, '')
    console.log(cleanedText, images)
    const formData = new FormData()
    formData.append('text', cleanedText)
    images.forEach((image) => {
        formData.append('img', image)
    })
    const { data } = await $host.post('api/news', formData)
    return data
}

export const fetchNews = async () => {
    const { data } = await $host.get('api/news')
    return data
}

export const fetchNewsImages = async () => {
    const { data } = await $host.get('api/news/images')
    return data
}

export const destroyNews = async (id) => {
    const { data } = await $host.delete('api/news', { params: { id } })
    return data
}

// teachers

export const fetchTeachers = async () => {
    const { data } = await $host.get('api/teacher')
    return data
}

export const addTeacher = async (name, position, education, experience, description, image) => {
    console.log(1)
    const formData = new FormData()
    formData.append('name', name)
    formData.append('position', position)
    formData.append('education', education)
    formData.append('experience', experience)
    formData.append('description', description)
    formData.append('img', image)
    const { data } = await $host.post('api/teacher', formData)
    return data
}

export const destroyTeacher = async (id) => {
    const { data } = await $host.delete('api/teacher', { params: { id } })
    return data
}

export const updateTeacher = async (id, name, position, education, experience, description, image) => {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('name', name)
    formData.append('position', position)
    formData.append('education', education)
    formData.append('experience', experience)
    formData.append('description', description)
    formData.append('img', image)
    const { data } = await $host.post('api/teacher/update', formData)
    return data
}

// documents

export const fetchDocuments = async () => {
    const { data } = await $host.get('api/document')
    return data
}

export const addDocument = async (name, document, text) => {
    console.log(1)
    const formData = new FormData()
    formData.append('name', name)
    formData.append('file', document)
    formData.append('text', text)
    const { data } = await $host.post('api/document', formData)
    return data
}

export const destroyDocument = async (id) => {
    const { data } = await $host.delete('api/document', { params: { id } })
    return data
}