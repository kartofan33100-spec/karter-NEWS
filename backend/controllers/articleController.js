if (search) {
    query.title = { $regex: search, $options: 'i' };
}