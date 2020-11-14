export function convertSnaps<T>(snaps): T[] {
    return snaps.map(snap => {
        return {
            id: snap.payload.doc.id,
            ...snap.payload.doc.data() as T
        };
    });
}

export function convertSnapsDoc<T>(snaps): T {
    return snaps.payload.data();
}

export function convertSnapsDocItems<T>(snaps): T[] {
    const items = [];

    if (!snaps.payload.exists) {
        return items;
    }

    snaps.forEach(snap => {
        items.push({
            id: snap.payload.doc.id,
            ...snap.payload.doc.data() as T
        });
    });

    return items;
}
