const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function getPendingArticles(token) {
    const response = await fetch(`${API_URL}/admin/articles/pending`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Ошибка загрузки статей');
    }

    return data;
}

export async function approveArticle(articleId, token) {
    const response = await fetch(`${API_URL}/admin/articles/${articleId}/approve`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Ошибка одобрения статьи');
    }

    return data;
}

export async function rejectArticle(articleId, token) {
    const response = await fetch(`${API_URL}/admin/articles/${articleId}/reject`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Ошибка отклонения статьи');
    }

    return data;
}