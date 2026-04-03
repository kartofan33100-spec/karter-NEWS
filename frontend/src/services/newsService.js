const API_URL = import.meta.env.VITE_API_URL;

export async function getAllArticles(search = '', category = '') {
    const params = new URLSearchParams();

    if (search) params.append('search', search);
    if (category) params.append('category', category);

    const response = await fetch(`${API_URL}?${params.toString()}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch articles');
    }

    return data;
}

export async function getArticleById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch article');
    }

    return data;
}

export async function createArticle(articleData, token) {
    const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(articleData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to create article');
    }

    return data;
}

export async function updateArticle(id, articleData, token) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(articleData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to update article');
    }

    return data;
}

export async function deleteArticle(id, token) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to delete article');
    }

    return data;
}

export async function getMyArticles(token) {
    const response = await fetch(`${API_URL}/my/articles`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch my articles');
    }

    return data;
}